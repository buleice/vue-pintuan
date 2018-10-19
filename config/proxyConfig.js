// module.exports = {
//   proxy: {
//         '/apis': {    //将www.exaple.com印射为/apis
//             target: 'http://dylan.wxyx.youban.com',  // 接口域名
//             secure: false,  // 如果是https接口，需要配置这个参数
//             changeOrigin: true,  //是否跨域
//             pathRewrite: {
//                 '^/apis': 'http://dylan.wxyx.youban.com'   //需要rewrite的,
//             }
//         }
//   }
// }
//
const config = require("../src/fetch/config.js");  //路径你们改下
module.exports = {
  proxy: {
        [config.ROOT]: {    //将www.exaple.com印射为/apis
            target: config.PROXYROOT,// 接口域名
            secure: false,  // 如果是https接口，需要配置这个参数
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                [`^${config.ROOT}`]: ''   //需要rewrite的
            }
        }
  }
}
