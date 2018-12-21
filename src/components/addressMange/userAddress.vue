<template>
  <div class="address">
    <ul adid="747752113" type="1" upgrade="0" addrid="19_1607_3155_0" addrname="广东_深圳市_南山区_"
        addrdetail="广东深圳市南山区佳嘉豪商务大厦10楼小伴龙" class="noChoose">
      <li><strong>韩承吉</strong>&nbsp;<strong>176****2085</strong></li>
      <li> 广东深圳市南山区佳嘉豪商务大厦10楼小伴龙</li>
      <li>
        <input type="checkbox">
      </li>
      <!--<li class="edit" adid="747752113" type="1">编辑</li>-->
    </ul>
  </div>
</template>

<script>
  export default {
    name: "userAddress"
  }
</script>

<style scoped lang="scss">
    .address {
      position: relative;
      overflow: hidden;
      word-wrap: break-word;
      word-break: break-all;
      .noChoose {
        padding-right: 50px;
        background-color: #fff;
        z-index: 2;
        padding: 7px 15px;
        position: relative;
        overflow: hidden;
        li {
          margin-top: 4px;
          input[type="checkbox"]{
            width: 100px;
          }
          strong {
            color: #333;
          }
          &.edit {
            color: transparent;
            width: 50px;
            position: absolute;
            top: 3px;
            bottom: 3px;
            right: 0;
            z-index: 2;
            &::after {
              right: 10px;
              width: 30px;
              content: "\20";
              width: 20px;
              height: 20px;
              position: absolute;
              top: 50%;
              right: 0;
              margin-top: -10px;
              background-position: -60px -30px;
              background-image: url(//wq.360buyimg.com/fd/base/img/order/sprites_old.png?t=20160325);
              background-repeat: no-repeat;
              background-size: 100px 100px;
            }
          }
        }
      }
    }

</style>
