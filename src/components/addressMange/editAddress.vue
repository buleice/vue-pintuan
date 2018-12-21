<template>
  <div class="address2">
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
      <x-textarea title="详细信息" placeholder="请填写详细信息" :show-counter="false" :rows="3"></x-textarea>
    </group>
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
    name: "addAddress",
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


