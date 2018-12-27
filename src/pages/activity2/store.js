import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);
//设置debug
const debug = process.env.NODE_ENV !== 'production'


export default new Vuex.Store({
  state:{
    canPay:false,
    userCoupons:[],
    canUseCoupons:[],
    couponBuyFilter:0,
    showCouponBuy:false,
    willPayPrice:0,
    buyingId:''

  },
  actions:{
    setCanPay({commit,state},iscan){
      commit('SETCANPAY',iscan);
    },
    setUserCoupons({commit,state},coupons){
      commit('SETCOUPONS',coupons);
    },
    setCouponBuyFilter({commit,state},filter){
      commit('SETCOUPONBUYFILTER',filter);
    },
    setCanUseCoupons({commit,state},coupons){
      commit('SETCANUSECOUPONS',coupons);
    },
    setShowCouponsBuy({commit,state},bool){
      commit('SETSHOWCOUPONSBUY',bool)
    },
    setWillPayPrice({commit,state},price){
      commit('SETWILLBUYPRICE',price)
    },
    setBuyingId({commit,state},id){
      commit('SETBUYINGID',id)
    },
  },
  mutations:{
    SETCANPAY(state,iscan){
      state.canPay=iscan
    },
    SETCOUPONS(state,coupons){
      state.userCoupons=coupons
    },
    SETCANUSECOUPONS(state,coupons){
      state.canUseCoupons=coupons
    },
    SETCOUPONBUYFILTER(state,filter){
      state.couponBuyFilter=filter
    },
    SETSHOWCOUPONSBUY(state,bool){
      state.showCouponBuy=bool
    },
    SETWILLBUYPRICE(state,price){
      state.willPayPrice=price
    },
    SETBUYINGID(state,id){
      state.buyingId=id
    },
  },
  getters:{
    canPay:state=>state.canPay,
    userCoupons:state => state.userCoupons,
    buyFilter:state=>state.couponBuyFilter,
    canUseCoupons:state=>state.canUseCoupons,
    showCouponBuy:state=>state.showCouponBuy,
    willPayPrice:state=>state.willPayPrice,
    buyingId:state=>state.buyingId,
  },
  strict:debug,
  plugins: debug ? [createLogger()] : []
})
