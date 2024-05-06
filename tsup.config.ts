import { defineConfig } from 'tsup'

export default defineConfig({
    dts: true,
    clean: true,
    minify: true,
    format: ['cjs', 'esm'],
    entry: ['src/index.ts']
})
