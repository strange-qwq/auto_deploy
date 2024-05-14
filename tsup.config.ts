import { defineConfig } from 'tsup'

export default defineConfig({
    dts: true,
    clean: true,
    splitting: true,
    format: ['cjs', 'esm'],
    entry: ['src/*.ts']
})
