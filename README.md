# jupyterlab_markdown_switch_tab_scrolling_fix

[![GitHub Actions](https://github.com/stellarshenson/jupyterlab_markdown_switch_tab_scrolling_fix/actions/workflows/build.yml/badge.svg)](https://github.com/stellarshenson/jupyterlab_markdown_switch_tab_scrolling_fix/actions/workflows/build.yml)
[![npm version](https://img.shields.io/npm/v/jupyterlab_markdown_switch_tab_scrolling_fix.svg)](https://www.npmjs.com/package/jupyterlab_markdown_switch_tab_scrolling_fix)
[![PyPI version](https://img.shields.io/pypi/v/jupyterlab-markdown-switch-tab-scrolling-fix.svg)](https://pypi.org/project/jupyterlab-markdown-switch-tab-scrolling-fix/)
[![Total PyPI downloads](https://static.pepy.tech/badge/jupyterlab-markdown-switch-tab-scrolling-fix)](https://pepy.tech/project/jupyterlab-markdown-switch-tab-scrolling-fix)
[![JupyterLab 4](https://img.shields.io/badge/JupyterLab-4-orange.svg)](https://jupyterlab.readthedocs.io/en/stable/)

JupyterLab extension that prevents markdown files from scrolling uncontrollably when switching tabs while images load.

## The Problem

When you switch back to a markdown tab in JupyterLab, images reload and cause the viewport to jump as they render. This creates disorienting scroll drift that moves you away from where you were reading.

**Key observations**:
- Issue only occurs with markdown files containing images
- Triggered by tab switching (deactivate then reactivate)
- Browser recalculates layout as each image loads, causing cumulative scroll displacement
- Native JupyterLab has no scroll position protection during image rendering

## The Fix

This extension locks scroll position when you switch to a markdown tab until all images finish loading.

**How it works**:
- Detects when markdown widgets become active via JupyterLab's shell signals
- Captures initial scroll position immediately on tab activation
- Monitors all image load events in the markdown
- Actively corrects any scroll drift (checks every 100ms)
- Releases lock after all images load and position stabilizes for 300ms
- User scroll (wheel or touch) immediately overrides the lock

**Implementation details**:
- Maximum lock duration: 3 seconds
- Handles cached images that load instantly
- Uses WeakMap to prevent multiple guards on same widget
- Passive event listeners for performance

## Requirements

- JupyterLab >= 4.0.0

## Install

To install the extension, execute:

```bash
pip install jupyterlab_markdown_switch_tab_scrolling_fix
```

## Uninstall

To remove the extension, execute:

```bash
pip uninstall jupyterlab_markdown_switch_tab_scrolling_fix
```

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyterlab_markdown_switch_tab_scrolling_fix directory

# Set up a virtual environment and install package in development mode
python -m venv .venv
source .venv/bin/activate
pip install --editable "."

# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite

# Rebuild extension Typescript source after making changes
# IMPORTANT: Unlike the steps above which are performed only once, do this step
# every time you make a change.
jlpm build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
pip uninstall jupyterlab_markdown_switch_tab_scrolling_fix
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `jupyterlab_markdown_switch_tab_scrolling_fix` within that folder.

### Testing the extension

#### Frontend tests

This extension is using [Jest](https://jestjs.io/) for JavaScript code testing.

To execute them, execute:

```sh
jlpm
jlpm test
```

#### Integration tests

This extension uses [Playwright](https://playwright.dev/docs/intro) for the integration tests (aka user level tests).
More precisely, the JupyterLab helper [Galata](https://github.com/jupyterlab/jupyterlab/tree/master/galata) is used to handle testing the extension in JupyterLab.

More information are provided within the [ui-tests](./ui-tests/README.md) README.

### Packaging the extension

See [RELEASE](RELEASE.md)
