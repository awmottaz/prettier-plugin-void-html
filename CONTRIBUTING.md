Thank you for your interest in contributing to this project! Please note that I have limited time to
spend on maintaining this project, and so it might take me a while to review your contribution before
it is included in a release. This is not personal, and I appreciate your patience.

## Setting up

1. Clone the repository
2. `cd prettier-plugin-void-html`
3. `npm install`

## Running tests

This project uses the native [Node.js test runner](https://nodejs.org/api/test.html) with
[`node:assert`](https://nodejs.org/api/assert.html). Make sure you use a compatible version of
Node.js in order to be able to run these. The `devEngines` field in `package.json` will guide you.

The tests are all contained in the `test.js` file. Run them with `npm run test`.

## File structure

This is about as simple as it gets.

- `prettier-plugin-void-html.js` implements the plugin. See the [Prettier documentation for plugins](https://prettier.io/docs/en/plugins#developing-plugins).
- `test.js` contains the tests.

## Pull Requests

Please open a Pull Request to this repository to contribute your change. Make sure you lint and test
your changes first to ensure that the GitHub actions will succeed. This is required before I
consider merging in your changes.

```sh
npm run lint
npm run test
```

If there are extra notes you want to include in the Changelog beyond your commit message, please add
them to the `## Next` section in [`CHANGELOG.md`](./CHANGELOG.md).
