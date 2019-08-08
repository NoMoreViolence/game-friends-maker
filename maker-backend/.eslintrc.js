module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module" // Allows for the use of imports
  },
  env: {
    browser: true,
    jasmine: true,
    jest: true,
    node: true,
    es6: true
  },
  rules: {
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-unused-variable": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "no-console": "off",
    "prettier/prettier": [
      "error",
      {
        bracketSpacing: true,
        singleQuote: true,
        trailingComma: "all",
        tabWidth: 2,
        printWidth: 120
      }
    ]
  },
  settings: {}
}
