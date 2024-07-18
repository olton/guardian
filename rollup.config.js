import pkg from './package.json' assert { type: 'json' };
import { fileURLToPath } from 'url';
import path from 'path';
import terser from '@rollup/plugin-terser'
import {nodeResolve} from '@rollup/plugin-node-resolve'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const production = (process.env.MODE === 'production');
const sourcemap = !production

const banner = `
/*!
 * Guardian v${pkg.version}
 * Data guard and validation library
 * Copyright ${new Date().getFullYear()} Serhii Pimenov
 * Licensed under MIT
 *
 * Build time: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
 */
`

export default [
    {
        input: './src/index.js',
        watch: {
            clearScreen: false
        },
        plugins: [
            nodeResolve()
        ],
        output: [
            {
                file: './lib/guardian.js',
                format: 'iife',
                sourcemap,
                banner,
                name: 'Guard',
                plugins: [
                    terser({
                        keep_classnames: true,
                        keep_fnames: true,
                    })
                ]
            },
        ]
    },
]