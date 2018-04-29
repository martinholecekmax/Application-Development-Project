
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import VueRouter from 'vue-router';

import App from './components/App.vue';

import Calendar from './components/calendar.vue';
// import Events from './components/events.vue';
import Signup from './components/signup.vue';
import Signin from './components/login.vue';

window.axios.defaults.baseURL = 'http://calendar.test/api/';

Vue.use(VueRouter);

const routes = [
    { path: '', component: Calendar },
    { path: '/signup', component: Signup },
    { path: '/signin', component: Signin }
];

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

export const EventBus = new Vue();

const app = new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
