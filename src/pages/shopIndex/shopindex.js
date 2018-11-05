// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    preLoad: 1.3,
    error:'//udata.youban.com/webimg/wxyx/puintuan/default_img.jpg',
    loading:'//udata.youban.com/webimg/wxyx/puintuan/default_img.jpg',
    listenEvents: ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend', 'touchmove']

})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  //只有注册 才能够使用模板 app.vue文件
  components: { App }
})
