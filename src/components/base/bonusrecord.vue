<template lang="html">
<div class="">
  <div class="table_box">
    <table>
      <tr>
          <th>申请时间</th>
          <th>提现金额</th>
          <th>提现状态</th>
      </tr>
      <tr v-if="recordList.length>0" v-for="item in recordList">
          <td>{{item.date}}</td>
          <td>{{item.sum}}</td>
          <td>{{computedStatus(item.status)}}</td>
      </tr>
  </table>
  </div>
</div>
</template>

<script>
import {Request} from '../../api/request'
export default {
  data(){
    return{
      recordList:[],
    }
  },
  created(){
    this.$nextTick(function(){
      new Request("/bonus/cash/record.json","GET").returnJson().then(res=>{
        this.recordList=res.list;
      })
    })
  },
  methods:{
    computedStatus(status){
      return status==1?"已提现":"发放中"
    }
  }
}
</script>

<style lang="css">
.table_box{background-color: #fff;width: 100%;}
table{width: 98%;margin: auto;background-color: #fff;}
tr{width: 100%;height: 3rem;display: flex;justify-content: space-around;border-bottom: 1px solid #dedede}
th{color: #a3a3a3}
th,td{width: 33.3%;height: 3rem;text-align: center;line-height: 3rem}
tr td:last-child{color: #1dacaa}
</style>
