<template lang="html">
    <div class="">
        <ul class="item">
            <li v-for="(item,index) in lessonList" :key="index">
                <div class="tuanimg">
                    <a :href="item.url" target="_blank">
                        <img class="course-img" @load="imgLoad" ref="lazy" :src="item['banner']" :key="item['banner']">
                    </a>
                    <!--<div class="people">-->
                        <!--{{item['sales']}}人正在学习-->
                    <!--</div>-->
                </div>
                <div class="tuanTitle">{{item['title']}}</div>
                <div class="tuanInfo">
                    <!--<div class="Infotag" v-if="item['label'].length>0">-->
                        <!--<span>{{splitlabel(item['label'])[0]}}</span>-->
                        <!--<span>{{splitlabel(item['label'])[1]}}</span>-->
                    <!--</div>-->
                  <div class="course-label"><img src="../../assets/课时(1).png" alt=""><span>{{item.number}}</span><img src="../../assets/人物拷贝.png" alt=""><span>{{item.sales}}</span></div>
                    <div class="price">
                        <a class="detailbtn" href="javascript:void(0);" target="_blank">
                            <span @click="processPayment(item.price,item.id)" ><strong>立即报名</strong></span>
                        </a>
                    </div>
                </div>
            </li>
        </ul>
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
                observer: ''
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
            let filteredCoupons=this.userCoupons.filter(item=>{
              return willPayPrice>=item.spendMoney
            });
            if(filteredCoupons.length>0){
              this.setWillPayPrice(willPayPrice)
              this.setCanUseCoupons(filteredCoupons);
              this.setBuyingId(id);
              this.setShowCouponBuy(true);
            }else{
              this.wxpay(id);
            }
          },
          wxpay(id){
            wxPays.justPay('/pay/weixin/youxue/prepare.json',{shareKey:this._GetQueryString('shareKey'),buyingId:id})
          },
          _GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
            if (r != null) return unescape(r[2]);
            return '';
          },
          ...mapActions(['setBuyingId','setShowCouponsBuy','setCanUseCoupons'])
        },
        computed: {
          ...mapGetters(['userCoupons'])
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
                padding-top: 0.625rem;
                display: inline-block;
                vertical-align: middle;
                margin-top: .625rem;
                img,span{
                  display: inline-block;vertical-align: initial;
                }
                img{
                  width: .75rem;
                }
                span{margin: 0 5px;color: #929292}
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
