//项目域名地址
const url = '';
let ROOT
//由于封装的axios请求中，会将ROOT打包进去，为了方便之后不再更改，判断了当前环境，而生成的不同的ROOT
if (process.env.NODE_ENV === 'development') {
    //开发环境下的代理地址，解决本地跨域跨域，配置在config目录下的index.js dev.proxyTable中
    document.cookie="auth=04314586067bbb0df21202874c5bc7556daed39a74581bd32daedc274424a1656fc36476f424b7f465a5012efd45e406aff70f0e574e8ed3079a2e042bc34eaa5700f44e404d72882fc5fa13dc3ef4e26161ba420fb4e21d"
    ROOT = "/apis"
} else {
    //生产环境下的地址
    ROOT = url;
}
exports.ROOT=ROOT
