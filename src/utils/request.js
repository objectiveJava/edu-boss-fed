import axios from 'axios'

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
  return config
})

export default request
