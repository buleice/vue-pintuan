import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);
//设置debug
const debug = process.env.NODE_ENV !== 'production'


export default new Vuex.Store({
  state:{
    canPay:false,
  },
  actions:{
    setCanPay({commit,state},iscan){
      commit('SETCANPAY',iscan)
    }
  },
  mutations:{
    SETCANPAY(state,iscan){
      state.canPay=iscan
    }
  },
  getters:{
    canPay:(state)=>state.canPay
  },
  strict:debug,
  plugins: debug ? [createLogger()] : []
})
