import webpack from 'webpack'
import { onDeploy } from '../index'
import { WebpackPluginConfig } from './webpack.types'

export default class AutoDeploy {

    private readonly config: WebpackPluginConfig

    constructor(config: WebpackPluginConfig) {
        this.config = config;
    }

    apply(compiler: webpack.Compiler) {
        compiler.hooks.afterEmit.tapAsync('AutoDeploy', async(compilation, callback) => {
            this.config.projectPath = process.cwd()
            const outputPath = compilation.outputOptions.path
            if(!outputPath) {
                throw new Error('Upload failed: outputPath is null')
            }
            this.config.distPath = outputPath.replace(this.config.projectPath, '')
            console.log('绝对路径：', this.config.projectPath)
            console.log('相对路径：', this.config.distPath)
            await onDeploy(this.config)
            callback()
        })
    }

}
