<template lang="html">
  <div>
    <!-- <carousel :slideDatas="carouselList">
      <div v-for="slide in carouselList">
        <a :href="slide.url" >
          <img :src="slide.image" alt="">
        </a>
      </div>
    </carousel> -->
    <SeriesBox :series='series'/>
    <NaveBar :isNew="isNew" :category="category" @getListData="getListData"/>
    <LessonList :isNew="isNew" :lessonList="lessonList" v-if="fetchCategory"/>
    <LoadingDiv v-else/>
    <EntryAd/>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import Carousel from '../base/slider/slider.vue'
import SeriesBox from '../base/series-box.vue'
import {
  Request
} from '../../api/request'
import NaveBar from '../base/navbar'
import LessonList from '../base/lesson-list'
import LoadingDiv from '../base/loading.vue'
import EntryAd from '../base/entry-ad/entry-ad'
export default {
  name: 'Shop',
  components: {
    NaveBar,
    LessonList,
    SeriesBox,
    LoadingDiv,
    Carousel,
    EntryAd
  },
  data() {
    return {
      lessonList: '',
      allList: {},
      isShowAll: true,
      category: '',
      series: [],
      fetchCategory: true,
      isNew: 0,
      carouselList: [],
    }
  },
  created() {
    new Request('/shop/list.json', 'POST').returnJson().then(res => {
      this.lessonList = res.list;
      localStorage.count = res.count;
      this.allList = res.list;
      this.category = res.category;
      this.series = res.seriesList;
      this.isNew = res.isNew;
      this.carouselList = res.bannerList
      this.setFirstVisit(res.visited);
    })
  },
  methods: {
    getListData(category) {
      category == 99 ? (this.lessonList = this.allList) : this._fetchData(category);
    },
    _fetchData(category) {
      this.fetchCategory = false;
      new Request('/shop/category.json', 'GET', {
        "category": category
      }).returnJson().then(res => {
        this.lessonList = res.list;
        this.fetchCategory = true;
      })
    },
    ...mapActions(['setFirstVisit'])
  }
}
</script>
