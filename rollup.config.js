import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import pkg from "./package.json";

const extensions = [".ts", ".tsx", ".js", ".jsx"];

export default [
  {
    input: "src/index.ts",
    output: {
      name: "RemarkBilibili",
      file: pkg.browser,
      format: "umd",
      sourcemap: true
    },
    plugins: [
      babel({ extensions, exclude: "node_modules/**" }),
      resolve({ extensions }),
      commonjs(),
      terser()
    ]
  },
  {
    input: "src/index.ts",
    external: Object.keys(pkg.dependencies),
    plugins: [
      babel({ extensions, exclude: "node_modules/**" }),
      resolve({ extensions })
    ],
    output: [
      { file: pkg.main, format: "cjs", sourcemap: true },
      { file: pkg.module, format: "es", sourcemap: true }
    ]
  }
];
