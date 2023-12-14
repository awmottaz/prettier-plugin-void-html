## Setting up

1. Clone the repository
2. `cd prettier-plugin-void-html`
3. `npm install`

## Running tests

This project uses the native [Node.js test runner](https://nodejs.org/api/test.html) with [`node:assert`](https://nodejs.org/api/assert.html). Make sure you use a compatible version of Node.js in order to be able to run these.

## File structure

This is about as simple as it gets.

- `prettier-plugin-void-html.js` implements the plugin. See the [Prettier documentation for plugins](https://prettier.io/docs/en/plugins#developing-plugins).
- `test.js` contains the tests.

## Pull Requests

Please open a Pull Request to this repository to contribute your change.

## Changelog file

I keep a manual changelog file. After generating a release on GitHub, do the following:

1. `git checkout <release-tag>`
2. `git shortlog <prev-release>..<new-release>`
3. Copy into a new heading for the release, and clean up with relevant information. Group into "New features" and "Bugfix" sections.
4. Link the heading to the release on GitHub.
