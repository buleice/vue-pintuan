<template lang="html">
      <div v-if="show" class="sc-htoDjs iOMeRW" id='myBtn' @click="_topFunction"><span class="iconfont"></span>顶部</div>
</template>

<script>
export default {
  name:"scrollToTop",
  data(){
    return{
      show:false,
      timer:undefined
    }
  },
  created(){
    let _this=this
    window.addEventListener('scroll', this._throttle(function() {
      _this._scrollFunction();
    }));
  },
  methods:{
    _throttle(action) {
      var isRunning = false;
      return function() {
        if (isRunning)
          return;
        isRunning = true;
        window.requestAnimationFrame(function() {
          action();
          isRunning = false;
        });
      };
    },
    _scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        this.show=true
      } else {
        this.show=false
      }
    },
    _topFunction() {
      let _this=this
      cancelAnimationFrame(this.timer);
      this.timer = requestAnimationFrame(function fn() {
        var oTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop > 0) {
          scrollTo(0, oTop - 100);
          _this.timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(_this.timer);
        }
      });
    }
  }
}
</script>

<style lang="css" scoped>
#myBtn{position:fixed;text-align:center;bottom:4rem;right:.63rem;z-index:99}
.iOMeRW{position:relative;color:#bbb;background-color:#fff;border:1px solid #ccc;line-height:3.75rem;border-radius:50%;width:2.75rem;height:2.75rem;font-size:0.8rem;text-align:center}
.iOMeRW span{color:#999;position:absolute;left:0;top:0;width:100%;height:100%;font-size:1.25rem;line-height:1.5rem}
.iconfont{font-family:h5index-iconfont;font-style:normal;-webkit-font-smoothing:antialiased;-webkit-text-stroke-width:.2px;-moz-osx-font-smoothing:grayscale;font-size:1rem;color:#333}
</style>
