// eslint.config.js
const config = (async () => {
  const react = await import("eslint-plugin-react");
  const reactNative = await import("eslint-plugin-react-native");
  const babelParser = await import("@babel/eslint-parser");

  return [
    {
      files: ["**/*.{js,jsx}", "App.js"],
      languageOptions: {
        parser: babelParser,
        parserOptions: {
          requireConfigFile: false,
          ecmaVersion: 2021,
          sourceType: "module",
          ecmaFeatures: {
            jsx: true,
          },
        },
        globals: {
          window: "readonly",
          document: "readonly",
          navigator: "readonly",
          __DEV__: "readonly",
          fetch: "readonly",
        },
      },
      plugins: {
        react: react.default,
        "react-native": reactNative.default,
      },
      settings: {
        react: {
          version: "detect",
        },
      },
      rules: {
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
      },
    },
  ];
})();

export default config;
