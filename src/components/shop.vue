<template lang="html">
  <div id="app">
    <NaveBar :category="category" @getListData="getListData"/>
    <LessonList :lessonList="lessonList"/>
  </div>
</template>
<script>
import 'whatwg-fetch'
import NaveBar from './base/navbar'
import LessonList from './base/lesson-list'
export default {
  name: 'Shop',
  components: {
    NaveBar,
    LessonList
  },
  data() {
    return {
      lessonList:{},
      allList:{},
      isShowAll:true,
      category:''
    }
  },
  created() {
    fetch('/shop/index.json?', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    }).then(response=>response.json()).then(res=>{
      this.allList=res.list;
      this.lessonList=res.list;
      this.category= res.category;
    })
  },
  methods: {
    getListData(category) {
      category==99?(this.lessonList=this.allList):this._fetchData(category);
  },
  _fetchData(category){
    fetch('/shop/category.json?category='+category, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    }).then(response=>response.json()).then(res=>{
      this.lessonList=res.list;
    })
  }
},


}
</script>
<style lang="css">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
