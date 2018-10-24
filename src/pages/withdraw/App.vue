<template lang="html">
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import {Request} from '../../api/request'
export default {
  name:"App",
  components:{

  }
}
</script>

<style lang="css">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
*{margin:0;padding:0;text-align: none;}
body{background-color: #f5f5f5}
li{list-style:none}
a:-webkit-any-link{-webkit-tap-highlight-color:transparent;-webkit-tap-highlight-color:transparent;text-decoration:none;-webkit-touch-callout:none;}

</style>
