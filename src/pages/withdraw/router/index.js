import Vue from 'vue';
import Router from 'vue-router';
import BindCard from '../../../components/base/bindBankCard.vue';
import ToWallet from '../../../components/base/withdrawtowallet.vue';
import BonusRecord from '../../../components/base/bonusrecord';
import  MyBonusCanDraw from '../../../components/base/myBonusCanDraw'

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/bindcard' },
    {
      path: '/bindcard',
      name: 'BindCard',
      component: BindCard
    },
    {
      path: '/towallet',
      name: 'ToWallet',
      component: ToWallet
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
