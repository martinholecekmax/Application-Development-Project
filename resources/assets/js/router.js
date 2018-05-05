import Vue from 'vue';
import VueRouter from 'vue-router';
import Calendar from './components/calendar.vue';
import Signup from './components/signup.vue';
import Signin from './components/login.vue';
import NotFoundComponent from './components/page-not-found.vue';

Vue.use(VueRouter);

const routes = [
    { path: '', component: Calendar },
    { path: '/signup', component: Signup },
    { path: '/signin', component: Signin },
    { path: '*', component: NotFoundComponent }
];

export default new VueRouter({
    mode: 'history',
    routes: routes
});