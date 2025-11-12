# Release Notes

## Version 1.0.4

Initial public release of JupyterLab extension that fixes markdown file scrolling issues when switching tabs.

**Features**:
- Scroll lock mechanism prevents uncontrolled viewport jumping when switching to markdown tabs with images
- Automatic detection of tab activation via ILabShell.currentChanged signal
- Image load event tracking ensures all images finish rendering before releasing scroll lock
- User scroll override - wheel and touch events immediately abort lock to preserve manual navigation
- Drift correction runs every 100ms with 1px threshold and 300ms stability requirement
- WeakMap-based guard management prevents duplicate locks on widget reactivation

**Technical Implementation**:
- TypeScript extension for JupyterLab 4.0+
- Hooks into Lumino widget lifecycle
- Passive event listeners for performance
- Maximum guard duration of 3 seconds

**Documentation**:
- Comprehensive README with problem statement and solution explanation
- Technical implementation details with API specifics
- GitHub Actions workflow with link checker configuration
