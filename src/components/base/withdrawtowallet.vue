<template lang="html">
<div class="">
  <div class="withdraw">
    <h3>提现金额</h3>
    <div class="input_box">
      <input type="number" v-model="wantCash" :max="cancash" min="0" name="" value="">
      <div class="withdraw-all" @click="wantCash=cancash">全部提现</div>
    </div>
    <div class="info">
      最多可提取{{cancash}}元
    </div>
  </div>
  <div class="submit_button" @click="cashMoney()">确定</div>
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
import {
  mapGetters,
  mapActions
} from 'vuex'
import {
  Request
} from '../../api/request'
export default {
  name: 'withdrawtowallet',
  data() {
    return {
      wantCash: 0,
      isAlert: false,
      alertContent: ''
    }
  },
  methods: {
    cashMoney() {
      if (typeof (Number(this.wantCash))&&!isNaN(Number(this.wantCash))) {
        if (this.wantCash <= this.cancash) {
          if (this.wantCash >= 20) {
            this.$http.post("/bonus/cash/out.json", {
              sum: this.wantCash
            }, {
              emulateJSON: true
            }).then(res => {
              if (res.body.rc == 0) {
                this.setCanCash(this.cancash - this.wantCash);
                this.alertContent = "提现成功，将于12月10日到账,敬请关注！";
                this.isAlert = true;
                let _this = this
                setTimeout(function() {
                  _this.$router.push({
                    path: '/mybonuscandraw'
                  })
                }, 300)
              } else {
                this.alertContent = res.body.msg;
                this.isAlert = true;
              }
            })
          } else {
            this.alertContent = "每次至少20元才可提现";
            this.isAlert = true;
            this.wantCash = 0;
            return false;
          }
        } else {
          this.alertContent = "账户最多可提取" + this.cancash + "元";
          this.isAlert = true;
        }
      } else {
        this.alertContent = "请输入正确的数字";
        this.isAlert = true;
        this.wantCash = 0;
      }

    },
    isNumber(obj) {
      if(typeof Number(obj) === 'number' && !isNaN(Number(obj))){
        this.alertContent = "请输入正确的数字";
        this.isAlert = true;
        this.wantCash = 0;
      }
    },
    ...mapActions(['setCanCash'])
  },
  computed: {
    ...mapGetters(["cancash"])
  }
}
</script>
<style lang="css" scoped>
.withdraw{background-color: #fff;box-sizing: border-box;padding: 0 .63rem;padding-top: 1.25rem}
h3{font-weight: 500;}
.input_box{display: flex;flex-direction: row;justify-content: space-between;width: 21.88rem;height: 2rem;border-bottom: 2px solid #f5f5f5;margin: auto;margin-top: 1.56rem}
input[type="number"]{width: 16.88rem;height: 100%;border:none;outline: none;font-size: 1rem}
.withdraw-all{width: 84px;height: 100%;text-align: center;color: #1dacaa}
.info{height: 38px;line-height: 2.38rem;font-size: .88rem;color: #a3a3a3}
.submit_button{width: 8.75rem;height: 2.5rem;text-align: center;color: #fff;background-color: #ffa922;line-height: 2.5rem;border-radius: 20px;margin: 1.56rem auto 0;}


</style>
