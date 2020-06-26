### 使用
npm start 运行开发环境
npm build 打包生产环境
npm serve 在本地运行打包后的项目

### 注意事项
1. 必须修改build/config下的root字段为当前view下的工作目录
2. 不要使用es6模块,因为babel会将ES6模块语法转换为另一种模块类型"amd" | "umd" | "systemjs" | "commonjs" | false， 默认为 "commonjs".
3. es6新增api请不要使用,因为babel没有做相关配置
4. 不需要ftp部署请移除deploy任务,若gulp-sftp有误请替换为gulp-ftp试试