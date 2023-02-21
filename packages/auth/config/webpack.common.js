// For serving static assets (e.g. CSS/JSS) that get random
// names that we cannot directly add in a HTML <link> or <script> tag
// Helps us dynamically inject these into our specified HTML template file
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  module: {
    // Tells Babel (transpiles ES2015, 16, ... to browser-compatible ES5)
    // which files to transpile
    rules: [
      {
        test: /\.m?js$/, // all .js or .mjs files in root folder
        exclude: /node_modules/, // except node_modules
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
