<template>
  <div class="order-confirmation">
    <div class="order_info">
      <ul>
        <li class="hproduct noclick"><img
          class="photo"
          :src="goodsInfo.image">
          <div class="fn">
            <strong>{{goodsInfo.name}}</strong></div>
            <p class="sku_coll" v-html="goodsInfo.desc">  </p>
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
    <div class="addressbanner">收获地址</div>
    <div class="address-manage">
      <AddAddress></AddAddress>

      <AddAddress @submitorder="handleSubmitOrder" v-if="!defaultAddress.name&&shippingAddress.length<=0"></AddAddress>
      <!--<SelectAddress></SelectAddress>-->
    </div>
    <div v-if="defaultAddress.name&&shippingAddress.length>0" class="mod_btns fixed"><a href="javascript:void(0);" @click="handleSubmit"
                                                                                        class="mod_btn bg_1">提交订单</a></div>

  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import AddAddress from './addAddress';
  import AddressBox from './userAddress'
  import {Request} from "../../api/request";
  import {axiosPost} from "../../api/axios-data";
  import SelectAddress from './select-address'

  export default {
    name: "order-confirmation",
    components: {
      AddAddress,
      AddressBox,
      SelectAddress
    },
    data() {
      return {
        addAddress: false,
        prizeInfo: {},
        addressList: [],
        choosenAddress: {},
        goodsInfo:{}
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        document.title="提交订单"
      })
    },
    created() {
      new Request('/order/address.json', 'GET', {
        goodsid: this.$route.query.id
      }).returnJson().then(res => {
        // if(res.filled==1){
        //   this.$router.push({path:'/orderdetail',query:{id:this.$route.query.id,bid:this.$route.query.bid}});
        //   return;
        // }
        this.goodsInfo=res.goodsInfo;
        this.setShippingAddress(res.list);
        if (res.list.length > 0) {
          this.addressList = res.list;
          if (!(res.list.find(item => item.default === 1))) {
            this.choosenAddress = res.list[0]
            this.setDefaultAddress(res.list[0]);
          } else {
            this.choosenAddress = res.list.find(item => item.default === 1)
            this.setDefaultAddress(res.list.find(item => item.default === 1))
          }
        }
        this.prizeInfo = res.prizeInfo
      })
    },
    methods: {
      hrefTo(name, params) {
        this.$router.push({name: name, params: params})
      },
      handleSubmit() {
        axiosPost('/order/address.json', Object.assign({},{
          goodsid: this.$route.query.id,
          bid:this.$route.query['bid']
        },this.defaultAddress)).then(res => {
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
      handleSubmitOrder(){
        console.log(11111)
        this.handleSubmit()
      },
      ...mapActions(['setDefaultAddress', 'setShippingAddress'])
    },
    computed: {
      ...mapGetters(['shippingAddress','defaultAddress'])
    }
  }
</script>

<style scoped lang="scss">
  .order-confirmation {
    width: 100%;
    height: 100%;
    background: #f5f5f5;
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
      padding: 0 .63rem .94rem;
      background: #fff;
      position: relative;
      ul {
        list-style: none;
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
    .addressbanner{
      width: 100%;
      height: 34px;
      line-height: 34px;
      font-size: 14px;
      box-sizing: border-box;
      padding-left: 28px;
      position: relative;
      &::before{
        content: '';
        display: block;
        width: 18px;
        height: 18px;
        background: url('data:image/png;base64,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') no-repeat;
        background-size: 100%;
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);

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
      left: 0;
     right: 0;
      max-width: 33.75rem;
      margin: 0 auto;
      background-color: #fff;
      position: relative;
    position: fixed;
       z-index: 70;
      bottom: 0;
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
        background: #ff4e09;
        color: #fff;
      }
    }
  }
</style>
