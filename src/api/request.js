import {ROOT,DEBUG} from '../config/urlConfig';
import 'whatwg-fetch';
function addQueryString(params) {
    let paramsData = '';
    for (var Key in params) {
        paramsData +=Key + "=" + params[Key] + "&";
    }
    return paramsData;
}
class Request{
  constructor(url, method = "GET", data = {}) {
    this.url = ROOT + url+"?",
    this.method = method,
    this.data = Object.assign({},data,DEBUG)
  }
  returnJson(){
    return new Promise((resolve,reject)=>{
      this.method=="POST"?
      fetch(this.url, {
        method: this.method,
        headers: {
          "Content-Type": "application/json",
          "cache": "force-cache"
        },
        credentials: "include",
        body: JSON.stringify(this.data)
      }).then(response => resolve(response.json()))
      :
      fetch(this.url+addQueryString(this.data), {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
      }).then(response=>resolve(response.json()))
    })
  }
}
export{
  Request
}
