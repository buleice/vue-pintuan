// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueViewload from 'vue-viewload'
Vue.use(VueViewload, {
    // defaultPic: 'http://img.zcool.cn/community/0161f656b0663e6ac7256cb052d31a.gif',
    // errorPic: 'http://a0.att.hudong.com/77/31/20300542906611142174319458811.jpg',
    threshold: -600,
    effectFadeIn: true,
    callback: function(ele, src) {
        // ele.style.border = '1px solid re';
        // console.log(ele.nodeName + '...' + src);
    }
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
