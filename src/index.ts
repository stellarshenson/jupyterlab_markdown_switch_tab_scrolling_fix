import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the jupyterlab_markdown_switch_tab_scrolling_fix extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_markdown_switch_tab_scrolling_fix:plugin',
  description: 'Jupyterlab bugfix (disguised as extension) to help with the problem of Markdown files getting scrolled uncontrollably when images are gettng loaded into the view when switching tab back and forth',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlab_markdown_switch_tab_scrolling_fix is activated!');
  }
};

export default plugin;
