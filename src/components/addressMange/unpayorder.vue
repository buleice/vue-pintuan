<template>
  <div class="single-order">
    <div class="status">
      <img src="../../assets/order.png" alt=""><span>&nbsp;&nbsp;订单状态：&nbsp;&nbsp;</span><span>{{orderdata.status==1?'已支付':'待支付'}}</span>
    </div>
    <div class="goodsInfo">
      <img :src="orderdata.image" alt="">
      <ul>
        <li>{{orderdata.title}}</li>
        <li v-html="orderdata.subtitle"></li>
      </ul>
    </div>
    <ul class="buyinfo">
      <li>课程名称：{{orderdata.title}}</li>
      <li>价格：&yen;{{orderdata.price}}</li>
      <li>数量：{{orderdata.sum}}</li>
      <li>总价：&yen;{{orderdata.total_price}}</li>
    </ul>
    <ul class="order-info">
      <li>订单号：{{orderdata.bill_id}}</li>
      <li>支付时间：{{orderdata.time}}</li>
      <li>支付方式：{{orderdata.payway}}</li>
    </ul>
    <div class="pay" v-if="orderdata.status==='0'" @click="testPay">
      马上支付
    </div>
  </div>
</template>

<script>
  import { Request } from '../../api/request';
  import { newWxPay } from '../../api/newWxPay';

  export default {
    name: 'unpayorder',
    data() {
      return {
        orderdata: {}
      };
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.initpageData();
      });
    },
    created() {

    },
    methods: {
      initpageData() {
        new Request('/purchase/unpaid.json', 'GET', { bid: this.$route.query.bid }).returnJson().then(res => {
          this.orderdata = res.data;
        });
      },
      testPay(){
        newWxPay.repeatPay('/pay/weixin/group/prepare/again.json', {
         bid:this.$route.query.bid
        }).then(res=>{
          console.log(res)
        }).catch(error=>{
          console.log(error)
        });;
      }
    }
  };
</script>

<style scoped lang="scss">
  .single-order {
    .status {
      display: inline-block;
      width: 100%;
      height: 35px;
      background: #f5f5f5;
      line-height: 35px;
      img {
        width: 16px;
        vertical-align: middle;
        margin-left: 12px;
      }
      span {
        vertical-align: middle;
        &:last-child {
          color: #ff4e09;
        }
      }
    }
    .goodsInfo {
      box-sizing: border-box;
      padding: 12px;
      background: #ffffff;
      border-bottom: 1px solid rgba(0, 0, 0, .1);
      img {
        width: 90px;
        height: 90px;
        border-radius: 10px;
        vertical-align: middle;
      }
      ul {
        display: inline-block;
        vertical-align: top;
        li:last-child {
          display: -webkit-box;
          width: 11.88rem;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
    .buyinfo {
      padding: 12px;
      background: #ffffff;
      color: rgba(0, 0, 0, 0.7);
      li {
        margin-bottom: 15px;
        font-size: 14px;
        &:first-child {
          font-size: 15px;
          color: #3c3c3c;
          font-weight: 600;
        }
      }
    }
    .order-info {
      padding: 12px;
      margin-top: 5px;
      background: #ffffff;
      color: #3c3c3c;
      font-size: 14px;
      li {
        margin-bottom: 15px
      }
    }
    .pay {
      line-height: 48px;
      text-align: center;
      background: #ff4e09;
      color: #ffffff;
      position: fixed;
      bottom: 0;
      width: 100%;
    }

  }
</style>
