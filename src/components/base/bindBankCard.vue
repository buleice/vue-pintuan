<template lang="html">
<div>
  <!--<div class="weui-cell">-->
    <!--<div class="weui-cell__hd"><label class="weui-label">持卡人</label></div>-->
    <!--<div class="weui-cell__bd">-->
      <!--<input class="weui-input" type="text" pattern="[0-9]*" placeholder="">-->
    <!--</div>-->
  <!--</div>-->
  <div class="weui-cells">
    <div class="weui-cell">
      <div class="weui-cell__hd">
        <label class="weui-label">持卡人</label>
      </div>
      <div class="weui-cell__bd ">
        <input class="weui-input" type="text" placeholder="">
      </div>
    </div>
  </div>
  <div class="weui-cells weui-cells_form">
    <div class="weui-cell">
      <div class="weui-cell__hd">
        <label class="weui-label">身份证号</label>
      </div>
      <div class="weui-cell__bd ">
        <input class="weui-input" type="text" placeholder="">
      </div>
    </div>
  </div>
  <div class="weui-cells weui-cells_form">
    <div class="weui-cell">
      <div class="weui-cell__hd">
        <label class="weui-label">收款银行卡号</label>
      </div>
      <div class="weui-cell__bd ">
        <input class="weui-input" type="number" placeholder="">
      </div>
    </div>
  </div>
  <div class="weui-cell weui-cell_select weui-cell_select-after" style="background:#fff">
                  <div class="weui-cell__hd">
                      <label for="" class="weui-label">开户银行</label>
                  </div>
                  <div class="weui-cell__bd">
                      <select class="weui-select" name="select2">
                          <option value="1">招商银行</option>
                          <option value="2">建设银行</option>
                          <option value="3">工商银行</option>
                      </select>
                  </div>
              </div>
  <!-- <div class="weui-cells weui-cells_form">
    <div class="weui-cell">
      <div class="weui-cell__hd">
        <label class="weui-label">开户银行</label>
      </div>
      <div class="weui-cell__bd ">
        <input class="weui-input" type="text" placeholder="">
      </div>
    </div>
  </div> -->
  <div class="weui-cells weui-cells_form">
    <div class="weui-cell">
      <div class="weui-cell__hd">
        <label class="weui-label">预留手机号</label>
      </div>
      <div class="weui-cell__bd ">
        <input class="weui-input" type="tel" placeholder="">
      </div>
    </div>
  </div>
  <div></div>
  <div class="submit_button">提交</div>
  <div class="info">为确保完成银行转账，请确认身份证信息和银行卡信息是同一人 。</div>
</div>
</template>

<script>
import {Request} from '../../api/request'
export default {
  components:{

  },
  data(){
    return{
      bankList:{}
    }
  },
  methods:{
    _chechCHNCardId(sNo){if(!this.regExpTest(sNo,/^[0-9]{17}[X0-9]$/)){return false}sNo=sNo.toString();var a,b,c;a=parseInt(sNo.substr(0,1))*7+parseInt(sNo.substr(1,1))*9+parseInt(sNo.substr(2,1))*10;a=a+parseInt(sNo.substr(3,1))*5+parseInt(sNo.substr(4,1))*8+parseInt(sNo.substr(5,1))*4;a=a+parseInt(sNo.substr(6,1))*2+parseInt(sNo.substr(7,1))*1+parseInt(sNo.substr(8,1))*6;a=a+parseInt(sNo.substr(9,1))*3+parseInt(sNo.substr(10,1))*7+parseInt(sNo.substr(11,1))*9;a=a+parseInt(sNo.substr(12,1))*10+parseInt(sNo.substr(13,1))*5+parseInt(sNo.substr(14,1))*8;a=a+parseInt(sNo.substr(15,1))*4+parseInt(sNo.substr(16,1))*2;b=a%11;if(b==2){c=sNo.substr(17,1).toUpperCase()}else{c=parseInt(sNo.substr(17,1))}switch(b){case 0:if(c!=1){return false}break;case 1:if(c!=0){return false}break;case 2:if(c!="X"){return false}break;case 3:if(c!=9){return false}break;case 4:if(c!=8){return false}break;case 5:if(c!=7){return false}break;case 6:if(c!=6){return false}break;case 7:if(c!=5){return false}break;case 8:if(c!=4){return false}break;case 9:if(c!=3){return false}break;case 10:if(c!=2){return false}}return true}
    ,
    _chechCHNBankCardId(){

    }

  }
}
</script>

<style lang="css" scoped>
  @import "../../common/css/weui.min.css";
  .weui-cells{margin-top: 0}
  .submit_button{width: 8.75rem;height: 2.5rem;text-align: center;color: #fff;background-color: #ffa922;line-height: 2.5rem;border-radius: 20px;margin: 1.56rem auto 0;}
  .info{width: 17.81rem;margin: auto;color: #a3a3a3;margin-top: 1rem}
</style>
