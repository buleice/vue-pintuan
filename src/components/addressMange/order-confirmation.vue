<template>
  <div class="order-confirmation">
    <div class="m_header" style="">
      <div class="m_header_bar">
        <!--<div class="m_header_bar_back"></div>-->
        <div class="m_header_bar_title">领取奖品</div>
      </div>
    </div>
    <div class="order_info">
      <ul>
        <li class="hproduct noclick"><img
          class="photo"
          :src="prizeInfo.Fimage">
          <div class="fn">
            <strong>{{prizeInfo.Fname}}（本奖品不含礼品袋，请以收到实物为准）</strong></div>
          <!--<p class="sku_coll"> 0.370kg/件，德芙心语巧克力150g </p>-->
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
    <!--<ul class="goodsInfo">-->
    <!--<li class="course-img">-->
    <!--<img-->
    <!--src="//hiphotos.baidu.com/image/%77%3D%35%30%32%3B%63%72%6F%70%3D%30%2C%31%35%37%2C%35%30%32%2C%33%33%34/sign=c78b155c8dd6277fe91232381a037c42/b219ebc4b74543a9c2ac7b2b14178a82b80114a5.jpg"-->
    <!--alt="">-->
    <!--</li>-->
    <!--<li class="course-infos">-->
    <!--<div class="course-title">小伴龙是上的你会欸额vhi和vi会v</div>-->
    <!--<div class="add-number">*1</div>-->
    <!--<div class="the-price">￥69</div>-->
    <!--<div class="course-hint">本课程包含实物商品，需要填写收获地址</div>-->
    <!--</li>-->
    <!--</ul>-->
    <!--<img src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2…8c.4.4.6 1 .6 1.4 0 .5-.2 1-.6 1.4l-8 8c-.4.4-1 .6-1.4.6z%22/%3E%3C/svg%3E" alt="">-->
    <div class="address-manage">
      <AddressBox v-if="addressList.length>0"></AddressBox>
      <AddAddress v-else style="margin-top: 1.88rem"></AddAddress>
    </div>
    <div v-if="addressList.length>0" class="mod_btns fixed"><a href="javascript:void(0);" @click="handleSubmit"
                                                               class="mod_btn bg_1">提交</a></div>

  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import AddAddress from './addAddress';
  import AddressBox from './userAddress'
  import {Request} from "../../api/request";
  import {axiosPost} from "../../api/axios-data";

  export default {
    name: "order-confirmation",
    components: {
      AddAddress,
      AddressBox
    },
    data() {
      return {
        addAddress: false,
        prizeInfo: {},
        addressList: [],
        choosenAddress: {}
      }
    },
    created() {
      new Request('/lottery/prize/express.json', 'GET', {
        activityid: this._GetQueryString('activityid'),
        prizeid: this._GetQueryString('prizeid')
      }).returnJson().then(res => {
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
        axiosPost('/lottery/prize/express.json', {
          activityid: this._GetQueryString('activityid'),
          prizeid: this._GetQueryString('prizeid'),
          name: this.choosenAddress.name,
          phone: this.choosenAddress.phone,
          address: this.choosenAddress.address
        }).then(res => {
          if (res.data.rc == 0) {
            setTimeout(() => {
              window.location.href = "/activity/20190101"
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
      margin-top: .94rem;
      margin-bottom: .94rem;
      padding: 0 .63rem;
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
      position: fixed;
      z-index: 101;
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
        background: #e4393c;
        color: #fff;
      }
    }
  }
</style>
