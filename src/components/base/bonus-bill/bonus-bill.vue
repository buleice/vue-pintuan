<template lang="html">
  <table v-if="bill.length>0">
    <tr  v-for="item in bill">
      <td align="center" valign="middle">
        {{item.time}}
      </td>
      <td>
        {{item.title}}
      </td>
      <td>{{item.bonus}}</td>
    </tr>
  </table>
  <div v-else>
    <img src="//udata.youban.com/webimg/wxyx/puintuan/double11_gift_noget.png" style="margin-top:33%;" alt="">
    <p style="font-size:1.25rem;">还未获得奖学金哦~~</p>
  </div>
</template>

<script>
import {
  Request
} from '../../../api/request'
export default {
  name: 'BonusBill',
  data() {
    return {
      bill: [],
    }
  },
  created() {
    new Request('/bonus/detail.json', "POST").returnJson().then(res => {
      this.bill = res.list;
    })
  }
}
</script>

<style lang="scss" scoped>
table {
    width: 100%;
    tr {
        width: 100%;
        height: 4.25rem;
        border-bottom: 1px solid rgba(0,0,0,.1);
        td {
            &:first-child {
                width: 10rem;
                img {
                    width: 2.81rem;
                    border-radius: 50%;
                }
            }
            &:nth-child(2) {
                width: 7rem;
                max-width: 7rem;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 0.88rem;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            &:last-child {
                font-size: 0.88rem;
            }
        }
    }
}
</style>
