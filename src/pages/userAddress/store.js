import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import * as actions from "../../store/actions";
import * as getters from "../../store/getters";
import state from "../../store/state";
import mutations from "../../store/mutations";
Vue.use(Vuex);
//设置debug
const debug = process.env.NODE_ENV !== 'production'


export default new Vuex.Store({
  state:{
    shippingAddress:[],
  },
  actions:{
    setShippingAddress({commit,state},list){
      commit('SETSHIPPINGADDRESS',list)
    }
  },
  mutations:{
    SETSHIPPINGADDRESS(state,list){
      state.shippingAddress=list;
    }
  },
  getters:{
    AddressList:(state)=>state.shippingAddress
  },
  strict:debug,
  plugins: debug ? [createLogger()] : []
})
