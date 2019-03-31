import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

const shouldMinify = !!process.env.MINIFY;

const extensions = [".ts", ".tsx", ".js", ".jsx"];

let plugins = [
  babel({
    extensions,
    exclude: "node_modules/**"
  }),
  resolve({
    extensions
  }),
  commonjs()
];

if (shouldMinify) {
  plugins = [...plugins, uglify()];
}

export default {
  input: "src/index.ts",
  output: {
    sourcemap: true
  },
  plugins
};
