import {build} from "esbuild"
import progress from "@olton/esbuild-plugin-progress"
import { replace } from "esbuild-plugin-replace";
import pkg from "./package.json" assert {type: "json"};

const version = pkg.version
const production = process.env.MODE === "production"

const banner = `
/*!
 * Guardian v${version}
 * Data guard and validation library
 * Copyright ${new Date().getFullYear()} Serhii Pimenov
 * Licensed under MIT
 *
 * Build time: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
 */
`

const options = {
    entryPoints: ["./src/index.js"],
    bundle: true,
    minify: production,
    sourcemap: !production,
    target: ["es2015"],
    banner: {
        js: banner
    },
}

await build({
    ...options,
    outfile: "./dist/guardian.mjs",
    plugins: [
        progress(),
        replace({
            '__BUILD_TIME__': new Date().toLocaleString(),
            '__VERSION__': version,
        })
    ],
    format: "esm"
})

await build({
    ...options,
    outfile: "./dist/guardian.cjs",
    plugins: [
        progress(),
        replace({
            '__BUILD_TIME__': new Date().toLocaleString(),
            '__VERSION__': version,
        })
    ],
    format: "cjs"
})

await build({
    ...options,
    outfile: "./lib/guardian.js",
    plugins: [
        progress(),
        replace({
            '__BUILD_TIME__': new Date().toLocaleString(),
            '__VERSION__': version,
        })
    ],
    format: "iife",
    globalName: "G"
})
