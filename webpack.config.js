const path = require("path")
const webpack = require("webpack")
const camelCase = require("camel-case")
const pkg = require("./package.json")

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    library: camelCase(pkg.name),
    libraryTarget: "umd2",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: __dirname + "/node_modules",
      },
    ],
  },
  plugins: [],
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom",
      root: "ReactDOM",
    },
    "react-dom/server": {
      commonjs: "react-dom/server",
      commonjs2: "react-dom/server",
      amd: "react-dom/server",
      root: "ReactDOMServer",
    },
    "prop-types": {
      commonjs: "prop-types",
      commonjs2: "prop-types",
      amd: "prop-types",
      root: "PropTypes",
    },
  },
}
