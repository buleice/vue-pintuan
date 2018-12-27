<template>
  <div class="address2">
    <div class="m_header">
      <div class="m_header_bar">
        <div class="m_header_bar_back"></div>
        <div class="m_header_bar_title">修改地址</div>
      </div>
    </div>
    <group>
      <x-input title="姓名" name="username" placeholder="请输入姓名" v-model="addressInfo.name" is-type="china-name"></x-input>
    </group>
    <group>
      <x-input title="手机" mask="999 9999 9999" v-model="addressInfo.phone" :max="13" is-type="china-mobile"></x-input>
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
    <group>
      <x-switch title="设为默认地址" :value-map="['0', '1']" v-model="addressInfo.default" ></x-switch>
    </group>
   <div class="deleteButton" @click="deleteAdddress">删除该地址</div>
    <div  class="mod_btns"><a  href="javascript:void(0);"  @click="editSubmit" class="mod_btn bg_1">确认修改</a></div>
    <WxDialog :showPromptDialog="showPromptDialog" :promptDesc="promptDesc" @POk="delPok" @PCancle="delPcancle"></WxDialog>
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
        title:'收货地址',
        showAddress: false,
        addressInfo:{},
        promptDesc:'',
        showPromptDialog:false,
        Faddress:[]

      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.addressInfo=JSON.parse(JSON.stringify(vm.shippingAddress[to.params.index]));
        vm.addressInfo.Geocode=[vm.addressInfo.province,vm.addressInfo.city,vm.addressInfo.district]
      })
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
        this.Faddress=names;
        this.addressInfo.address=names.join('')
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
        axiosPost('/address/update.json',postData).then(res=>{
          let addressList=JSON.parse(JSON.stringify(this.shippingAddress));
          addressList[index]=Object.assign({},this.shippingAddress[index],this.addressInfo)
          if(res.data.rc==0){
            this.setShippingAddress(addressList);
            this.$router.back()
          }
        })
      },
      delPok(){
        let index=this.$route.params.index
        axiosPost('/address/delete.json',{id:this.shippingAddress[index].id}).then(res=>{
          if(res.data.rc==0){
            let addressList=JSON.parse(JSON.stringify(this.shippingAddress));
            addressList.splice(index,1);
            this.setShippingAddress(addressList);
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
      ...mapActions(['setShippingAddress'])
    },
    computed:{
      ...mapGetters(['shippingAddress'])
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
  .deleteButton{
    width: 80%;
    height: 46px;
    line-height: 46px;
    border-radius: 4px;
    text-align: center;
    background: #e4393c;
    color: #ffffff;
    margin: 15px auto;
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
  *{margin-top: 0}
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


