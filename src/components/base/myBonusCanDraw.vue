<template>
    <div>
      <ul class="top">
        <li>可提金额（元）</li>
        <li>{{canCash}}</li>
        <li @click="gotoRightPage()">提现</li>
        <li>提现金额将于每月10日发放</li>
        <li @click="showGuize=true">提现规则</li>
      </ul>
      <ul class="middle" v-if="cashing>0">
        <li class="draw_status"><span>{{cashing}}元 </span>正在提现</li>
        <li class="detail_info"> <a href="#/bonusrecord">提现详情 ></a> </li>
      </ul>
      <div class="banke_card" v-if="bankCard.bank">
        <div class="card_info"><img src="//udata.youban.com/webimg/wxyx/puintuan/money.svg" alt=""><span>{{bankCard.bank}}</span></div>
        <div  class="card_id">**** **** **** {{bankCard.number}}</div>
        <div class="card_edit" @click="$router.push({path:'/bindcard', query:{id:id}})">修改信息</div>
      </div>
      <div @click="$router.push({path:'/bindcard', query:{canCash:canCash}})" class="banke_card" v-if="!bankCard.bank">
        <div class="card_info"><img src="//udata.youban.com/webimg/wxyx/puintuan/money.svg" alt=""><span>未绑定银行卡</span></div>
        <div  class="card_id2">绑定银行卡信息才可进行提现</div>
      </div>
       <transition name="fade">
      <div class="rule" v-if="showGuize">
        <div class="closeBtn" @click="showGuize=false"></div>
         <h2>提现规则</h2>
         <ul>
           <li>
             <h3></h3>
             <p><b>1. </b>目前奖学金只能通过银行卡转账方式提现，请确保您录入的银行卡、身份证等信息真实有效，信息错误将无法转账提现。</p>
           </li>
           <li>
             <h3></h3>
             <p><b> 2.</b>奖学金提现比例为100:1。</p>
           </li>
          <li>
            <h3></h3>
            <p><b>3. </b>奖学金满50元才可提现。</p>
          </li>
          <li>
            <h3></h3>
            <p><b>4. </b>奖学金每月只可提现一次，提交提现申请后，奖学金将无法再用于兑换课程和专属福利。</p>
          </li>
          <li>
            <h3></h3>
            <p><b>5. </b>提现转账将在每月10日统一进行</p>
          </li>
        </ul>
      </div>

      <!-- <a v-if="bankCard.bank" class="add_bankcard" href="#/bindcard"></a> -->
      </transition>
      <div class="js_dialog" id="iosDialog2" v-if="isAlert" style="opacity: 1;">
                  <div class="weui-mask" @click="isAlert=false"></div>
                  <div class="weui-dialog">
                      <div class="weui-dialog__bd">{{alertContent}}</div>
                      <div class="weui-dialog__ft">
                          <a @click="isAlert=false" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>
                      </div>
                  </div>
      </div>
    </div>
</template>
<script>
import {Request} from '../../api/request'
    export default {
        name: "myBonusCanDraw",
        data(){
          return{
            canCash:'',
            cashing:'',
            bankCard:{},
            showGuize:false,
            isAlert:false,
            alertContent:'',
            id:''
          }
        },
        beforeRouteEnter (to, from, next) {
          next(vm => {
            new Request('/bonus/cash/center.json',"GET").returnJson().then(res=>{
              vm.canCash=res.canCash;
              vm.cashing=res.cashing;
              vm.bankCard=res.bankCard;
              vm.id=res.bankCard.id;
            })
            // 通过 `vm` 访问组件实例
          })
        },
        created(){
          this.$nextTick(function(){
            new Request('/bonus/cash/center.json',"GET").returnJson().then(res=>{
              this.canCash=res.canCash;
              this.cashing=res.cashing;
              this.bankCard=res.bankCard;
              this.id=res.bankCard.id;
            })
          })
        },
        methods:{
          gotoRightPage(){
            if(this.canCash<50){
              this.isAlert=true;
              this.alertContent="不足50元无法提现!";
              return false
            }else if (this.cashing>0) {
              this.isAlert=true;
              this.alertContent="本月已发起过提现，请下个月再尝试!";
              return false
            }else{
              this.bankCard.number!=""?
              this.$router.push({name:'ToWallet',params: {canCash:this.canCash  }})
              :
              this.$router.push({path:'/bindcard', query:{canCash:this.canCash}})
            }
          }
        }
    }
</script>

<style scoped>
.top{width: 100%;height: 13.75rem;background-color: #ffa922;color: #fff;text-align:center;padding: 1.88rem 0 1.69rem;box-sizing: border-box;display: }
.top li:nth-child(2){font-size: 1.5rem}
.top li:nth-child(3){width: 8.75rem;height: 2.63rem;border-radius: 1.31rem;text-align: center;background: #fff;color:#8c3b13;line-height: 2.63rem;margin:1.0rem auto;font-size: 1rem}
.middle{width: 100%;height: 2.5rem;background: #fff;display: flex;justify-content: space-between;align-items: center;padding: 0 .63rem;box-sizing: border-box;
}
.top li:last-child{padding: .13rem .5rem;color: #fff;border-radius:2rem;border:1px solid currentColor;position: absolute;top: .5rem;right: .63rem;font-size: .75rem}
.draw_status span{color:rgb(249, 11, 11)}
.detail_info a{color: #a3a3a3}
.banke_card{display: block;width: 22.31rem;height: 6.63rem;background: #fff;border-radius: 6px;box-shadow: -2px 2px 8px 1px rgba(0,0,0,.1);margin: auto;margin-top: 2.13rem;padding: .5rem;box-sizing: border-box;}
.banke_card .card_info{display: flex;align-items: center;}
.card_info img{width: 34px;height: auto;}
.card_info span{margin-left: .31rem}
.card_id{font-size: 1.25rem;text-align: left;margin-top: .88rem;font-weight: 700;vertical-align: bottom;box-sizing: border-box;padding-left: 2.5rem}
.card_id2{font-size: .8rem;text-align: left;margin-top: .88rem;font-weight: 700;vertical-align: bottom;box-sizing: border-box;padding-left: 2.5rem;color:#a3a3a3;}
.card_edit{height: 2.25rem;color:#a3a3a3; line-height: 2.25rem;margin-top: -5.5rem;text-align: right;}

.rule{position: fixed;top:0;left:0;height: 100%;background:#fff;z-index: 5;}
.rule>.closeBtn{position: fixed;border-radius: 50%;width: 2.5rem;height: 2.5rem;top: 1.56rem;right:.63rem;}
.rule>.closeBtn::before{content:"";position: absolute;width:4px;height: 80%;background:#000;border-radius: 4px;left:50%;top:50%;transform: translate(-50%,-50%) rotate(45deg);-webkit-transform: translate(-50%,-50%) rotate(45deg);}
.rule>.closeBtn::after{content:"";position: absolute;width:4px;height: 80%;background:#000;border-radius: 4px;left:50%;top:50%;transform: translate(-50%,-50%) rotate(-45deg);-webkit-transform: translate(-50%,-50%) rotate(-45deg);}
.rule>ul{padding:0 .63rem;}
.rule>h2{text-align: center;font-size: 1.25rem;color:#333;line-height: 4.06rem;}
.rule h3{color: #333;font-size: 1.06rem;line-height: 1.88rem;}
.rule p{font-size: .94rem;line-height:1.5rem;padding: 0 1.13rem;margin-bottom: .63rem;}
.add_bankcard{display: block;width: 50%;padding-top: 50%;background: url('//udata.youban.com/webimg/wxyx/puintuan/adbankCard.svg') no-repeat center;background-origin: padding-box;background-size:100%;margin:auto;}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
