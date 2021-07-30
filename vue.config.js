const path = require('path')
// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/',//相对路径
  outputDir: 'dist',//构建输出目录
  assetsDir: 'assets',//静态资源目录(js,css,img,fonts)
  runtimeCompiler: true,
  chainWebpack: () => { },
  configureWebpack: () => { },
  devServer: {
    open: false,//使用npm run serve 之后是否自动在浏览器中打开项目
    host: 'localhost',//主机名字
    port: 8080,//端口号
    https: false,//true启动浏览器会给出一些警告
    hotOnly: false,//热更新 webpack已经有
    proxy: {
      // 配置跨域，请求后端接口
      '/api': {
        target: 'https://www.bilibili.com/index',
        // target: 'http://localhost:8081/api/video',//源地址
        changeOrigin: true,//是否允许跨域
        // ws: false,//是否代理websockets
        pathRewrite: {
          '^/api': ''
        }
      },
      '/xzz': {
        // target: 'http://www.bilibili.com/index',
        target: 'http://localhost:8081/api/video',//源地址
        changeOrigin: true,//是否允许跨域
        // ws: false,//是否代理websockets
        pathRewrite: {
          '^/xzz': ''
        }
      },
      '/hot': {
        target: 'https://s.search.bilibili.com/main',
        changeOrigin: true,
        pathRewrite: {
          '^/hot': ''
        }
      },
      '/bbsearch': {
        target: 'https://api.bilibili.com',
        changeOrigin: true,
        pathRewrite: {
          '^/bbsearch': ''
        }
      },
      '/defaultsearch': {
        target: 'http://api.bilibili.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/defaultsearch': ''
        }
      },

    },
    before: app => { }
  },
  //第三方插件配置
  pluginOptions: {},
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      scss: {
        /*sass-loader 8.0语法 */
        //prependData: '@import "~@/styles/variables.scss";',

        /*sass-loader 9.0写法，感谢github用户 shaonialife*/
        additionalData(content, loaderContext) {
          const { resourcePath, rootContext } = loaderContext
          const relativePath = path.relative(rootContext, resourcePath)
          if (
            relativePath.replace(/\\/g, '/') !== 'src/styles/variables.scss'
          ) {
            return '@import "~@/styles/variables.scss";' + content
          }
          return content
        },
      },
    },
  },
}
