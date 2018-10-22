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
<<<<<<< HEAD
=======
import {ROOT} from '../fetch/config'
let requestConfig = {
  credentials: 'include',
  method: "POST",
  headers: {
    'Accept': 'application/json',
    'Content-Type' : 'application/json'
  },
  mode: "cors",
  cache: "force-cache"
}
>>>>>>> c6e152ff46fd4f221a3292d374cc614927cba531
export default {
  name: 'Shop',
  components: {
    NaveBar,
    LessonList
  },
  data() {
    return {
      lessonList:'',
      allList:{},
      isShowAll:true,
      category:''
    }
  },
  created() {
    fetch('//wxyx.youban.com/shop/index.json?debug=20009150', {
<<<<<<< HEAD
=======
      mode: "cors",
>>>>>>> c6e152ff46fd4f221a3292d374cc614927cba531
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "cache": "force-cache"
      },
      credentials: "include"
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
    fetch('//wxyx.youban.com/shop/category.json?debug=20009150&category='+category, {
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
