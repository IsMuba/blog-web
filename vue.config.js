const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap: false, // 生产环境不生成 .map
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          rewriteUrls: 'all',
          math: 'always' // 就是这里设置math模式
        }
      },
      scss: {
        additionalData: `@use "@/styles/index.scss" as *;`
      }
    }
  },
  chainWebpack: (config) => {
    if (process.env.analyzer)
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },
  devServer: {
    client: {
      overlay: false
    },
    proxy: {
      '/webapi': {
        target: 'http://localhost:3080',
        changeOrigin: true
      }
    }
  }
})
