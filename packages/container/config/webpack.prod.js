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

    // Webpack will append this path segment when accessing css/js
    // E.g. <script src="/container/latest/main-dsandsjsa123.js"></script>
    // This is used when our files are uploaded to sub-directories during website hosting
    // E.g. in /container/latest on S3
    publicPath: "/container/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: `marketing@${PRODUCTION_DOMAIN}/marketing/latest/remoteEntry.js`,
      },
      shared: deps,
    }),
  ],
};

// Merge webpack.common.js with webpack.prod.js
module.exports = merge(commonConfig, prodConfig);
