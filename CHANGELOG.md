## [v1.7.0](https://github.com/awmottaz/prettier-plugin-void-html/releases/tag/v1.7.0)

### Plugin changes

- Adds support for Prettier v3.4.0 and v3.4.1
  - [#25](https://github.com/awmottaz/prettier-plugin-void-html/pull/25) ([@rgant](https://github.com/rgant))

### Development changes

- Upgrades Node.js to v22 (LTS)
- Upgrades TypeScript to 5.7
- Upgrades ESLint to v9
- Simplifies tsconfig and ESLint config
- Adds a new `RELEASE.md` doc for my release procedures

Full diff here: [v1.6.1...v1.7.0](https://github.com/awmottaz/prettier-plugin-void-html/compare/v1.6.1...v1.7.0)

## [v1.6.1](https://github.com/awmottaz/prettier-plugin-void-html/releases/tag/v1.6.1)

This release fixes a bug where void tags could be printed with a duplicate closing bracket `>` under certain conditions. Big thanks to [@f11xter](https://github.com/f11xter) for figuring this out!

Original issue: [#10](https://github.com/awmottaz/prettier-plugin-void-html/issues/10)
PR to fix: [#14](https://github.com/awmottaz/prettier-plugin-void-html/pull/14)

Full diff here: [v1.6.0...v1.6.1](https://github.com/awmottaz/prettier-plugin-void-html/compare/v1.6.0...v1.6.1)

## [v1.6.0](https://github.com/awmottaz/prettier-plugin-void-html/releases/tag/v1.6.0)

This release adds support for all Prettier versions up to v3.3.3.

## [v1.5.0](https://github.com/awmottaz/prettier-plugin-void-html/releases/tag/v1.5.0)

This release adds support for Prettier v3.2.2.

This also relaxes the `peerDependencies` version range of Prettier so that you can upgrade patch versions without waiting for support from this package. See the `README` and [Pull Request](https://github.com/awmottaz/prettier-plugin-void-html/pull/13) for details.

## [v1.4.0](https://github.com/awmottaz/prettier-plugin-void-html/releases/tag/v1.4.0)

This release adds support for Prettier v3.2.1.

## [v1.3.0](https://github.com/awmottaz/prettier-plugin-void-html/releases/tag/v1.3.0)

This release adds support for Prettier v3.2.0.

Several internal changes were made for linting and testing the code.

## [v1.2.0](https://github.com/awmottaz/prettier-plugin-void-html/releases/tag/v1.2.0)

This release adds support for Prettier v3.1.1.

Some other documentation was updated as well:

- The `README` includes better installation instructions for different package managers
- A `CHANGELOG` was added

Version compatibilities were updated in package.json

- Compatibility with Prettier was updated to include v3.1.1
- `engines.node` is more permissive

https://github.com/awmottaz/prettier-plugin-void-html/compare/v1.1.0...v1.2.0

## [v1.1.0](https://github.com/awmottaz/prettier-plugin-void-html/releases/tag/v1.1.0)

This release adds explicit, fully tested support for Prettier v3.0.0–v3.1.0. We also added `html` as a VSCode language in the language settings of the plugin.

- Merge pull request #3 from awmottaz/support-prettier-versions 76e5012
- update readme docs 3d4b225
- add sample project to gitignore 998cf99
- add html as supported VSCode language ID d18d3d0
- test all prettier versions 3.0.0 -- 3.1.0 2b9573e

https://github.com/awmottaz/prettier-plugin-void-html/compare/v1.0.0...v1.1.0

## [v1.0.0](https://github.com/awmottaz/prettier-plugin-void-html/releases/tag/v1.0.0)

The initial release of `prettier-plugin-void-html` supports formatting void tags in HTML with the HTML5 void syntax.
