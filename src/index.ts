import inquirer from 'inquirer'
import { deploy } from './utils/utils'
import { PluginConfig } from './types'

export async function onDeploy(config: PluginConfig) {
    if(config.needInquire) await inquirer.prompt([{
        type: 'confirm', name: 'enable', message: 'deploy to the remote server now?', default: true
    }]).then(async({ enable }) => {
        if(enable) await deploy(config)
    })
    else await deploy(config)
    console.log('[debug] deploy done!')
}
