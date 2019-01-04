<template>
  <ul class="orders">
    <li class="order" v-for="(item,index) in orderData" :key="index">
      <div class="title"><span>订单号：{{item.bill_id.substr(7,15)}}</span><span :class="{'active' : item.status==1}">{{item.status==1?'已发货':'未发货'}}</span>
      </div>
      <ul class="data"
          @click="item.address_filled==1? $router.push({path:'/orderpage',query:{id:item.goods_id,bid:item.bill_id}}):$router.push({path:'/orderdetail',query:{id:item.goods_id,bid:item.bill_id}})">
        <li class="left"><img src="http://cliveimages.youban.com/20181015/3044105140Fi8CBvh88l8h5B8-JDfaylvVn-bi.png"
                              alt=""></li>
        <li class="right">
          <div class="line_1"><span>{{item.goods_name}}</span><b>&yen;{{item.price}}</b></div>
          <p class="line_2">{{item.goods_desc}}</p>
          <div class="line_3">下单时间：{{item.time}}</div>
          <div class="line_4">&times;1</div>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>

  import {Request} from "../../api/request";

  export default {
    name: "order-list",
    data() {
      return {
        orderData: []
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        document.title="我的订单"
      })
    },
    created() {
      new Request('/order/list.json', "GET").returnJson().then(res => {
        this.orderData = res.list;
      })
    },
    methods: {
      _GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
        if (r != null) return unescape(r[2]);
        return '';
      },
    }
  }
</script>

<style scoped lang="scss">
  .orders {
    font-size: 14px;
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
    .order {
      /*height: 152px;*/
      .title {
        height: 43px;
        line-height: 43px;
        position: relative;
        box-sizing: border-box;
        padding: 0 10px;
        &::before {
          content: '';
          display: block;
          position: absolute;
          width: 5px;
          height: 24px;
          background: #ff4e09;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
        &::after {
          content: '';
          display: block;
          position: absolute;
          width: 350px;
          margin: auto;
          height: 0;
          bottom: 0;
          border-bottom: 1px solid rgba(0, 0, 0, .2);
        }
        span {
          &:first-child {
            float: left;
          }
          &:last-child {
            display: inline-block;
            line-height: 21px;
            float: right;
            width: 60px;
            height: 21px;
            color: #f69f00;
            border: 1px solid #f69f00;
            border-radius: 10px;
            text-align: center;
            margin-top: 10px;
          }
          &.active {
            color: #f69f00;
            border: 1px solid #27b77e;
          }
        }
      }
      .data {
        height: 110px;
        box-sizing: border-box;
        padding: 10px 13px;
        position: relative;
        border-bottom: 1px solid rgba(0, 0, 0, .2);
        li {
          float: left;
          &.left {
            img {
              width: 85px;
              height: 85px;
            }
          }
          &.right {
            height: 85px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-sizing: border-box;
            padding-left: 13px;
            .line_1 {
              width: 250px;
              span {
                font-size: 16px;
                font-weight: 500;
                display: inline-block;
                max-width: 210px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
              b {
                float: right;
                font-weight: 500;
              }
            }
            .line_2 {
              display: -webkit-box;
              width: 190px;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
            .line_3 {
              color: #707070;
            }
            .line_4 {
              position: absolute;
              top: 30px;
              right: 13px;
              color: #707070;
            }
          }
        }
      }

    }
  }
</style>
