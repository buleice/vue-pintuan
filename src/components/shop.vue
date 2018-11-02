<template lang="html">
  <div id="app">
    <SeriesBox/>
    <NaveBar :category="category" @getListData="getListData"/>
    <LessonList :lessonList="lessonList"/>
  </div>
</template>

<script>
import SeriesBox from './base/series-box.vue'
import {Request} from '../api/request'
import NaveBar from './base/navbar'
import LessonList from './base/lesson-list'
export default {
  name: 'Shop',
  components: {
    NaveBar,
    LessonList,
    SeriesBox
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
    new Request('/shop/index.json','POST').returnJson().then(res=>{
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
      new Request('/shop/category.json','GET',{"category":category}).returnJson().then(res=>{
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
