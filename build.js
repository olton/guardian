import {build, context} from "esbuild"
import progress from "@olton/esbuild-plugin-progress"
import { replace } from "esbuild-plugin-replace";
import pkg from "./package.json" with {type: "json"};

const version = pkg.version
const production = process.env.MODE === "production"

const banner = `
/*!
 * Guardian v${version}. Data guard and validation library.
 * Copyright ${new Date().getFullYear()} Serhii Pimenov
 * Licensed under MIT
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
    plugins: [
        progress(),
        replace({
            '__BUILD_TIME__': new Date().toLocaleString(),
            '__VERSION__': version,
        })
    ],
}

if (production) {
    await build({
        ...options,
        outfile: "./dist/guardian.js",
        format: "esm"
    })
} else {
    const ctxEsm = await context({
        ...options,
        outfile: "./dist/guardian.js",
        format: "esm"
    })
    
    await Promise.all([ctxEsm.watch(), ])
}

