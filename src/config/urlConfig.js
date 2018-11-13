//项目域名地址
const url = '';
let ROOT,debug;
//由于封装的axios请求中，会将ROOT打包进去，为了方便之后不再更改，判断了当前环境，而生成的不同的ROOT
if (process.env.NODE_ENV === 'development') {
  document.cookie="auth=f10b2f12067bbb0df21202874c5bc7556daed39a74581bd32daedc274424a1656fc3647649a8201b6db46db9d03a74420c7b68031d86dafd7763e41311b3ea0f836074a1404d72882fc5fa13dc3ef4e26161ba4202210bbb";
    //开发环境下的代理地址，解决本地跨域跨域，配置在config目录下的index.js dev.proxyTable中
    ROOT = "/apis"
    debug={debug:20009150}
} else {
    //生产环境下的地址
    ROOT = url;
    debug={}
}
exports.PROXYROOT = url; //代理指向地址
exports.ROOT = ROOT;
exports.DEBUG = debug;
