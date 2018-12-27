import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex);
//设置debug
const debug = process.env.NODE_ENV !== 'production'


export default new Vuex.Store({
  state:{
    shippingAddress:[],
    defaultAddress:{}
  },
  actions:{
    setShippingAddress({commit,state},list){
      commit('SETSHIPPINGADDRESS',list)
    },
    setDefaultAddress({commit,state},address){
      commit('SETDEFAULTADDRESS',address)
    }
  },
  mutations:{
    SETSHIPPINGADDRESS(state,list){
      state.shippingAddress=list;
    },
    SETDEFAULTADDRESS(state,address){
      state.defaultAddress=address;
    },
  },
  getters:{
    shippingAddress:state=>state.shippingAddress,
    defaultAddress:state=>state.defaultAddress
  },
  strict:debug,
  plugins: debug ? [createLogger()] : []
})
