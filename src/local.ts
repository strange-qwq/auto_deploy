import fs from 'fs'
import ora from 'ora'
import { fmtLocalPath } from './utils'

export default class LocalClient {
    root: string

    constructor(root: string) {
        this.root = root
    }

    readDir(dir: string) {
        return fs.readdirSync(fmtLocalPath(this.root, dir))
    }

    removeFile(fileName: string) {
        return new Promise((resolve: Function, reject: Function) => {
            const o = ora('removing local dist files...').start()
            const dir = fmtLocalPath(this.root, fileName)
            const func = fs.statSync(dir).isDirectory() ? fs.rmdir : fs.rm
            func(dir, { force: true, recursive: true }, (err) => {
                if (err) {
                    o.fail('remove local dist files failed')
                    console.log(err)
                    reject(err)
                } else {
                    o.stopAndPersist({
                        symbol: '🗑️',
                        text: 'remove local dist files successes'
                    })
                    resolve()
                }
            })
        })
    }

}
