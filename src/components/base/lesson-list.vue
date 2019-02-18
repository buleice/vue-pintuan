<template lang="html">
    <div class="">
        <ul class="item" v-if="lessonList.length>0">
            <li v-for="(item,index) in lessonList" :key="index">
                <div class="tuanimg">
                    <a :href="item.url+'&isactivity=20180218'" target="_blank">
                        <img class="course-img" @load="imgLoad" ref="lazy" :src="item['banner']" :key="item['banner']">
                    </a>
                    <!--<div class="people">-->
                        <!--{{item['sales']}}人正在学习-->
                    <!--</div>-->
                </div>
                <div class="tuanTitle">
                  <span>{{item['title']}}</span>
                </div>
                <div class="tuanInfo">
                    <!--<div class="Infotag" v-if="item['label'].length>0">-->
                        <!--<span>{{splitlabel(item['label'])[0]}}</span>-->
                        <!--<span>{{splitlabel(item['label'])[1]}}</span>-->
                    <!--</div>-->
                  <div class="course-label">
                    <img src="../../assets/课时(1).png" alt=""><span>{{item.number}}</span>
                    <!--<img src="../../assets/人物拷贝.png" alt=""><span>{{item.sales}}</span>-->
                    <span>&yen;&nbsp;<strong>{{item['price']}}</strong> </span>
                  </div>
                    <div class="price">
                      <a class="detailbtn" v-if="item.isBuy==1" :href="item.url" target="_blank">
                          <span><strong>去上课</strong></span>
                      </a>
                      <a v-else class="detailbtn" href="javascript:void(0);" target="_blank">
                          <span @click="processPayment(item.price,item.id)" ><strong>立即报名</strong></span>
                      </a>
                    </div>
                </div>
            </li>
        </ul>
        <h3 v-else>您已经购买过该分类下所有课程，我们去看看其它课程吧！</h3>
    </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex'
  import {wxPays} from "../../api/wxPay";
  export default {
        name:"lesson-list",
        props: {
            lessonList: {}||[],
        },
        data() {
            return {
                observer: '',
                clickFlag:true
            }
        },

        methods: {
            renderLabel: function (Ftag) {
                switch (Ftag) {
                    case 1:
                        return '//udata.youban.com/webimg/wxyx/puintuan/newest.png';
                    case 2:
                        return '//udata.youban.com/webimg/wxyx/puintuan/hotst.png';
                    case 3:
                        return '//udata.youban.com/webimg/wxyx/puintuan/free.png';
                    case 4:
                        return '//udata.youban.com/webimg/wxyx/puintuan/recommend.png';
                    case 5:
                        return '//udata.youban.com/webimg/wxyx/puintuan/xianmian.png';
                    default: return ''
                }
            },
            splitlabel(str) {
                if(str){
                    return str.split('/');
                }
            },
            imgLoad(){
                this.$emit('imgLoad')
            },
          processPayment(willPayPrice,id){
            if(!this.clickFlag){
              return;
            }
            this.clickFlag=false;
            setTimeout(()=>{
              this.clickFlag=true;
            },1500)
            let filteredCoupons=this.userCoupons.filter(item=>{
              return willPayPrice>=item.spendMoney
            });
            if(filteredCoupons.length>0){
              this.setWillPayPrice(willPayPrice)
              this.setCanUseCoupons(filteredCoupons);
              this.setBuyingId(id);
              this.setShowCouponsBuy(true);
            }else{
              this.wxpay(id);
            }
          },
          wxpay(id){
            wxPays.justPay('/pay/weixin/youxue/prepare.json',{shareKey:this._GetQueryString('shareKey'),buyingid:id})
          },
          _GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
            if (r != null) return unescape(r[2]);
            return '';
          },
          ...mapActions(['setBuyingId','setShowCouponsBuy','setCanUseCoupons','setWillPayPrice'])
        },
        computed: {
          ...mapGetters(['userCoupons'])
        }
    }
</script>

<style media="screen" lang="scss" scoped>
h3{
  width: 70%;
  margin: auto;
  color: rgba(0,0,0,.5);
  margin-top: 20%;
  font-size:1rem;
}
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
            -webkit-box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, .2);
            box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, .2);
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
                        min-height: 10.63rem;
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
                    background: rgba(0, 0, 0, .3);
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
                padding:.31rem 0.625rem ;
                height: auto;
                overflow: hidden;
                position: relative;
                .Infotag {
                    float: left;
                    width: 38%;
                    padding-top: 0.625rem;
                    span {
                        display: inline-block;
                        padding: .19rem .31rem;
                        border: 1px solid #666;
                        border-radius: 1.5625rem;
                        font-size: 0.75rem;
                        &:first-child {
                            margin-right: 0.375rem;
                        }
                    }
                }
              .course-label{
                float: left;
                width: auto;
                padding-top: .19rem;
                display: inline-block;
                vertical-align: middle;

                img,span{
                  display: inline-block;vertical-align: initial;
                }
                img{
                  width: .75rem;
                }
                span{margin: 0 .31rem;color: #929292;
                  &:last-child{
                    color: #ed0d00;
                    font-size: .75rem;
                    // margin-left: 3.13rem;
                    strong{
                      font-size: 1rem;
                    }
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
                        width: 5rem;
                        line-height: 2.25rem;
                        padding: 0 0.5rem;
                        white-space: nowrap;
                        border-radius: .8rem;
                        text-align: center;
                        line-height: 2rem;
                        color: #fff;
                        text-decoration: none;
                        font-size: 1rem;
                        max-width: 7.63rem;
                        overflow: hidden;
                        max-width: 7.63rem;
                        overflow: hidden;
                        strong {
                            font-size: 1rem;
                        }
                    }
                }
            }

        }

    }
</style>
