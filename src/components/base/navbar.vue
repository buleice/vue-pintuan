<template lang="html">
  <div class="navbar">
    <div id="navMenu" class="nav-menu-area">
	  <div class="normal">
		<ul class="expand-list">
      <li :class="['tab-all',{navClick:navClick &&  clickIndex==99}]" @click="emitAndsetActive(99)" :key='99'>
        全部
      </li>
      <a href="/activity/20181111" class="festival"></a>
      <li v-if="isNew==1" style="color:red;font-weight:bold"  @click="emitAndsetActive(98)" :key='98'>0.01元</li>
      <li v-for="(nav,index) in category" :class="['tab-all',{navClick:navClick &&  clickIndex==nav.id},{last_nav:index==category.length-1}]" @click="emitAndsetActive(nav.id)" :key='index+1'>
        {{nav.title}}
      </li>
      <span class="slide-indicate"></span>
		</ul>
	</div>
</div>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      default:()=>[{
          id: "1",
          title: "英语"
        },
        {
          id: "2",
          title: "数学"
        },
        {
          id: "3",
          title: "唐诗"
        }, {
          id: "0",
          title: "其他"
        }
      ]
    },
    isNew:''
  },
  data() {
    return {
      navClick: true,
      clickIndex: 99
    }
  },
  created() {
  },
  methods: {
    emitAndsetActive(index) {
      this.$emit('getListData', index);
      this.clickIndex = index;
    }
  },
  computed: {

  }
}
</script>

<style lang="css">
.nav-menu-area{position:relative}
.nav-menu-area .normal .expand-list{font-size:0;background-color:#fff;width: 100%;height:2.5rem;padding-bottom:.293333rem;-webkit-box-sizing:border-box;box-sizing:border-box;overflow-x: scroll;overflow-y: hidden;line-height: 2.5rem;white-space:nowrap;-webkit-box-shadow: 0 0px 5px 0px rgba(0,0,0,.3);box-shadow: 0 0px 5px 0px rgba(0,0,0,.3);}
.nav-menu-area .normal .expand-list li{width:19.66666%;height: 2.5rem;display:inline-block;font-size:.453333rem;padding-bottom:.013333rem;text-align:center;display: inline-block;color: rgba(0,0,0,.5);font-weight: 400;font-size: 1.1rem;transform: translateY(-.19rem);}
.expand-list li.last_nav{padding-right: 1.25rem}
.navClick{color: rgba(0, 0, 0, 0.7) !important; font-weight: 700 !important;}
.slide-indicate{display: inline-block;background: url(//udata.youban.com/webimg/wxyx/puintuan/slide-indicate.svg);width: 1.56rem;height: 25px;background-repeat: no-repeat;background-size: 100% 100%;position: absolute;top: 50%;left: 93%; margin-top: -.75rem;}
.festival{background: url('//udata.youban.com/webimg/wxyx/puintuan/1111/1111.png') no-repeat;background-size: 100% 100%;display: inline-block;width: 5.63rem;height: 1.88rem;transform: translateY(.31rem);}
</style>
