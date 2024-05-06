import fs from 'fs'
import ora from 'ora'
import path from 'path'
import chalk from 'chalk'
import { NodeSSH } from 'node-ssh'
import { ClientConfig } from './types'
import { fmtLocalPath, fmtRemotePath } from './utils'

export default class RemoteClient {

    conn: NodeSSH

    localRoot: string

    remoteRoot: string

    private _progress: number = 0

    private _progressTotal: number = 0

    private _spinner: any = null

    constructor(localRoot: string, remoteRoot: string) {
        this.conn = new NodeSSH()
        this.localRoot = localRoot
        this.remoteRoot = remoteRoot
    }

    async connect({host, port, username, password}: ClientConfig) {
        await this.conn.connect({host, port, username, password})
        console.log(chalk.green(`🔗 connect to ${host} success!`))
    }

    async remove(fileName?: string) {
        this._spinner = ora(fileName ? 'removing remote old files...' : 'removing all remote old files...').start()
        return this.conn.execCommand(
            fileName ? `cd ${this.remoteRoot} && rm -rfv ${fileName}` : `rm -rfv ${this.remoteRoot} && mkdir ${this.remoteRoot}`
        ).then(() => {
            this._spinner.stopAndPersist({
                symbol: '🗑️',
                text: fileName ? 'remove remote old files successes' : 'remove all remote old files successes'
            })
        })
    }

    async uploadDir(localPath = '', remotePath = '') {
        this._spinner = ora(`🚀 uploading...`).start()
        const upLocalPath = fmtLocalPath(this.localRoot, localPath)
        const upRemotePath = fmtRemotePath(this.remoteRoot, remotePath)
        return new Promise((resolve: Function, reject: Function) => {
            if (fs.existsSync(upLocalPath)) {
                this._setPathFileLength(upLocalPath)
                const stats = fs.statSync(upLocalPath)
                if (stats.isDirectory()) {
                    this.conn.putDirectory(
                        upLocalPath,
                        upRemotePath,
                        {
                            recursive: true,
                            concurrency: 5,
                            tick: (localFile, remoteFile, error) => {
                                if(error) console.log(`❌ upload error: ${error}`)
                                this._spinner.text = `🚀 deploying...<${++this._progress}/${this._progressTotal}>`
                            }
                        }
                    ).then(() => {
                        this._spinner.stopAndPersist({
                            symbol: '⭐ ',
                            text: 'upload successes'
                        })
                        resolve()
                    }).catch((err) => {
                        this._spinner.fail(`upload error: ${err}`)
                        reject(err)
                    })
                } else reject(new Error(`${localPath} is not a directory`))
            } else reject(new Error(`no such directory: ${localPath}`))
        })
    }

    destroy() {
        this.conn.dispose()
    }

    private async _setPathFileLength(localPath: string) {
        this._progress = 0
        const folders = fs.readdirSync(localPath)
        folders.forEach((folderName: any) => {
            const folderOrFilePath = path.join(localPath, folderName);
            const stats = fs.statSync(folderOrFilePath);
            if (stats.isDirectory()) {
                this._setPathFileLength(folderOrFilePath);
            } else {
                this._spinner.text = `🚀 uploading...<0/${++this._progressTotal}>`
            }
        })
    }

}
