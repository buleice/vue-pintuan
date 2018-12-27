<template>
  <div class="main" v-if="couponsSent.length>0&&showCouponSent">
    <div class="coupons-sent">
        <h3>小伴龙优学元旦福利券</h3>
        <div class="coupon-list1" v-if="couponsSent.length==1">
            <li>满{{couponsSent[0].spendMoney}}元使用</li>
            <li>&yen;<span>{{couponsSent[0].couponMoney}}</span></li>
        </div>
        <div class="coupon-list2" v-else>
          <li v-for="(item,index) in couponsSent" key="index">
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
        couponsSent:{
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
      width: 375px;
      height: 506px;
      margin: auto;
      h3{
        position: relative;
        top: 280px;
        color: #fee430;
      }
      .coupon-list1{
        background: url("//udata.youban.com/webimg/wxyx/puintuan/common/20190101/coupon-bg-22.png") no-repeat;
        background-size: 100%;
        width: 208px;
        height: 90px;
        position: relative;
        margin: auto;
        top: 300px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        li{
          list-style-type: none;
          font-size: 12px;
          &:first-child{
            width: 40%;
          }
          &:last-child{
            width: 60%;
            color: #ce3c39;
            font-size: 15px;
            span{
              font-size: 30px;
              font-weight: bold;
            }
          }
        }
      }
      .coupon-list2{
        width: 254px;
        margin: auto;
        display: flex;
        justify-content: space-around;
        position: relative;
        top: 290px;
        li{
          list-style-type: none;
          box-sizing: border-box;
          padding: 10px 0;
          width: 78px;
          height: 94px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          background: url("//udata.youban.com/webimg/wxyx/puintuan/common/20190101/1.png") no-repeat;
          background-size: 100%;
          div{
            margin: 10px 0;
            font-size: 12px;
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
        width: 230px;
        height: 40px;
        border-radius: 20px;
        line-height: 40px;
        background: #ffbc09;
        position: relative;
        top: 320px;
        box-shadow: 0 3px 0px 0px rgba(0, 0, 0, 0.2);
      }
    }
  }

</style>
