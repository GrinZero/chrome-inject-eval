import resolvePlugin from "@rollup/plugin-node-resolve";
import babelPlugin from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import {terser} from "rollup-plugin-terser"

export default {
  input: "index.js",
  output: {
    file: "dist/umd.min.js",
    format: "umd",
    name: "evalCore",
  },
  plugins: [
    resolvePlugin(),
    commonjs(),
    babelPlugin({
      exclude: "node_modules/**",
      runtimeHelpers: true,
    }),
    terser()
  ],
};
