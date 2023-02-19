// Merge webpack.common.js with webpack.dev.js
const { merge } = require("webpack-merge");

// For enabling module federation (share modules with hosts)
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// For enabling shared modules for all `dependencies` in `package.json`
const deps = require("../package.json").dependencies;

// We will fill up `PRODUCTION_DOMAIN` in Github Actions
const PRODUCTION_DOMAIN = process.env.PRODUCTION_DOMAIN;

const commonConfig = require("./webpack.common");

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: `marketing@${PRODUCTION_DOMAIN}/marketing/remoteEntry.js`,
      },
      shared: deps,
    }),
  ],
};

// Merge webpack.common.js with webpack.prod.js
module.exports = merge(commonConfig, prodConfig);
