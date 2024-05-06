import path from 'path'
import { normalizePath } from 'vite'

export function fmtLocalPath(...args: string[]): string {
    return normalizePath(path.resolve(...args))
}

export function fmtRemotePath(...args: string[]): string {
    return normalizePath(path.join(...args))
}
