# Changelog

This changelog is managed by hand. If you are contributing and want to add additional context or
notes beyond your commit message, please add them to the `## Next` section.

Prior to a new release, I will grab a list of all changes using this script:

```sh
git shortlog --format='%s %h' --no-merges vN.N.N..HEAD
```

And these details will be added to the Changelog for that version.

The contents of this Changelog are also included in the GitHub release.

## Next

#49
Keep the closing `>` on void elements nested in block parents such as `<head>`. Thanks to @ole for reporting this!

## [v2.2.1](https://github.com/awmottaz/prettier-plugin-void-html/compare/v2.2.0...v2.2.1)

### Notable changes

#46
Closes #30

Fixed a bug where void elements nested in other tags without whitespace characters surrounding the
void tag were printed with an extraneous self-closing tag. Thanks to @avicndugu for fixing this!

### All changes

@awmottaz:

- use npm install in GitHub actions 2685a76
- other fixes to GH actions 2644997
- upgrade np 55cad82

@avicndugu:

- Preserve void element syntax in nested inline contexts 4e10d4f
- Remove redundant test case 802638f
- rename variable to boolean with linting 233d6b2

## [v2.2.0](https://github.com/awmottaz/prettier-plugin-void-html/compare/v2.1.0...v2.2.0)

### Notable changes

- @rakleed: feat: add support for Prettier@3.9 f4abb1b

**Note to contributors:** I did some housekeeping to the tooling of this repository. If you are
grabbing a fresh clone of the repository, just running an `npm install` is sufficient. If you have
an existing checkout, please make sure you upgrade your local environment:

```sh
git pull
rm -rf node_modules
rm package-lock.json
npm install
# restart your editor to make sure the TypeScript and ESLint language servers are fresh
```

### All changes

@awmottaz:

- update changelog 386649b
- Merge pull request #48 from rakleed/feature/prettier-3.9-support b5cdd33
- update vscode settings c3fe70b
- stop tracking vscode settings ea3d4a1
- no more lockfile 755a5ec
- add support for node v26 0f601c1
- upgrade eslint to v10 94f91b6
- upgrade typescript, fix eslint config 410bce9
- upgrade np c9eedb1
- add devEngines ee1bf3a
- add engines config to package.json 7fe53af
- config npm to sign git tags 8a410ab
- update release process 7fb0346
- update the contributing guide daa0a19

@rakleed

- feat: add support for Prettier@3.9 f4abb1b

## [v2.1.0](https://github.com/awmottaz/prettier-plugin-void-html/compare/v2.0.0...v2.1.0)

### Notable changes

- add support for prettier v3.7.4-v3.8.1 66c8c9f

### All changes

- Merge pull request #45 from awmottaz/cleanup-and-np 78e9612
- remove release docs dcf4f33
- install np ced5beb
- vscode settings: use prettier as formatter a98a3a5
- upgrade default prettier dependency 64d2a8d
- Merge pull request #44 from bendera/43-add-missing-prettier-versions 618f830
- update lockfile 8cd9768
- add support for prettier v3.7.4-v3.8.1 66c8c9f
- Merge pull request #42 from awmottaz/release/v2.0.0 f354d3c
- update changelog a6cdf31

## [v2.0.0](https://github.com/awmottaz/prettier-plugin-void-html/releases/tag/v2.0.0)

This project is now in **maintenance mode**. Please see the README for further information.

## [v1.10.0](https://github.com/awmottaz/prettier-plugin-void-html/releases/tag/v1.10.0)

### What's Changed

- update year in license by @awmottaz in https://github.com/awmottaz/prettier-plugin-void-html/pull/38
- Add Prettier 3.7 support by @rakleed in https://github.com/awmottaz/prettier-plugin-void-html/pull/40

### New Contributors

- @rakleed made their first contribution in https://github.com/awmottaz/prettier-plugin-void-html/pull/40

**Full Changelog**: https://github.com/awmottaz/prettier-plugin-void-html/compare/v1.9.0...v1.10.0

## [v1.9.0](https://github.com/awmottaz/prettier-plugin-void-html/releases/tag/v1.9.0)

- Add support for Prettier 3.5.1, 3.5.2, 3.5.3, and 3.6.0 by @bendera in https://github.com/awmottaz/prettier-plugin-void-html/pull/36
- Add support for Prettier 3.6.1

**Full Changelog**: https://github.com/awmottaz/prettier-plugin-void-html/compare/v1.8.0...v1.9.0

## [v1.8.0](https://github.com/awmottaz/prettier-plugin-void-html/releases/tag/v1.8.0)

- add support for prettier v3.4.2 and v3.5.0 by @awmottaz in https://github.com/awmottaz/prettier-plugin-void-html/pull/31

**Full Changelog**: https://github.com/awmottaz/prettier-plugin-void-html/compare/v1.7.0...v1.8.0

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
