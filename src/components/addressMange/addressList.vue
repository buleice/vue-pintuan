<template>
  <div class="wx_wrap">
    <div class="m_header" style="">
      <div class="m_header_bar">
        <div class="m_header_bar_back"></div>
        <div class="m_header_bar_title">收货地址</div>
        <div class="m_header_bar_menu" style="display:none;"></div>
      </div>
      <div class="m_header_nav" id="headnav" style="display: none;">
        <div class="m_header_nav_item type_index">首页</div>
        <div class="m_header_nav_item type_search">分类搜索</div>
        <div class="m_header_nav_item type_shopcart">购物车</div>
        <div class="m_header_nav_item type_my">我的京东</div>
      </div>
    </div>
    <div style="">
      <div class="address_list">
        <div class="address">
          <ul adid="137622567" type="1" upgrade="0" addrid="17_1387_1389_51713" addrname="湖北_黄石市_黄石港区_城区"
              addrdetail="" class="selected">
            <li><strong>韩承吉</strong>&nbsp;<strong>176****2085</strong></li>
            <li><span class="tag tag_red">默认</span> hellohellohellohellohellohellohellohellohellohellohellohello</li>
            <li class="edit" adid="137622567" type="1">编辑</li>
          </ul>
          </div>
        <div class="address">
          <ul adid="137622567" type="1" upgrade="0" addrid="17_1387_1389_51713" addrname="湖北_黄石市_黄石港区_城区"
              addrdetail="" class="selected">
            <li><strong>韩承吉</strong>&nbsp;<strong>176****2085</strong></li>
            <li><span class="tag tag_red">默认</span> hellohellohellohellohellohellohellohellohellohellohellohello</li>
            <li class="edit" adid="137622567" type="1">编辑</li>
          </ul>
        </div>
      </div>
      <div>
        <div class="address_list_link" style="margin-bottom: 66px;">
          <div class="address_list" tag="wx" style="display: none;">
            <div class="address_list_link"><a href="javascript:void(0);"
                                              class="item item_self no_top_line"><span>微信地址</span><span
              class="item_wx_select_tip">点击选择</span></a></div>
          </div>
          <div class="address_list" tag="sq" style="display: none;">
            <div class="address_list_link"><a href="javascript:void(0);"
                                              class="item item_self no_top_line"><span>QQ地址</span><span
              class="item_wx_select_tip">点击选择</span></a></div>
          </div>
        </div>
      </div>
      <div class="mod_btns fixed" tag="jd" style=""><a href="javascript:void(0);" class="mod_btn bg_1">新增收货地址</a></div>
    </div>
    <div id="pageAddAddress" class="address_new" style="display: none;"></div>
    <div id="pageEditAddress" class="address_new" style="display: none;"></div>
    <div class="invoice_list" id="invoices" style="display: none;"></div>
    <div class="promo_list" id="itemPromoPage" style="display: none;"></div>
    <div id="selectShip" style="display: none;"></div>
    <div id="pickList" style="display: none;"></div>
    <div id="shopList" style="display: none;"></div>
    <div id="jdQuanPage" style="display: none;" class="promo_list"></div>
    <div id="jdCartPage" style="display: none;" class="promo_list"></div>

    <div class="mod_address_slide show" id="address_slide" style="display: none;"></div>

    <div class="promo_list" id="newPromoPage" style="display: none;"></div>
    <div id="bottomConfirmBar" class="mod_btns fixed" style="display: none;">
      <a href="javascript:history.back();" class="mod_btn bg_1" id="btnBottomConfirmBar">确认</a>
    </div>

    <div id="totalPromo3" class="mod_btns fixed" style="display: none;">
      <a href="javascript:void(0);" id="confirmPromot3" class="mod_btn bg_1">确认</a>
    </div>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    name: "addressList"
  }
</script>

<style scoped lang="scss">
  .wx_wrap {
    position: relative;
    min-height: 375px;
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
    .address_list {
      margin-bottom: 10px;
      font-size: 14px;
      color: #666;
      background: #fff;
      .address {
        position: relative;
        overflow: hidden;
        word-wrap: break-word;
        word-break: break-all;
        ul {
          padding-right: 50px;
          background-color: #fff;
          z-index: 2;
          padding: 7px 40px;
          position: relative;
          overflow: hidden;
          &.selected:before {
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAnUExURUdwTOk7Pe08Qeo8PvJFReo7Peo7Pek7Peo7Puo8Puk8Pek8QOk7Pd3EmuAAAAAMdFJOUwDqKYAPqPPWUHK/O5nvTfQAAAD0SURBVCjPY2CAAM2osvSlkxiQAYv5GTAodkASMzsDBckI0cYzcCABE2M+gwQMoJpjkAWPQgxgPYMCAsCCNqiCh0FiHGfQQANQ0BFdUARTN1g/Sw664DEHVEfCnMqOwpfuARIFDDrIYgcV9gDJQwxzkAWFmGSA5EmGGBSFimCfMqzBUHjmFEMNhsIzxxlyMBSeOYYkCFMIFARpP7ERWSFQO8ii0yAuXCHQohiYRrhCoJPmQHUiFAIdrwO1A6EQ6E12qGsQCoEBwgx1DkIhMOiggSy9ETmQsUYH9ojDGsVYEwP2ZIM1gWFNitgTLfbkjTUjoGcZAPLdyPDX/Hi9AAAAAElFTkSuQmCC) no-repeat 50%;
            background-size: 20px 20px;
          }
          &::before {
            content: "\20";
            width: 20px;
            height: 20px;
            position: absolute;
            top: 50%;
            left: 10px;
            margin-top: -10px;
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAhUExURUdwTJycnJmZmZqampmZmZubm5mZmZmZmZmZmZmZmZmZmXES5I0AAAAKdFJOUwAU+FG8KKVz540ZLfSqAAABHklEQVQ4y2NggAHhKR1KHZ6GDOiAsURrFQgschdAk8hapVIcyCBq7rRqGYoU46RFyRABRjMtTWQpi1WpcHbYqmaEBPsqVyRlIasK4Oys5SiWVi2DsVgWGaDIMGs5wLS0onkhAqqJfVEAmgyrFsQmq8UY/oYIMXYVYMiwrwD5iXMJAybwmgAkhJZikYlSBLksAYsMG9B1jBgug7hOgIF9GQM2kFXAwLIYq4yVA4OQIlYZoLCVA1YZoFGzCrDKsK9k8DLAKsO8hKErAKsM6wqGLgGsMowrGLQYsINFeGRwm4bbBbhdjdunuEMHd4jijgXcMYc7tnGnEDypCndKxJ16cad4PLkEd87Ckxtx52A8uR53SYGndMFdIuEpxbCUfADAKFoNusO8mAAAAABJRU5ErkJggg==) no-repeat 50%;
            background-size: 20px 20px;
          }
          li {
            margin-top: 4px;
            display: list-item;
            text-align: -webkit-match-parent;
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
            strong {
              color: #333;
              font-weight: bold;
            }
            .tag {
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
            }
            .tag_red {
              color: #e4393c;
              &::after {
                border-color: #e4393c;
                border-radius: 4px;
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
      }
    }
    .mod_btns{
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      overflow: hidden;
      margin: 15px 10px;
    }
    .fixed {
      left: 0;
      right: 0;
      max-width: 540px;
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
        height: 46px;
        line-height: 46px;
        text-align: center;
        font-size: 16px;
        border-radius: 4px;
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
