import test from "node:test";
import assert from "node:assert";

const allPrettierVersions = await Promise.all([
  import("prettier-3.0.0"),
  import("prettier-3.0.1"),
  import("prettier-3.0.2"),
  import("prettier-3.0.3"),
  import("prettier-3.1.0"),
  import("prettier-3.1.1"),
  import("prettier-3.2.0"),
  import("prettier-3.2.1"),
  import("prettier-3.2.2"),
  import("prettier-3.2.3"),
  import("prettier-3.2.4"),
  import("prettier-3.2.5"),
  import("prettier-3.3.0"),
  import("prettier-3.3.1"),
  import("prettier-3.3.2"),
  import("prettier-3.3.3"),
  import("prettier-3.4.0"),
  import("prettier-3.4.1"),
  import("prettier-3.4.2"),
  import("prettier-3.5.0"),
  import("prettier-3.5.1"),
  import("prettier-3.5.2"),
  import("prettier-3.5.3"),
  import("prettier-3.6.0"),
  import("prettier-3.6.1"),
  import("prettier-3.6.2"),
  import("prettier-3.7.0"),
  import("prettier-3.7.1"),
  import("prettier-3.7.2"),
  import("prettier-3.7.3"),
  import("prettier-3.7.4"),
  import("prettier-3.8.0"),
  import("prettier-3.8.1"),
]);

/**
 * The list of all void elements can be found here:
 * https://developer.mozilla.org/en-US/docs/Glossary/Void_element
 *
 * Additionally, Prettier has some opaque logic to determine whether they will force a trailing line
 * break after printing each of these elements. The `hasTrailingNewline` values here were determined
 * experimentally.
 */
const allVoidElements = [
  { el: "area", hasTrailingNewline: false },
  { el: "base", hasTrailingNewline: false },
  { el: "br", hasTrailingNewline: false },
  { el: "col", hasTrailingNewline: true },
  { el: "embed", hasTrailingNewline: false },
  { el: "hr", hasTrailingNewline: true },
  { el: "img", hasTrailingNewline: false },
  { el: "input", hasTrailingNewline: false },
  { el: "link", hasTrailingNewline: false },
  { el: "meta", hasTrailingNewline: false },
  { el: "param", hasTrailingNewline: true },
  { el: "source", hasTrailingNewline: true },
  { el: "track", hasTrailingNewline: true },
  { el: "wbr", hasTrailingNewline: false },
];

for (const { default: prettier, version } of allPrettierVersions) {
  /**
   * Format using the current prettier formatter and the plugin.
   * @param {string} code
   * @returns {Promise<string>}
   */
  async function format(code) {
    // @ts-expect-error type union is too complex
    return prettier.format(code, {
      parser: "html",
      // @ts-expect-error type union is too complex
      plugins: ["./prettier-plugin-void-html.js"],
    });
  }

  void test(`Prettier version ${version}`, async (t) => {
    await t.test("preserve void syntax on all void elements", async () => {
      const results = await Promise.all(
        allVoidElements.map(({ el }) => format(`<${el}>`)),
      );
      results.forEach((formatted, index) => {
        assert.equal(formatted, `<${allVoidElements[index].el}>\n`);
      });
    });

    await t.test(
      "preserve void syntax on all void elements with following text",
      async () => {
        const results = await Promise.all(
          allVoidElements.map(({ el }) => format(`<${el}>text`)),
        );
        results.forEach((formatted, index) => {
          const { el, hasTrailingNewline } = allVoidElements[index];
          assert.equal(
            formatted,
            `<${el}>${hasTrailingNewline ? "\n" : ""}text\n`,
          );
        });
      },
    );

    await t.test(
      "preserve void syntax on all void elements with following inline element",
      async () => {
        const results = await Promise.all(
          allVoidElements.map(({ el }) => format(`<${el}><span></span>`)),
        );
        results.forEach((formatted, index) => {
          const { el, hasTrailingNewline } = allVoidElements[index];
          assert.equal(
            formatted,
            `<${el}>${hasTrailingNewline ? "\n" : ""}<span></span>\n`,
          );
        });
      },
    );

    await t.test(
      "preserve void syntax on all void elements with following block element",
      async () => {
        const results = await Promise.all(
          allVoidElements.map(({ el }) => format(`<${el}><div></div>`)),
        );
        results.forEach((formatted, index) => {
          const { el } = allVoidElements[index];
          assert.equal(formatted, `<${el}>\n<div></div>\n`);
        });
      },
    );

    await t.test(
      "preserve void syntax on all void elements with following void element",
      async () => {
        const results = await Promise.all(
          allVoidElements.map(({ el }) => format(`<${el}><br>`)),
        );
        results.forEach((formatted, index) => {
          const { el, hasTrailingNewline } = allVoidElements[index];
          assert.equal(
            formatted,
            `<${el}>${hasTrailingNewline ? "\n" : ""}<br>\n`,
          );
        });
      },
    );

    await t.test("avoid self-closing syntax on empty elements", async (t) => {
      await t.test("<div></div>", async () => {
        const formatted = await format(`<div></div>`);
        assert.equal(formatted, `<div></div>\n`);
      });
    });

    await t.test("Undo invalid self-closing syntax", async (t) => {
      await t.test("void elements", async () => {
        const results = await Promise.all(
          allVoidElements.map(({ el }) => format(`<${el} />`)),
        );
        results.forEach((formatted, index) => {
          const { el } = allVoidElements[index];
          assert.equal(formatted, `<${el}>\n`);
        });
      });

      await t.test("div", async () => {
        const formatted = await format(`<div />`);
        assert.equal(formatted, `<div></div>\n`);
      });
    });

    await t.test("preserve self-closing in SVG", async () => {
      const formatted = await format(
        `<svg><circle cx="50" cy="50" r="50" /></svg>`,
      );
      assert.equal(formatted, `<svg><circle cx="50" cy="50" r="50" /></svg>\n`);
    });

    await t.test("preserve self-closing in MathML", async () => {
      const formatted = await format(
        `<math><mspace depth="40px" height="20px" width="100px" /></math>`,
      );
      assert.equal(
        formatted,
        `<math><mspace depth="40px" height="20px" width="100px" /></math>\n`,
      );
    });
  });
}
