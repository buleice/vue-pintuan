import Vue from 'vue';
import Router from 'vue-router';
import BindCard from '../../../components/base/bindBankCard.vue';
import ToWallet from '../../../components/base/withdrawtowallet.vue';
import BonusRecord from '../../../components/base/bonusrecord';
import  MyBonusCanDraw from '../../../components/base/myBonusCanDraw';
// 
// const BindCard=()=>import('../../../components/base/bindBankCard.vue');
// const BindCard=()=>import('../../../components/base/withdrawtowallet.vue')
// const BindCard=()=>import('')
// const BindCard=()=>import('')
// const BindCard=()=>import('')

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
      path: '/towallet/:canCash',
      name: 'ToWallet',
      component: ToWallet,
      props: true
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
