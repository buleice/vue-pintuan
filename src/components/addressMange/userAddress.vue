<template>
  <div class="address_defalut_wrap"  style="height: 70px;">
    <div class="address_defalut address_border" style="display: block;">
      <ul @click="$router.push({name:'AddressLIst'})">
        <li><strong>{{defaultAddress.name}} {{defaultAddress.phone}}</strong></li>
        <li><span v-if="defaultAddress.default===1" class="tag tag_red">默认</span> {{defaultAddress.address}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import  {mapActions,mapGetters} from 'vuex'
  export default {
    name: "userAddress",
    computed:{
      ...mapGetters(['defaultAddress'])
    }
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
        input[type="checkbox"] {
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

  .address_defalut_wrap {
    position: relative;
    z-index: 320;
    .address_defalut {
      background: #fff;
      padding: 12px 10px;
      position: relative;
    }
    .address_border {
      padding-bottom: 16px;
      background-size: 64px 5px;
      border-top: 1px solid rgba(0,0,0,.2);
    }
    ul {
      position: relative;
      padding-right: 30px;
      li {
        word-wrap: break-word;
        word-break: break-all;
        font-size: 14px;
        &.error {
          color: #e93b3d;
        }
        span{
          &.tag {
            display: inline-block;
            position: relative;
            overflow: hidden;
            padding: 0 5px;
            vertical-align: middle;
            margin: -2px 5px 0 0;
            max-width: 8em;
            height: 15px;
            line-height: 15px;
            font-size: 10px;
            color: #4b9bfb;
            &::after {
              content: "";
              position: absolute;
              z-index: 1;
              pointer-events: none;
              background-color: #4b9bfb;
              border: 1px solid #ddd;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              background: none;
              border-color: #4b9bfb;
              border-radius: 2px;
            }
          }
          .tag_red {
            color: #e93b3d;
            &::after {
            content: "";
            position: absolute;
            z-index: 1;
            pointer-events: none;
            background-color: #e93b3d;
            border: 1px solid #ddd;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: none;
            border-color: #e93b3d;
            border-radius: 2px;
          }
          }
        }
      }
      &:after {
        content: "";
        display: inline-block;
        vertical-align: middle;
        margin-top: -2px;
        width: 6px;
        height: 10px;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 20"><path fill="#CCCCCC" fill-rule="evenodd" d="M2 20c-.8 0-1.5-.5-1.8-1.2-.3-.8-.2-1.6.4-2.2L7.2 10 .6 3.4c-.8-.8-.8-2 0-2.8.8-.8 2-.8 2.8 0l8 8c.4.4.6 1 .6 1.4 0 .5-.2 1-.6 1.4l-8 8c-.4.4-1 .6-1.4.6z"/></svg>');
        background-repeat: no-repeat;
        background-size: 100%;
        position: absolute;
        top: 50%;
        right: 0;
        margin-top: -5px;
      }
    }
    p.tips {
      line-height: 18px;
      font-size: 12px;
      padding: 3px 0;
      &.color_red {
        color: #e93b3d;
      }
    }
  }

</style>
