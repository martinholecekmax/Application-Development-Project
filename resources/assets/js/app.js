
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

import router from './router';
import App from './components/App.vue';
import { store } from './store/store';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);

// localhost URL
// window.axios.defaults.baseURL = 'http://localhost/jwt/public/api/';

// Virtual host URL
window.axios.defaults.baseURL = 'http://calendar.test/api/';

// Online Hosting URL
// window.axios.defaults.baseURL = 'http://martinholecekmax.site/api/';

export const EventBus = new Vue();

const app = new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});
