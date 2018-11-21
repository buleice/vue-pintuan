<template lang="html">
  <table align="center" class='keyboard' @click.stop='_handleKeyPress'>
    <tr class='key-row'>
      <td class='key-cell' data-num='7'>7</td>
      <td class='key-cell' data-num='8'>8</td>
      <td class='key-cell' data-num='9'>9</td>
      <td class='key-cell' data-num='D'>C</td>
    </tr>
    <tr class='key-row'>
      <td class='key-cell' data-num='4'>4</td>
      <td class='key-cell' data-num='5'>5</td>
      <td class='key-cell' data-num='6'>6</td>
      <td class='key-cell' data-num='C'>清空</td>
    </tr>
    <tr class='key-row'>
      <td class='key-cell' data-num='1'>1</td>
      <td class='key-cell' data-num='2'>2</td>
      <td class='key-cell' data-num='3'>3</td>
      <td  class='key-cell key-confirm' data-num='S' rowspan="2">确定</td>
    </tr>
    <tr class='key-row'>
      <td class='key-cell disabled' data-num='-1'></td>
      <td class='key-cell' data-num='.'>.</td>
      <td class='key-cell' data-num='0'>0</td>
      <td class='key-cell' data-num='-1'></td>
    </tr>
    <!-- <div class='key-confirm' data-num='S'>确认</div> -->
  </table>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
  name:'KeyBoard',
  methods: {
    //处理按键
    _handleKeyPress(e) {
      let num = e.target.dataset.num;
      //不同按键处理逻辑
      // -1 代表无效按键，直接返回
      if (num == -1) return false;
      switch (String(num)) {
        //小数点
        case '.':
          this._handleDecimalPoint();
          break;
          //删除键
        case 'D':
          this._handleDeleteKey();
          break;
          //清空键
        case 'C':
          this._handleClearKey();
          break;
          //确认键
        case 'S':
          this._handleConfirmKey();
          break;
        default:
          this._handleNumberKey(num);
          break;
      }
    },
    //处理小数点函数
    _handleDecimalPoint() {
      //如果包含小数点，直接返回
      if (String(this.wantCash).indexOf('.') > -1) return false;
      //如果小数点是第一位，补0
      if (!String(this.wantCash).length)
        this.setWantCash('0.');
      //如果不是，添加一个小数点
      else
        this.setWantCash(this.wantCash + '.');
    },
    //处理删除键
    _handleDeleteKey() {
      let S = String(this.wantCash);
      //如果没有输入，直接返回
      if (!S.length) return false;
      //否则删除最后一个
      this.setWantCash(S.substring(0, S.length - 1));
    },
    //处理清空键
    _handleClearKey() {
      this.setWantCash('');
    },
    _handleConfirmKey() {
      let S =String(this.wantCash);
      //未输入
      if (!S.length) {
        alert('您目前未输入!')
        return false;
      }
      //将 8. 这种转换成 8.00
      if (S.indexOf('.') > -1 && S.indexOf('.') == (S.length - 1))
        S = Number(S.substring(0, S.length - 1)).toFixed(2);
      //保留两位
      S = Number(S).toFixed(2);
      this.$emit('confirmEvent', S)
    },
    //处理数字
    _handleNumberKey(num) {
      let S = String(this.wantCash);
      //如果有小数点且小数点位数不小于2
      if (S.indexOf('.') > -1 && S.substring(S.indexOf('.') + 1).length < 2)
        this.setWantCash(S + num);
      //没有小数点
      if (!(S.indexOf('.') > -1)) {
        //如果第一位是0，只能输入小数点
        if (num == 0 && S.length == 0)
          this.setWantCash('0.');
        else{
            this.setWantCash(S+num);
        }
      }
    },
    ...mapActions(['setWantCash'])
  },
  computed: {
    ...mapGetters(["wantCash"])
  }
}
</script>

<style lang="scss" scoped>
.keyboard{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 15.31rem;
  background: #fff;
  border-collapse:collapse;
	border-spacing:0;
  .key-row{
    // height: 3.88rem;
    border-bottom: 1px solid rgba(0,0,0,.2);
    .key-cell{
      width: 25%;
      text-align: center;
      line-height: 3.88rem;
      border-right:1px solid rgba(0,0,0,.2);
      &:last-child{
        border: none;
      }
    }
  }
}


</style>
