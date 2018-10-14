<template>
  <div id="app">
    <NaveBar/>
    <LessonList/>
  </div>
</template>

<script>
import NaveBar from '../../components/base/navbar'
import HelloWorld from '../../components/HelloWorld'
import LessonList from '../../components/base/lesson-list'

export default {
  name: 'App',
  components: {
    HelloWorld,
    NaveBar,
    LessonList
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
