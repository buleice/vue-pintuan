import _Promise from 'babel-runtime/core-js/promise';
import axios from 'axios';
import { ROOT, DEBUG } from '../config/urlConfig';

var axiosPost = function axiosPost(url, data) {
    return new _Promise(function (resolve, reject) {

        axios({
            url: ROOT + url,
            method: 'post',
            data: data,
            transformRequest: [function (data) {
                var ret = '';
                for (var it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
                }
                return ret;
            }],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (res) {
            return resolve(res);
        });
    });
};

export { axiosPost };