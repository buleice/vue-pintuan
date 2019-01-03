import Vue from 'vue';
import Router from 'vue-router';

const activityLesson=()=>import('../../../components/activity/20190101')
const Lottery=()=>import('../../../components/activity/lottery')
const activityIntro=()=>import('../../../components/activity/activityIntro')


Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/lottery' },
    {
      path: '/lottery',
      name: 'Lottery',
      component: Lottery
    },
    {
      path: '/activitylessons',
      name: 'activityLesson',
      component: activityLesson,
    },
    {
      path:'/activityIntro',
      name:'activityIntro',
      component:activityIntro
    },
    // {
    //   path:'/addressList',
    //   name:'AddressLIst',
    //   component:AddressList
    // },
    // {
    //   path:'/addAddress',
    //   name:'AddAddress',
    //   component:AddAddress
    // }
  ]
});
