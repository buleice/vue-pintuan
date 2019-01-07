<template>
  <div class="address2">
    <div class="m_header">
      <div class="m_header_bar">
        <div class="m_header_bar_back" @click="$router.back()"></div>
        <div class="m_header_bar_title">修改地址</div>
      </div>
    </div>
    <group>
      <x-input title="收货人：" name="username" placeholder="请输入姓名" v-model="addressInfo.name" is-type="china-name"></x-input>
    </group>
    <group>
      <x-input title="手机：" mask="999 9999 9999" v-model="addressInfo.phone" :max="13" is-type="china-mobile"></x-input>
    </group>
    <div class="address-box2">
      <group>
        <x-address @on-hide="logHide" @on-show="logShow" :title="title" v-model="addressInfo.Geocode" :list="addressData"
                   @on-shadow-change="onShadowChange" placeholder="请选择地址" :show.sync="showAddress"></x-address>
      </group>
    </div>
    <group>
      <!--<x-textarea :max="20" placeholder="详细地址" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>-->
      <x-textarea  v-model="addressInfo.address" title="详细信息" placeholder="详细地址需填写楼栋楼层或房间号信息" :show-counter="false" :rows="3"></x-textarea>
    </group>
    <group style="margin-top: .5rem;">
      <x-switch title="设为默认地址" :value-map="[0, 1]" v-model="addressInfo.default" ></x-switch>
    </group>
   <div class="deleteButton" @click="deleteAdddress">删除该地址</div>
    <div  class="mod_btns fixed"><a  href="javascript:void(0);"  @click="editSubmit" class="mod_btn bg_1">确认修改</a></div>
    <WxDialog  :alertDesc="alertDesc" :showAlertDialog="showAlertDialog" @AOk="delAok" :showPromptDialog="showPromptDialog" :promptDesc="promptDesc" @POk="delPok" @PCancle="delPcancle"></WxDialog>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
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
  } from 'vux'
  import WxDialog from '../base/weixin-dialog/weixin-dialog'
  import {axiosPost} from "../../api/axios-data";

  export default {
    name: "editAddress",
    data(){
      return{
        addressData: ChinaAddressV4Data,
        title:'所在地区：',
        showAddress: false,
        addressInfo:{},
        promptDesc:'',
        showPromptDialog:false,
        Faddress:[],
        alertDesc:'',
        showAlertDialog:false,

      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.addressInfo=JSON.parse(JSON.stringify(vm.shippingAddress[to.params.index]));
        vm.addressInfo.Geocode=[vm.addressInfo.province,vm.addressInfo.city,vm.addressInfo.district]
        document.title="修改地址"
      })
    },
    methods:{
      testCardholder(holder) {
        let uPattern = /^[\u4E00-\u9FA5]{2,4}$/;
        return uPattern.test(holder);
      },
      testPhoneNumber(code) {
        let mPattern = /^1\d{10}$/; //http://caibaojian.com/regexp-example.html
        return mPattern.test(code);
      },
      delAok(){
        this.showAlertDialog=false;
      },
      doShowAddress() {
        this.showAddress = true
        setTimeout(() => {
          this.showAddress = false
        }, 2000)
      },
      onShadowChange(ids, names) {
        this.Faddress=names;
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
      },
      editSubmit(){
        let index=this.$route.params.index
        let postData;
        if(this.Faddress.length>0){
          postData={
            Fname:this.addressInfo.name,
            Fphone:this.addressInfo.phone,
            Fprovince:this.Faddress[0],
            Fcity:this.Faddress[1],
            Fdistrict:this.Faddress[2],
            Faddress:this.addressInfo.address,
            Fdefault:this.addressInfo.default,
            id:this.shippingAddress[index].id,
            FgeoCode:this.addressInfo.Geocode
          }
        }else{
          postData={
            Fname:this.addressInfo.name,
            Fphone:this.addressInfo.phone,
            Fprovince:this.addressInfo.province,
            Fcity:this.addressInfo.city,
            Fdistrict:this.addressInfo.district,
            Faddress:this.addressInfo.address,
            Fdefault:this.addressInfo.default,
            id:this.shippingAddress[index].id,
            FgeoCode:this.addressInfo.Geocode
          }
        }
        if (this.addressInfo.name.length<=0) {
          this.alertDesc = "请输入符合姓名规范的收货人姓名"
          this.showAlertDialog=true;
          return false;
        } else if (!this.testPhoneNumber(this.addressInfo.phone.replace(/\s/g,""))) {
          this.alertDesc = "请填写正确的手机号"
          this.showAlertDialog=true;
          return false;
        }
        else if(this.addressInfo.Geocode.length<1){
          this.alertDesc="请选择省市区地址"
          this.showAlertDialog=true;
          return;
        }
        else if(this.addressInfo.address.length<5){
          this.alertDesc="请填写收货人详细地址"
          this.showAlertDialog=true;
          return;
        }else{
          axiosPost('/address/update.json',postData).then(res=>{
            let addressList=JSON.parse(JSON.stringify(this.shippingAddress));
            if(this.addressInfo.default==1){
              addressList.forEach((item,index)=>{
                addressList[index]=Object.assign({},item,{default:0});
              })
            }
            addressList[index]=Object.assign({},this.shippingAddress[index],this.addressInfo,{  province:this.Faddress[0],
              city:this.Faddress[1],
              district:this.Faddress[2]})
            if(res.data.rc==0){
              if(this.defaultAddress.id==this.shippingAddress[index].id){
                this.setDefaultAddress(addressList[index]);
              }
              this.setShippingAddress(addressList);
              this.$router.back()
            }
          })
        }
      },
      delPok(){
        let index=this.$route.params.index;
        let addressId=this.shippingAddress[index].id
        axiosPost('/address/delete.json',{id:addressId}).then(res=>{
          if(res.data.rc==0){
              let addressList=JSON.parse(JSON.stringify(this.shippingAddress));
              addressList.splice(index,1);
              this.setShippingAddress(addressList);
              if(addressList.length>0){
                console.log(this.defaultAddress)
                if(this.defaultAddress.id==addressId){
                  this.setDefaultAddress(addressList[0]);
                }else{
                  this.setDefaultAddress({});
                }
              }
            this.showPromptDialog=false;
            this.$router.back();
          }
        })
      },
      delPcancle(){
        this.showPromptDialog=false
      },
      deleteAdddress(){
        this.promptDesc="请确认是否删除该条地址？"
        this.showPromptDialog=true;
      },
      ...mapActions(['setShippingAddress','setDefaultAddress'])
    },
    computed:{
      ...mapGetters(['shippingAddress','defaultAddress'])
    },
    components: {
      Group,
      XAddress,
      XButton,
      Cell,
      XInput,
      XSwitch,
      XTextarea,
      WxDialog
    },
  }
</script>
<style lang="scss" scoped>
  .m_header {
    .m_header_bar {
      position: relative;
      height: 2.81rem;
      line-height: 2.81rem;
      text-align: center;
      font-size: 1rem;
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
        width: 2.63rem;
        height: 2.81rem;
        &::after {
          content: "";
          display: block;
          width: .75rem;
          height: .75rem;
          border-top: 1px solid #848689;
          border-left: 1px solid #848689;
          -webkit-transform-origin: 50%;
          transform-origin: 50%;
          -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
          position: absolute;
          top: 50%;
          left: 1.13rem;
          margin-top: -.38rem;
        }
      }
      .m_header_bar_menu {
        position: absolute;
        top: 0;
        right: 0;
        width: 2.63rem;
        height: 2.81rem;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkAgMAAACcbnALAAAADFBMV…jUeAFFjBRTYPYyQt2CEKO/Kd+gLEagAXAx3DpK4KwZDBgAAAh+brVZ2vz9AAAAAElFTkSuQmCC) no-repeat 50%;
        background-size: 1.13rem;
      }
    }
  }
  .deleteButton{
    height: 2.88rem;
    line-height: 2.88rem;
    /*border-radius: .25rem;*/
    text-align: left;
    padding-left: .94rem;
    background: #FFFFFF;
    color: #f69f00;
    margin: .5rem auto;
  }
  .fixed{
    left: 0;
    right: 0;
    max-width: 33.75rem;
    margin: 0 auto;
    background-color: #fff;
    position: fixed;
    z-index: 101;
    bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
  .mod_btns {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    overflow: hidden;
    .mod_btn {
      display: block;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
      min-width: 0;
      height: 2.88rem;
      line-height: 2.88rem;
      text-align: center;
      font-size: 1rem;
      position: relative;
    }
    .bg_1 {
      background: #e4393c;
      color: #fff;
    }
  }
</style>
<style scoped>
  /* *{margin-top: 0}
  .weui-cells{margin-top: 0 !important;} */
  .address-box2{
    width: 100%;
    height:2.81rem;
    overflow: hidden;
    position: relative;
  }
  .address2 >>>.vux-popup-picker-select{
    padding-left: 1rem;
    text-align: left !important;
  }
  .address2 >>>.weui-input{color: #666}
  .address2 >>>.weui-cells{margin-top: 0 !important;}
  .address-box2 >>>.vux-no-group-title{position: absolute;bottom: 0;left: 0;width: 100%;height: 100%;margin-top: 0!important}
  .address2 >>>.weui-textarea{
        color: #666;
  }
.address2 >>>  .vux-cell-value{
    color: #666;
  }
</style>
