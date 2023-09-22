# prettier-plugin-void-html

This is a [Prettier plugin](https://prettier.io/docs/en/plugins) to format [void HTML elements](https://developer.mozilla.org/en-US/docs/Glossary/Void_element) using the void tag syntax instead of self-closing syntax.

## Usage

Install this package from NPM.

```sh
# npm
npm install -D @awmottaz/prettier-plugin-void-html

# yarn
yarn add -D @awmottaz/prettier-plugin-void-html
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
<input name="foobar">

<!-- Prettier default formatting -->
<input name="foobar" />

<!-- Prettier + this plugin -->
<input name="foobar">
```
<!-- prettier-ignore-end -->
