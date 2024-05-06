# 中文
### 使用SSH自动部署到服务器
### 目前仅支持vite项目，计划后续支持所有node项目类型

目前支持的配置项如下：
```
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
```

# English
### Automatically deploy to servers using SSH
### Currently only supporting vite projects, plans to support all node project types in the future

The currently supported configuration items are as follows:
```
export type PluginConfig = ClientConfig & {
    /**
     * Do you need to confirm (default to true)
     */
    needInquire?: boolean
    /**
     * Do you want to delete the entire remote path before deployment? If true, delete the entire folder. If false, only delete files with duplicate packaging file names (default to false)
     */
    removeRemote?: boolean
    /**
     * Delete local files after deployment (default to false)
     */
    removeLocal?: boolean
    /**
     * The complete path uploaded by the server
     */
    remotePath: string
    /**
     * Server preview address, used to prompt access after deployment
     */
    previewPath?: string
}

export interface ClientConfig {
    /**
     * SSH address
     */
    host: string
    /**
     * SSH port (default to 22)
     */
    port?: number
    /**
     * SSH username
     */
    username: string
    /**
     * SSH password
     */
    password: string
}
```
