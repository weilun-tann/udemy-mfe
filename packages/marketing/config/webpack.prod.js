// Merge webpack.common.js with webpack.dev.js
const { merge } = require("webpack-merge");

// For enabling module federation (share modules with hosts)
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// For enabling shared modules for all `dependencies` in `package.json`
const deps = require("../package.json").dependencies;

const commonConfig = require("./webpack.common");

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",

    // Webpack will append this path segment when accessing css/js
    // E.g. <script src="/marketing/latest/main-dsandsjsa123.js"></script>
    // This is used when our files are uploaded to sub-directories during website hosting
    // E.g. in /marketing/latest on S3
    publicPath: "/marketing/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing", // module name used in <module>@... URI string
      filename: "remoteEntry.js", // tells hosts which files are exposed
      exposes: {
        "./MarketingApp": "./src/bootstrap", // exposed file aliases and local paths
      },
      shared: deps,
    }),
  ],
};

// Merge webpack.common.js with webpack.prod.js
module.exports = merge(commonConfig, prodConfig);
