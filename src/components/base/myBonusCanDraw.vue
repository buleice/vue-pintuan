<template>
    <div>
      <ul class="top">
        <li>可提金额（元）</li>
        <li>100.02</li>
        <li>提现</li>
        <li>提现金额将于每月10日发放</li>
        <li>提现规则</li>
      </ul>
      <ul class="middle">
        <li class="draw_status"><span>107.23元</span>正在提现</li>
        <li class="detail_info">提现详情 ></li>
      </ul>
      <div class="banke_card">
        <div class="card_info"><img src="//udata.youban.com/webimg/wxyx/puintuan/money.svg" alt=""><span>招商银行</span></div>
        <div  class="card_id">**** **** **** 2193</div>
        <div class="card_edit">修改信息</div>
      </div>
    </div>
</template>

<script>
import {Request} from '../../api/request'
    export default {
        name: "myBonusCanDraw"
    }
</script>

<style scoped>
.top{width: 100%;height: 13.75rem;background-color: #ffa922;color: #fff;text-align:center;padding: 1.88rem 0 1.69rem;box-sizing: border-box;display: }
.top li{margin-top: 1.0rem;}
.top li:nth-child(2){font-size: 1.5rem}
.top li:nth-child(3){width: 8.75rem;height: 2.63rem;border-radius: 1.31rem;text-align: center;background: #fff;color:#8c3b13;line-height: 2.63rem;margin:1.0rem auto;font-size: 1rem}
.middle{width: 100%;height: 2.5rem;background: #fff;display: flex;justify-content: space-between;align-items: center;padding: 0 .63rem;box-sizing: border-box;
}
.top li:last-child{padding: .38rem 1rem;color: #fff;border-radius:2rem;border:1px solid currentColor;position: absolute;top: .5rem;right: .63rem;font-size: .75rem}
.draw_status span{color:rgb(249, 11, 11)}
.detail_info{color: #a3a3a3}
.banke_card{width: 22.31rem;height: 9.63rem;background: #fff;border-radius: 6px;box-shadow: -2px 2px 8px 1px rgba(0,0,0,.1);margin: auto;margin-top: 2.13rem;padding: .5rem;box-sizing: border-box;}
.banke_card .card_info{display: flex;align-items: center;}
.card_info img{width: 34px;height: auto;}
.card_info span{margin-left: .31rem}
.card_id{font-size: 1.13rem;text-align: center;margin-top: 1.13rem;font-weight: 700;vertical-align: bottom;}
.card_edit{height: 2.25rem;border-top: 1px solid #a3a3a3;color:#a3a3a3; line-height: 2.25rem;margin-top: 2rem;text-align: right;}
</style>
