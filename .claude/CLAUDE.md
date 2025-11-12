<!-- Import workspace-level CLAUDE.md configuration -->
<!-- See /home/lab/workspace/.claude/CLAUDE.md for complete rules -->

# Project-Specific Configuration

This file extends workspace-level configuration with project-specific rules.

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
