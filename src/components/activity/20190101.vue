<template lang="html">
  <div class="shop-page">
    <div class="shop-content">
      <div>
        <img class="banner-bg" src="//udata.youban.com/webimg/wxyx/puintuan/common/20190101/yuanxiao.png" alt="">
        <ul class="shop-category">
          <li v-for="item in category" :key="item.title" @click="_getlessonList(item.id)">
            <div :class="[locationId==item.id?'active':'']">
              <img :src="item.icon" alt="">
              <span>{{item.title}}</span>
            </div>
          </li>
        </ul>
        <ClassifyNormal :lessonList="lessonList"></ClassifyNormal>
        <CouponBuy></CouponBuy>
        <CouponSent :couponSent="couponSent"></CouponSent>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  import CouponBuy from './couponBuy'
  import {Request} from "../../api/request";
  const ClassifyNormal = () => import('../base/lesson-list');
  const CouponSent =()=>import('../base/coupon-sent/coupon-sent');


  export default {
    name: 'ShopDeault',
    components: {
      ClassifyNormal,
      CouponBuy,
      CouponSent
    },
    data() {
      return {
        locationId:'',
        lessonList: [],
        allList: {},
        isShowAll: true,
        category: [],
        series: [],
        fetchCategory: true,
        carouselList: [],
        showToTop: false,
        interest: [],
        auth: '',
        showAd: false,
        couponSent:[]
      }
    },
    created() {
      this._initPageData();
    },
    methods: {
      imgLoad() {
        this.$refs.scroll.refresh();
      },
      hideToTop() {
        this.showToTop = false
      },
      fshowToTop() {
        this.showToTop = true
      },
      _topFunction() {
        this.$refs.scroll.scrollTo(0, 0, 300);
        this.showToTop = false;
      },
      _initPageData() {
        new Request('/purchase/20190101.json').returnJson().then(res => {
          this.category = res.category;
          this._getlessonList(this.category[0].id);
        })
      },
      _getlessonList(category) {
        this.locationId=category
        new Request('/activity/20190101/lesson.json', 'GET', {category: category}).returnJson().then(res => {
          this.lessonList = res.list;
          this.couponSent=res.couponSent;
          this.setUserCoupons(res.coupons);
        })
      },
      ...mapActions(['setUserCoupons'])
    }
  }
</script>
<style scoped lang="scss">
  .shop-page {
    background: #ffffff;
      padding-bottom: 2.5rem;
    .shop-content {
      .banner-bg {
        display: block;
        width: 100%;
        margin-bottom: .94rem;
      }
      .shop-category {
        display: flex;
        justify-content: space-around;
        padding-bottom: .5rem;
        padding: 0 .31rem;
        overflow-x: scroll;
        overflow-y: hidden;
        li {
          list-style-type: none;
          color: #0d0d0d;
          width: 16%;
          box-sizing: border-box;
          font-size: .75rem;
          div {
            display: inline-block;
            margin: auto;
            height: auto;
            position: relative;
            box-sizing: border-box;
            padding: .5rem;
            img {
              display: inline-block;
              width: 100%;
              margin: auto;
              position: relative;
            }
            span {
              display: block;
            }
            &.active{
              background: #f5f5f5;
              border-radius: .63rem;
            }
            /*&.active::after {*/
            /*content: '';*/
            /*display: block;*/
            /*position: relative;*/
            /*width: 2.19rem;*/
            /*height: 0;*/
            /*border-bottom: .13rem solid #f69f00;*/
            /*margin: auto;*/
            /*}*/
          }
        }
      }
      .personalDiy {
        width: 100%;
        line-height: 2rem;
        box-sizing: border-box;
        padding: 0 0px 0 .625rem;
        border-top: .19rem solid #f5f5f5;
        line-height: 2rem;
        span {
          float: left;
          display: inline-block;
          height: 1.5rem;
          line-height: 1.5rem;
          padding: 0 .8rem;
          border-radius: .5rem;
          margin-top: .25rem;
          &.title {
            font-weight: 700;
            font-size: 1rem;
            padding-left: 0;
          }
          &.age {
            background-color: #f69f00;
            color: #ffffff;
          }
        }
        b {
          float: right;
          position: relative;
          padding-right: 1.25rem;
          color: #656565;
          &::after {
            content: "";
            position: absolute;
            width: 0.5rem;
            height: 0.5rem;
            top: 50%;
            right: 0.63rem;
            border-top: 1px solid #656565;
            border-right: 1px solid #656565;
            transform: translate(-50%, -50%) rotate(45deg);
            -webkit-transform: translateY(-50%) rotate(45deg);
          }
        }
        &::after {
          content: '';
          display: block;
          clear: both;
        }
      }
    }
  }

</style>
