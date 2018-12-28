<template lang="html">
  <div class="coupon-page">
    <ul class="nav">
      <li :class="[tabIndex==0?'tabactive':'','tab']" @click='toggleTabs(0)'>未使用({{canuse.length}})</li>
      <li :class="[tabIndex==1?'tabactive':'','tab']" @click='toggleTabs(1)'>已使用({{hasused.length}})</li>
      <li :class="[tabIndex==2?'tabactive':'','tab']" @click='toggleTabs(2)'>已过期({{useless.length}})</li>
    </ul>
    <div v-if="coupons.length<=0">
      <img src="//udata.youban.com/webimg/wxyx/puintuan/double11_gift_noget.png" style="margin-top:33%;" alt="">
      <p style="font-size:1.25rem;">{{alertContent}}</p>
    </div>
    <ul class="coupons" v-else >
      <li :class="[changeCouponStyle(),'coupon']" v-for="coupon in coupons">
        <ul class="value">
          <li>
            <sub>&yen;</sub><span>{{coupon.couponMoney}}</span>
          </li>
          <li>
            <span>满{{coupon.spendMoney}}元可用</span>
          </li>
        </ul>
        <ul class="right">
          <li class="info">
            {{coupon.name}}
          </li>
          <li class="expiration">
            <span>有效期至：{{coupon.expiration}}</span>
          </li>
        </ul>

        <!-- <a @click="$router.push({name:'UseCoupon',params:{couponId:coupon.id}})" class="exchange-btn">
          去使用
        </a> -->
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
      canuse:[],
      hasused:[],
      useless:[],
      tabIndex:0,
      alertContent:'当前没有可用优惠券~~'
    }
  },
  created() {
    new Request('/coupon/list.json?', "GET",{status:0}).returnJson().then(res => {
      this.coupons = res.list1;
      this.canuse=res.list1;
      this.hasused=res.list2;
      this.useless=res.list3;
    })
  },
  methods:{
    toggleTabs(index){
      this.tabIndex=index;
      switch(index){
        case 0:this.coupons=this.canuse,this.alertContent='当前没有可用优惠券~~';break;
        case 1:this.coupons=this.hasused,this.alertContent='您还没有使用过的优惠券~~';break;
        case 2:this.coupons=this.useless,this.alertContent='暂无失效的优惠券~~';break;
        default:return;
      }
    },
    changeCouponStyle(){
      switch(this.tabIndex){
        case 0: return 'canuse';break;
        case 1: return 'hasused';break;
        case 2: return 'useless';break;
        default:return 'canuse'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.coupon-page{
  .nav{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 2.81rem;
    background: #fff;
    border-bottom: 1px solid rgba(0,0,0,.2);
    .tab{
      line-height: 2.81rem;
      position: relative;
    }
    .tabactive{
      color: #f69f00;
      &::after{
        content: '';
        display: block;
        position: absolute;
        bottom: -2px;
        height: 0;
        width: 100%;
        border-top: .13rem solid #f69f00;
      }
    }
  }
  .coupons {
    width: 100%;
    padding: 0 1rem;
    box-sizing: border-box;
    margin-top: 1rem;
      .canuse{
          background: url("//udata.youban.com/webimg/wxyx/puintuan/canuse-coupon-bg.png") no-repeat;
      }
      .hasused{
          background: url("//udata.youban.com/webimg/wxyx/puintuan/used-coupon-bg.png") no-repeat;
      }
      .useless{
            background: url("//udata.youban.com/webimg/wxyx/puintuan/nouse-coupon-bg.png") no-repeat;
      }
      .coupon {
          width: 21.44rem;
          height: 6.25rem;
          background-size: 100% 100%;
          margin-bottom: 1.25rem;
          color: #fff;
        display: flex;
        justify-content: space-around;
        font-size: .75rem;
          ul {
              box-sizing: border-box;
              text-align: left;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              &.value {
                  text-align: left;
                  width: 38%;
                  border-right: 1px dashed #fff;
                  
                  sub{
                    font-size: 1.2rem;
                  }
                  li:first-child{
                    span{
                      font-size: 2.5rem;
                    }
                  }
              }
              &.right{
                width: 62%;
                text-align: left;
                li.expiration{
                  margin-top: .25rem;
                }
                li.info{
                  font-size:1.38rem;
                  margin-top: .25rem;
                }
              }
          }
      }
  }
}

</style>
