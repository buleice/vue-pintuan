import Vue from 'vue';
import Router from 'vue-router';

const OrderConfirmation=()=>import('../../../components/addressMange/order-confirmation')
const EditAddressIndex=()=>import('../../../components/addressMange/editAddress.vue')
const AddressList=()=>import('../../../components/addressMange/addressList')
const AddAddress=()=>import('../../../components/addressMange/addAddress')
const ChooseAddress=()=>import('../../../components/addressMange/chooseAddress')
const OrderPage=()=>import('../../../components/addressMange/order-page')
const OrderList=()=>import('../../../components/addressMange/order-list')
const orderDetail=()=>import('../../../components/addressMange/order-detail')
const unpayOrder=()=>import('../../../components/addressMange/unpayorder')
Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/orderlist' },
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
    },
    {
      path:'/orderpage',
      name:"orderpage",
      component:OrderPage
    },
    {
      path:'/orderlist',
      name:'orderlist',
      component:OrderList
    },
    {
      path:'/orderdetail',
      name:'orderdetail',
      component:orderDetail
    },
    {
      path:'/unpayorder',
      name:'unpayorder',
      component:unpayOrder
    }
  ]
});
