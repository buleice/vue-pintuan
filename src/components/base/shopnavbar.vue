<template lang="html">
  <ul class="fixed-button">
  <li class="shop" :class="{active2:clickedTab==0}" @click="routerTo(0);"><span>首页</span></li>
  <li class="usercenter" :class="{active3:clickedTab==1}"@click="routerTo(1)"><span>我的课程</span></li>
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
    this._goPath()
  },
  watch: {
  '$route':'_goPath'
},
  methods: {
    routerTo(index) {
      this.clickedTab = index;
      index == 0 ? this.$router.push('/') : this.$router.push('/mine')
    },
    _GetQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
      if (r != null) return unescape(r[2]);
      return null;
    },
    _goPath(){
      if(this._GetQueryString("source")=="mine"||(window.location.href).indexOf("mine")>0){
        this.$router.push('/mine');
        this.clickedTab=1;
      }else{
        this.clickedTab=0;
        this.$router.push('/');
      }
    }
  }
}
</script>

<style lang="css" scoped>
.fixed-button{position:fixed;display:block;width:100%;height:3.13rem;bottom:0;background:#fff;-webkit-box-shadow:-.125rem 0 .5rem 0 rgba(0,0,0,.2);box-shadow:-.125rem 0 .5rem 0 rgba(0,0,0,.2);overflow:hidden}
.fixed-button li{display:inline-block;float:left;width:50%;height:100%;text-align:center;font-size: .75rem;position: relative;}
.fixed-button li span{display: inline-block;position: absolute;bottom: .25rem;left: 50%;-webkit-transform: translateX(-50%);transform: translateX(-50%);}
.fixed-button .shop{background:url(//udata.youban.com/webimg/wxyx/puintuan/common/shopIndex/shop2.png);background-repeat:no-repeat;background-position:center .25rem;background-size:1.25rem auto}
.fixed-button .active2{background:url(//udata.youban.com/webimg/wxyx/puintuan/common/shopIndex/shop.png);background-repeat:no-repeat;background-position:center .25rem;background-size:1.25rem auto}
.fixed-button .usercenter{background:url(//udata.youban.com/webimg/wxyx/puintuan/common/shopIndex/usercenter.png);background-repeat:no-repeat;background-position:center .25rem;background-size:1.25rem auto}
.fixed-button .active3{background:url(//udata.youban.com/webimg/wxyx/puintuan/common/shopIndex/usercenter2.png);background-repeat:no-repeat;background-position:center .25rem;background-size:1.25rem auto}
</style>
