import path from 'path'
import chalk from 'chalk'
import LocalClient from './local'
import RemoteClient from './remote'
import { normalizePath } from 'vite'
import { PluginConfig } from '../types'

/**
 * 部署主函数
 * @param config 配置
 */
export async function deploy(config: PluginConfig) {
    const {
        remotePath,
        previewPath,
        projectPath,
        distPath,
        removeLocal = false,
        removeRemote = false
    } = config
    const startTime = Date.now()
    const localClient = new LocalClient(projectPath)
    const remoteClient = new RemoteClient(projectPath, remotePath)
    try {
        await remoteClient.connect(config)
        if(removeRemote) {
            await remoteClient.remove(remotePath)
        } else {
            const filesInDist = localClient.readDir(distPath)
            await remoteClient.remove(filesInDist.join(' '))
        }
        await remoteClient.uploadDir(distPath)
        if(removeLocal) await localClient.removeFile(distPath)
        console.log(chalk.blue(`🚀 deploy over, all time：${Date.now() - startTime}ms`))
        if(previewPath) console.log('✨ preview url: ' + chalk.yellow(`${previewPath}`))
    } catch(err) {
        console.log(chalk.red('❌ deploy failed\n' + err))
    } finally {
        remoteClient.destroy()
    }
}

/**
 * 格式化本地路径
 */
export function fmtLocalPath(...args: string[]): string {
    return normalizePath(path.resolve(...args))
}

/**
 * 格式化远程路径
 */
export function fmtRemotePath(...args: string[]): string {
    return normalizePath(path.join(...args))
}
