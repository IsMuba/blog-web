import axios from 'axios'
// import { ElNotification } from 'element-plus'

// 统一接口前缀
const ApiPrefix = '/webapi' //process.env.VUE_APP_BASE_API

// 创建axios实例
const service = axios.create({
  // baseURL: '',
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    config.url = ApiPrefix + config.url

    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    const { authorization } = response.headers
    authorization && localStorage.setItem('token', authorization)

    if (res.code === 8302) {
      localStorage.removeItem('token')
      window.location.href = '#/login'
      // ElNotification({
      //   type: 'error',
      //   title: '提示',
      //   message: '登录失效，请重新登录'
      // })
      alert('登录失效，请重新登录')
      return
    }

    if (res.code !== 8200) {
      // ElNotification({
      //   type: 'error',
      //   title: '提示',
      //   message: res.message || '请求失败'
      // })
      alert(res.message || '请求失败')
      return Promise.reject('error')
    }

    return res.data
  },
  (error) => {
    const { status } = error.response

    if (status === 404) {
      // ElNotification({
      //   type: 'error',
      //   title: '提示',
      //   message: '404，接口不存在'
      // })
      alert('404，接口不存在')
      return Promise.reject(error)
    }

    // ElNotification({
    //   type: 'error',
    //   message: '服务器错误'
    // })
    alert('服务器错误')
    return Promise.reject(error)
  }
)

export default service
