import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
  ILabShell
} from '@jupyterlab/application';

import { Widget } from '@lumino/widgets';

/**
 * Initialization data for the jupyterlab_markdown_switch_tab_scrolling_fix extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_markdown_switch_tab_scrolling_fix:plugin',
  description:
    'Jupyterlab bugfix (disguised as extension) to help with the problem of Markdown files getting scrolled uncontrollably when images are gettng loaded into the view when switching tab back and forth',
  autoStart: true,
  requires: [ILabShell],
  activate: (app: JupyterFrontEnd, labShell: ILabShell) => {
    console.log(
      'JupyterLab extension jupyterlab_markdown_switch_tab_scrolling_fix is activated!'
    );

    // Track active guard intervals to prevent multiple guards on same widget
    const activeGuards = new WeakMap<Widget, number>();

    /**
     * Handle widget activation to prevent scroll drift when switching to markdown tabs
     */
    const handleWidgetActivation = (widget: Widget | null) => {
      if (!widget) {
        return;
      }

      // Find markdown container
      const markdownContainer = widget.node.querySelector(
        '.jp-RenderedMarkdown'
      ) as HTMLElement | null;

      if (!markdownContainer) {
        return;
      }

      // Clear any existing guard for this widget
      const existingGuardId = activeGuards.get(widget);
      if (existingGuardId !== undefined) {
        clearInterval(existingGuardId);
        activeGuards.delete(widget);
      }

      // Capture initial scroll position
      const savedScrollTop = markdownContainer.scrollTop;
      const savedScrollLeft = markdownContainer.scrollLeft;

      // Find all images in the markdown
      const images = Array.from(
        markdownContainer.querySelectorAll('img')
      ) as HTMLImageElement[];

      if (images.length === 0) {
        // No images, no need for scroll lock
        return;
      }

      console.log(
        `[SCROLL-LOCK] Markdown activated with ${images.length} images, locking scroll at ${savedScrollTop}px`
      );

      // Track image loading state
      let loadedImageCount = 0;
      const totalImages = images.length;
      let userScrollDetected = false;

      // Image load handler
      const imageLoadHandler = (index: number) => {
        return () => {
          loadedImageCount++;
          console.log(`[IMAGE-LOAD] Image ${index + 1}/${totalImages} loaded`);

          if (loadedImageCount >= totalImages) {
            console.log(
              `[IMAGES-COMPLETE] All ${totalImages} images loaded, scroll lock will release soon`
            );
          }
        };
      };

      // Attach load listeners to all images
      images.forEach((img, index) => {
        const handler = imageLoadHandler(index);
        img.addEventListener('load', handler, { once: true });
        img.addEventListener('error', handler, { once: true });

        // If image is already complete, trigger immediately
        if (img.complete && img.naturalHeight !== 0) {
          handler();
        }
      });

      // Detect user-initiated scrolling to release lock immediately
      const userScrollHandler = () => {
        userScrollDetected = true;
        console.log('[USER-SCROLL] User scroll detected, releasing lock');
      };

      markdownContainer.addEventListener('wheel', userScrollHandler, {
        once: true,
        passive: true
      });
      markdownContainer.addEventListener('touchstart', userScrollHandler, {
        once: true,
        passive: true
      });

      // Guard mode: lock scroll position while images load
      let guardAttempts = 0;
      const maxGuardAttempts = 30; // 3 seconds at 100ms intervals
      let stableCount = 0;
      const stabilityThreshold = 3;

      const guardIntervalId = window.setInterval(() => {
        // Exit immediately if user starts scrolling
        if (userScrollDetected) {
          clearInterval(guardIntervalId);
          activeGuards.delete(widget);
          markdownContainer.removeEventListener('wheel', userScrollHandler);
          markdownContainer.removeEventListener(
            'touchstart',
            userScrollHandler
          );
          console.log('[GUARD-EXIT] User scroll detected');
          return;
        }

        const currentScrollTop = markdownContainer.scrollTop;
        const drift = Math.abs(currentScrollTop - savedScrollTop);

        // Check if position is stable
        if (drift < 1) {
          stableCount++;
        } else {
          stableCount = 0;
          // Restore scroll position if drift detected
          markdownContainer.scrollTop = savedScrollTop;
          markdownContainer.scrollLeft = savedScrollLeft;
          console.log(
            `[SCROLL-RESTORE] Corrected drift of ${drift.toFixed(1)}px`
          );
        }

        // Exit if all images loaded and position is stable
        if (
          loadedImageCount >= totalImages &&
          stableCount >= stabilityThreshold
        ) {
          clearInterval(guardIntervalId);
          activeGuards.delete(widget);
          markdownContainer.removeEventListener('wheel', userScrollHandler);
          markdownContainer.removeEventListener(
            'touchstart',
            userScrollHandler
          );
          console.log(
            `[GUARD-COMPLETE] Scroll lock released after ${guardAttempts} attempts`
          );
          return;
        }

        guardAttempts++;

        // Timeout after max attempts
        if (guardAttempts >= maxGuardAttempts) {
          clearInterval(guardIntervalId);
          activeGuards.delete(widget);
          markdownContainer.removeEventListener('wheel', userScrollHandler);
          markdownContainer.removeEventListener(
            'touchstart',
            userScrollHandler
          );
          console.log(
            `[GUARD-TIMEOUT] Scroll lock released after timeout (${loadedImageCount}/${totalImages} images loaded)`
          );
        }
      }, 100);

      // Store the guard interval ID
      activeGuards.set(widget, guardIntervalId);
    };

    // Subscribe to shell's currentChanged signal
    labShell.currentChanged.connect((_, args) => {
      const { newValue } = args;
      handleWidgetActivation(newValue);
    });

    console.log(
      '[INIT] Markdown scroll lock handler registered on shell.currentChanged'
    );
  }
};

export default plugin;
