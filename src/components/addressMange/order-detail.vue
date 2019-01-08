<template>
  <div class="order-confirmation">
    <div class="order_info">
      <ul>
        <li class="hproduct noclick"><img
          class="photo"
          :src="goodsInfo.image">
          <div class="fn">
            <strong>{{goodsInfo.name}}</strong></div>
          <p class="sku_coll" v-html="goodsInfo.desc"></p>
          <!--<p class="sku_price">&yen;<span>59</span>.00 </p>-->
          <div class="sku">
            <div class="num_wrap">
              <!--<span class="minus disabled" ></span> -->
              <!--<input class="num"  type="tel" value="×1">-->
              <!--<span class="plus"></span>-->
            </div>
            <!--<div class="sku_num">&times;1</div>-->
          </div>
        </li>
      </ul>
    </div>
    <div class="order_block_content margin_top_15">
      <!--<div class="inner_line"><span class="title">商品金额：</span>-->
        <!--<div class="content">&lt;!&ndash;&ndash;&gt;¥ 39.80<span class="grey_tip"> (在线支付)</span> &lt;!&ndash;&ndash;&gt;</div>-->
      <!--</div>-->
      <!--<div class="inner_line"><span class="title">订单优惠：</span>-->
        <!--<div class="content">&lt;!&ndash;&ndash;&gt;¥ 6.00&lt;!&ndash;&ndash;&gt; &lt;!&ndash;&ndash;&gt;</div>-->
      <!--</div>-->
      <div class="inner_line"><span class="title">订单号：</span>
        <div class="content"><!---->{{addressInfo.Fbillid}}<!----> <!----></div>
      </div>
      <div class="inner_line"><span class="title">收货人：</span>
        <div class="content"><!---->{{addressInfo.Fname}} {{addressInfo.Fphone}}<!----> <!----></div>
      </div>
      <div class="inner_line"><span class="title">收货地址：</span>
        <div class="content"><!---->{{`${addressInfo.Fprovince}${addressInfo.Fcity}${addressInfo.Fdistrict}${addressInfo.Faddress}`}}<!----> <!----></div>
      </div>
      <div class="inner_line"><span class="title">物流信息：</span>
        <div class="content"><!---->{{addressInfo.Fcompany}} {{addressInfo.Fnumber}}<!----> <!----></div>
      </div>
      <!--<div class="inner_line"><span class="title">下单时间：</span>-->
        <!--<div class="content">&lt;!&ndash;&ndash;&gt;{{}}&lt;!&ndash;&ndash;&gt; &lt;!&ndash;&ndash;&gt;</div>-->
      <!--</div>-->
    </div>

  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import AddAddress from './addAddress';
  import AddressBox from './userAddress'
  import {Request} from "../../api/request";
  import {axiosPost} from "../../api/axios-data";

  export default {
    name: "order-detail",
    components: {
      AddAddress,
      AddressBox
    },
    data() {
      return {
        addAddress: false,
        prizeInfo: {},
        addressList: [],
        choosenAddress: {},
        goodsInfo: {},
        addressInfo:{},
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        document.title="订单详情"
      })
    },
    created() {
      new Request('/order/detail.json', 'GET', {
        goodsid: this.$route.query.id
      }).returnJson().then(res => {
        this.goodsInfo = res.goodsInfo;
        this.addressInfo=res.addressInfo;
      })
    },
    methods: {
      hrefTo(name, params) {
        this.$router.push({name: name, params: params})
      },
      handleSubmit() {
        axiosPost('/order/address.json', Object.assign({}, {
          goodsid: this.$route.query.id,
        }, this.defaultAddress)).then(res => {
          if (res.data.rc == 0) {
            setTimeout(() => {
              window.location.href = "/address.html#/orderlist"
            }, 300)
          }
        })
      },
      _GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
        if (r != null) return unescape(r[2]);
        return '';
      },
      ...mapActions(['setDefaultAddress', 'setShippingAddress'])
    },
    computed: {
      ...mapGetters(['shippingAddress', 'defaultAddress'])
    }
  }
</script>

<style scoped lang="scss">
  .order-confirmation {
    .m_header {
      .m_header_bar {
        position: relative;
        height: 2.81rem;
        line-height: 2.81rem;
        text-align: center;
        font-size: 1rem;
        color: #333;
        background: -webkit-gradient(linear, left top, left bottom, from(#fff), to(#efefef));
        background: -webkit-linear-gradient(top, #fff, #efefef);
        background: linear-gradient(180deg, #fff, #efefef);
        &::before {
          content: "";
          position: absolute;
          z-index: 1;
          pointer-events: none;
          background-color: #e5e5e5;
          height: 1px;
          left: 0;
          right: 0;
          top: 0;
        }
        .m_header_bar_back {
          position: absolute;
          top: 0;
          left: 0;
          width: 2.63rem;
          height: 2.81rem;
          &::after {
            content: "";
            display: block;
            width: .75rem;
            height: .75rem;
            border-top: 1px solid #848689;
            border-left: 1px solid #848689;
            -webkit-transform-origin: 50%;
            transform-origin: 50%;
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
            position: absolute;
            top: 50%;
            left: 1.13rem;
            margin-top: -.38rem;
          }
        }
        .m_header_bar_menu {
          position: absolute;
          top: 0;
          right: 0;
          width: 2.63rem;
          height: 2.81rem;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkAgMAAACcbnALAAAADFBMV…jUeAFFjBRTYPYyQt2CEKO/Kd+gLEagAXAx3DpK4KwZDBgAAAh+brVZ2vz9AAAAAElFTkSuQmCC) no-repeat 50%;
          background-size: 1.13rem;
        }
      }
    }
    .order_info {
      margin-bottom: .94rem;
      padding: 0 .63rem;
      background: #fff;
      position: relative;

      ul {
        list-style: none;
        padding-bottom: .94rem;
        .hproduct {
          position: relative;
          min-height: 4.69rem;
          padding: 0;
          font-size: .75rem;
          padding-top: .94rem;
          img {
            border: 0 none;
            vertical-align: top;
            &.photo {
              width: 4.69rem;
              height: 4.69rem;
              position: absolute;
              top: .94rem;
              left: 0;
            }
          }
          .fn {
            padding-left: 5.31rem;
            color: #333;
            line-height: 1.25rem;
            margin-bottom: .31rem;
            font-size: .88rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            i {
              font-style: normal;
              &.mod_tag {
                display: inline-block;
                vertical-align: middle;
                margin-top: -.13rem;
                margin-right: .31rem;
                height: .88rem;
              }
            }

          }
          .sku_coll {
            padding-left: 5.31rem;
            margin-bottom: .38rem;
            font-size: .75rem;
            color: #999;
            line-height: 1;
          }
          .sku_price {
            padding-left: 5.31rem;
            height: 1.88rem;
            line-height: 1.88rem;
            color: #e93b3d;
            font-size: .63rem;
            span {
              font-size: 1rem;
            }
          }
          .sku {
            padding-left: 5.31rem;
            height: 1.88rem;
            margin-top: -1.88rem;
            text-align: right;
            word-wrap: break-word;
            word-break: break-all;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .num_wrap {
              display: inline-block;
              width: 6.69rem;
              vertical-align: middle;
              span {
                color: #333;
                position: relative;
                float: left;
                width: 1.88rem;
                height: 1.88rem;
                line-height: 1.88rem;
                background: #f7f7f7;
                text-align: center;
                &.minus {
                  border-radius: .13rem 0 0 .13rem;
                  &::after {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    content: "";
                    width: .75rem;
                    height: .13rem;
                    margin: -1px 0 0 -.38rem;
                    background: #e9e9e9;
                  }
                }
                &.disabled:before {
                  background: #e9e9e9;
                }
                &.plus:before {
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  content: "";
                  background: #999;
                  width: .13rem;
                  height: .75rem;
                  margin: -.38rem 0 0 -1px;
                }
                &.plus::after {
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  content: "";
                  width: .75rem;
                  height: .13rem;
                  margin: -1px 0 0 -.38rem;
                  background: #999;
                }
              }
              input {
                position: relative;
                float: left;
                width: 1.88rem;
                height: 1.88rem;
                line-height: 1.88rem;
                background: #f7f7f7;
                text-align: center;
                &.num {
                  -webkit-appearance: none;
                  border-radius: 0;
                  width: 2.81rem;
                  height: 1.88rem;
                  line-height: normal;
                  border: 0;
                  border-left: 1px solid #fff;
                  border-right: 1px solid #fff;
                  background: #f7f7f7;
                  font-size: .75rem;
                  text-align: center;
                }
              }
            }
            .sku_num {
              line-height: 1.88rem;
              color: #999;
              font-size: .75rem;
            }
          }

          .order_info_tips {
            margin: .38rem 0;
            padding-left: 5.31rem;
            overflow: hidden;
          }
          &::before {
            content: "";
            position: absolute;
            z-index: 1;
            pointer-events: none;
            /*background-color: #e5e5e5;*/
            height: 1px;
            top: 0;
            left: -.63rem;
            right: -.63rem;
          }
          .hproduct.noclick:after {
            display: none;
          }
        }
      }
    }
    .goodsInfo {
      padding: .31rem;
      box-sizing: border-box;
      height: 12.5rem;
      li {
        float: left;
        &.course-img {
          width: 35%;
          height: 100%;
          img {
            width: 100%;
          }
        }
        &.course-infos {
          padding-left: .31rem;
          box-sizing: border-box;
          width: 65%;
          height: 100%;
          .the-price, .add-number {
            text-align: right;
          }
          .course-hint {
            font-size: .75rem;
            color: lightgray;
          }
        }
      }
    }
    .mod_btns {
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      overflow: hidden;
      margin: .94rem .63rem;
    }
    .fixed {
      // left: 0;
      // right: 0;
      max-width: 33.75rem;
      margin: 0 auto;
      background-color: #fff;
      position: relative;
      // position: fixed;
      // z-index: 101;
      // bottom: 0;
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
      .mod_btn {
        border-color: #ddd;
        display: block;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        min-width: 0;
        height: 2.88rem;
        line-height: 2.88rem;
        text-align: center;
        font-size: 1rem;
        border-radius: .25rem;
        position: relative;
        border-radius: 0;
      }
      .mod_btn.bg_1 {
        background: #e4393c;
        color: #fff;
      }
    }
    .order_block_content {
      background-color: #fff;
      padding: .5rem .63rem .69rem;
      position: relative;
      margin-top: .94rem;
      .inner_line {
        display: flex;
        padding-top: .19rem;
        font-size: .88rem;
        line-height: 1.31rem;
        position: relative;
        .title {
          min-width: 4.38rem;
          color: #999;
        }
        .content {
          width: 100%;
          color: #151515;
          display: block;
          -webkit-box-flex: 1;
          box-flex: 1;
          -webkit-flex: 1;
          flex: 1;
          .grey_tip {
            color: #999;
            margin-left: .31rem;
          }
        }
      }
    }
  }
</style>
