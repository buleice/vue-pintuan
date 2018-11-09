<template lang="html">
<div class="festival">
  <div class="festival-body">
    <img src="//udata.youban.com/webimg/wxyx/puintuan/1111/1111ad.png" v-if="!canGet" alt="">
    <div class="ad2" v-else>您已获得了{{coupons}}兑换券</div>
    <div class="course-box"  v-if="!canGet">
       <div :class="['course_f', myPurchases[0]&&myPurchases[0].status==1? 'course_f-bg2':'course_f-bg1']">
         <img v-if="myPurchases[0]" :src="myPurchases[0].icon" alt="">
         <span v-if="myPurchases[0]&&myPurchases[0].status==0" class="prgress-label"></span>
         <div v-if="myPurchases[0]&&myPurchases[0].status==0" class="cover-mask"></div>
       </div>
       <div :class="['course_s', myPurchases[1]&&myPurchases[1].status==1? 'course_s-bg2':'course_s-bg1']">
        <img v-if="myPurchases[1]" :src="myPurchases[1].icon" alt="">
        <span v-if="myPurchases[1]&&myPurchases[1].status==0" class="prgress-label"></span>
        <div v-if="myPurchases[1]&&myPurchases[1].status==0" class="cover-mask"></div>
       </div>
    </div>
    <div class="buy-prompt" v-if="myPurchases[1]&&myPurchases[1].status==0">
      完成拼团，即可获得课程兑换券
    </div>
    <div class="buy-prompt" v-if="!canGet">
      再报名{{2-myPurchases.length}}门课程即可获得兑换券
    </div>
    <a v-if="!canGet"  href="#goodsList" class="buy-button">立即购买</a>
    <div class="coupon-box">
      <img class="coupon" :src="couponImg" alt="">
      <div class="label" v-if="myPurchases[1]&&myPurchases[1].status==1&&coupons>1">
          <span>&times</span><span>{{coupons}}</span>
      </div>
    </div>
    <div class="ad-title2"  v-if="canGet">
      购买两个课程可以再获得一张兑换券
    </div>
  </div>

  <div class="festival-footer" v-if="!canGet" id="goodsList">
    <img class="footer-title-img" src="//udata.youban.com/webimg/wxyx/puintuan/1111/footer-title.png" alt="">
    <div class="myGroup" v-for="item in goodsList">
      <a :href="'/purchase/index?id='+item.id+'&isNew='+isNew" class="a_box" target="_blank">
        <img  :alt="item.title" :src="item['banner'][0]">
        <div class="groupInfo">
          <div class="groupInfo__avatarbox" style="margin-left:0.63rem">
            <div>
               {{item.title}}
            </div>
          </div>
          <div  class="groupInfo_buttton">开团价 ￥{{item.price}}</div>
        </div>
      </a>
      </div>
  </div>

  <div class="festival-footer" v-else>
    <img class="footer-title-img" src="//udata.youban.com/webimg/wxyx/puintuan/1111/footer-title2.png" alt="">
    <div class="myGroup" v-for="item in exchangeList">
      <a :href="'/purchase/index?id='+item.id+'&exchange=1&isNew='+isNew" class="a_box" target="_blank">
        <img  :alt="item.title" :src="item['banner'][0]">
        <div class="groupInfo">
          <div class="groupInfo__avatarbox" style="margin-left:0.63rem">
            <div>
               {{item.title}}
            </div>
          </div>
          <div  class="groupInfo_buttton">开团价 ￥{{item.price}}</div>
        </div>
      </a>
      </div>
  </div>

  <div class="cover-layer" v-if="!isValid">
    <div class="">
      活动已结束！
    </div>
  </div>
</div>
</template>

<script>
import {Request} from '../api/request'
import wx from 'weixin-js-sdk';
export default {
  name:"Festival",
  components:{
  },
  data(){
    return{
      isValid:true,
      goodsList:[],
      adImg:'//udata.youban.com/webimg/wxyx/puintuan/1111/1111ad.png',
      titleImg:'//udata.youban.com/webimg/wxyx/puintuan/1111/footer-title.png',
      couponImg:'//udata.youban.com/webimg/wxyx/puintuan/1111/nonactivatedCoupon.png',
      myPurchases:[],
      exchangeList:[],
      canGet:false,
      coupons:1,
      isNew:0,
      apilist:[
       'onMenuShareTimeline',
       'onMenuShareQQ',
       'onMenuShareAppMessage'
     ],
      WXSHDATA:{
        title: '小伴龙优学双十一钜惠，课程买二送一！',
        link: 'https://wxyx.youban.com/activity/20181111',
        imgUrl: 'https://udata.youban.com/webimg/wxyx/puintuan/1111/shareIcon.png',
        type: "link",
        dataUrl: "",
        desc: '精品优质线上课程，助力宝宝更好成长！',
      }
    }
  },
  created(){
        new Request("/activity/20181111.json","POST").returnJson().then(res=>{
          this.goodsList=res.goodsList;
          this.myPurchases=res.myPurchases;
          this.isValid=res.isValid;
          this.exchangeList=res.exchangeList;
          this.coupons=res.voucher.length;
          if(res.voucher.length>=1){
            this.canGet=true;
            this.couponImg="//udata.youban.com/webimg/wxyx/puintuan/1111/activatedCoupon.png";
          }
          if (res.myPurchases[1]&&res.myPurchases[1].status==1) {
            this.adImg="//udata.youban.com/webimg/wxyx/puintuan/1111/1111ad2.png";
          }
          this.isNew=res.isNew;
        })
  },
  mounted(){
  //   let _this=this
  //     new Request('/weixin/config',"POST",{"url":location.href.split('#')[0]}).returnJson().then(data=>{
  //         wx.config({
  //             debug: false,
  //             appId: data.appId,
  //             timestamp: data.timestamp,
  //             nonceStr: data.nonceStr,
  //             signature: data.signature,
  //             jsApiList: _this.apilist
  //           });
  //         wx.error(function(res) {
  //           console.log('微信：', JSON.stringify(res));
  //         });
  //         wx.ready(function() {
  //           wx.onMenuShareAppMessage(_this.WXSHDATA);
  //           wx.onMenuShareTimeline(_this.WXSHDATA); //朋友圈
  //         });
  //     })
  // }
}
</script>

<style lang="css" scoped>
.festival{height:90rem; background: url(//udata.youban.com/webimg/wxyx/puintuan/1111/bg.jpg) no-repeat;background-size:100% 100%}

.festival-body{transform: translateY(13.44rem);}
.ad2{background: url("//udata.youban.com/webimg/wxyx/puintuan/1111/ad-bg.png") no-repeat;background-size: 100% 100%;width:23rem;height: 6.75rem;line-height: 6.5rem;color: #4c0110;font-size: 1.75rem;}
.course-box{margin-top: 1.13rem;font-size:0;}
.course-box .cover-mask{width:6.63rem;height: 6.63rem;border-radius: 3.38rem;position: absolute;background-color: rgba(0,0,0,.3)}
.course-box img{width:6.63rem;height: 6.63rem;border-radius: 3.38rem}
.prgress-label{display: block;position: absolute;width: 3.75rem;height: 2.19rem;background: url('//udata.youban.com/webimg/wxyx/puintuan/1111/inprogress@3x.png') no-repeat;background-size: 100% 100%;}
.course_f,.course_s{display: inline-block;vertical-align:bottom;position: relative;}
.course_f{width: 10.19rem;height: 7.35rem;background: url(//udata.youban.com/webimg/wxyx/puintuan/1111/circle-left-1.png) no-repeat;    background-size: 100% 100%;}
 .course_f .cover-mask{left: .44rem;top: .31rem;}
  .course_s .cover-mask{left: 1.88rem;top: .31rem;}
.course_s{width: 8.88rem;height: 7.35rem;margin-left: -.31rem}
.course_f img{position: absolute;left: .44rem;top: .31rem;}
.course_s img{position: absolute;left: 1.88rem;top: .31rem;}
.
.course_f-bg1{background: url(//udata.youban.com/webimg/wxyx/puintuan/1111/circle-left-1.png) no-repeat;    background-size: 100% 100%;}
.course_f-bg2{background: url(//udata.youban.com/webimg/wxyx/puintuan/1111/circle-left-2.png) no-repeat;    background-size: 100% 100%;}
.course_s-bg1{background: url(//udata.youban.com/webimg/wxyx/puintuan/1111/circle-right-1.png) no-repeat;    background-size: 100% 100%;}
.course_s-bg2{background: url(//udata.youban.com/webimg/wxyx/puintuan/1111/circle-right-2.png) no-repeat;    background-size: 100% 100%;}
.course_s .prgress-label{top: .63rem;left: -.75rem;}
.course_f .prgress-label{top: .63rem;left: -1.75rem;}
.festival-body .buy-prompt{margin: 1.78rem 0;color: #fff;font-size: 1.13rem;}
.festival-body .buy-button{display: block;width: 11.56rem;height: 3.13rem;line-height: 3.13rem;margin:auto;background: url('//udata.youban.com/webimg/wxyx/puintuan/1111/button@3x.png') no-repeat;background-size:100% 100%;color:#8e001a;font-size: 1.25rem}
.coupon{margin-top: 2.5rem}
.festival-footer{margin-top: 15rem;}
.festival-footer .footer-title-img{display: block;width: 100%;height: auto;}
.coupon-box{position: relative;}
.coupon-box .label{position: absolute;top: 1.5rem;right: 1.5rem;}
.coupon-box span{color: red;font-size: 3.25rem}
.ad-title2{color: #fff;font-size: 1rem;margin: .63rem 0}
	.myGroup{display:block;height:auto;padding:0 .625rem;margin:.88rem auto;position:relative}
   	.myGroup .a_box,img{display:block;width: 100%;height:100%;position:relative;color: rgba(0,0,0.5);color: #3c3c3c;border-radius: .625rem;}
    .groupInfo{width: 100%;height:3.44rem;line-height: 3.44rem;color: #fff;padding: 0 .38rem 0 0;-webkit-box-sizing: border-box;box-sizing: border-box;border-radius:0 0 .625rem .625rem;position: absolute;left: 0;bottom: 0;background-color: rgba(6, 6, 6,.4)}
     .groupInfo__avatarbox{width: auto;padding: 0 .61rem 0 0;-webkit-box-sizing: border-box;box-sizing: border-box;height: 100%;overflow: hidden;float: left;display: inline-block;vertical-align: middle;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align: center;-ms-flex-align: center;align-items: center;position: relative;font-size: 1rem;}
      	.groupInfo .groupInfo_buttton{display: block;position: absolute;bottom: .625rem;right: 5px;width: 6.25rem;    padding: 0 .94rem;line-height: 2.2rem;text-align: center;background: #f69f00;border-radius: 1rem;color: #fff;max-width: 7.63rem; overflow: hidden;
    white-space: nowrap;}
      .cover-layer{position: fixed;width: 100%;height: 100%;background: rgba(0,0,0,.5);top: 0;}
      .cover-layer div{margin-top: 50%;font-size: 1.88rem;color: #fff;}


</style>
