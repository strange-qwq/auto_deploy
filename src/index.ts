import chalk from 'chalk'
import inquirer from 'inquirer'
import LocalClient from './local'
import RemoteClient from './remote'
import { PluginConfig } from './types'
import type { ResolvedConfig } from 'vite'

export default function AutoDeploy({
    host,
    port = 22,
    username,
    password,
    remotePath,
    previewPath,
    needInquire = true,
    removeLocal = false,
    removeRemote = false
}: PluginConfig) {
    let config: ResolvedConfig
    const onDeploy = async () => {
        const startTime = Date.now()
        const localClient = new LocalClient(config.root)
        const remoteClient = new RemoteClient(config.root, remotePath)
        try {
            await remoteClient.connect({host, port, username, password})
            if(removeRemote) {
                await remoteClient.remove(remotePath)
            } else {
                const filesInDist = localClient.readDir(config.build.outDir)
                await remoteClient.remove(filesInDist.join(' '))
            }
            await remoteClient.uploadDir(config.build.outDir)
            if(removeLocal) await localClient.removeFile(config.build.outDir)
            console.log(chalk.blue(`🚀 deploy over, all time：${Date.now() - startTime}ms`))
            if(previewPath) console.log('✨ preview url: ' + chalk.yellow(`${previewPath}`))
        } catch(err) {
            console.log(chalk.red('❌ deploy failed\n' + err))
        } finally {
            remoteClient.destroy()
            // 解决部署完成后进程不退出的问题，如果有更好解决方案欢迎PR
            process.exit(0)
        }
    }
    return {
        name: 'vite-plugin-ssh-deploy',
        apply: 'build',
        enforce: 'post',
        configResolved(resolvedConfig: ResolvedConfig) {
            config = resolvedConfig
        },
        async closeBundle() {
            if(needInquire) inquirer.prompt([{
                type: 'confirm', name: 'enable', message: 'deploy to the remote server now?', default: true
            }]).then(async(answers) => {
                if(answers.enable) await onDeploy()
            })
            else await onDeploy()
        }
    }
}
