<template>
<div id="app">
    <router-view></router-view>
  <ul class="tabs">
    <li>
      <router-link  to="/lottery">首页</router-link>
    </li>
    <li>
      <router-link to="/activityIntro">元旦礼物</router-link>
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
          title: `小伴龙元旦抽奖活动开始啦！`,
          desc: '保温杯、图书、飞行棋……各种精彩好礼等你来拿！',
          link: 'https://wxyx.youban.com/purchase/20190101?#/lottery',
          imgUrl: 'https://udata.youban.com/webimg/wxyx/puintuan/common/20190101/shareicon.png',
          success: function() {
            new Request('/common/record.json?wxschool=20190101',"GET").returnJson()
          },
          cancel: function() {
            console.log("取消分享")
          }
        }
      }
    },
    created(){
      console.log(1111)
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
      li{
        // float: left;
        list-style-type: none;
        width: 33.2%;
        text-align: center;
        line-height: 2.81rem;
        background: #ffd4b2;
        a{
          text-decoration: none;
          display: block;
          width: 100%;
          height: 100%;
          display: block;
          color: #ff5d38
        }
        .router-link-active {
            text-decoration: none;
              background: #ff5d38;
              color: #ffffff;
        }
        &:nth-child(2){
          border-right: 1px #ffb08d solid;
          border-left: 1px #ffb08d solid;
        }
      }
    }
  }
</style>
<style>
  a:-webkit-any-link{-webkit-tap-highlight-color:transparent;-webkit-tap-highlight-color:transparent;text-decoration:none;-webkit-touch-callout:none;}

</style>
