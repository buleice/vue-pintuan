<template lang="html">
  <table v-if="bill.length>0">
    <tr  v-for="item in bill">
      <td align="center" valign="middle">
        <img :src="item.icon" :alt="item.title">
      </td>
      <td>
        <span>《{{item.title}}》</span><br>
        <span class="date">{{item.time}}</span>
      </td>
      <td>+{{item.bonus}}</td>
    </tr>
  </table>
  <div v-else>
    <img src="//udata.youban.com/webimg/wxyx/puintuan/double11_gift_noget.png" style="margin-top:33%;" alt="">
    <p style="font-size:1.25rem;">还未获得奖学金哦~~</p>
  </div>
</template>

<script>
import {Request} from '../../../api/request'
export default {
  name:'BonusBill',
  data(){
    return{
      bill:[],
    }
  },
  created(){
    new Request('/bonus/detail.json',"POST").returnJson().then(res=>{
      this.bill=res.list;
    })
  }
}
</script>

<style lang="scss" scoped>
table{
  width: 100%;
  tr{
    width: 100%;
    height: 4.25rem;
    border-bottom: 1px solid rgba(0,0,0,.1);
    td{
      &:first-child{
        width: 4.88rem;
        img{
          width: 2.81rem;
          border-radius: 50%;
        }
      }
      &:nth-child(2){
        width: 13.13rem;
        font-size: .88rem;
        text-align: left;
        .date{
          color: rgba(0,0,0,.5);
          font-size: .75rem;
          margin-left: .38rem;
        }
      }
      &:last-child{
        font-size: .88rem;
      }
    }
  }
}
</style>
