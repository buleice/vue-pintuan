<template>
  <div id="app">
     <keep-alive :include="['Shop','usercenter']">
       <router-view></router-view>
     </keep-alive>
     <ShopNavBar/>
     <ScrollToTop/>
     <WxShare/>
  </div>
</template>

<script>
import ShopNavBar from '../../components/base/shopnavbar.vue'
import WxShare from '../../components/base/wxshare.vue';
import ScrollToTop from '../../components/base/totop.vue'
export default {
  name: 'App',
  components:{
    ShopNavBar,
    WxShare,
    ScrollToTop
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*{margin:0;padding:0}
	body{font:.88rem "PingFang regular",arial,helvetica,sans-serif;color:#555;}
	body,button,dd,dl,fieldset,form,h1,h2,h3,h4,h5,h6,input,legend,ol,p,select,td,textarea,th,ul{margin:0;padding:0;-webkit-text-size-adjust:none;-moz-text-size-adjust:none;-ms-text-size-adjust:none;text-size-adjust:none}
	h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:400;line-height:100%}
	table{font-size:inherit;font:100%}
	input,select{font:100% arial,helvetica,clean,sans-serif;color:#555}
	button{overflow:visible}
	address,b,cite,em,th{font-style:normal;font-weight:400}
	li{list-style:none}
	fieldset,img{border:0}
	ins{text-decoration:none}
	body{padding-bottom:3.125rem}
	a:-webkit-any-link{-webkit-tap-highlight-color:transparent;-webkit-tap-highlight-color:transparent;text-decoration:none;-webkit-touch-callout:none;}
</style>
