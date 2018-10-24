<template lang="html">
<div class="">
  <div class="withdraw">
    <h3>提现金额</h3>
    <div class="input_box">
      <input type="number" v-model="wantCash" :max="maxCash" min="0" name="" value="">
      <div class="withdraw-all" @click="wantCash=maxCash">全部提现</div>
    </div>
    <div class="info">
      最多可提取{{maxCash}}元
    </div>
  </div>
  <div class="submit_button" @click="cashMoney()">确定</div>
</div>
</template>
<script>
import {Request} from '../../api/request'
export default {
  name:'withdrawtowallet',
  data(){
    return{
      wantCash:'0',
      maxCash:''
    }
  },
  created(){
    this.maxCash=this.$route.params.canCash;
  },
  methods:{
    cashMoney(){
      new Request("/bonus/cash/out.json","POST",{sum:this.wantCash}).returnJson().then(res=>{
        console.log(res)
      })
    }
  }
}
</script>
<style lang="css" scoped>
.withdraw{background-color: #fff;box-sizing: border-box;padding: 0 .63rem;padding-top: 1.25rem}
h3{font-weight: 500;}
.input_box{display: flex;flex-direction: row;justify-content: space-between;width: 21.88rem;height: 2rem;border-bottom: 2px solid #f5f5f5;margin: auto;margin-top: 1.56rem}
input[type="number"]{width: 16.88rem;height: 100%;border:none;outline: none;}
.withdraw-all{width: 84px;height: 100%;text-align: center;color: #1dacaa}
.info{height: 38px;line-height: 2.38rem;font-size: .88rem;color: #a3a3a3}
.submit_button{width: 8.75rem;height: 2.5rem;text-align: center;color: #fff;background-color: #ffa922;line-height: 2.5rem;border-radius: 20px;margin: 1.56rem auto 0;}


</style>
