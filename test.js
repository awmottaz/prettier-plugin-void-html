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
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
];

allPrettierVersions.forEach((dep) => {
  const { default: prettier, version } = dep;

  test(`Prettier version ${version}`, async (t) => {
    await t.test("preserve void syntax on all void elements", async () => {
      const results = await Promise.all(
        allVoidElements.map((el) => format(prettier.format, `<${el}>`)),
      );
      results.forEach((formatted, index) => {
        assert.equal(formatted, `<${allVoidElements[index]}>\n`);
      });
    });

    await t.test("avoid self-closing syntax on empty elements", async (t) => {
      await t.test("<div></div>", async () => {
        const formatted = await format(prettier.format, `<div></div>`);
        assert.equal(formatted, `<div></div>\n`);
      });
    });

    await t.test("Undo invalid self-closing syntax", async (t) => {
      await t.test("input", async () => {
        const formatted = await format(
          prettier.format,
          `<input name="test" />`,
        );
        assert.equal(formatted, `<input name="test">\n`);
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
