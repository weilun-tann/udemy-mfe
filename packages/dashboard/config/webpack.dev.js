// Merge webpack.common.js with webpack.dev.js
const { merge } = require("webpack-merge");

// For enabling module federation (share modules with hosts)
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// For enabling shared modules for all `dependencies` in `package.json`
const deps = require("../package.json").dependencies;

const commonConfig = require("./webpack.common");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8083,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  // To make sure main.js is loaded from the correct domain
  output: {
    publicPath: "http://localhost:8083/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "dashboard", // module name used in <module>@... URI string
      filename: "remoteEntry.js", // tells hosts which files are exposed
      exposes: {
        "./DashboardApp": "./src/bootstrap", // exposed file aliases and local paths
      },
      shared: deps,
    }),
  ],
};

// Merge webpack.common.js with webpack.dev.js
module.exports = merge(commonConfig, devConfig);
