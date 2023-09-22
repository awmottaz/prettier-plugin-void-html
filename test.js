import test from "node:test";
import assert from "node:assert";
import prettier from "prettier";

const format = async (code) => {
  const output = await prettier.format(code, {
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

test("preserve void syntax on all void elements", async () => {
  const results = await Promise.all(
    allVoidElements.map((el) => format(`<${el}>`)),
  );
  results.forEach((formatted, index) => {
    assert.equal(formatted, `<${allVoidElements[index]}>\n`);
  });
});

test("avoid self-closing syntax on empty elements", async (t) => {
  await t.test("<div></div>", async () => {
    const formatted = await format(`<div></div>`);
    assert.equal(formatted, `<div></div>\n`);
  });
});

test("Undo invalid self-closing syntax", async (t) => {
  await t.test("input", async () => {
    const formatted = await format(`<input name="test" />`);
    assert.equal(formatted, `<input name="test">\n`);
  });

  await t.test("div", async () => {
    const formatted = await format(`<div />`);
    assert.equal(formatted, `<div></div>\n`);
  });
});

test("preserve self-closing in SVG", async () => {
  const formatted = await format(
    `<svg><circle cx="50" cy="50" r="50" /></svg>`,
  );
  assert.equal(formatted, `<svg><circle cx="50" cy="50" r="50" /></svg>\n`);
});

test("preserve self-closing in MathML", async () => {
  const formatted = await format(
    `<math><mspace depth="40px" height="20px" width="100px" /></math>`,
  );
  assert.equal(
    formatted,
    `<math><mspace depth="40px" height="20px" width="100px" /></math>\n`,
  );
});
