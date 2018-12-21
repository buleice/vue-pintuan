<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
export default {

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
  body{background-color: #ffffff}
  li{list-style:none}
  a:-webkit-any-link{-webkit-tap-highlight-color:transparent;-webkit-tap-highlight-color:transparent;text-decoration:none;-webkit-touch-callout:none;}

</style>
