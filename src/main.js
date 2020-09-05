// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import swal from 'sweetalert';
import axios from 'axios';
import App from './App';
// import router from './router';

// eslint-disable-next-line import/extensions
import PostDetail from './components/PostDetail.vue';
// eslint-disable-next-line import/extensions
import Posts from './components/Posts.vue';
// eslint-disable-next-line import/extensions
import Profile from './components/Profile.vue';

// eslint-disable-next-line import/first
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDGSdbVo9yD8eoekj4-807sEYGZCnl9wys',
    libraries: 'places',
  },
});
// eslint-disable-next-line no-multi-assign
window.$ = window.jQuery = require('jquery');

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: Posts },
    { path: '/post/:id', component: PostDetail },
    { path: '/profile/:id', component: Profile },
  ],
  mode: 'history',
});
// eslint-disable-next-line no-unused-vars
const _ = require('lodash');

require('bootstrap');
require('../node_modules/bootstrap/dist/css/bootstrap.css');

Vue.prototype.$swal = swal;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

// Vue.use(swal);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  // components: { App },
  // template: '<App/>',
});
