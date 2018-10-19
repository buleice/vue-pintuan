import Vue from 'vue';
import Router from 'vue-router';
import Shop from '../../../components/shop.vue';
import Mine from '../../../components/user.vue';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/shop' },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    }
  ]
});
