<template>
  <div v-if="showCouponBuy">
    <div class="show-cover-mask" @click="setShowCouponBuy(false)"></div>
    <div class='buyStyle-options'>
      <div class="select-info">您有{{canUseCoupons.length}}张可用优惠券
        <img src="//wxyx.youban.com/img/delete.png" @click="setShowCouponBuy(false)" alt="close"/>
      </div>
      <ul class="coupons-can-select">
        <li class='coupon' v-for="item in canUseCoupons" @click="wxpay(item.id)">
          <ul class="left">
            <li><span>￥</span><span>{{item.couponMoney}}</span></li>
            <li>满{{item.spendMoney}}元可用</li>
          </ul>
          <ul class="middle">
            <li>{{item.name}}</li>
            <li>有效期至:{{item.expiration}}</li>
          </ul>
          <div class="right">
            <span>使用</span>
            <img src="//udata.youban.com/webimg/wxyx/puintuan/discount1.png" alt=""/>
          </div>
        </li>
      </ul>
      <div class='coupons-buy' @click="wxpay('')">直接支付 <span>￥</span>{{willPayPrice}}<span></span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import {wxPays} from "../../api/wxPay";

  export default {
    name: "couponBuy",
    data() {
      return {
        coupons: [],
      }
    },
    methods: {
      setShowCouponBuy(bool){
        this.setShowCouponsBuy(bool)
      },
      wxpay(couponId){
        wxPays.justPay('/pay/weixin/youxue/prepare.json',{couponId:couponId, shareKey:this._GetQueryString('shareKey'),buyingid:this.buyingId})
      },
      _GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
        if (r != null) return unescape(r[2]);
        return '';
      },
      ...mapActions(['setShowCouponsBuy'])
    },
    computed: {
      ...mapGetters(['userCoupons', 'canUseCoupons', 'showCouponBuy','willPayPrice','buyingId'])
    }
  }
</script>

<style lang="scss" scoped>
  .show-cover-mask {
    position: fixed;
    z-index: 15;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .6);
  }

  .buyStyle-options {
    position: fixed;
    width: 100%;
    height: auto;
    bottom: -1px;
    left: 0;
    background: #fff;
    border-radius: .63rem .63rem 0 0;
    z-index: 1000;
    .coupons-can-select {
      .coupon {
        display: flex;
        justify-content: space-around;
        width: 20.63rem;
        height: 4.69rem;
        margin: .94rem auto;
        border-radius: .5rem;
        background: url('//udata.youban.com/webimg/wxyx/puintuan/usecoupon-bg.png') no-repeat;
        background-size: 100% 100%;
        color: #ff6971;
        font-size: .75rem;
        position: relative;
        overflow: hidden;
        & ul, div {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        ul.left {
          width: 7.19rem;
          li:first-child {
            list-style-type: none;
            span {
              &:first-child {
                font-size: .75rem;
              }
              &:last-child {
                font-size: 1.88rem;
              }
            }
          }
          li:last-child {
            list-style-type: none;
            color: #838383;
          }
        }
        ul.middle {
          text-align: left;
          width: 8.44rem;
          li:first-child {
            list-style-type: none;
            font-size: 1rem;
            color: #000000;
          }
          li:last-child {
            list-style-type: none;
            color: #838383;
          }
        }
        .right {
          width: 4.88rem;
          position: relative;
          span {
            display: block;
            width: 3.75rem;
            height: 1.31rem;
            line-height: 1.31rem;
            border-radius: .63rem;
            border: 1px solid currentColor;
            margin: auto;
          }
          img {
            position: absolute;
            top: -.25rem;
            right: -.5rem;
            width: 2.81rem;
            height: 1.88rem;
          }
        }
      }
    }
    .select-info {
      width: 100%;
      height: 2.75rem;
      line-height: 2.75rem;
      border-bottom: 1px solid rgba(0, 0, 0, .1);
      position: relative;
      img {
        position: absolute;
        top: .31rem;
        right: .31rem;
        width: 1.38rem;
        height: 1.38rem;
      }
    }
    .coupons-buy {
      width: 100%;
      height: 3.13rem;
      background: #fa4822;
      line-height: 3.13rem;
      color: #FFFFFF;
      span:first-child {
        font-size: .75rem;
      }
      span:last-child {
        font-size: 1.25rem;
      }
    }
  }


</style>
