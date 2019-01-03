<template>
  <div class="address_defalut_wrap"  style="height: 4.38rem;">
    <div class="address_defalut address_border" style="display: block;">
      <ul @click="$router.push({name:'ChooseAddress',params:{id:defaultAddress.id}})">
        <li><strong>{{defaultAddress.name}} {{defaultAddress.phone}}</strong></li>
        <li><span v-if="defaultAddress.default===1" class="tag tag_red">默认</span> {{defaultAddress.province+defaultAddress.city+defaultAddress.address}}</li>
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
      padding-right: 3.13rem;
      background-color: #fff;
      z-index: 2;
      padding: .44rem .94rem;
      position: relative;
      overflow: hidden;
      li {
        margin-top: .25rem;
        input[type="checkbox"] {
          width: 6.25rem;
        }
        strong {
          color: #333;
        }
        &.edit {
          color: transparent;
          width: 3.13rem;
          position: absolute;
          top: .19rem;
          bottom: .19rem;
          right: 0;
          z-index: 2;
          &::after {
            right: .63rem;
            width: 1.88rem;
            content: "\20";
            width: 1.25rem;
            height: 1.25rem;
            position: absolute;
            top: 50%;
            right: 0;
            margin-top: -.63rem;
            background-position: -3.75rem -1.88rem;
            background-image: url(//wq.360buyimg.com/fd/base/img/order/sprites_old.png?t=20160325);
            background-repeat: no-repeat;
            background-size: 6.25rem 6.25rem;
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
      padding: .75rem .63rem;
      position: relative;
    }
    .address_border {
      padding-bottom: 1rem;
      background-size: 4rem .31rem;
      border-top: 1px solid rgba(0,0,0,.2);
    }
    ul {
      position: relative;
      padding-right: 1.88rem;
      li {
        word-wrap: break-word;
        word-break: break-all;
        font-size: .88rem;
        &.error {
          color: #e93b3d;
        }
        span{
          &.tag {
            display: inline-block;
            position: relative;
            overflow: hidden;
            padding: 0 .31rem;
            vertical-align: middle;
            margin: -.13rem .31rem 0 0;
            max-width: 8em;
            height: .94rem;
            line-height: .94rem;
            font-size: .63rem;
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
              border-radius: .13rem;
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
            border-radius: .13rem;
          }
          }
        }
      }
      &:after {
        content: "";
        display: inline-block;
        vertical-align: middle;
        margin-top: -.13rem;
        width: .38rem;
        height: .63rem;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 20"><path fill="#CCCCCC" fill-rule="evenodd" d="M2 20c-.8 0-1.5-.5-1.8-1.2-.3-.8-.2-1.6.4-2.2L7.2 10 .6 3.4c-.8-.8-.8-2 0-2.8.8-.8 2-.8 2.8 0l8 8c.4.4.6 1 .6 1.4 0 .5-.2 1-.6 1.4l-8 8c-.4.4-1 .6-1.4.6z"/></svg>');
        background-repeat: no-repeat;
        background-size: 100%;
        position: absolute;
        top: 50%;
        right: 0;
        margin-top: -.31rem;
      }
    }
    p.tips {
      line-height: 1.13rem;
      font-size: .75rem;
      padding: .19rem 0;
      &.color_red {
        color: #e93b3d;
      }
    }
  }

</style>
