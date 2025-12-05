# prettier-plugin-void-html

> [!WARNING]
> **Notice of maintenance mode**
>
> Now that [Biome](https://biomejs.dev) has support for [HTML](https://biomejs.dev/internals/language-support/) — and they properly handle void elements — I no longer have a personal interest in developing this plugin. However, I also recognize that this plugin has gained some amount of popularity, and that suddenly abandoning this project would be an unwelcome surprise to downstream projects that depend on it.
>
> With that said, this is my plan for the remainder of this repository's lifetime:
>
> 1. I will not spend any additional effort to fix any [current](https://github.com/awmottaz/prettier-plugin-void-html/issues/30) or future bugs.
> 2. I will not support future versions of Prettier other than adding test coverage and updating the `peerDependencies` version range to ensure new versions of Prettier do not break this plugin. If they do break it... well, then it's broken.
> 3. I will continue to review and merge Pull Requests that fix bugs.
> 4. I will not add any new features, such as support for HTML-like languages or super-languages.
>
> If you wish to assume ownership of this repository and take over maintenance, please contact me and I will gladly hand it over.

## Using Biome to format HTML

[Biome](https://biomejs.dev) has excellent support for HTML (and [super-languages like Svelte, Astro, and Vue](https://biomejs.dev/internals/language-support/#html-super-languages-support), which has been a popular feature request of this package).

If you want to migrate wholesale from Prettier to Biome, I recommend following [their guide to do that here](https://biomejs.dev/guides/migrate-eslint-prettier/#migrate-from-prettier).

If you want to use Biome _only for HTML_ and continue using Prettier for everything else, here is what you need to do:

First, disable Prettier from formatting HTML files by updating your `.prettierignore`:

```
*.html
```

Next, follow the [getting started guide from Biome](https://biomejs.dev/guides/getting-started/) to install it and set up a basic configuration file.

Then, update the following [configurations](https://biomejs.dev/reference/configuration) to disable Biome for all but formatting HTML:

- Set `linter.enabled` to `false`
- Set `assist.enabled` to `false`
- Set `formatter.enabled` to `false`
- Set `html.formatter.enabled` to `true`

<details><summary>Your configuration might look like this</summary>

```json
{
  "$schema": "https://biomejs.dev/schemas/2.3.8/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "ignoreUnknown": false
  },
  "formatter": {
    "enabled": false
  },
  "linter": {
    "enabled": false
  },
  "assist": {
    "enabled": false
  },
  "html": {
    "formatter": {
      "enabled": true
    }
  }
}
```

</details>

This is the minimum to get HTML file formatted with Biome. But you may be interested in enabling more features from Biome such as linting and the "assist" features — please refer to their docs for more details.

As of right now, Biome does not support Markdown. So if you're relying on Prettier to format HTML snippets within Markdown files, then Biome will not help. Sorry about that.

## Package summary

This is a [Prettier plugin](https://prettier.io/docs/en/plugins) to format [void HTML elements](https://developer.mozilla.org/en-US/docs/Glossary/Void_element) using the void tag syntax instead of self-closing syntax. Additionally, if self-closing syntax is used on non-void elements, then they will be "unwrapped" so that both the opening and closing tags are present.

## Usage

> [!WARNING]
>
> See the notice above. I highly recommend _not_ adding this plugin to a new project and using Biome instead.

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
