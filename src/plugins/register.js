// import Vue from 'vue'

// eslint-disable-next-line no-undef
const requireComponent = require.context(
  './../components/public', // 需要读取模块的文件的所在目录
  false, // 是否遍历子目录
  /Base[A-Z]\w+.(vue)$/ // 匹配的规则
)

export default {
  install(Vue) {
    // 遍历匹配到的文件
    requireComponent.keys().forEach((fileName) => {
      // 获取组件配置
      const componentConfig = requireComponent(fileName)

      // 获取组件名
      const componentName = fileName.replace(/.\//, '').replace(/.vue/, '')

      // 注册组件
      Vue.component(componentName, componentConfig.default || componentConfig)
    })
  }
}
