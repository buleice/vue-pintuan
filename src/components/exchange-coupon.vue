<template lang="html">
<div class="use-coupon">
  <div class="exchange-info">
    您可以使用优惠券兑换以下课程
  </div>
  <div class="myGroup" v-for="item in exchangeList">
    <a class="a_box" @click="exchangeCourse(item.id)">
      <img class="a_box_img" :alt="item.title" :src="item['banner'][0]">
      <div class="groupInfo">
        <div class="groupInfo__avatarbox" style="">
          <div>
             {{item.title}}
          </div>
        </div>
        <div  class="groupInfo_buttton">开团价 ￥{{item.price}}</div>
      </div>
    </a>
    </div>
    <Dialog
    @POk="delPOk"
    @AOk="delAOk"
    @PCancle="delPCancle"
    :showPromptDialog="showPromptDialog"
    :showAlertDialog="showAlertDialog"
    :promptDesc="promptDesc"
    :pcancleText="pcancleText"
    :alertDesc="alertDesc"
    :alertTitle="alertTitle"
    />
</div>
</template>

<script>
import {axiosPost} from '../api/axios-data'
import Dialog from './base/weixin-dialog/weixin-dialog.vue'
export default {
  name: 'UseCoupon',
  components:{
    Dialog
  },
  data() {
    return {
      showPromptDialog:false,
      showAlertDialog:false,
      promptTitle:'',
      promptDesc:'您可以使用优惠券免费兑换该课程，是否兑换？',
      pcancleText:'',
      okText:'',
      alertTitle:'温馨提示',
      alertDesc:'您已成功兑换该课程，可以上课喽哦！',
      goodsId:'',
      exchangeList: [{
          "banner": [
            "http://cliveimages.youban.com/20181108/6394192300Fj2daclE-I9EHfFIMufA3AWwmgTO.jpg",
            "http://cliveimages.youban.com/20181108/5856192303FjsiHY8ZPzkWQz4blFyp3cN2mopu.jpg"
          ],
          "title": "小伴龙英语启蒙之常见食物",
          "price": "12.9",
          "id": "5be41d00efcba4401a3bcbb3"
        },
        {
          "banner": [
            "http://cliveimages.youban.com/20181024/5323151353FuXYsna9iN40yVQba8p9_ifamps5.jpg"
          ],
          "title": "情商培养课",
          "price": "12.9",
          "id": "5bd01bd7efcba424e169fc0f"
        },
      ],
    }
  },
  methods:{
    delPOk(){
      this.showPromptDialog=false;
      this._postGoodId()
    },
    delPCancle(){
      this.showPromptDialog=false;
    },
    delAOk(){
      this.showAlertDialog=false;
    },
    exchangeCourse(goodsId){
      this.showPromptDialog=true;
      this.goodsId=goodsId;
    },
    _postGoodId(){
      axiosPost('/voucher/use.json',{id:this.goodsId}).then(res=>{
        if(res.data.rc==0){
          this.showAlertDialog=true;
        }else{
          this.showAlertDialog=true;
          this.alertDesc="对不起，兑换失败，请联系客服处理！"
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.use-coupon {
    width: 100%;
    height: auto;
    background: #de2679;
    padding-bottom: 100%;
    padding-top: .75rem;
    .exchange-info{
      padding: 10px 0;
      color: #fff;
      font-size: 18px;
    }
    .myGroup {
        display: block;
        height: auto;
        padding: 0 0.625rem;
        margin:0 auto 0.88rem;
        position: relative;
        .a_box {
            display: block;
            width: 100%;
            height: 100%;
            position: relative;
            color: #3c3c3c;
            border-radius: 0.625rem;
            overflow: hidden;
            .a_box_img {
                display: block;
                width: 100%;
                height: auto;
            }
            .groupInfo {
                width: 100%;
                height: 3.44rem;
                line-height: 3.44rem;
                color: #fff;
                padding: 0 0.38rem 0 0;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                border-radius: 0 0 0.625rem 0.625rem;
                position: absolute;
                left: 0;
                bottom: 0;
                background: rgba(0,0,0,.2);
                .groupInfo__avatarbox {
                    width: auto;
                    padding: 0 0.61rem 0 0;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    height: 100%;
                    overflow: hidden;
                    float: left;
                    display: inline-block;
                    vertical-align: middle;
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-align: center;
                    -ms-flex-align: center;
                    align-items: center;
                    position: relative;
                    font-size: 1rem;
                    margin-left: 0.63rem;
                }
                .groupInfo_buttton {
                    display: block;
                    position: absolute;
                    bottom: 0.625rem;
                    right: 5px;
                    width: 6.25rem;
                    padding: 0 0.94rem;
                    line-height: 2.2rem;
                    text-align: center;
                    background: #f69f00;
                    border-radius: 1rem;
                    color: #fff;
                    max-width: 7.63rem;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>
