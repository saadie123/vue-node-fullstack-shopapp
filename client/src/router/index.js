import Vue from 'vue';
import Router from 'vue-router';

import Home from '../components/Home.vue';
import Products from '../components/Products/Products.vue';
import Product from '../components/Products/Product/Product.vue';
import Orders from '../components/Orders/Orders.vue';
import Login from '../components/User/Login.vue';
import Register from '../components/User/Register.vue';
import authGuard from '../guards/auth-guard';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      name: "Home"
    },
    {
      path: '/products',
      component: Products,
      name: 'Products'
    },
    {
      path: '/products/:id',
      component: Product,
      name: 'Product'
    },
    {
      path: '/orders',
      component: Orders,
      name: 'Orders',
      beforeEnter: authGuard
    },
    {
      path: '/login',
      component: Login,
      name:'Login'
    },
    {
      path: '/register',
      component: Register,
      name: 'Register'
    },
    {
      path: '/*',
      redirect: '/'
    }
  ],
  mode:'history'
});
