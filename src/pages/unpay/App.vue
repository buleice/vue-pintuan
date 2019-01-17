<template>
  <div id="app">
    <RepeatPay></RepeatPay>
    <WxShare ></WxShare>
  </div>
</template>

<script>
  import WxShare from '../../components/base/wxshare.vue';
  import RepeatPay from '../../components/base/unpayorder';
  import {Request} from '../../api/request';
  export default {
    name: 'App',
    components:{
      WxShare,
      RepeatPay
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  *{margin:0;padding:0;-webkit-tap-highlight-color: rgba(0,0,0,0);
    outline: 0;}
  li{list-style:none}
  a:-webkit-any-link{-webkit-tap-highlight-color:transparent;-webkit-tap-highlight-color:transparent;text-decoration:none;-webkit-touch-callout:none;}

</style>
