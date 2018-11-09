<template lang="html">

</template>

<script>
import {Request} from '../../api/request';
import wx from 'weixin-js-sdk';
// import {wxConfig} from '../common/js/wxconfig';
export default {
  name:"WxShare",
  props:{
    WXSHDATA:{
      type:Object,
      default(){
        return {
          title: `${localStorage.count||1359}位朋友正在小伴龙优学参与拼课，快为宝宝报名有趣的课程吧!`,
          link: 'https://wxyx.youban.com/shop/index',
          imgUrl: 'https://udata.youban.com/webimg/wxyx/puintuan/shop-icon.png',
          type: "link",
          dataUrl: "",
          desc: '这里的课程生动有趣，快来小伴龙优学陪伴孩子快乐成长吧！',
          success: function() {
            new Request('/common/record.json?wxschool=detail',"GET").returnJson()
          }
        }
      }
    }
  },
  data(){
    return{
      apilist:[
       'onMenuShareTimeline',
       'onMenuShareQQ',
       'onMenuShareAppMessage'
     ]
    }
  },
  mounted(){
    let _this=this
      new Request('/weixin/config',"POST",{"url":window.location.href.split('#')[0]}).returnJson().then(data=>{
          wx.config({
              debug: false,
              appId: data.appId,
              timestamp: data.timestamp,
              nonceStr: data.nonceStr,
              signature: data.signature,
              jsApiList: this.apilist
            });
          wx.error(function(res) {
            console.log('微信：', JSON.stringify(res));
          });
          wx.ready(function() {
            wx.onMenuShareAppMessage(_this.WXSHDATA);
            wx.onMenuShareTimeline(_this.WXSHDATA); //朋友圈
          });
      })
  }
}
</script>

<style lang="css">
</style>
