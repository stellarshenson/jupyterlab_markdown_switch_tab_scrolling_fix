import { expect, test } from '@jupyterlab/galata';

/**
 * Test that the extension loads without errors.
 */
test('should load the extension without errors', async ({ page }) => {
  const errors: string[] = [];

  page.on('console', message => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });

  await page.goto();

  // Wait for JupyterLab to fully load
  await page.waitForSelector('.jp-Launcher');

  // Filter out unrelated errors
  const extensionErrors = errors.filter(
    e =>
      e.includes('jupyterlab_markdown_switch_tab_scrolling_fix') ||
      e.includes('md-scroll-fix')
  );

  expect(extensionErrors).toHaveLength(0);
});
