# prettier-plugin-void-html

This is a [Prettier plugin](https://prettier.io/docs/en/plugins) to format [void HTML elements](https://developer.mozilla.org/en-US/docs/Glossary/Void_element) using the void tag syntax instead of self-closing syntax. Additionally, if self-closing syntax is used on non-void elements, then it will be "unwrapped" so that both the opening and closing tags are present.

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

- `v3.0.0`
- `v3.0.1`
- `v3.0.2`
- `v3.0.3`
- `v3.1.0`

### Languages

- `html`

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
