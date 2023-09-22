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

test("format void elements", async (t) => {
  await t.test("area", async () => {
    const formatted = await format(`<area>`);
    assert.equal(formatted, `<area>\n`);
  });

  await t.test("base", async () => {
    const formatted = await format(`<base>`);
    assert.equal(formatted, `<base>\n`);
  });

  await t.test("br", async () => {
    const formatted = await format(`<br>`);
    assert.equal(formatted, `<br>\n`);
  });

  await t.test("col", async () => {
    const formatted = await format(`<col>`);
    assert.equal(formatted, `<col>\n`);
  });

  await t.test("embed", async () => {
    const formatted = await format(`<embed>`);
    assert.equal(formatted, `<embed>\n`);
  });

  await t.test("hr", async () => {
    const formatted = await format(`<hr>`);
    assert.equal(formatted, `<hr>\n`);
  });

  await t.test("img", async () => {
    const formatted = await format(`<img>`);
    assert.equal(formatted, `<img>\n`);
  });

  await t.test("input", async () => {
    const formatted = await format(`<input>`);
    assert.equal(formatted, `<input>\n`);
  });

  await t.test("link", async () => {
    const formatted = await format(`<link>`);
    assert.equal(formatted, `<link>\n`);
  });

  await t.test("meta", async () => {
    const formatted = await format(`<meta>`);
    assert.equal(formatted, `<meta>\n`);
  });

  await t.test("param", async () => {
    const formatted = await format(`<param>`);
    assert.equal(formatted, `<param>\n`);
  });

  await t.test("source", async () => {
    const formatted = await format(`<source>`);
    assert.equal(formatted, `<source>\n`);
  });

  await t.test("track", async () => {
    const formatted = await format(`<track>`);
    assert.equal(formatted, `<track>\n`);
  });

  await t.test("wbr", async () => {
    const formatted = await format(`<wbr>`);
    assert.equal(formatted, `<wbr>\n`);
  });
});

test("avoid self-closing syntax on empty elements", async () => {
  const formatted = await format(`<div></div>`);
  assert.equal(formatted, `<div></div>\n`);
});

const formHtml = `<form action="/address">
  <div class="form-field">
    <label for="name">Your name</label>
    <input id="name" name="name" type="text">
  </div>
  <div class="form-field">
    <label for="street">Street address</label>
    <input id="street" name="street" type="text">
  </div>
  <div class="form-field">
    <label for="city">City</label>
    <input id="city" name="city" type="text">
  </div>
  <div class="form-field">
    <label for="state">State</label>
    <select id="state" name="state">
      <option value="T1">TEST</option>
      <option value="T2">TEST</option>
    </select>
  </div>
  <div class="form-field">
    <label for="zip">ZIP Code</label>
    <input
      id="zip"
      name="zip"
      type="text"
      pattern="\d{5}(-\d{4})?"
      title="Enter a 5-digit ZIP or 9-digit ZIP+4 with a dash before the last four, such as 12345-6789"
    >
  </div>
</form>
`;
test("format a form", async () => {
  const formatted = await format(formHtml);
  assert.equal(formatted, formHtml);
});
