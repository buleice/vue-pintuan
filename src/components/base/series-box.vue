<template lang="html">
  <div class="course-contatiner">
    <ul>
      <li v-for='(serie,index) in series' :key="index">
        <a :href="'/purchase/series?id='+serie.id"><img :src="serie.img" alt="图片"> </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SeriesBox',
  props: {
    series:{
      type:Array,
      default(){
        return [{
            id: "5bdaa706b3fcb12c6b0dde44",
            img: "http://cliveimages.youban.com/20181102/2044105553Fk143dBa3vD8L4mcnMluuPKh_Exz.png"
          },
          {
            id: "5bdaa706b3fcb12c6b0dde44",
            img: "http://cliveimages.youban.com/20181102/2044105553Fk143dBa3vD8L4mcnMluuPKh_Exz.png"
          },
          {
            id: "5bdaa706b3fcb12c6b0dde44",
            img: "http://cliveimages.youban.com/20181102/2044105553Fk143dBa3vD8L4mcnMluuPKh_Exz.png"
          }
        ]
      }
    }
  }
}
</script>

<style lang="css" scoped>
.course-contatiner{width: 100%;height: 7.81rem;background: #f5f5f5;position: relative;display: flex;align-items: center;}
.courseLabel{font-size: 1.25rem;text-align: left;line-height: 3.33rem;padding-left: .83rem;}
.course-contatiner ul{float: left; width: 100%;overflow-x: auto;overflow-y: hidden; white-space: nowrap;margin-top: .75rem}
.course-contatiner ul li{width: 7.81rem;height: 5.94rem;display: inline-block;margin: 0 .42rem; }
.course-contatiner ul li img{width: 100%;height: 100%;}
</style>
