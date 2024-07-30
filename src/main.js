import Vue from 'vue'
import App from './App.vue'
import store from './store'
import register from './plugins/register'
import './styles/style.scss'
import router from './router'
import ajax from './plugins/ajax.js'

Vue.config.productionTip = false

Vue.prototype.$ajax = ajax
Vue.prototype.$baseUrl = process.env.VUE_APP_SERVE // eslint-disable-line no-undef

import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
Vue.use(ViewUI)

Vue.use(register)

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
