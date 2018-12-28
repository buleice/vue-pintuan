<template>
  <div class="wx_wrap">
    <div class="m_header">
      <div class="m_header_bar">
        <div class="m_header_bar_back" @click="$router.back()"></div>
        <div class="m_header_bar_title">收货地址</div>
      </div>
    </div>
    <div>
      <div class="address_list">
        <div class="address" v-for="(item,index) in shippingAddress">
          <ul :class="{selected: selectedIndex==index}">
            <li><strong>{{item.name}}</strong>&nbsp;<strong>{{item.phone}}</strong></li>
            <!-- <li><span class="tag tag_red">默认</span>广东深圳市南山区佳嘉豪商务大厦10楼小伴龙</li> -->
            <li><span v-if="item.default==1" class="tag tag_red">默认</span>{{item.address}}</li>
            <li class="edit" @click.stop="$router.push({name:'EditAddressIndex',params:{index:index}})">编辑</li>
          </ul>
        </div>
      </div>
      <div>
        <div class="address_list_link" style="margin-bottom: 4.13rem;">
          <div class="address_list" tag="wx" style="display: none;">
            <div class="address_list_link"><a href="javascript:void(0);"
                                              class="item item_self no_top_line"><span>微信地址</span><span
              class="item_wx_select_tip">点击选择</span></a></div>
          </div>
          <div class="address_list" style="display: none;">
            <div class="address_list_link"><a href="javascript:void(0);"
                                              class="item item_self no_top_line"><span>QQ地址</span><span
              class="item_wx_select_tip">点击选择</span></a></div>
          </div>
        </div>
      </div>
      <div class="mod_btns fixed" @click="$router.push({path:'/addAddress'})"><a href="javascript:void(0);" class="mod_btn bg_1">新增收货地址</a></div>
    </div>

  </div>
</template>

<script>
  import { mapActions,mapGetters} from 'vuex';
import{Request} from '../../api/request'

  export default {
    name: "addressList",
    data(){
      return{
        selectedIndex:0,
        addressList:[]
      }
    },
    created(){
      new Request('/address/list.json','GET').returnJson().then(res=>{
        this.addressList=res.list;
          this.setShippingAddress(res.list);
        // console.log(res)0
      })
    },
    methods:{
      // setAddressIndex(index){
      //   this.setDefaultAddress(this.shippingAddress[index]);
      //   this.selectedIndex=index;
      //   this.$router.back()
      // },
      ...mapActions(['setShippingAddress'])
    },
    computed: {
      ...mapGetters(['shippingAddress'])
    }
  }
</script>

<style scoped lang="scss">
  .wx_wrap {
    position: relative;
    min-height: 23.44rem;
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
    .address_list {
      margin-bottom: .63rem;
      font-size: .88rem;
      color: #666;
      background: #fff;
      .address {
        position: relative;
        overflow: hidden;
        word-wrap: break-word;
        word-break: break-all;
        ul {
          padding-right: 3.13rem;
          background-color: #fff;
          z-index: 2;
          padding: .44rem 2.5rem .44rem 1rem;
          position: relative;
          overflow: hidden;
          // &.selected:before {
          //   background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAnUExURUdwTOk7Pe08Qeo8PvJFReo7Peo7Pek7Peo7Puo8Puk8Pek8QOk7Pd3EmuAAAAAMdFJOUwDqKYAPqPPWUHK/O5nvTfQAAAD0SURBVCjPY2CAAM2osvSlkxiQAYv5GTAodkASMzsDBckI0cYzcCABE2M+gwQMoJpjkAWPQgxgPYMCAsCCNqiCh0FiHGfQQANQ0BFdUARTN1g/Sw664DEHVEfCnMqOwpfuARIFDDrIYgcV9gDJQwxzkAWFmGSA5EmGGBSFimCfMqzBUHjmFEMNhsIzxxlyMBSeOYYkCFMIFARpP7ERWSFQO8ii0yAuXCHQohiYRrhCoJPmQHUiFAIdrwO1A6EQ6E12qGsQCoEBwgx1DkIhMOiggSy9ETmQsUYH9ojDGsVYEwP2ZIM1gWFNitgTLfbkjTUjoGcZAPLdyPDX/Hi9AAAAAElFTkSuQmCC) no-repeat 50%;
          //   background-size: 1.25rem 1.25rem;
          // }
          // &::before {
          //   content: "\20";
          //   width: 1.25rem;
          //   height: 1.25rem;
          //   position: absolute;
          //   top: 50%;
          //   left: .63rem;
          //   margin-top: -.63rem;
          //   background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAhUExURUdwTJycnJmZmZqampmZmZubm5mZmZmZmZmZmZmZmZmZmXES5I0AAAAKdFJOUwAU+FG8KKVz540ZLfSqAAABHklEQVQ4y2NggAHhKR1KHZ6GDOiAsURrFQgschdAk8hapVIcyCBq7rRqGYoU46RFyRABRjMtTWQpi1WpcHbYqmaEBPsqVyRlIasK4Oys5SiWVi2DsVgWGaDIMGs5wLS0onkhAqqJfVEAmgyrFsQmq8UY/oYIMXYVYMiwrwD5iXMJAybwmgAkhJZikYlSBLksAYsMG9B1jBgug7hOgIF9GQM2kFXAwLIYq4yVA4OQIlYZoLCVA1YZoFGzCrDKsK9k8DLAKsO8hKErAKsM6wqGLgGsMowrGLQYsINFeGRwm4bbBbhdjdunuEMHd4jijgXcMYc7tnGnEDypCndKxJ16cad4PLkEd87Ckxtx52A8uR53SYGndMFdIuEpxbCUfADAKFoNusO8mAAAAABJRU5ErkJggg==) no-repeat 50%;
          //   background-size: 1.25rem 1.25rem;
          // }
          &::after {
            content: "";
            height: 0;
            display: block;
            border-top: 1px solid #ddd;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
          }
          li {
            margin-top: .25rem;
            display: list-item;
            text-align: -webkit-match-parent;
            &.edit {
              color: transparent;
              width: 3.13rem;
              position: absolute;
              top: .19rem;
              bottom: .19rem;
              right: 0;
              z-index: 2;
              &::after {
                right: 0px;
                width: 1.88rem;
                content: "\20";
                height: 1.25rem;
                position: absolute;
                top: 50%;
                margin-top: -.63rem;
                background-position: -3.75rem -1.88rem;
                background-image: url(//wq.360buyimg.com/fd/base/img/order/sprites_old.png?t=20160325);
                background-repeat: no-repeat;
                background-size: 6.25rem 6.25rem;
              }
            }
            strong {
              color: #333;
              font-weight: bold;
            }
            .tag {
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
            }
            .tag_red {
              color: #e4393c;
              &::after {
                border-color: #e4393c;
                border-radius: .25rem;
                content: "";
                display: block;
                border: 1px solid #ddd;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                pointer-events: none;
              }
            }
          }

        }
        .act {
          background-color: #ff3b2f;
          color: #fff;
          width: 4.38rem;
          text-align: center;
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          z-index: 1;
          .del {
            height: 1rem;
            line-height: 1rem;
            position: absolute;
            left: 0;
            top: 50%;
            width: 4.38rem;
            margin-top: -.5rem;
          }
        }
      }
    }
    .mod_btns {
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      overflow: hidden;
      margin: .94rem .63rem;
    }
    .fixed {
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
