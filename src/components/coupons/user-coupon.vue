<template lang="html">
  <div class="coupon-page">
    <div v-if="coupons.length<=0">
      <img src="//udata.youban.com/webimg/wxyx/puintuan/double11_gift_noget.png" style="margin-top:33%;" alt="">
      <p style="font-size:1.25rem;">当前没有兑换券~~</p>
    </div>
    <ul class="coupons" v-else >
      <li class="coupon" v-for="coupon in coupons">
        <div class="value">
          <sub>&yen;</sub><span>{{coupon.value}}</span>
        </div>
        <div class="expiration">
          <span>有效期：至{{coupon.expiration}}</span>
        </div>
        <div class="info">
          可兑换小伴龙优学{{coupon.value}}元以下的任意课程
        </div>
        <a @click="$router.push({name:'UseCoupon',params:{couponId:coupon.id}})" class="exchange-btn">
          去使用
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  Request
} from '../../api/request'
export default {
  name: 'MyCoupons',
  data() {
    return {
      coupons: [],
    }
  },
  created() {
    new Request('/voucher/list.json', "POST").returnJson().then(res => {
      this.coupons = res.list;
    })
  }
}
</script>
<style lang="scss" scoped>
.coupon-page{
  .coupons {
    width: 100%;
    padding: 0 1rem;
    box-sizing: border-box;
    margin-top: 1rem;
      .coupon {
          width: 21.44rem;
          height: 6.25rem;
          background: url("//udata.youban.com/webimg/wxyx/puintuan/coupon-bg.png") no-repeat;
          background-size: 100% 100%;
          position: relative;
          margin-bottom: 1.25rem;
          div {
              box-sizing: border-box;
              padding-left: 5.31rem;
              text-align: left;
              color: #9e9e9e;
              font-size: .75rem;
              &.value {
                  color: #f49500;
                  font-size: 1rem;
                  text-align: left;
                  padding-top: .75rem;
                  span {
                      font-size: 2rem;
                      margin-left: 0.19rem;
                  }
              }
              &.expiration{
                margin-top: .25rem;
              }
              &.info{
                margin-top: .25rem;
              }
          }
          .exchange-btn{
            display: inline-block;
            color: #f49500;
            border: 1px solid currentColor;
            border-radius: 1.75rem;
            line-height: 1.63rem;
            padding: 0 .88rem;
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
          }
      }
  }
}

</style>
