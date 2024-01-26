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
]);

/**
 * @param {typeof allPrettierVersions[number]['format']} format
 * @param {string} code
 * @returns {Promise<string>}
 */
const format = async (format, code) => {
  // @ts-expect-error type union is too complex
  const output = await format(code, {
    parser: "html",
    plugins: ["./prettier-plugin-void-html.js"],
  });
  return output;
};

// https://developer.mozilla.org/en-US/docs/Glossary/Void_element
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

allPrettierVersions.forEach((dep) => {
  const { default: prettier, version } = dep;

  test(`Prettier version ${version}`, async (t) => {
    await t.test("preserve void syntax on all void elements", async (t) => {
      const results = await Promise.all(
        allVoidElements.map(({ el }) => format(prettier.format, `<${el}>`)),
      );
      results.forEach((formatted, index) => {
        assert.equal(formatted, `<${allVoidElements[index].el}>\n`);
      });
    });

    await t.test(
      "preserve void syntax on all void elements with following text",
      async () => {
        const results = await Promise.all(
          allVoidElements.map(({ el }) =>
            format(prettier.format, `<${el}>text`),
          ),
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
          allVoidElements.map(({ el }) =>
            format(prettier.format, `<${el}><span></span>`),
          ),
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
          allVoidElements.map(({ el }) =>
            format(prettier.format, `<${el}><div></div>`),
          ),
        );
        results.forEach((formatted, index) => {
          const { el } = allVoidElements[index];
          assert.equal(formatted, `<${el}>\n<div></div>\n`);
        });
      },
    );

    await t.test("avoid self-closing syntax on empty elements", async (t) => {
      await t.test("<div></div>", async () => {
        const formatted = await format(prettier.format, `<div></div>`);
        assert.equal(formatted, `<div></div>\n`);
      });
    });

    await t.test("Undo invalid self-closing syntax", async (t) => {
      await t.test("void elements", async () => {
        const results = await Promise.all(
          allVoidElements.map(({ el }) => format(prettier.format, `<${el} />`)),
        );
        results.forEach((formatted, index) => {
          const { el } = allVoidElements[index];
          assert.equal(formatted, `<${el}>\n`);
        });
      });

      await t.test("div", async () => {
        const formatted = await format(prettier.format, `<div />`);
        assert.equal(formatted, `<div></div>\n`);
      });
    });

    await t.test("preserve self-closing in SVG", async () => {
      const formatted = await format(
        prettier.format,
        `<svg><circle cx="50" cy="50" r="50" /></svg>`,
      );
      assert.equal(formatted, `<svg><circle cx="50" cy="50" r="50" /></svg>\n`);
    });

    await t.test("preserve self-closing in MathML", async () => {
      const formatted = await format(
        prettier.format,
        `<math><mspace depth="40px" height="20px" width="100px" /></math>`,
      );
      assert.equal(
        formatted,
        `<math><mspace depth="40px" height="20px" width="100px" /></math>\n`,
      );
    });
  });
});
