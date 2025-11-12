# Release Process

This project uses `make publish` for releases, which handles version increment, build, and publishing to both npm and PyPI.

## Quick Release

```bash
make publish
```

This will:
- Increment patch version in `package.json`
- Build TypeScript and Python packages
- Publish to npm registry
- Publish to PyPI via twine

## Manual Steps

If you need more control over versioning:

```bash
# Edit version in package.json manually
# Then build and publish
make build
npm publish --access public
twine upload dist/*
```

## Tagging

After successful publish, tag the release:

```bash
git tag STABLE_<version>
git tag RELEASE_<version>
git push origin STABLE_<version> RELEASE_<version>
```
