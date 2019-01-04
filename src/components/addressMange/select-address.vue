<template>
  <div class="wx_wrap">
    <div>
      <div class="address_list">
        <div class="address" v-for="(item,index) in shippingAddress">
          <ul :class="{selected: selectedIndex==item.id}" @click="setAddressIndex(item)">
            <li><strong>{{item.name}}</strong>&nbsp;<strong>{{item.phone}}</strong></li>
            <li><span v-if="item.default==1" class="tag tag_red">默认</span>{{item.province+item.city+item.district+item.address}}</li>
            <!--<li class="edit" @click.stop="$router.push({name:'EditAddressIndex',params:{index:index}})">编辑</li>-->
          </ul>
        </div>
      </div>
      <div>
        <div class="address_list_link">
          <div class="address_list" tag="wx" style="display: none;">
            <div class="address_list_link"><a href="javascript:void(0);" class="item item_self no_top_line"><span>微信地址</span><span class="item_wx_select_tip">点击选择</span></a></div>
          </div>
          <div class="address_list" style="display: none;">
            <div class="address_list_link"><a href="javascript:void(0);" class="item item_self no_top_line"><span>QQ地址</span><span class="item_wx_select_tip">点击选择</span></a></div>
          </div>
        </div>
      </div>
      <div class="mod_btns fixed" @click="$router.push({path:'/addAddress'})"><a href="javascript:void(0);" class="mod_btn bg_1">新增收货地址</a></div>
    </div>

  </div>
</template>

<script>
  import {
    Request
  } from '../../api/request'
  import {
    mapGetters,
    mapActions
  } from 'vuex';

  export default {
    name: "select-address",
    data() {
      return {
        selectedIndex: 0,
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.selectedIndex = to.params.id;
      })
    },
    created() {
      new Request('/address/list.json', 'GET').returnJson().then(res => {
        this.setShippingAddress(res.list);
        if(res.list.length>0){
          let result =res.list.filter((item)=>{
            return item.default==1
          })
          result.length>0? this.selectedIndex=result[0].id:this.selectedIndex=res.list[0].id
        }else{
          return
        }

      })
    },
    methods: {
      setAddressIndex(item) {
        this.setDefaultAddress(item);
        this.selectedIndex = item.id;
      },
      ...mapActions(['setDefaultAddress', 'setShippingAddress'])
    },
    computed: {
      ...mapGetters(['shippingAddress'])
    }
  }
</script>

<style scoped lang="scss">
  .wx_wrap {
    position: relative;
    background: #f5f5f5;
    .address_list {
      margin-bottom: 0.63rem;
      font-size: 0.88rem;
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
          padding:0.44rem 4.5rem 0.44rem .625rem;
          position: relative;
          overflow: hidden;
          &.selected:before {
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAnUExURUdwTOk7Pe08Qeo8PvJFReo7Peo7Pek7Peo7Puo8Puk8Pek8QOk7Pd3EmuAAAAAMdFJOUwDqKYAPqPPWUHK/O5nvTfQAAAD0SURBVCjPY2CAAM2osvSlkxiQAYv5GTAodkASMzsDBckI0cYzcCABE2M+gwQMoJpjkAWPQgxgPYMCAsCCNqiCh0FiHGfQQANQ0BFdUARTN1g/Sw664DEHVEfCnMqOwpfuARIFDDrIYgcV9gDJQwxzkAWFmGSA5EmGGBSFimCfMqzBUHjmFEMNhsIzxxlyMBSeOYYkCFMIFARpP7ERWSFQO8ii0yAuXCHQohiYRrhCoJPmQHUiFAIdrwO1A6EQ6E12qGsQCoEBwgx1DkIhMOiggSy9ETmQsUYH9ojDGsVYEwP2ZIM1gWFNitgTLfbkjTUjoGcZAPLdyPDX/Hi9AAAAAElFTkSuQmCC") no-repeat 50%;
            background-size: 1.25rem 1.25rem;
          }
          &::before {
            content: "\20";
            width: 1.25rem;
            height: 1.25rem;
            position: absolute;
            top: 50%;
            right: 0.63rem;
            margin-top: -.63rem;
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAhUExURUdwTJycnJmZmZqampmZmZubm5mZmZmZmZmZmZmZmZmZmXES5I0AAAAKdFJOUwAU+FG8KKVz540ZLfSqAAABHklEQVQ4y2NggAHhKR1KHZ6GDOiAsURrFQgschdAk8hapVIcyCBq7rRqGYoU46RFyRABRjMtTWQpi1WpcHbYqmaEBPsqVyRlIasK4Oys5SiWVi2DsVgWGaDIMGs5wLS0onkhAqqJfVEAmgyrFsQmq8UY/oYIMXYVYMiwrwD5iXMJAybwmgAkhJZikYlSBLksAYsMG9B1jBgug7hOgIF9GQM2kFXAwLIYq4yVA4OQIlYZoLCVA1YZoFGzCrDKsK9k8DLAKsO8hKErAKsM6wqGLgGsMowrGLQYsINFeGRwm4bbBbhdjdunuEMHd4jijgXcMYc7tnGnEDypCndKxJ16cad4PLkEd87Ckxtx52A8uR53SYGndMFdIuEpxbCUfADAKFoNusO8mAAAAABJRU5ErkJggg==") no-repeat 50%;
            background-size: 1.25rem 1.25rem;
          }
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
            margin-top: 0.25rem;
            display: list-item;
            text-align: -webkit-match-parent;
            &.edit {
              color: transparent;
              width: 3.13rem;
              position: absolute;
              top: 0.19rem;
              bottom: 0.19rem;
              right: 0;
              z-index: 2;
              &::after {
                right: 0;
                width: 1.88rem;
                content: "\20";
                height: 1.25rem;
                position: absolute;
                top: 50%;
                margin-top: -.63rem;
                background-position: -3.75rem -1.88rem;
                background-image: url("//wq.360buyimg.com/fd/base/img/order/sprites_old.png?t=20160325");
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
              padding: 0 0.31rem;
              vertical-align: middle;
              margin: -.13rem 0.31rem 0 0;
              max-width: 8em;
              height: 0.94rem;
              line-height: 0.94rem;
              font-size: 0.63rem;
              color: #4b9bfb;
            }
            .tag_red {
              color: #e4393c;
              &::after {
                border-color: #e4393c;
                border-radius: 0.25rem;
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
      margin: 0.94rem 0.63rem;
    }
    .fixed {
      max-width: 33.75rem;
      margin: 0 auto;
      background-color: #fff;
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
        border-radius: 0.25rem;
        position: relative;
        border-radius: 0;
      }
      .mod_btn.bg_1 {
        background: #FFFFFF;
        color: #3c3c3c;
      }
    }
  }
</style>
