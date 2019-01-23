<template>
  <div class="single-order">
    <div class="status">
      <img src="../../assets/order.png" alt=""><span>&nbsp;&nbsp;订单状态：&nbsp;&nbsp;</span><span>{{haveBuy===1||disabled===1?'已关闭':'待支付'}}</span>
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
    <div class="pay" v-if="haveBuy===0&&disabled==0" @click="switchPay()">
      马上支付
    </div>
    <div class="pay" style="background-color:#9e9e9e" v-if="disabled==1">
      订单超时，该订单已关闭！
    </div>
    <a class="pay" :href="`/purchase/index?id=${goodsid}`" v-if="haveBuy===1">
      您已经购买过该课程,快去上课吧！
    </a>
  </div>
</template>

<script>
  import { Request } from '../../api/request';
  import { newWxPay } from '../../api/newWxPay';

  export default {
    name: 'unpayorder',
    data() {
      return {
        orderdata: {},
        haveBuy:0,
        goodsid:'',
        goodstype:'',
        disabled:0,
      };
    },
    created() {
      this.initpageData();
      // window.addEventListener('pageshow', function(event) {
      //   if (event.persisted) {
      //     this.initpageData()
      //   } else {
      //     return false;
      //   }
      // })
      window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
          this.initPageData();
        } else {
          return false;
        }
      })
    },
    methods: {
      initpageData() {
        new Request('/purchase/unpaid.json', 'GET', { bid: this._GetQueryString('bid') }).returnJson().then(res => {
          this.orderdata = res.data;
          this.haveBuy=res.haveBuy;
          this.goodstype=res.data.goods_type;
          this.goodsid=res.data.goods_id;
          this.disabled=res.disabled;
        });
      },
      switchPay() {
        switch (this.orderdata.type) {
          case 0:
            this.wxPay('/pay/weixin/group/prepare/again.json', { bid: this._GetQueryString('bid') });
            break;
          case 1:
            this.wxPay('/pay/weixin/youxue/prepare/again.json', { bid: this._GetQueryString('bid') });
            break;
          case 2:
            this.wxPay('/pay/weixin/series/prepare/again.json', { bid: this._GetQueryString('bid') });
            break;
          default:
            return false;
        }
      },
      wxPay(url, params) {
        newWxPay.repeatPay(url, params).then(res => {
          this.initpageData();
          setTimeout(() => {
           if(this.goodstype==0){
             window.location.assign('/purchase/index?id='+this.orderdata.goods_id);
           }else{
             window.location.assign(`/address/index?from=index#/orderpage?id=${res.bid}&goodsid=${this.goodsid}`);
           }
          }, 500);
        }).catch(error => {
          window.alert('支付失败');
        });
      },
      _GetQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
        if (r != null) {
          return unescape(r[2]);
        }
        return '';
      }
    }
  };
</script>
<style scoped>
  .goodsInfo>>>p{
    display: -webkit-box;
    width: 11.88rem;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
</style>
<style scoped lang="scss">
  .single-order {
    .status {
      display: inline-block;
      width: 100%;
      height: 2.19rem;
      background: #f5f5f5;
      line-height: 2.19rem;
      img {
        width: 1rem;
        vertical-align: middle;
        margin-left: .75rem;
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
      padding: .75rem;
      background: #ffffff;
      border-bottom: 1px solid rgba(0, 0, 0, .1);
      img {
        width: 5.63rem;
        height: 5.63rem;
        border-radius: .63rem;
        vertical-align: middle;
      }
      ul {
        display: inline-block;
        vertical-align: top;
      }
    }
    .buyinfo {
      padding: .75rem;
      background: #ffffff;
      color: rgba(0, 0, 0, 0.7);
      li {
        margin-bottom: .94rem;
        font-size: .88rem;
        &:first-child {
          font-size: .94rem;
          color: #3c3c3c;
          font-weight: 600;
        }
      }
    }
    .order-info {
      padding: .75rem;
      margin-top: .31rem;
      background: #ffffff;
      color: #3c3c3c;
      font-size: .88rem;
      li {
        margin-bottom: .94rem
      }
    }
    .pay {
      line-height: 3rem;
      text-align: center;
      background: #ff4e09;
      color: #ffffff;
      position: fixed;
      bottom: 0;
      width: 100%;
    }

  }
</style>
