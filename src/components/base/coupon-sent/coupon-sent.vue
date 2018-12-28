<template>
  <div class="main" v-if="couponSent.length>0&&showCouponSent">
    <div class="coupons-sent">
        <h3>小伴龙优学元旦福利券</h3>
        <div class="coupon-list1" v-if="couponSent.length==1">
            <li>满{{couponSent[0].spendMoney}}元使用</li>
            <li>&yen;<span>{{couponSent[0].couponMoney}}</span></li>
        </div>
        <div class="coupon-list2" v-else>
          <li v-for="(item,index) in couponSent" key="index">
            <div>&yen;<span>{{item.couponMoney}}</span></div>
            <div>满{{item.spendMoney}}元使用</div>
          </li>
        </div>
      <a  href="javascript:void(0);" @click="showCouponSent=false" class="buttons">立即使用</a>
    </div>
  </div>
</template>

<script>
    export default {
        name: "coupon-sent",
      props:{
        couponSent:{
          type:Array,
          default:()=>[]
        },
      },
      data(){
        return{
          showCouponSent:true
        }
      }
    }
</script>

<style lang="scss" scoped>
  .main{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background:rgba(0,0,0,.8);
    z-index: 1000;
    .coupons-sent{
      background: url("//udata.youban.com/webimg/wxyx/puintuan/common/20190101/coupons-bg.png") no-repeat;
      background-size: 100%;
      width: 23.44rem;
      height: 31.63rem;
      margin: auto;
      h3{
        position: relative;
        top: 17.5rem;
        color: #fee430;
      }
      .coupon-list1{
        background: url("//udata.youban.com/webimg/wxyx/puintuan/common/20190101/coupon-bg-22.png") no-repeat;
        background-size: 100%;
        width: 13rem;
        height: 5.63rem;
        position: relative;
        margin: auto;
        top: 18.75rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        li{
          list-style-type: none;
          font-size: .75rem;
          &:first-child{
            width: 40%;
          }
          &:last-child{
            width: 60%;
            color: #ce3c39;
            font-size: .94rem;
            span{
              font-size: 1.88rem;
              font-weight: bold;
            }
          }
        }
      }
      .coupon-list2{
        width: 15.88rem;
        margin: auto;
        display: flex;
        justify-content: space-around;
        position: relative;
        top: 18.13rem;
        li{
          list-style-type: none;
          box-sizing: border-box;
          padding: .63rem 0;
          width: 4.88rem;
          height: 5.88rem;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          background: url("//udata.youban.com/webimg/wxyx/puintuan/common/20190101/1.png") no-repeat;
          background-size: 100%;
          div{
            margin: .63rem 0;
            font-size: .75rem;
            &:first-child{
              color: #ff481d;
              span{
                font-size: 1rem;
                font-weight: bold;
              }
            }
            &:last-child{
              color: #3c3c3c;
            }
          }
        }
      }
      .buttons{
        display: block;
        text-decoration: none;
        color: #ffffff;
        margin: auto;
        width: 14.38rem;
        height: 2.5rem;
        border-radius: 1.25rem;
        line-height: 2.5rem;
        background: #ffbc09;
        position: relative;
        top: 20rem;
        box-shadow: 0 .19rem 0px 0px rgba(0, 0, 0, 0.2);
      }
    }
  }

</style>
