<template>
  <div class="address2">
    <div class="m_header">
      <div class="m_header_bar">
        <div class="m_header_bar_back"></div>
        <div class="m_header_bar_title">收货地址</div>
      </div>
    </div>
    <group>
      <x-input title="姓名" name="username" placeholder="请输入姓名" is-type="china-name"></x-input>
    </group>
    <group>
      <x-input title="手机" mask="999 9999 9999" v-model="maskValue" :max="13" is-type="china-mobile"></x-input>
    </group>
    <div class="address-box2">
      <group>
        <x-address @on-hide="logHide" @on-show="logShow" :title="title" v-model="Geocode" :list="addressData"
                   @on-shadow-change="onShadowChange" placeholder="请选择地址" :show.sync="showAddress"></x-address>
      </group>
    </div>
    <group>
      <!--<x-textarea :max="20" placeholder="详细地址" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>-->
      <x-textarea title="详细信息" placeholder="详细地址需填写楼栋楼层或房间号信息" :show-counter="false" :rows="3"></x-textarea>
    </group>
    <div class="mod_btns"> <a href="javascript:void(0);" class="mod_btn bg_1">确认</a> </div>
  </div>
</template>

<script>
  import {
    Group,
    XInput,
    XAddress,
    ChinaAddressV4Data,
    XButton,
    Cell,
    XTextarea,
    Value2nameFilter as value2name
  } from 'vux'

  export default {
    name: "editAddress",
    data(){
      return{
        addressData: ChinaAddressV4Data,
        title:'收货地址',
        Geocode:[],
        showAddress: false,
        maskValue:13545678910
      }
    },
    methods:{
      doShowAddress() {
        this.showAddress = true
        setTimeout(() => {
          this.showAddress = false
        }, 2000)
      },
      onShadowChange(ids, names) {
        this.bankAddress = names;
      },
      getName(value) {
        return value2name(value, ChinaAddressV4Data)
      },
      logHide(str) {
        // console.log('on-hide', str)
      },
      logShow(str) {
        this.pickStatus = true
      },
      onEvent (event) {
        console.log('on', event)
      }
    },
    components: {
      Group,
      XAddress,
      XButton,
      Cell,
      XInput,
      XTextarea,
    },
  }
</script>
<style lang="scss" scoped>
  .m_header {
    .m_header_bar {
      position: relative;
      height: 45px;
      line-height: 45px;
      text-align: center;
      font-size: 16px;
      color: #333;
      background: -webkit-gradient(linear, left top, left bottom, from(#fff), to(#efefef));
      background: -webkit-linear-gradient(top, #fff, #efefef);
      background: linear-gradient(180deg, #fff, #efefef);
      &::before {
        content: "";
        position: absolute;
        z-index: 1;
        pointer-events: none;
        background-color: #e5e5e5;
        height: 1px;
        left: 0;
        right: 0;
        top: 0;
      }
      .m_header_bar_back {
        position: absolute;
        top: 0;
        left: 0;
        width: 42px;
        height: 45px;
        &::after {
          content: "";
          display: block;
          width: 12px;
          height: 12px;
          border-top: 1px solid #848689;
          border-left: 1px solid #848689;
          -webkit-transform-origin: 50%;
          transform-origin: 50%;
          -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
          position: absolute;
          top: 50%;
          left: 18px;
          margin-top: -6px;
        }
      }
      .m_header_bar_menu {
        position: absolute;
        top: 0;
        right: 0;
        width: 42px;
        height: 45px;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkAgMAAACcbnALAAAADFBMV…jUeAFFjBRTYPYyQt2CEKO/Kd+gLEagAXAx3DpK4KwZDBgAAAh+brVZ2vz9AAAAAElFTkSuQmCC) no-repeat 50%;
        background-size: 18px;
      }
    }
  }
  .mod_btns {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    overflow: hidden;
    margin: 15px 10px;
    .mod_btn {
      display: block;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      min-width: 0;
      height: 46px;
      line-height: 46px;
      text-align: center;
      font-size: 16px;
      border-radius: 4px;
      position: relative;
    }
    .bg_1 {
      background: #e4393c;
      color: #fff;
    }
  }
</style>
<style scoped>
  *{margin-top: 0 !important;}
  .weui-cells{margin-top: 0 !important;}
  .address-box2{
    width: 100%;
    height:2.81rem;
    overflow: hidden;
    position: relative;
  }
  .address2 >>>.weui-cells{margin-top: 0 !important;}
  .address-box2 >>>.vux-no-group-title{position: absolute;bottom: 0;left: 0;width: 100%;height: 100%;margin-top: 0!important}
</style>


