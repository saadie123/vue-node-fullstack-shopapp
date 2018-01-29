// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App'
import router from './router'
import store from './store/index'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import currency from './filter/currency'

Vue.filter('currency',currency);
Vue.use(Vuelidate)
Vue.use(Vuetify, { theme: {
  primary: '#4caf50',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
