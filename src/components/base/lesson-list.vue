<template lang="html">
<div class="">
  <ul class="item">
				<li v-for="item in lessonList">
							<div class="tuanimg">
								<a :href="'/purchase/index?id='+item._id+'&isNew='+isNew" target="_blank">
									<img class="course-img" ref="lazy" :src="item['Fbanner'][0]" :key="item['Fbanner'][0]" >
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
									<a class="detailbtn" :href="'/purchase/index?id='+item._id+'&isNew='+isNew" target="_blank">
												<span v-if="item['Fprice']>0">开团价 ￥<strong>{{item['Fprice']}}</strong></span>
                        	<span v-else>限时免费</strong></span>
									</a>
								</div>
							</div>
						</li>
				</ul>
</div>
</template>

<script>
import {
  LazyImage
} from '../../common/js/lazy'
export default {
  props: {
    lessonList: {},
    isNew: 0
  },
  data() {
    return {
      observer: ''
    }
  },
  mounted() {
    // this.$nextTick(function(){
    //   this.observer=new LazyImage(this.$refs.lazy)
    // })
  },

  methods: {
    renderLabel: function(Ftag) {
      switch (Ftag) {
        case 1:
          return '//udata.youban.com/webimg/wxyx/puintuan/newest.png';
          break;
        case 2:
          return '//udata.youban.com/webimg/wxyx/puintuan/hotst.png';
          break;
        case 3:
          return '//udata.youban.com/webimg/wxyx/puintuan/free.png';
          break;
        case 4:
          return '//udata.youban.com/webimg/wxyx/puintuan/recommend.png';
          break;
        case 5:
          return '//udata.youban.com/webimg/wxyx/puintuan/xianmian.png';
          break;
      }
    },
    splitlabel(str) {
      return str.split('/');
    }
  },

  watch: {
    //  lessonList:{ //深度监听，可监听到对象、数组的变化
    //     handler (newV, oldV) {
    //       this.$nextTick(function(){
    //         this.observer=new LazyImage(this.$refs.lazy)
    //       })
    //     },
    //     deep:true
    //    }
  }
}
</script>

<style media="screen" lang="scss" scoped>
.item {
    overflow: hidden;
    padding: 0.625rem;
    position: relative;
    li {
        overflow: hidden;
        display: block;
        background-color: #fff;
        border-radius: 0.625rem;
        margin-bottom: 0.8125rem;
        -webkit-box-shadow: 0 0.125rem 0.5rem rgba(0,0,0,.2);
        box-shadow: 0 0.125rem 0.5rem rgba(0,0,0,.2);
        .tuanimg {
            position: relative;
            a {
                display: block;
                border-radius: 0.625rem 0.625rem 0 0;
                overflow: hidden;
                .tuan-label {
                    position: absolute;
                    width: 22%;
                    height: auto;
                    left: 0;
                    top: 0;
                }
                .course-img {
                    width: 100%;
                    height: auto;
                }
            }
            .people {
                position: absolute;
                right: 0;
                top: 0.8rem;
                width: auto;
                height: 1.5rem;
                padding: 0 0.5rem;
                line-height: 1.5rem;
                text-align: center;
                background: rgba(0,0,0,.3);
                border-radius: 0.75rem 0 0 0.75rem;
                color: #FFF;
            }
        }
        .tuanTitle {
            padding: 0.625rem 0.625rem 0;
            height: auto;
            overflow: hidden;
            font-size: 1rem;
            text-align: left;

        }
        .tuanInfo {
            padding: 0.625rem;
            height: auto;
            overflow: hidden;
            position: relative;
            .Infotag {
                float: left;
                width: 38%;
                padding-top: 0.625rem;
                span {
                    display: inline-block;
                    padding: 3px 5px;
                    border: 1px solid #666;
                    border-radius: 1.5625rem;
                    font-size: 0.75rem;
                    &:first-child {
                        margin-right: 0.375rem;
                    }
                }
            }
            .price {
                float: right;
                display: flex;
                align-items: center;
                em {
                    font-size: 1rem;
                    margin-right: 0.625rem;
                }
                .detailbtn {
                    display: inline-block;
                    background-color: #f69f00;
                    width: auto;
                    height: 2.75rem;
                    padding: 0 0.5rem;
                    white-space: nowrap;
                    border-radius: 1rem;
                    text-align: center;
                    line-height: 2.75rem;
                    color: #fff;
                    text-decoration: none;
                    font-size: 1rem;
                    max-width: 7.63rem;
                    overflow: hidden;
                    max-width: 7.63rem;
                    overflow: hidden;
                    strong {
                        font-size: 1.31rem;
                    }
                }
            }
        }

    }

}
</style>
