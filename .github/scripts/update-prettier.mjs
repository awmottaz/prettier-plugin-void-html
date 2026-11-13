import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const stableVersion = /^\d+\.\d+\.\d+$/;
const aliasName = /^prettier-(\d+\.\d+\.\d+)$/;

function compareVersions(a, b) {
  const left = a.split(".").map(Number);
  const right = b.split(".").map(Number);
  return left[0] - right[0] || left[1] - right[1] || left[2] - right[2];
}

export function updatePrettier(packageJson, testSource, publishedVersions) {
  const pkg = structuredClone(packageJson);
  const current = pkg.devDependencies.prettier;
  const peerRange = pkg.peerDependencies.prettier.match(
    /^(\d+\.\d+\.\d+) - (\d+)\.(\d+)\.x$/,
  );
  if (!stableVersion.test(current) || !peerRange) {
    throw new Error(
      "Expected an exact Prettier version and a bounded peer range",
    );
  }

  const major = current.split(".")[0];
  const supportedVersions = publishedVersions.filter(
    (version) =>
      stableVersion.test(version) &&
      version.split(".")[0] === major &&
      compareVersions(version, peerRange[1]) >= 0,
  );
  if (supportedVersions.length === 0) {
    throw new Error(
      "The registry returned no stable supported Prettier versions",
    );
  }

  const existingAliases = Object.keys(pkg.devDependencies).filter((name) =>
    aliasName.test(name),
  );
  const versions = [
    ...new Set([
      ...supportedVersions,
      ...existingAliases.map((name) => name.slice("prettier-".length)),
      current,
    ]),
  ].sort(compareVersions);
  const latest = versions.at(-1);
  const latestMinor = latest.split(".").slice(0, 2).join(".");

  // Preserve every historical alias; each one is a separate compatibility test.
  pkg.devDependencies.prettier = latest;
  pkg.devDependencies = Object.fromEntries(
    [
      ...Object.entries(pkg.devDependencies).filter(
        ([name]) => !aliasName.test(name),
      ),
      ...versions.map((version) => [
        `prettier-${version}`,
        `npm:prettier@${version}`,
      ]),
    ].sort(([a], [b]) => a.localeCompare(b, "en", { numeric: true })),
  );
  if (
    compareVersions(`${latestMinor}.0`, `${peerRange[2]}.${peerRange[3]}.0`) > 0
  ) {
    pkg.peerDependencies.prettier = `${peerRange[1]} - ${latestMinor}.x`;
  }

  const imports = `const allPrettierVersions = await Promise.all([\n${versions
    .map((version) => `  import("prettier-${version}"),`)
    .join("\n")}\n]);`;
  const importBlock =
    /const allPrettierVersions = await Promise\.all\(\[[\s\S]*?\n\]\);/;
  if (!importBlock.test(testSource)) {
    throw new Error("Could not find the Prettier imports in test.js");
  }

  return {
    packageJson: `${JSON.stringify(pkg, null, 2)}\n`,
    testSource: testSource.replace(importBlock, () => imports),
  };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const packagePath = new URL("../../package.json", import.meta.url);
  const testPath = new URL("../../test.js", import.meta.url);
  const publishedVersions = JSON.parse(
    execFileSync("npm", ["view", "prettier", "versions", "--json"], {
      encoding: "utf8",
      timeout: 60_000,
    }),
  );
  const updated = updatePrettier(
    JSON.parse(readFileSync(packagePath, "utf8")),
    readFileSync(testPath, "utf8"),
    publishedVersions,
  );
  writeFileSync(packagePath, updated.packageJson);
  writeFileSync(testPath, updated.testSource);
}
