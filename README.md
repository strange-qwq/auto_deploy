# English
### Automatically deploy to servers using SSH
The project uses `chalk` and `ora` to implement a console style consistent with `vite`.

At present, only the `vite` project is supported, and plans to support all node project types in the future.

## Install

```bash
npm install vite-plugin-better-deploy -D
```
or
```bash
pnpm install vite-plugin-better-deploy -D
```
or
```bash
yarn add vite-plugin-better-deploy -D
```

## Example
### vite.config.ts
```typescript
import AutoDeploy from 'vite-plugin-better-deploy'

export default {
    plugins: [
        AutoDeploy({
            host: '127.0.0.1',
            username: 'root',
            password: '123456',
            remotePath: '/www/wwwroot/example',
            previewPath: 'https://github.com/strange-qwq/auto_deploy',
        })
    ]
}
```

## Configuration
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

# 中文
### 使用SSH自动部署到服务器
项目采用 [chalk](https://github.com/chalk/chalk) 和`ora`实现与`vite`一致的控制台风格

目前仅支持vite项目，计划后续支持所有node项目类型，支持的配置项如下：

## 安装

```bash
npm install vite-plugin-better-deploy -D
```
或者
```bash
pnpm install vite-plugin-better-deploy -D
```
或者
```bash
yarn add vite-plugin-better-deploy -D
```

## 使用示例
### vite.config.ts
```typescript
import AutoDeploy from 'vite-plugin-better-deploy'

export default {
  plugins: [
    AutoDeploy({
      host: '127.0.0.1',
      username: 'root',
      password: '123456',
      remotePath: '/www/wwwroot/example',
      previewPath: 'https://github.com/strange-qwq/auto_deploy',
    })
  ]
}
```

## 配置项
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

# Special Thanks
- [vite-plugin-ssh-deploy](https://github.com/9romise/vite-plugin-ssh-deploy)
