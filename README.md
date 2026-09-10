# prettier-plugin-void-html

## Notice of project status

_Updated on 10 Sep, 2026_

I am softening the "maintenance mode" status of this project that I have had in place for a while. To be clear, **I am not suddenly going to spend a bunch more time on this project.** Rather, I would like to affectionately dub this plugin "feature complete".

The goals of this plugin are modest: augment the Prettier formatter so that "self-closing" tag syntax (`/>`) is never emitted in HTML code. If the affected tag is a [void element](https://developer.mozilla.org/en-US/docs/Glossary/Void_element), then this will remove the slash character. If the affected element is not a void element, then its closing tag is inserted. [^1]

[^1]: I have seen some arguments that it should not behave this way since this changes the semantics of the document. I am considering adding a config option for this. If you're interested in this, please create a new issue to let me know.

To that end, this plugin is functionally complete. I will not add support for other HTML-like languages (Vue has been a common request), nor will I add new features (with the one caveat noted in the footnote). You are welcome to fork this project to add those things if you wish.

All that remains for this project is to keep fixing bugs and support new versions of Prettier as they're released. **I intend to do so indefinitely.**

Contrary to what I have previously said, I will not offer to transfer ownership of this repository to anyone. I will retain ownership [^2], and I will do my best to support it as my availability and energy allows.

[^2]: I am, however, [considering](https://github.com/awmottaz/prettier-plugin-void-html/issues/51) a migration away from GitHub as my values no longer align with the direction this platform seems to be moving.

I have been lucky to receive some high-quality contributions from strangers, whether that's giving detailed bug reports, fixing those bugs, or adding test coverage when new versions of Prettier are released. I am very thankful to those people! And please, keep them coming. This is what open source is all about, and your contributions help the thousands of projects (🤯) that download this plugin each month. Again, thank you.

_— 🫶 Tony_

## Package summary

This is a [Prettier plugin](https://prettier.io/docs/en/plugins) to format [void HTML elements](https://developer.mozilla.org/en-US/docs/Glossary/Void_element) using the void tag syntax instead of self-closing syntax. Additionally, if self-closing syntax is used on non-void elements, then they will be "unwrapped" so that both the opening and closing tags are present.

## Installation

This package is hosted on [NPM](https://www.npmjs.com/package/@awmottaz/prettier-plugin-void-html). Install with your package manager of choice. [NPMX](https://npmx.dev/package/@awmottaz/prettier-plugin-void-html) seems to provide instructions for a lot of them.

This package is usually installed as a dev dependency. It assumes a Node.js runtime, and as a plugin for Prettier it assumes that you have a supported version of `prettier` already installed.

```sh
npm install -D @awmottaz/prettier-plugin-void-html
```

Next, add the plugin to your [Prettier config file](https://prettier.io/docs/en/configuration).

```json
{
  "plugins": ["@awmottaz/prettier-plugin-void-html"]
}
```

## What this plugin does

With the plugin installed and active, Prettier will format your HTML source code with the following augmentations to Prettier's default formatting:

- Void elements are printed using a plain `>` symbol to close the tag
- Non-void elements, if authored with a self-closing tag `/>`, will be "unwrapped" so that the closing tag is explicitly included.

<!-- prettier-ignore-start -->
```html
<!-- original source -->
<meta charset="UTF-8">
<label for="my-input">Type something</label>
<input id="my-input" type="text" name="my-input">
<div />

<!-- Prettier's default formatting without this plugin -->
<meta charset="UTF-8" />
<label for="my-input">Type something</label>
<input id="my-input" type="text" name="my-input" />
<div />

<!-- Prettier's formatting with this plugin -->
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

This plugin supports the HTML language, only (the `"html"` [parser](https://prettier.io/docs/options#parser)).

Support for other languages such as Svelte or Vue requires using an entirely different parser and is outside the scope of this plugin.

If you want the features provided by this package in another language, I recommend submitting feedback to the other projects that handle formatting those languages.

### Void elements

https://developer.mozilla.org/en-US/docs/Glossary/Void_element

The following elements are recognized by this plugin as void elements:

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
