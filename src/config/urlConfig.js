//项目域名地址
const url = '';
let ROOT
//由于封装的axios请求中，会将ROOT打包进去，为了方便之后不再更改，判断了当前环境，而生成的不同的ROOT
if (process.env.NODE_ENV === 'development') {
    //开发环境下的代理地址，解决本地跨域跨域，配置在config目录下的index.js dev.proxyTable中
    document.cookie="auth=9af669f8067bbb0df21202874c5bc7556daed39a74581bd32daedc274424a1656fc36476473ad3be194b150b0a63f470bc18516c4a47142c3301ea31216888832167d9f0404d72882fc5fa13dc3ef4e26161ba426c56a9a2"
    ROOT = "/apis"
} else {
    //生产环境下的地址
    ROOT = url;
}
exports.ROOT=ROOT
