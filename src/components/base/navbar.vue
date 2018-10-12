<template lang="html">
  <div class="navbar">
    <div id="navMenu" class="nav-menu-area">
	  <div class="normal">
		<ul class="expand-list">
      <li v-for="(nav,index) in navContents" :class="['tab-all',{navClick:navClick &&  clickIndex==index}]" @click="clickIndex=index">
        {{nav}}
      </li>
		</ul>
	</div>
</div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      navClick:true,
      navContents:["全部","英语","数学","唐诗","其他"],
      clickIndex:0,
    }
  },
  created(){

  },
  methods:{

  },
  computed:{

  }
}
</script>

<style lang="css">
*{margin: 0;padding: 0}
.nav-menu-area{position:relative}
.nav-menu-area .normal .expand-list{font-size:0;background-color:#fff;width: 100%;height:2.5rem;padding-bottom:.293333rem;-webkit-box-sizing:border-box;box-sizing:border-box;overflow-x: scroll;overflow-y: hidden;line-height: 2.5rem;white-space:nowrap;-webkit-box-shadow: 0 0px 5px 0px rgba(0,0,0,.3);box-shadow: 0 0px 5px 0px rgba(0,0,0,.3)}
.nav-menu-area .normal .expand-list li{width:19.666666%;height: 2.5rem;display:inline-block;font-size:.453333rem;padding-bottom:.013333rem;text-align:center;display: inline-block;color: rgba(0,0,0,.5);font-weight: 400;font-size: 1.1rem;}
.navClick{color: rgba(0, 0, 0, 0.7) !important; font-weight: 700 !important;}
</style>
