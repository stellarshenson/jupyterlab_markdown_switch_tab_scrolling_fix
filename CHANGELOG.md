# Changelog

<!-- <START NEW CHANGELOG ENTRY> -->

## 1.0.5

- Comment out debug console.log statements for production
- Add DEBUG_PREFIX constant for identifiable debug output when re-enabled
- Add check_release job to CI with RH_SINCE_LAST_STABLE configuration
- Skip build-changelog step for direct-commit workflow

<!-- <END NEW CHANGELOG ENTRY> -->

## 1.0.2

- Initial public release
- Implement scroll lock mechanism for markdown tab switching with images
- Add ILabShell.currentChanged signal handler for tab activation detection
- Track image load events and prevent scroll drift during rendering
- Add user scroll override with wheel/touch detection
- Configure link checker to ignore badge URLs in GitHub Actions
