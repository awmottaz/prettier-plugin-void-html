import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { updatePrettier } from "./update-prettier.mjs";

const pkg = {
  devDependencies: {
    prettier: "3.9.6",
    "prettier-3.0.0": "npm:prettier@3.0.0",
    "prettier-3.9.6": "npm:prettier@3.9.6",
    typescript: "~6.0.3",
  },
  peerDependencies: { prettier: "3.0.0 - 3.9.x" },
};
const source = `import test from "node:test";

const allPrettierVersions = await Promise.all([
  import("prettier-3.0.0"),
  import("prettier-3.9.6"),
]);

// Keep the actual tests unchanged.
`;

test("adds missing patches and minors in numeric order, skipping prereleases and other majors", () => {
  const updated = updatePrettier(pkg, source, [
    "4.0.0",
    "3.11.0-beta.1",
    "3.10.0",
    "3.9.7",
    "2.8.8",
    "3.9.7",
  ]);
  const result = JSON.parse(updated.packageJson);
  assert.equal(result.devDependencies.prettier, "3.10.0");
  assert.equal(result.devDependencies.typescript, "~6.0.3");
  assert.equal(result.peerDependencies.prettier, "3.0.0 - 3.10.x");
  const aliases = Object.keys(result.devDependencies).filter((name) =>
    name.startsWith("prettier-"),
  );
  assert.deepEqual(aliases, [
    "prettier-3.0.0",
    "prettier-3.9.6",
    "prettier-3.9.7",
    "prettier-3.10.0",
  ]);
  for (const name of aliases) {
    assert.equal(result.devDependencies[name], `npm:prettier@${name.slice(9)}`);
    assert.ok(updated.testSource.includes(`import("${name}"),`));
  }
  assert.ok(updated.testSource.startsWith('import test from "node:test";'));
  assert.ok(
    updated.testSource.endsWith("// Keep the actual tests unchanged.\n"),
  );
  assert.equal(pkg.devDependencies.prettier, "3.9.6");
  assert.deepEqual(
    updatePrettier(result, updated.testSource, ["3.9.7", "3.10.0"]),
    updated,
  );
});

test("does not downgrade the formatter or shrink the peer range", () => {
  const updated = updatePrettier(pkg, source, ["3.0.0", "3.9.5"]);
  const result = JSON.parse(updated.packageJson);
  assert.equal(result.devDependencies.prettier, "3.9.6");
  assert.equal(result.peerDependencies.prettier, pkg.peerDependencies.prettier);
});

test("leaves the current repository unchanged when all versions are covered", () => {
  const packageSource = readFileSync(
    new URL("../../package.json", import.meta.url),
    "utf8",
  );
  const testSource = readFileSync(
    new URL("../../test.js", import.meta.url),
    "utf8",
  );
  const packageJson = JSON.parse(packageSource);
  const versions = Object.keys(packageJson.devDependencies)
    .filter((name) => /^prettier-\d+\.\d+\.\d+$/.test(name))
    .map((name) => name.slice(9));
  const updated = updatePrettier(packageJson, testSource, versions);
  assert.equal(updated.packageJson, packageSource);
  assert.equal(updated.testSource, testSource);
});

test("fails for empty registry results or a changed test layout", () => {
  assert.throws(() => updatePrettier(pkg, source, []), /no stable supported/);
  assert.throws(() => updatePrettier(pkg, "", ["3.10.0"]), /Prettier imports/);
});
