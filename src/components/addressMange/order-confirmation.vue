<template>
  <div class="order-confirmation">
    <div class="m_header" style="">
      <div class="m_header_bar">
        <div class="m_header_bar_back"></div>
        <div class="m_header_bar_title">确认订单</div>
      </div>
    </div>
    <div class="order_info">
      <ul>
        <li class="hproduct noclick"><img
          class="photo"
          src="//img10.360buyimg.com/mobilecms/s117x117_jfs/t27358/149/1063060879/191448/a131fd6f/5bc0493bNf91179ee.jpg!q70.dpg.webp">
          <div class="fn">
            <strong>德芙 Dove心语巧克力礼盒 糖果 巧克力 礼品 圣诞节生日礼物150g（本产品不含礼品袋，请以收到实物为准）</strong></div>
          <p class="sku_coll"> 0.370kg/件，德芙心语巧克力150g </p>
          <p class="sku_price">&yen;<span>59</span>.00 </p>
          <div class="sku">
            <div class="num_wrap">
              <!--<span class="minus disabled" ></span> -->
              <input class="num"  type="tel" value="×1">
              <!--<span class="plus"></span>-->
            </div>
            <div class="sku_num">&times;1</div>
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
      <AddressBox v-if="!addAddress"></AddressBox>
      <AddAddress v-else style="margin-top: 30px"></AddAddress>
    </div>
    <div v-if="!addAddress" class="mod_btns fixed"><a  href="javascript:void(0);" class="mod_btn bg_1">提交</a></div>

  </div>
</template>

<script>
  import AddAddress from './addAddress';
  import AddressBox from './userAddress'

  export default {
    name: "order-confirmation",
    components: {
      AddAddress,
      AddressBox
    },
    data(){
      return{
        addAddress:false
      }
    },
    methods:{
      hrefTo(name,params){
        this.$router.push({name:name,params:params})
      }
    }
  }
</script>

<style scoped lang="scss">
  .order-confirmation {
    .m_header {
      .m_header_bar {
        position: relative;
        height: 45px;
        line-height: 45px;
        text-align: center;
        font-size: 16px;
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
          width: 42px;
          height: 45px;
          &::after {
            content: "";
            display: block;
            width: 12px;
            height: 12px;
            border-top: 1px solid #848689;
            border-left: 1px solid #848689;
            -webkit-transform-origin: 50%;
            transform-origin: 50%;
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
            position: absolute;
            top: 50%;
            left: 18px;
            margin-top: -6px;
          }
        }
        .m_header_bar_menu {
          position: absolute;
          top: 0;
          right: 0;
          width: 42px;
          height: 45px;
          background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkAgMAAACcbnALAAAADFBMV…jUeAFFjBRTYPYyQt2CEKO/Kd+gLEagAXAx3DpK4KwZDBgAAAh+brVZ2vz9AAAAAElFTkSuQmCC) no-repeat 50%;
          background-size: 18px;
        }
      }
    }
    .order_info {
      margin-top: 15px;
      margin-bottom: 15px;
      padding: 0 10px;
      background: #fff;
      position: relative;
      ul {
        list-style: none;
        .hproduct {
          position: relative;
          min-height: 75px;
          padding: 0;
          font-size: 12px;
          padding-top: 15px;
          img {
            border: 0 none;
            vertical-align: top;
            &.photo {
              width: 75px;
              height: 75px;
              position: absolute;
              top: 15px;
              left: 0;
            }
          }
          .fn {
            padding-left: 85px;
            color: #333;
            line-height: 20px;
            margin-bottom: 5px;
            font-size: 14px;
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
                margin-top: -2px;
                margin-right: 5px;
                height: 14px;
              }
            }

          }
          .sku_coll {
            padding-left: 85px;
            margin-bottom: 6px;
            font-size: 12px;
            color: #999;
            line-height: 1;
          }
          .sku_price {
            padding-left: 85px;
            height: 30px;
            line-height: 30px;
            color: #e93b3d;
            font-size: 10px;
            span {
              font-size: 16px;
            }
          }
          .sku {
            padding-left: 85px;
            height: 30px;
            margin-top: -30px;
            text-align: right;
            word-wrap: break-word;
            word-break: break-all;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .num_wrap {
              display: inline-block;
              width: 107px;
              vertical-align: middle;
              span {
                color: #333;
                position: relative;
                float: left;
                width: 30px;
                height: 30px;
                line-height: 30px;
                background: #f7f7f7;
                text-align: center;
                &.minus {
                  border-radius: 2px 0 0 2px;
                  &::after{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    content: "";
                    width: 12px;
                    height: 2px;
                    margin: -1px 0 0 -6px;
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
                  width: 2px;
                  height: 12px;
                  margin: -6px 0 0 -1px;
                }
                &.plus::after{
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  content: "";
                  width: 12px;
                  height: 2px;
                  margin: -1px 0 0 -6px;
                  background: #999;
                }
              }
              input{
                position: relative;
                float: left;
                width: 30px;
                height: 30px;
                line-height: 30px;
                background: #f7f7f7;
                text-align: center;
                &.num {
                  -webkit-appearance: none;
                  border-radius: 0;
                  width: 45px;
                  height: 30px;
                  line-height: normal;
                  border: 0;
                  border-left: 1px solid #fff;
                  border-right: 1px solid #fff;
                  background: #f7f7f7;
                  font-size: 12px;
                  text-align: center;
                }
              }
            }
            .sku_num {
              line-height: 30px;
              color: #999;
              font-size: 12px;
            }
          }

          .order_info_tips {
            margin: 6px 0;
            padding-left: 85px;
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
            left: -10px;
            right: -10px;
          }
          .hproduct.noclick:after {
            display: none;
          }
        }
      }
    }
    .goodsInfo {
      padding: 5px;
      box-sizing: border-box;
      height: 200px;
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
          padding-left: 5px;
          box-sizing: border-box;
          width: 65%;
          height: 100%;
          .the-price, .add-number {
            text-align: right;
          }
          .course-hint {
            font-size: 12px;
            color: lightgray;
          }
        }
      }
    }
    .mod_btns{
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      overflow: hidden;
      margin: 15px 10px;
    }
    .fixed {
      left: 0;
      right: 0;
      max-width: 540px;
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
        height: 46px;
        line-height: 46px;
        text-align: center;
        font-size: 16px;
        border-radius: 4px;
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
