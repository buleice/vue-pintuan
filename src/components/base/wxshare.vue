<template lang="html">

</template>
<script>
import {Request} from '../../api/request';
import {axiosPost} from '../../api/axios-data'
import axios from 'axios';
export default {
  name:"WxShare",
  props:{
    WXSHDATA:{
      type:Object,
      default(){
        return {
          title: `${localStorage.count||1359}位朋友正在小伴龙优学参与拼课，快为宝宝报名有趣的课程吧!`,
          desc: '这里的课程生动有趣，快来小伴龙优学陪伴孩子快乐成长吧！',
          link: 'https://wxyx.youban.com/shop/index',
          imgUrl: 'https://udata.youban.com/webimg/wxyx/puintuan/shop-icon.png',
          success: function() {
            new Request('/common/record.json?wxschool=detail',"GET").returnJson()
          },
          cancel: function() {
            console.log("取消分享")
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
       'onMenuShareAppMessage',
       'onMenuShareWeibo',
       'onMenuShareQZone'
     ]
    }
  },
  mounted(){
    let _this=this
      axiosPost('/weixin/config',{url:window.location.href.split('#')[0]}).then(res=>{
         let data=res.data;
          window.wx.config({
              debug: false,
              appId: data.appId,
              timestamp: data.timestamp,
              nonceStr: data.nonceStr,
              signature: data.signature,
              jsApiList: this.apilist
            });
          window.wx.ready(function() {
            window.wx.onMenuShareAppMessage(_this.WXSHDATA);
            window.wx.onMenuShareTimeline(_this.WXSHDATA); //朋友圈
          });
          window.wx.error(function(res) {
            console.log('微信：', JSON.stringify(res));
          });

      })
  }
}
</script>

<style lang="css">
</style>
