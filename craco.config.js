const { CracoAliasPlugin } = require("react-app-alias");

const options = {};

module.exports = {
  devServer: {
    port: 3005,
  },
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {
        source: "tsconfig",
        baseUrl: ".",
        tsConfigPath: "./tsconfig.paths.json",
      },
    },
  ],
};
