import { onDeploy } from '../index'
import type { ResolvedConfig } from 'vite'
import { VitePluginConfig } from './vite.types'

export default function AutoDeploy(config: VitePluginConfig) {
    let viteConfig: ResolvedConfig
    return {
        name: 'vite-plugin-ssh-deploy',
        apply: 'build',
        enforce: 'post',
        configResolved(resolvedConfig: ResolvedConfig) {
            viteConfig = resolvedConfig
        },
        async closeBundle() {
            config.projectPath = viteConfig.root
            config.distPath = viteConfig.build.outDir
            await onDeploy(config)
            // 解决部署完成后进程不退出的问题，如果有更好解决方案欢迎PR
            process.exit(0)
        }
    }
}
