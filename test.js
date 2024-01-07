import test from "node:test";
import assert from "node:assert";

const allPrettierVersions = await Promise.all([
  import("prettier-3.0.0"),
  import("prettier-3.0.1"),
  import("prettier-3.0.2"),
  import("prettier-3.0.3"),
  import("prettier-3.1.0"),
  import("prettier-3.1.1"),
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

  test(
    `Prettier version ${version}`,
    {
      only: version === "3.1.1",
    },
    async (t) => {
      t.runOnly(true);
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

      await t.test("preserve self-closing in SVG", { skip: true }, async () => {
        const formatted = await format(
          prettier.format,
          `<svg><circle cx="50" cy="50" r="50" /></svg>`,
        );
        assert.equal(
          formatted,
          `<svg><circle cx="50" cy="50" r="50" /></svg>\n`,
        );
      });

      await t.test(
        "preserve self-closing in MathML",
        { skip: true },
        async () => {
          const formatted = await format(
            prettier.format,
            `<math><mspace depth="40px" height="20px" width="100px" /></math>`,
          );
          assert.equal(
            formatted,
            `<math><mspace depth="40px" height="20px" width="100px" /></math>\n`,
          );
        },
      );

      await t.test("issue #10: duplicate closing bracket", (t) => {
        return Promise.all([
          t.test("<br>a", async () => {
            const formatted = await format(prettier.format, `<br>a`);
            // The bug is that it formatted to `<br>>a\n`.
            assert.equal(formatted, `<br>a\n`);
          }),
          t.test("<br><br>", async () => {
            const formatted = await format(prettier.format, `<br><br>`);
            // The bug is that it formatted to `<br>>a\n`.
            assert.equal(formatted, `<br><br>\n`);
          }),
          t.todo(
            "add some more edge cases here (other void elements, including attributes, etc.)",
          ),
        ]);
      });
    },
  );
});
