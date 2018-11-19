import Vue from 'vue';
import Router from 'vue-router';
import Shop from '../../../components/main-entry/shop.vue';
import Mine from '../../../components/main-entry/user.vue';
import Bonus from '../../../components/main-entry/bonus.vue';
import Course from '../../../components/main-entry/course.vue';
import BonusBill from '../../../components/base/bonus-bill/bonus-bill.vue';
import BonusIndex from '../../../components/base/bonus-index/bonus-index.vue';

Vue.use(Router);

export default new Router({
  routes: [{ path: '/', redirect: '/shop' }, {
    path: '/shop',
    name: 'Shop',
    component: Shop
  }, {
    path: '/mine',
    name: 'mine',
    component: Mine
  }, {
    path: '/course',
    name: 'Course',
    component: Course
  }, {
    path: '/bonus',
    component: Bonus,
    children: [{ path: '/', redirect: 'center' }, {
      path: 'center',
      component: BonusIndex,
      name: 'BonusIndex'
    }, {
      path: 'bill',
      component: BonusBill,
      name: 'BonusBill'
    }]
  }]
});