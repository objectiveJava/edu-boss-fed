import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入element-UI
import ElementUI from 'element-ui'
// 引入 Element 的主题文件
// import 'element-ui/lib/theme-chalk/index.css'

// 引入全局样式
import './styles/index.scss'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
