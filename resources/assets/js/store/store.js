import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import router from '../router';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    endpoints: {
      loginURL: '/login',
      registerURL: '/signup',
      refreshTokenURL: '/refresh'
    }
  },
  mutations: {
    updateToken(state, newToken) {
      localStorage.setItem("token", newToken);
      state.token = newToken;
    },
    removeToken(state) {
      localStorage.removeItem("token");
      state.token = null;
    }
  },
  actions: {
    loginUser(state, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(this.state.endpoints.loginURL, payload)
          .then(response => {
            const token = response.data.access_token;
            this.commit('updateToken', token);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    registerUser(state, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(this.state.endpoints.registerURL, payload)
          .then(response => {
            const token = response.data.access_token;
            this.commit('updateToken', token);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    refreshToken() {
      return new Promise((resolve, reject) => {
        const payload = {
          token: this.state.token
        };
        axios
          .post(this.state.endpoints.refreshTokenURL, payload)
          .then(response => {
            const token = response.data.access_token;
            this.commit('updateToken', token);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    inspectToken() {
      return new Promise((resolve, reject) => {
        const token = this.state.token;
        if (token) {
          const decoded = jwt_decode(token);
          const exp = decoded.exp;
          const orig_iat = decoded.iat;
          const one_hour = 3600; // 7*24*60*60
          const thirty_minutes = 1800; // 30*60
          if (Date.now() / 1000 > exp) {
            this.commit('removeToken');
            router.push('/signin');
            reject("Token Expire");
          } else if (Date.now() / 1000 > exp - thirty_minutes && Date.now() / 1000 < orig_iat + one_hour) {
            this.dispatch('refreshToken').then((result) => {
              resolve(result);
            }).catch((err) => {
              this.commit('removeToken');
              reject(err);
            });
          } else {
            resolve("Token is valid");
          }
        } else {
          this.commit('removeToken');
          router.push('/signin');
          reject("Invalid Token");
        }
      });
    }
  }
});