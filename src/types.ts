export type PluginConfig = ClientConfig & {
    /**
     * 是否需要确认（默认为 true）
     */
    needInquire?: boolean
    /**
     * 部署前是否删除整个远程路径，true则删除整个文件夹，false则只删除与打包文件名称重复的文件（默认为 false）
     */
    removeRemote?: boolean
    /**
     * 部署后是否删除本地文件（默认为 false）
     */
    removeLocal?: boolean
    /**
     * 项目文件夹根路径（绝对路径）
     */
    projectPath: string
    /**
     * 项目构建文件夹路径（从项目根目录开始，默认为 dist）
     */
    distPath: string
    /**
     * 服务器上传的完整路径
     */
    remotePath: string
    /**
     * 服务器预览地址，用于部署后提示访问
     */
    previewPath?: string
}

export interface ClientConfig {
    /**
     * SSH地址
     */
    host: string
    /**
     * SSH端口（默认为 22）
     */
    port?: number
    /**
     * SSH用户名
     */
    username: string
    /**
     * SSH密码
     */
    password: string
}
