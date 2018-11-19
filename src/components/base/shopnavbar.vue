<template lang="html">
  <ul class="fixed-button">
  <li class="shop" :class="{active1:clickedTab==0}" @click="routerTo(0);"><span>首页</span></li>
  <li class="course" :class="{active3:clickedTab==2}" @click="routerTo(2);"><span>上课</span></li>
  <li class="bonus" :class="{active4:clickedTab==3}" @click="routerTo(3);"><span>奖学金</span></li>
  <li class="usercenter" :class="{active2:clickedTab==1}"@click="routerTo(1)"><span>个人中心</span></li>
</ul>
</template>

<script>
export default {
  name: 'ShopNavBar',
  data() {
    return {
      clickedTab: 1,
    }
  },
  created() {
    this._goPath();
    // window._hmt.push(['_trackEvent', 'shopIndex'])
  },
  methods: {
    routerTo(index) {
      switch (index) {
        case 0:
          this.$router.push('/shop');
          break;
        case 1:
          this.$router.push('/mine');
          break;
        case 2:
          this.$router.push('/course');
          break;
        case 3:
          this.$router.push('/bonus');
          break;
      }
      this.clickedTab = index;
    },
    _GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
      if (r != null) return unescape(r[2]);
      return null;
    },
    _goPath() {
      if (this._GetQueryString('source') == "mine") {
        this.$router.push('/mine');
        this.clickedTab = 1;
      }else if(this._GetQueryString('to') == "bonus"){
        this.$router.push('/bonus/center');
        this.clickedTab = 3;
      }else if(this._GetQueryString('to') == "course"){
        this.$router.push('/course');
      }else {
        this.$router.push('/shop');
        this.clickedTab = 0;
      }
    }
  },
  watch: {
    $route: {
       handler: function(val, oldVal){
         if(/mine/.test(val.path)){
           this.clickedTab = 1;
         }else if(/course/.test(val.path)){
           this.clickedTab = 2;
         }else if(/bonus/.test(val.path)){
           this.clickedTab = 3;
         }else{
           this.clickedTab = 0;
         }
       },
       // 深度观察监听
       deep: true
     }
},
}
</script>


<style media="screen" lang="scss" scoped>
@mixin shop-nav-tab {
    background-repeat: no-repeat;
    background-position: center 0.25rem;
    background-size: 1.25rem auto;
}
.fixed-button {
    position: fixed;
    display: block;
    width: 100%;
    height: 3.44rem;
    bottom: 0;
    background: #fff;
    -webkit-box-shadow: -.125rem 0 0.5rem 0 rgba(0,0,0,.2);
    box-shadow: -.125rem 0 0.5rem 0 rgba(0,0,0,.2);
    overflow: hidden;
    display: flex;
    li {
        display: inline-block;
        float: left;
        width: 25%;
        height: 100%;
        text-align: center;
        font-size: 0.75rem;
        position: relative;
        span {
            display: inline-block;
            position: absolute;
            bottom: .38rem;
            left: 50%;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
        }
        &.shop {
            background: url("//udata.youban.com/webimg/wxyx/puintuan/common/shopIndex/shop2.png");
            @include shop-nav-tab;
        }
        &.course {
            background: url("//udata.youban.com/webimg/wxyx/puintuan/icons/course2.png");
            @include shop-nav-tab;
        }
        &.bonus {
            background: url("//udata.youban.com/webimg/wxyx/puintuan/icons/bonus2.png");
            @include shop-nav-tab;
        }
        &.usercenter {
            background: url("//udata.youban.com/webimg/wxyx/puintuan/common/shopIndex/usercenter.png");
            @include shop-nav-tab;
            span {
                width: 3.13rem;
            }
        }
        &.active1 {
            background: url("//udata.youban.com/webimg/wxyx/puintuan/common/shopIndex/shop.png");
            @include shop-nav-tab;
        }
        &.active2 {
            background: url("//udata.youban.com/webimg/wxyx/puintuan/common/shopIndex/usercenter2.png");
            @include shop-nav-tab;
        }
        &.active3 {
            background: url("//udata.youban.com/webimg/wxyx/puintuan/icons/course1.png");
            @include shop-nav-tab;
        }
        &.active4 {
            background: url("//udata.youban.com/webimg/wxyx/puintuan/icons/bonus1.png");
            @include shop-nav-tab;
        }
    }
}
</style>
