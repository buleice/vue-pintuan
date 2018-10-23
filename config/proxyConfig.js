
const config = require("../src/config/urlConfig");  //路径你们改下
let proxy;

if (process.env.NODE_ENV === 'development') {
  proxy={
        [config.ROOT]: {    //将www.exaple.com印射为/apis
            target: config.PROXYROOT,// 接口域名
            // secure: false, // 如果是https接口，需要配置这个参数
            changeOrigin: true,  //是否跨域
            pathRewrite: {
                [`^${config.ROOT}`]: 'localhost:8080'   //需要rewrite的
            }
        }
  }
}else{
  proxy={};
}
module.exports={
  proxy
}
