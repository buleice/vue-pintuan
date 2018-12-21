<template>
  <div id="app">
    <NewYear></NewYear>
  </div>
</template>

<script>
  import NewYear from '../../components/activity/20190101'
  export default {
    name: 'App',
    components: {
      NewYear
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
</style>
