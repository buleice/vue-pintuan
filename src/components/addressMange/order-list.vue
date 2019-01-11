<template>
  <div>
    <ul class="orders">
      <li class="order" v-for="(item,index) in orderData" :key="index">
        <div class="title"><span>订单号：{{item.bill_id.substr(7,15)}}</span><span :class="{'active' : item.status==1}">{{item.status==1?'已发货':'待发货'}}</span>
        </div>
        <ul class="data"
            @click="item.address_filled==0? (showAlertDialog=true,clickId=item.goods_id):$router.push({path:'/orderdetail',query:{id:item.goods_id}})">
          <li class="left"><img :src="item.goods_image"
                                alt=""></li>
          <li class="right">
            <div class="line_1"><span>{{item.goods_name}}</span></div>
            <p class="line_2">{{item.goods_desc}}</p>
            <div class="line_3">下单时间：{{item.time}}</div>
            <div class="line_4">&times;1</div>
            <b class="line_5">&yen;{{item.price}}</b>
          </li>
        </ul>
      </li>
    </ul>
    <div v-if="orderData.length<=0" class="default-img">
      <img src="//udata.youban.com/webimg/wxyx/puintuan/double11_gift_noget.png" alt="">
      <p>订单空空如也~~</p>
    </div>
    <WeixinDialog :alertDesc="alertDesc" :showAlertDialog="showAlertDialog" @AOk="delAok"></WeixinDialog>
  </div>
</template>

<script>
  import WeixinDialog from '../base/weixin-dialog/weixin-dialog';
  import { Request } from '../../api/request';

  export default {
    name: 'order-list',
    data() {
      return {
        orderData: [],
        alertDesc:'您还有实物商品未填写收获地址,现在去填写地址？',
        showAlertDialog:false,
        clickId:''
      };
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        document.title = '我的订单';
        vm.initPageData();
      });
    },
    methods: {
      initPageData() {
        new Request('/order/list.json', 'GET').returnJson().then(res => {
          this.orderData = res.list;
        });
      },
      _GetQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
        if (r != null) {
          return unescape(r[2]);
        }
        return '';
      },
      delAok(){
        this.showAlertDialog=false;
        this.$router.push({path:'/orderpage',query:{id:this.clickId}})
      },
    },
    components:{
      WeixinDialog
    }
  };
</script>

<style scoped lang="scss">
  .orders {
    font-size: .88rem;
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
      background: #FFFFFF;
      .title {
        height: 2.69rem;
        line-height: 2.69rem;
        position: relative;
        box-sizing: border-box;
        padding: 0 .63rem;
        &::before {
          content: '';
          display: block;
          position: absolute;
          width: .31rem;
          height: 1.5rem;
          background: #ff4e09;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
        &::after {
          content: '';
          display: block;
          position: absolute;
          width: 21.88rem;
          margin: auto;
          height: 0;
          bottom: 0;
          border-bottom: 1px solid rgba(0, 0, 0, .1);
        }
        span {
          &:first-child {
            float: left;
          }
          &:last-child {
            display: inline-block;
            line-height: 1.31rem;
            float: right;
            width: 3.75rem;
            height: 1.31rem;
            color: #f69f00;
            border: 1px solid #f69f00;
            border-radius: .63rem;
            text-align: center;
            margin-top: .63rem;
          }
          &.active {
            color: #27b77e;
            border: 1px solid currentColor;
          }
        }
      }
      .data {
        height: 6.88rem;
        box-sizing: border-box;
        padding: .63rem .81rem;
        position: relative;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
        li {
          float: left;
          &.left {
            img {
              width: 5.31rem;
              height: 5.31rem;
            }
          }
          &.right {
            height: 5.31rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-sizing: border-box;
            padding-left: .81rem;
            .line_1 {
              width: auto;
              span {
                font-size: 1rem;
                font-weight: 500;
                display: inline-block;
                max-width: 13.13rem;
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
              width: 11.88rem;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
            .line_3 {
              color: #707070;
            }
            .line_4 {
              position: absolute;
              top: 1.88rem;
              right: .81rem;
              color: #707070;
            }
            .line_5{
              position: absolute;
              right: .81rem;
              font-weight: 500;
            }
          }
        }
      }

    }
  }
  .default-img{
    text-align: center;
    img{
      margin-top:33%;
      width: 5rem;
    }
  }
</style>
