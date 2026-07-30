// @ts-check

import js from "@eslint/js";
import ts from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig({
  files: ["**/*.{js,ts}"],
  extends: [js.configs.recommended, ts.configs.strictTypeChecked],
  languageOptions: {
    parserOptions: {
      projectService: true,
    },
  },
});
