// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
const bugsnag = require('bugsnag-js')
const bugsnagClient = bugsnag('a325ef302b363d86bcc9948c2901ac91')
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import store from '../../store'
Vue.use(VueResource);
const bugsnagVue = require('bugsnag-vue')
bugsnagClient.use(bugsnagVue(Vue))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  //只有注册 才能够使用模板 app.vue文件
  components: { App }
})
