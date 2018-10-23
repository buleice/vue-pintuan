<template lang="html">
<div class="">
  <div class="table_box">
    <table>
      <tr>
          <th>申请时间</th>
          <th>提现金额</th>
          <th>提现状态</th>
      </tr>
      <tr>
          <td>2018-10-23</td>
          <td>100.01元</td>
          <td>已提现</td>
      </tr>
      <tr>
          <td>2018-10-23</td>
          <td>100.01元</td>
          <td>已提现</td>
      </tr>
      <tr>
          <td>2018-10-23</td>
          <td>100.01元</td>
          <td>已提现</td>
      </tr>
      <tr>
          <td>2018-10-23</td>
          <td>100.01元</td>
          <td>已提现</td>
      </tr>
  </table>
  </div>
</div>
</template>

<script>
import {Request} from '../../api/request'
export default {
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
