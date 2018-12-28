<template>
  <div class="address">
    <group>
      <x-input title="姓名" name="username" placeholder="请输入姓名" v-model="Fname" is-type="china-name"></x-input>
    </group>
    <group>
      <x-input title="手机" mask="999 9999 9999" v-model="Fphone" :max="13" is-type="china-mobile"></x-input>
    </group>
    <div class="address-box">
      <group>
        <x-address @on-hide="logHide" @on-show="logShow" :title="title" v-model="Geocode" :list="addressData"
                   @on-shadow-change="onShadowChange" placeholder="请选择地址" :show.sync="showAddress"></x-address>
      </group>
    </div>
    <group>
      <!--<x-textarea :max="20" placeholder="详细地址" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>-->
      <x-textarea title="详细信息" v-model="Faddress" placeholder="请填写详细信息" :show-counter="false" :rows="3"></x-textarea>
    </group>
    <group>
    <x-switch title="设为默认地址" :value-map="['0', '1']" v-model="Fdefault" ></x-switch>
    </group>
    <WxDialog :alertDesc="alertDesc" :showAlertDialog="showAlertDialog" @AOk="delPok"></WxDialog>
    <div class="mod_btns"><a href="javascript:void(0);" @click="addAddressSubmit" class="mod_btn bg_1">确认</a></div>
  </div>
</template>

<script>
  import { mapActions,mapGetters} from 'vuex';
  import WxDialog from '../base/weixin-dialog/weixin-dialog'
  import {
    Group,
    XInput,
    XAddress,
    ChinaAddressV4Data,
    XButton,
    Cell,
    XTextarea,
    XSwitch,
    Value2nameFilter as value2name
  } from 'vux';
  import {axiosPost} from "../../api/axios-data";
  import {Request} from "../../api/request";

  export default {
    name: "addAddress",
    data() {
      return {
        title:'提示',
        show: false,
        addressData: ChinaAddressV4Data,
        title: '收货地址',
        addressName: '',
        Geocode: ["110000","110100","110101"],
        showAddress: false,
        Fphone: '',
        Fname: '',
        Fphone: '',
        Faddress: '',
        alertDesc:'',
        showAlertDialog:false,
        Fdefault:"1"
      }
    },
    methods: {
      testCardholder(holder) {
        let uPattern = /^[\u4E00-\u9FA5]{2,4}$/;
        return uPattern.test(holder);
      },
      testPhoneNumber(code) {
        let mPattern = /^1\d{10}$/; //http://caibaojian.com/regexp-example.html
        return mPattern.test(code);
      },
      addAddressSubmit() {
        let postData = {
          Fname: this.Fname,
          Fphone: this.Fphone,
          Fprovince: this.addressName[0],
          Fcity: this.addressName[1],
          Fdistrict: this.addressName[2],
          Faddress: this.Faddress,
          Fdefault: this.Fdefault,
          FgeoCode:this.Geocode
        }
        if (this.Fname.length.length<=0) {
          this.alertDesc = "请输入符合姓名规范的收货人姓名"
          this.showAlertDialog=true;
          return false;
        } else if (!this.testPhoneNumber(this.Fphone.replace(/\s/g,""))) {
          this.alertDesc = "请填写正确的手机号"
          this.showAlertDialog=true;
          return false;
        }
        else if(this.Geocode.length<1){
          this.alertDesc="请选择省市区地址"
          this.showAlertDialog=true;
          return;
        }
        else if(this.Faddress.length<5){
          this.alertDesc="请填写收货人详细地址"
          this.showAlertDialog=true;
          return;
        }else{
          axiosPost('/address/add.json',postData).then(res=>{
            if(res.data.rc==0){
              new Request('/address/list.json','GET').returnJson().then(res=>{
                this.addressList=res.list;
                  this.setShippingAddress(res.list);
                // console.log(res)0
              })
              if(this.$route.name=='AddAddress'){
                this.$router.back();
              }else{
                window.location.reload()
              }
            }
          })
        }
      },
      delPok(){
        this.showAlertDialog=false;
      },
      doShowAddress() {
        this.showAddress = true
        setTimeout(() => {
          this.showAddress = false
        }, 2000)
      },
      onShadowChange(ids, names) {
        this.addressName = names;
        // this.Faddress=names.join('');
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
      onEvent(event) {
        console.log('on', event)
      },
        ...mapActions(['setShippingAddress'])
    },
    components: {
      Group,
      XAddress,
      XButton,
      Cell,
      XInput,
      XTextarea,
      WxDialog,
      XSwitch
    },
  }
</script>
<style lang="scss" scoped>

  .address {
    .address-box {
      width: 100%;
      height: 2.81rem;
      overflow: hidden;
      position: relative;
    }
    .mod_btns {
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      overflow: hidden;
      margin: .94rem .63rem;
      .mod_btn {
        border-color: #ddd;
        display: block;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        min-width: 0;
        height: 2.88rem;
        line-height: 2.88rem;
        text-align: center;
        font-size: 1rem;
        border-radius: .25rem;
        position: relative;
        border-radius: 0;
      }
      .mod_btn.bg_1 {
        background: #e4393c;
        color: #fff;
      }
    }
  }
</style>
<style scoped>
  .address >>> .weui-cells {
    margin-top: 0 !important;
  }
  .address >>>  .vux-cell-value{
      color: #666;
    }
  .address >>>.weui-input{color: #666}
  .address >>>.vux-popup-picker-select{
    padding-left: 1rem;
    text-align: left !important;
  }
  .address >>>.weui-textarea{
        color: #666;
  }
  .address-box >>> .vux-no-group-title {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-top: 0 !important
  }
</style>
