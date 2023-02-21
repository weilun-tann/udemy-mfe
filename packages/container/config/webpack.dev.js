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
    port: 8080,
    historyApiFallback: true,
  },
  // To make sure main.js is loaded from the correct domain
  output: {
    publicPath: "http://localhost:8080/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
        auth: "auth@http://localhost:8082/remoteEntry.js",
      },
      shared: deps,
    }),
  ],
};

// Merge webpack.common.js with webpack.dev.js
module.exports = merge(commonConfig, devConfig);
