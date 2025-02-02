import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  {
    rules: {
    //'no-unused-vars': ['error', { args: 'none' }],
    // 'no-unused-vars': 'off',
    'no-unused-vars': 'warn',
    'no-debugger': 'off',  // Disable the 'no-debugger' rule if you want
  },
  },
];