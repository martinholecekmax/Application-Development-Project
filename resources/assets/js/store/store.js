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
                        router.push('/signin');
                        reject("Token Expire");
                    } else if (Date.now() / 1000 > exp - thirty_minutes && Date.now() / 1000 < orig_iat + one_hour) {
                        this.dispatch('refreshToken').then((result) => {
                            resolve(result);
                        }).catch((err) => {
                            reject(err);
                        });
                    } else {
                        resolve("Token is valid");
                    }
                } else {
                    router.push('/signin');
                    reject("Invalid Token");
                }
            });
        }
    }
});




// const token = localStorage.getItem("token");
// if (token) {
//     const decoded = jwt_decode(token);
//     const exp = decoded.exp;
//     const orig_iat = decoded.iat;

//     // const seven_days = 604800; // 7*24*60*60
//     // const one_hour = 3600; // 7*24*60*60
//     const one_hour = 3600; // 7*24*60*60
//     const thirty_minutes = 1800; // 30*60
//     // const thirty_minutes = 10; // 30*60

//     if (Date.now() / 1000 > exp) {
//         // IF TOKEN EXPIRED THEN SEND TO LOGIN PAGE
//         return false;
//     } else if (
//         Date.now() / 1000 > exp - thirty_minutes &&
//         Date.now() / 1000 < orig_iat + one_hour
//     ) {
//         // IF TOKEN EXPIRE IN LESS THAN 30MN BUT STILL IN REFRESH PERIOD THEN REFRESH
//         console.log("refresh token");
//         this.dispatch('refreshToken').then((result) => {
//             return true;
//         }).catch((err) => {
//             return false;
//         });
//         console.log(exp);
//         console.log(orig_iat);
//         console.log(decoded);
//     } else {
//         console.log("token is valid");
//         console.log(exp);
//         console.log(orig_iat);
//         console.log(decoded);
//     }
//     return true;
// } else {
//     // NO TOKEN THEN SEND TO LOGIN PAGE
//     console.log("NO TOKEN THEN SEND TO LOGIN PAGE");
//     return false;
// }