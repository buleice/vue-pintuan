<template lang="html">
<div class="">
  <ul class="item">
				<li v-for="item in lessonList">
							<div class="tuanimg">
								<a :href="'/purchase/index?id='+item._id" target="_blank">
									<img class="" v-lazy="item['Fbanner'][0]" :key="item['Fbanner'][0]">
									<img class="tuan-label" :src="renderLabel(item['Ftag'])" alt="">
                </a>
								<div class="people">已有
									{{item['Fsales']}}人参团</div>
							</div>
							<div class="tuanTitle">{{item['Fheading']}}</div>
							<div class="tuanInfo">
								<div class="Infotag">
																		<span>{{splitlabel(item['Flabel'])[0]}}</span>
																		<span>{{splitlabel(item['Flabel'])[1]}}</span>
																	</div>
								<div class="price">
									<em>￥<del>{{item['ForiginalPrice']}}</del></em>
									<a class="detailbtn" :href="'/purchase/index?id='+item._id" target="_blank">
												<span>拼团价 ￥<strong>{{item['Fprice']}}</strong></span>
									</a>
								</div>
							</div>
						</li>
				</ul>
</div>
</template>

<script>
export default {
  props:{
    lessonList:Object
  },
  methods:{
    renderLabel:function(Ftag){
      switch(Ftag){
        case 1:return '//udata.youban.com/webimg/wxyx/puintuan/newest.png';
        break;
        case 2:return '//udata.youban.com/webimg/wxyx/puintuan/hotst.png';
        break;
        case 3:return '//udata.youban.com/webimg/wxyx/puintuan/free.png';
        break;
        case 4:return '//udata.youban.com/webimg/wxyx/puintuan/recommend.png';
        break;
        case 5:return '//udata.youban.com/webimg/wxyx/puintuan/xianmian.png';
        break;
      }
    },
    splitlabel(str){
      return str.split('/');
    }
  },
  computed:{

  }
}
</script>

<style lang="css" scoped>
	.item{display:block;height:auto;overflow:hidden;padding:.625rem;position:relative}
	.item li{height:auto;overflow:hidden;display:block;background-color:#fff;border-radius:.625rem;margin-bottom:.8125rem;-webkit-box-shadow:0 .125rem .5rem rgba(0,0,0,.2);box-shadow:0 .125rem .5rem rgba(0,0,0,.2)}
	.item li .tuanimg,.tuanInfo,.tuanTitle{height:auto;display:block;overflow:hidden;text-align: left;}
	.tuanimg{position:relative;}
  .tuanimg a{display: block;}
	.tuan-label{position:absolute;width:22%;height:auto;left:0;top:0}
	.people{position:absolute;right:0;top:.8rem;width: auto;height: 1.5rem;padding: 0 .5rem;line-height: 1.5rem;text-align: center;background:rgba(0,0,0,.3);border-radius:.75rem 0 0 .75rem;color:#FFF}
	.item li .tuanimg img.ad-img{display:block;border-radius:.625rem .625rem 0 0}
	.tuanTitle{padding:.625rem .625rem 0;height:auto;overflow:hidden;font-size:1rem}
	.tuanInfo{padding:.625rem;height:auto;overflow:hidden;position:relative}
	.Infotag{float:left;width:38%;padding-top:.625rem}
	.price{float:right}
	.price em{font-size:1rem;margin-right:.625rem;}
	.detailbtn{display:inline-block;background-color:#f69f00;width:auto;height:2.75rem;padding: 0 .94rem;white-space: nowrap;text-overflow: ellipsis;border-radius:1rem;text-align:center;line-height:2.75rem;color:#fff;text-decoration:none;font-size:1rem}
	.detailbtn strong{font-size:1.31rem}
	.Infotag span{display:inline-block;padding:3px 5px;border:1px solid #666;border-radius:1.5625rem;font-size: .75rem}
	.Infotag span:first-child{margin-right:.375rem}
	.courcard{display:block;height:auto;margin:.88rem auto;position:relative}
	.courcard img{width:100%;height:auto;border-radius:.625rem}
	.courcard span{display: inline-block;
		 position:absolute;bottom:.625rem;right:15px;width: 5.25rem;padding:.3rem 0 .4rem; text-align: center;background:#f69f00;border-radius:1rem;color:#fff;font-size: 1rem}
	.myGroup{display:block;height:auto;padding:0 .625rem;margin:.88rem auto;position:relative}
	.myGroup .a_box,img{display:block;width: 100%;height:100%;position:relative;color: rgba(0,0,0.5);color: #3c3c3c;border-radius: .625rem .625rem 0 0;}
	.groupInfo{width: 100%;height:3.44rem;line-height: 3.44rem;color: #fff;padding: 0 .38rem 0 0;-webkit-box-sizing: border-box;box-sizing: border-box;border-radius:0 0 .625rem .625rem;position: absolute;left: 0;bottom: 0;background-color: rgba(6, 6, 6,.4)}
</style>
