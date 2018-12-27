import { WechatPlugin } from 'vux';
// wx.chooseWXPay({
//   timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
//   nonceStr: '', // 支付签名随机串，不长于 32 位
//   package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
//   signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
//   paySign: '', // 支付签名
//   success: function (res) {
// // 支付成功后的回调函数
//   }
// });


// wx.openAddress({
//   success: function (res) {
//     var userName = res.userName; // 收货人姓名
//     var postalCode = res.postalCode; // 邮编
//     var provinceName = res.provinceName; // 国标收货地址第一级地址（省）
//     var cityName = res.cityName; // 国标收货地址第二级地址（市）
//     var countryName = res.countryName; // 国标收货地址第三级地址（国家）
//     var detailInfo = res.detailInfo; // 详细收货地址信息
//     var nationalCode = res.nationalCode; // 收货地址国家码
//     var telNumber = res.telNumber; // 收货人手机号码
//   }
// });

import {axiosPost} from "./axios-data";
const wxPays= {
  join(url, data) {
    wxPay(url, Object.assign({}, data, {isFounder: 0,urltag:'wxyx_groupbuying'}));
  },
  found(url, data){
    wxPay(url, Object.assign({}, data, {isFounder: 1}))
  },
  freeJoin(url, data){
    axiosPost(url, Object.assign({}, data, {isFounder: 0})).then(response => {
      if (response.status === 200) {
        setTimeout(function() {
          window.location.reload()
          // window.location.href = "/purchase/detail?buyingid=" + buyingid + "&groupid=" + data.groupid
        }, 300);
      }
    }).catch(function (errors) {
      console.log('errors', errors);
    });
  },
  freeFound(url,data){
    axiosPost(url, Object.assign({}, data, {isFounder: 1})).then(response => {
      if (response.status === 200) {
        setTimeout(function() {
          // window.location.href = "/purchase/detail?buyingid=" + buyingid + "&groupid=" + groupid;
          window.location.reload()
        }, 300);
      }
    }).catch(function (errors) {
      console.log('errors', errors);
    });
  },
  justPay(url,data){
    wxPay(url, Object.assign({}, data, {urltag:'activity20190101'}));
  },
  bonusPay(url,data){
    axiosPost(url, data).then(response => {
      if (response.status === 200) {
        setTimeout(function() {
          window.location.reload()
        }, 300);
      }
    }).catch(function (errors) {
      console.log('errors', errors);
    });
  }
}

const wxPay=function (url,data) {
  axiosPost(url,data).then(response=>{
    if(response.status===200){
      Pay(response.data.data);
    }
  }).catch(function (errors) {
    console.log('errors', errors);
  });

}

const Pay = function(params) {
  if (typeof WechatPlugin.WeixinJSBridge === 'undefined') {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', function () { onBridgeReady(params) }, false)
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', function () { onBridgeReady(params) })
      document.attachEvent('onWeixinJSBridgeReady', function () { onBridgeReady(params) })
    }
  } else {
    onBridgeReady(params)
  }
}

const onBridgeReady=function (params) {
  WechatPlugin.WeixinJSBridge.invoke(
    'getBrandWCPayRequest', params,
    function(res) {
      if (res.err_msg === "get_brand_wcpay_request:ok") {
        alert("支付成功");
        window.location.reload()
      } else {
        alert("支付失败");
      }
    }
  );
}

export {
  wxPays
}

