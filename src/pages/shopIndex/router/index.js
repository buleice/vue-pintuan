import Vue from 'vue';
import Router from 'vue-router';
import Shop from '../../../components/main-entry/shop.vue';
import Mine from '../../../components/main-entry/user.vue';
import Bonus from '../../../components/main-entry/bonus.vue';
import Course from '../../../components/main-entry/course.vue'

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
    },
    {
      path:'/course',
      name:'Course',
      component: Course
    },
    {
      path:'/bonus',
      name:'Bonus',
      component:Bonus
    }
  ]
});
