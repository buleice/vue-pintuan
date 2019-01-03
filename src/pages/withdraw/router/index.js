import Vue from 'vue';
import Router from 'vue-router';

import  MyBonusCanDraw from '../../../components/base/myBonusCanDraw';

const BindCard=()=>import('../../../components/base/bindBankCard.vue')
const  ToWallet=()=>import('../../../components/base/withdrawtowallet.vue')
const BonusRecord=()=>import('../../../components/base/bonusrecord')


Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/mybonuscandraw' },
    {
      path: '/bindcard',
      name: 'BindCard',
      component: BindCard,
      props: (route) => ({ query: route.query.q })
    },
    {
      path: '/towallet',
      name: 'ToWallet',
      component: ToWallet,
    },
    {
      path:'/bonusrecord',
      name:"BonusRecord",
      component:BonusRecord
    },
    {
      path:'/mybonuscandraw',
      name:'myBonusCanDraw',
      component:MyBonusCanDraw
    }
  ]
});
