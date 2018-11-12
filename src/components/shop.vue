<template lang="html">
  <div id="app">
    <!-- <carousel>
        <a><img src="http://cliveimages.youban.com/20181108/6394192300Fj2daclE-I9EHfFIMufA3AWwmgTO.jpg"/></a>
        <a><img src="http://cliveimages.youban.com/20181108/6394192300Fj2daclE-I9EHfFIMufA3AWwmgTO.jpg"/></a>
        <a><img src="http://cliveimages.youban.com/20181108/6394192300Fj2daclE-I9EHfFIMufA3AWwmgTO.jpg"/></a>
        <a><img src="http://cliveimages.youban.com/20181108/6394192300Fj2daclE-I9EHfFIMufA3AWwmgTO.jpg"/></a>
    </carousel> -->
    <SeriesBox :series='series'/>
    <NaveBar :isNew="isNew" :category="category" @getListData="getListData"/>
    <LessonList :isNew="isNew" :lessonList="lessonList" v-if="fetchCategory"/>
    <LoadingDiv v-else/>
  </div>
</template>

<script>
import Carousel from './base/slider/slider.vue'
import SeriesBox from './base/series-box.vue'
import {Request} from '../api/request'
import NaveBar from './base/navbar'
import LessonList from './base/lesson-list'
import LoadingDiv from './base/loading.vue'
export default {
  name: 'Shop',
  components: {
    NaveBar,
    LessonList,
    SeriesBox,
    LoadingDiv,
    Carousel
  },
  data() {
    return {
      lessonList:'',
      allList:{},
      isShowAll:true,
      category:'',
      series:[],
      fetchCategory:true,
      isNew:0,
    }
  },
  created() {
    new Request('/shop/index.json','POST').returnJson().then(res=>{
      localStorage.count = res.count;
      this.allList=res.list;
      this.lessonList=res.list;
      this.category= res.category;
      this.series=res.seriesList;
      this.isNew=res.isNew;
    })
  },
  methods: {
    getListData(category) {
      category==99?(this.lessonList=this.allList):this._fetchData(category);
  },
  _fetchData(category){
      this.fetchCategory=false;
      new Request('/shop/category.json','GET',{"category":category}).returnJson().then(res=>{
      this.fetchCategory=true;
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
