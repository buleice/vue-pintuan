<template>
<div id="app">
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
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
</div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    .tabs{
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 45px;
      li{
        float: left;
        list-style-type: none;
        width: 33.2%;
        text-align: center;
        line-height: 45px;
        background: #ffd4b2;
        a{
          text-decoration: none;
          color: #ff5d38;
          display: block;
          width: 100%;
          height: 100%;
        }
        &:first-child{
          border-right: 1px #ffb08d solid;
        }
        &:last-child{
          background: #ff5d38;
          a{
            color: #ffffff;
          }
        }
      }
    }
  }
</style>
