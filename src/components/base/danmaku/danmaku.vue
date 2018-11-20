<template lang="html">
    <ul class="danmaku" v-if="showDanMaku">
        <li class="danmaku_box danmaku_tip">
            <p v-html="danmakuText"></p>
        </li>
    </ul>
</template>

<script>
export default {
  name: 'danmaku',
  props:{
    lists:{
      type:Array,
      default(){
        return []
      }
    },
  },
  data() {
    return{
      activeNum: 0,
      danmakuText: 'JIMI 获得了￥0.3奖学金',
      showDanMaku:false
    }
  },
  watch:{
    lists(){
      if (this.lists.length > 0) {
        this.showDanMaku=true;
        let interval = setInterval(() => {
          this.danmakuText = this.lists[this.activeNum];
          if (this.activeNum == this.lists.length-1) {
            this.activeNum = 0;
          }else{
            this.activeNum = this.activeNum++;
          }
        }, 3000)
      }
    }
  }

}
</script>

<style lang="css" scoped>
@keyframes ani_tip{
0{-webkit-transform:translateY(.9375rem);transform:translateY(.9375rem);opacity:0}
40%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}
65%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1}
85%{-webkit-transform:translateY(-.9375rem);transform:translateY(-.9375rem);opacity:0}
100%{opacity:0}
}
.danmaku{width: 10.75rem;height: 1.875rem;}
.danmaku_box{padding:0 .2rem;height:100%; background:#fff;border-radius:0 .9375rem .9375rem 0;opacity:0;-webkit-transform:translateY(.9375rem);transform:translateY(.9375rem);color:#fff;box-shadow: 0 1px 2px 1px rgba(0,0,0,.2)}
.danmaku_tip{animation:ani_tip 4s;animation-delay:1s;-webkit-animation:ani_tip 4s;-webkit-animation-delay:1s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}
.danmaku_box >>> p{text-overflow:ellipsis;overflow:hidden;white-space:nowrap;font-size:.8125rem;line-height:1.875rem;height: 100%;color: #3c3c3c}
.danmaku_box >>> .name{color:#0a7aec;max-width:3.75rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;float:left;height:1.875rem;line-height:1.875rem;margin-right:.3125rem}


</style>
