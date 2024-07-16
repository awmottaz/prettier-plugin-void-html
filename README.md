# prettier-plugin-void-html

This is a [Prettier plugin](https://prettier.io/docs/en/plugins) to format [void HTML elements](https://developer.mozilla.org/en-US/docs/Glossary/Void_element) using the void tag syntax instead of self-closing syntax. Additionally, if self-closing syntax is used on non-void elements, then they will be "unwrapped" so that both the opening and closing tags are present.

## Usage

Install this package from NPM using your favorite package manager:

- [`npm`](https://docs.npmjs.com/cli/v10/configuring-npm/install)
  ```sh
  npm install -D @awmottaz/prettier-plugin-void-html
  ```
- [`yarn`](https://yarnpkg.com/getting-started/install)
  ```sh
  yarn add -D @awmottaz/prettier-plugin-void-html
  ```
- [`pnpm`](https://pnpm.io/installation)
  ```sh
  pnpm add -D @awmottaz/prettier-plugin-void-html
  ```

Add the plugin to your [Prettier config file](https://prettier.io/docs/en/configuration).

```json
{
  "plugins": ["@awmottaz/prettier-plugin-void-html"]
}
```

Then your HTML should format like so:

<!-- prettier-ignore-start -->
```html
<!-- source -->
<meta charset="UTF-8">
<label for="my-input">Type something</label>
<input id="my-input" type="text" name="my-input">
<div />

<!-- Prettier default formatting -->
<meta charset="UTF-8" />
<label for="my-input">Type something</label>
<input id="my-input" type="text" name="my-input" />
<div />

<!-- Prettier + this plugin -->
<meta charset="UTF-8">
<label for="my-input">Type something</label>
<input id="my-input" type="text" name="my-input">
<div></div>
```
<!-- prettier-ignore-end -->

## Compatibility

### Prettier

This package is tested against all versions of Prettier starting with v3.0.0 and up to the latest version at the time of publishing. See `test.js` for the exact versions that are tested and `CHANGELOG.md` for support by plugin version.

Note that the `peerDependencies` of this package allow installing newer _patch versions_ of Prettier that may not be included in this list. This is for pragmatic reasons so that you can upgrade patched releases of Prettier without waiting for this package to update.

However, please note this disclaimer from the [Prettier installation page](https://prettier.io/docs/en/install):

> Install an exact version of Prettier locally in your project. This makes sure that everyone in the project gets the exact same version of Prettier. Even a patch release of Prettier can result in slightly different formatting, so you wouldn’t want different team members using different versions and formatting each other’s changes back and forth.

**If you wish to use a version of Prettier that is not supported by this package**, then you will need to add an [`overrides` rule](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#overrides). For example, to use an older version of Prettier:

```json
{
  "overrides": {
    "@awmottaz/prettier-plugin-void-html": {
      "prettier": ">=2.8.8"
    }
  }
}
```

If you do this, please consider [contributing to prettier-plugin-void-html](./CONTRIBUTING.md) by adding tests for that version or [opening an issue](https://github.com/awmottaz/prettier-plugin-void-html/issues). I am happy to expand support, but I also need to be pragmatic of my time.

### Languages

This project currently supports HTML, only. Support for other languages such as Svelte or Vue requires using an entirely different parser and is currently outside the scope of this plugin.

If you want the features provided by this package in another language, I recommend submitting feedback to the other projects that handle formatting those languages.

### Void elements

https://developer.mozilla.org/en-US/docs/Glossary/Void_element

- `area`
- `base`
- `br`
- `col`
- `embed`
- `hr`
- `img`
- `input`
- `link`
- `meta`
- `param`
- `source`
- `track`
- `wbr`
