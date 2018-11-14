import Vue from 'vue';
import Router from 'vue-router';
import UserCoupon from '../../../components/user-coupon.vue'
import UseCoupon from '../../../components/exchange-coupon.vue'
Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/usecoupon' },
    {
      path: '/usercoupon',
      name: 'UserCoupon',
      component:UserCoupon
    },
    {
      path:'/usecoupon',
      name:'UseCoupon',
      component:UseCoupon
    }
  ]
});
