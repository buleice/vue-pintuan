<template>
<div id="app">
  <transition :name="transitionName">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </transition>
  <ShopNavBar />
  <ScrollToTop />
  <WxShare />
</div>
</template>

<script>
import Router from 'vue-router';
import ShopNavBar from '../../components/base/shopnavbar.vue'
import WxShare from '../../components/base/wxshare.vue';
import ScrollToTop from '../../components/base/totop.vue'
export default {
  name: 'App',
  components: {
    ShopNavBar,
    WxShare,
    ScrollToTop
  },
  data(){
    return{
      transitionName: 'slide-left'  // 默认动态路由变化为slide-right
    }
  },
  watch: {
    '$route'(to, from) {
    }
  }
}
</script>

<style>
#app{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;color:#2c3e50}
*{margin:0;padding:0}
body{font:.88rem PingFang regular,arial,helvetica,sans-serif;color:#555}
body,button,dd,dl,fieldset,form,h1,h2,h3,h4,h5,h6,input,legend,ol,p,select,td,textarea,th,ul{margin:0;padding:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;text-size-adjust:none}
h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:400;line-height:100%}
table{font-size:inherit;font:100%}
input,select{font:100% arial,helvetica,clean,sans-serif;color:#555}
button{overflow:visible}
address,b,cite,em,th{font-style:normal;font-weight:400}
li{list-style:none}
fieldset,img{border:0}
ins{text-decoration:none}
body{padding-bottom:3.125rem}
a:-webkit-any-link{-webkit-tap-highlight-color:transparent;text-decoration:none;-webkit-touch-callout:none}

.slide-left-enter {
  transform: translateX(100%);
}
.slide-left-enter-active{
  transition: transform .3s;
}
.slide-left-enter-to{
  transform: translateX(0);
}
/* .slide-left-leave {
  transform: translateX(0);
}
.slide-left-leave-active {
  transition: transform .3s;
}
.slide-left-leave-to {
    transform: translateX(-100%);
} */
.slide-right-enter {
  transform: translateX(0);
}
.slide-right-enter-active{
  transition: transform .3s;
}
.slide-right-enter-to{
  transform: translateX(0);
}
.slide-right-leave {
  transform: translateX(0);
}
.slide-right-leave-active {
  transition: transform .3s;
}
.slide-right-leave-to {
  transform: translateX(100%);}

</style>
