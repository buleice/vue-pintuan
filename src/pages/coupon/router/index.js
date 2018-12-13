import Vue from 'vue';
import Router from 'vue-router';
const UserCoupon=()=>import( '../../../components/coupons/user-coupon.vue');
const UseCoupon=()=>import('../../../components/coupons/exchange-coupon.vue');
const UserCoupon2=()=>import( '../../../components/coupons/user-coupon2.vue');
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
      path:'/usercoupon2',
      name:'usercoupon2',
      component:UserCoupon2
    },
    {
      path:'/usecoupon/:couponId',
      name:'UseCoupon',
      component:UseCoupon,
      props:true
    }
  ]
});
