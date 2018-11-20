import Vue from 'vue';
import Router from 'vue-router';
const UserCoupon=()=>import( '../../../components/coupons/user-coupon.vue');
const UseCoupon=()=>import('../../../components/coupons/exchange-coupon.vue');
Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/usercoupon' },
    {
      path: '/usercoupon',
      name: 'UserCoupon',
      component:UserCoupon
    },
    {
      path:'/usecoupon/:couponId',
      name:'UseCoupon',
      component:UseCoupon,
      props:true
    }
  ]
});
