import Vue from 'vue';
import Router from 'vue-router';

const OrderConfirmation=()=>import('../../../components/addressMange/order-confirmation')
const EditAddressIndex=()=>import('../../../components/addressMange/editAddress.vue')
const AddressList=()=>import('../../../components/addressMange/addressList')
const AddAddress=()=>import('../../../components/addressMange/addAddress')
const ChooseAddress=()=>import('../../../components/addressMange/chooseAddress')
Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/orderSubmit' },
    {
      path: '/orderSubmit',
      name: 'OrderConfirmation',
      component: OrderConfirmation,
      // props: (route) => ({ query: route.query.q })
    },
    {
      path: '/editAddress',
      name: 'EditAddressIndex',
      component: EditAddressIndex,
    },
    {
      path:'/chooseAddress',
      name:'ChooseAddress',
      component:ChooseAddress
    },
    {
      path:'/addressList',
      name:'AddressLIst',
      component:AddressList
    },
    {
      path:'/addAddress',
      name:'AddAddress',
      component:AddAddress
    }
  ]
});
