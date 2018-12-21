import Vue from 'vue';
import Router from 'vue-router';

const OrderConfirmation=()=>import('../../../components/addressMange/order-confirmation')
const EditAddressIndex=()=>import('../../../components/addressMange/editAddress.vue')
const AddressList=()=>import('../../../components/addressMange/addressList')

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
      path:'/addressList',
      name:'AddressLIst',
      component:AddressList
    }
  ]
});
