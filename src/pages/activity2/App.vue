<template>
<div id="app">
    <router-view></router-view>
  <ul class="tabs">
    <li>
      <a href="/purchase/20190218?#/index">首页</a>
    </li>
    <li>
      <a href="/purchase/20190218?#/rules">活动规则</a>
    </li>
    <li>
      <router-link to="/activitylessons">马上参加</router-link>
    </li>
  </ul>
  <WxShare :WXSHDATA="shareData"></WxShare>
</div>
</template>

<script>
import WxShare from '../../components/base/wxshare.vue'
  export default {
    name: 'App',
    data(){
      return{
        shareData:{
          title: `小伴龙优学元宵节发红包啦！`,
          desc: '最高可领88.88元！快来看看吧~',
          link: 'http://test.wxyx.youban.com/purchase/20190218',
          imgUrl: 'https://udata.youban.com/webimg/wxyx/puintuan/common/20190101/shareicon.png',
          success: function() {
            new Request('/common/record.json?wxschool=20190218',"GET").returnJson()
          },
          cancel: function() {
            console.log("取消分享");
          }
        }
      }
    },
    created(){
    },
    components:{
      WxShare
    }
  }
</script>

<style lang="scss" scoped>

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #f4f0e2;
    width: 100%;
overflow: hidden;
    .tabs{
      position: fixed;
      display: flex;
      justify-content: center;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2.81rem;
      background: #E2200B;
      li{
        // float: left;
        list-style-type: none;
        width: 33.2%;
        text-align: center;
        line-height: 2.81rem;
        background: #E2200B;
        a{
          text-decoration: none;
          display: block;
          width: 100%;
          height: 100%;
          display: block;
          color: #FFEB92
        }
        .router-link-active {
            text-decoration: none;
          background: #FFEB92 url("../../assets/border.png");
          color: #E2200B;
          background-size: 100% 100%;
        }
        /*&:nth-child(2){*/
          /*border-right: 1px #ffb08d solid;*/
          /*border-left: 1px #ffb08d solid;*/
        /*}*/
      }
    }
  }
</style>
<style>
  a:-webkit-any-link{-webkit-tap-highlight-color:transparent;-webkit-tap-highlight-color:transparent;text-decoration:none;-webkit-touch-callout:none;}

</style>
