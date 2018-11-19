//项目域名地址
var url = '';
var ROOT = void 0,
    debug = void 0;
//由于封装的axios请求中，会将ROOT打包进去，为了方便之后不再更改，判断了当前环境，而生成的不同的ROOT
if (process.env.NODE_ENV === 'development') {
    //开发环境下的代理地址，解决本地跨域跨域，配置在config目录下的index.js dev.proxyTable中
    document.cookie = "auth=577c2f17067bbb0df21202874c5bc7556daed39a74581bd32daedc274424a1656fc36476e124985859a97998dc3defba2fb11c5b962f6d8d0431e6e3557de483924b68c3404d72882fc5fa13dc3ef4e26161ba4203ad475d";
    ROOT = "/apis";
    debug = { debug: 20009150 };
} else {
    //生产环境下的地址
    ROOT = url;
    debug = {};
}
exports.PROXYROOT = url; //代理指向地址
exports.ROOT = ROOT;
exports.DEBUG = debug;