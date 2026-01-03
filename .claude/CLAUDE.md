<!-- @import /home/lab/workspace/.claude/CLAUDE.md -->

# Project-Specific Configuration

This file imports workspace-level configuration from `/home/lab/workspace/.claude/CLAUDE.md`.
All workspace rules apply. Project-specific rules below strengthen or extend them.

The workspace `/home/lab/workspace/.claude/` directory contains additional instruction files
(MERMAID.md, NOTEBOOK.md, DATASCIENCE.md, GIT.md, JUPYTERLAB_EXTENSION.md, and others) referenced by CLAUDE.md.
Consult workspace CLAUDE.md and the .claude directory to discover all applicable standards.

## Mandatory Bans (Reinforced)

The following workspace rules are STRICTLY ENFORCED for this project:

- **No automatic git tags** - only create tags when user explicitly requests
- **No automatic version changes** - only modify version in package.json/pyproject.toml when user explicitly requests
- **No automatic publishing** - never run `make publish`, `npm publish`, `twine upload`, or similar without explicit user request
- **No manual package installs if Makefile exists** - use `make install` or equivalent Makefile targets, not direct `pip install`/`uv install`/`npm install`
- **No automatic git commits or pushes** - only when user explicitly requests

## Project Context

**Project Name**: jupyterlab_markdown_switch_tab_scrolling_fix

**Purpose**: JupyterLab extension to fix markdown file scrolling issues when switching tabs and images are loading

**Technology Stack**:

- JupyterLab >= 4.0.0
- TypeScript 5.8.0
- React 18.0
- Jest for testing
- Playwright/Galata for integration tests

**Project Type**: JupyterLab extension (TypeScript + Python hybrid package)

**Key Files**:

- `src/index.ts` - Main extension entry point
- `package.json` - Node.js package configuration
- `pyproject.toml` - Python package configuration

**Development Workflow**:

- Use `jlpm build` to compile TypeScript
- Use `jlpm watch` for continuous builds during development
- Use `jupyter labextension develop . --overwrite` to link extension to JupyterLab
- Extension autoloads in JupyterLab on startup

## Naming Conventions

**Package Names**:

- Python package: `jupyterlab_markdown_switch_tab_scrolling_fix` (underscores)
- npm package: `jupyterlab_markdown_switch_tab_scrolling_fix` (underscores)
- Extension ID: `jupyterlab_markdown_switch_tab_scrolling_fix:plugin`

**Code Style**:

- TypeScript: Single quotes, no trailing commas, arrow functions preferred
- Interface naming: Must start with `I` followed by PascalCase
- Selector classes: lowercase with hyphens (kebab-case)

## Implementation Status

**Current State**: Skeleton extension created - activation hook exists but no functionality implemented yet

**Next Steps**: Implement scrolling fix logic for markdown preview rendering
