import axios from 'axios'
// 引入 Vuex 的数据
import store from '@/store'
// 通过局部引入方式引入 Element 的 Message 组件功能
import { Message } from 'element-ui'
// 引入 router
import router from '@/router'
// 引入 qs 用于进行请求参数处理
import qs from 'qs'

const request = axios.create({
  timeout: 2000
})

function getBaseURL (url) {
  if (url.startsWith('/boss')) {
    return 'http://eduboss/lagou.com'
  } else {
    return 'http://edufront.lagou.com'
  }
}

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 判断config.url的前缀，来进行请求baseUrl 的设置
  config.baseURL = getBaseURL(config.url)
  // 统一设置 Token 信息
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
})

function redirectLogin () {
  // 跳转到登录页
  router.push({
    name: 'login',
    query: {
      // currentRoute 就是存储了路由信息的对象
      redirect: router.currentRoute.fullPath
    }
  })
}

// 存储是否正在更新 Token 的状态
let isRefreshing = false
// 存储因为等待 Token 刷新而挂起的请求
let requests = []

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 状态码
  console.log('响应成功:', response)
  return response
}, function (error) {
  if (error.response) {
    const { status } = error.response
    let errorMessage = ''
    if (status === 400) {
      errorMessage = '请求参数错误'
    } else if (status === 401) {
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }
      // 检测是否已经存在了正在刷新 Token 的请求
      if (isRefreshing) {
        // 将当前失败的请求，存储到请求列表中
        return requests.push(() => {
          // 当前函数调用后，会自动发送本次失败的请求
          request(error.config)
        })
      }
      isRefreshing = true
      // 发送请求，获取新的 access_token
      return request({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: qs.stringify({
          refreshtoken: store.state.user.refresh_token
        })
      }).then(res => {
        // - 刷新 token 失败
        if (res.data.state !== 1) {
          // 清除无效的用户信息
          store.commit('setUser', null)
          redirectLogin()
          return Promise.reject(error)
        }
        // 刷新 token 成功
        //  - 存储新的 token
        store.commit('setUser', res.data.content)
        //  - 重新发送失败的请求（根据 requests 发送所有失败的请求）
        requests.forEach(callback => callback())
        //  - 发送完毕，清除 requests 内容即可
        requests = []
        //  - 将本次请求发送
        return request(error.config)
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        // 请求发送完毕，响应处理完毕，将刷新状态更改为 false 即可
        isRefreshing = false
      })
    } else if (status === 403) {
      errorMessage = '没有权限，请联系管理员'
    } else if (status === 404) {
      errorMessage = '请求资源不存在'
    } else if (status >= 500) {
      errorMessage = '服务端错误，请联系管理员'
    }
    Message.error(errorMessage)
  } else if (error.request) {
    // 请求发送成功，但是未收到响应
    Message.error('请求超时，请重试')
  } else {
    // 意料之外的错误
    Message.error(error.message)
  }
  // 将本次请求的错误对象继续向后抛出，让接收响应的处理函数进行操作
  return Promise.reject(error)
})

export default request
