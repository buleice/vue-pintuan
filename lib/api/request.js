import _JSON$stringify from 'babel-runtime/core-js/json/stringify';
import _Promise from 'babel-runtime/core-js/promise';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
// import {ROOT,DEBUG} from '../config/urlConfig';
// import 'whatwg-fetch';
// function addQueryString(params) {
//     let paramsData = '';
//     for (var Key in params) {
//         paramsData +=Key + "=" + params[Key] + "&";
//     }
//     return paramsData;
// }
//
// class Request{
//   constructor(url, method = "GET", data = {}) {
//     this.url = ROOT + url+"?",
//     this.method = method,
//     // this.data = Object.assign({},data,DEBUG)
//     this.data=data
//   }
//   returnJson(){
//     return new Promise((resolve,reject)=>{
//       this.method=="POST"?
//       fetch(this.url, {
//         method: this.method,
//         headers: {
//           // "Content-Type": "application/json",
//           "Content-Type": "application/x-www-form-urlencoded",
//           "cache": "force-cache"
//         },
//          credentials: 'include',
//         // body: JSON.stringify(this.data),
//         body:JSON.stringify(this.data)
//       }).then(response => resolve(response.json()))
//       :
//       fetch(this.url+addQueryString(this.data), {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "cache": "force-cache",
//            credentials: "same-origin"
//         }
//       }).then(response=>resolve(response.json()))
//     })
//   }
// }
// export{
//   Request
// }


import { ROOT, DEBUG } from '../config/urlConfig';
import 'whatwg-fetch';
function addQueryString(params) {
  var paramsData = '';
  for (var Key in params) {
    paramsData += Key + "=" + params[Key] + "&";
  }
  return paramsData;
}

var Request = function () {
  function Request(url) {
    var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "GET";
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Request);

    this.url = ROOT + url + "?", this.method = method, this.data = _Object$assign({}, data, DEBUG);
  }

  _createClass(Request, [{
    key: 'returnJson',
    value: function returnJson() {
      var _this = this;

      return new _Promise(function (resolve, reject) {
        _this.method == "POST" ? fetch(_this.url, {
          mode: 'cors',
          method: _this.method,
          headers: {
            // "Content-Type": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            "cache": "force-cache"
          },
          credentials: "include",
          // body: JSON.stringify(this.data),
          body: _JSON$stringify(_this.data)
        }).then(function (response) {
          return resolve(response.json());
        }) : fetch(_this.url + addQueryString(_this.data), {
          mode: 'cors',
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "same-origin"
        }).then(function (response) {
          return resolve(response.json());
        });
      });
    }
  }]);

  return Request;
}();

export { Request };