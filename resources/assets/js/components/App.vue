<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark sticky-top">
      <router-link class="navbar-brand" to="/">Home</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="navbar-item">
            <router-link v-if="!isUserLogin()" class="nav-link" to="/signup">Register</router-link>
          </li>
          <li class="navbar-item">
            <router-link v-if="!isUserLogin()" class="nav-link" to="/signin">Login</router-link>
          </li>
          <li class="navbar-item">
            <a class="nav-link" v-if="isUserLogin()" v-on:click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container-fluid mt-3">
      <div class="row">
        <div class="col-md-12">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  updated() {
    if (!this.$store.state.token && this.$route.path !== "/signup") {
      this.$router.push("/signin");
    }
  },
  methods: {
    logout() {
      this.$store.commit("removeToken");
      this.$router.push({ path: "/signin" });
    },
    isUserLogin() {
      return this.$store.state.token;
    }
  }
};
</script>

<style>
.navbar {
  background-color: #282828;
}
.navbar .navbar-brand {
  color: #9d9d9d;
}
.navbar .navbar-brand:hover,
.navbar .navbar-brand:focus {
  color: #ffffff;
}
.navbar .navbar-text {
  color: #9d9d9d;
}
.navbar .navbar-text a {
  color: #ffffff;
}
.navbar .navbar-text a:hover,
.navbar .navbar-text a:focus {
  color: #ffffff;
}
.navbar .navbar-nav .nav-link {
  color: #9d9d9d;
  border-radius: 0.25rem;
  margin: 0 0.25em;
}
.navbar .navbar-nav .nav-link:not(.disabled):hover,
.navbar .navbar-nav .nav-link:not(.disabled):focus {
  color: #ffffff;
}
.navbar .navbar-nav .nav-item.active .nav-link,
.navbar .navbar-nav .nav-item.active .nav-link:hover,
.navbar .navbar-nav .nav-item.active .nav-link:focus,
.navbar .navbar-nav .nav-item.show .nav-link,
.navbar .navbar-nav .nav-item.show .nav-link:hover,
.navbar .navbar-nav .nav-item.show .nav-link:focus {
  color: #ffffff;
  background-color: #3b3b3b;
}
.navbar .navbar-toggle {
  border-color: #3b3b3b;
}
.navbar .navbar-toggle:hover,
.navbar .navbar-toggle:focus {
  background-color: #3b3b3b;
}
.navbar .navbar-toggle .navbar-toggler-icon {
  color: #9d9d9d;
}
.navbar .navbar-collapse,
.navbar .navbar-form {
  border-color: #9d9d9d;
}
.navbar .navbar-link {
  color: #9d9d9d;
}
.navbar .navbar-link:hover {
  color: #ffffff;
}

@media (max-width: 575px) {
  .navbar-expand-sm .navbar-nav .show .dropdown-menu .dropdown-item {
    color: #9d9d9d;
  }
  .navbar-expand-sm .navbar-nav .show .dropdown-menu .dropdown-item:hover,
  .navbar-expand-sm .navbar-nav .show .dropdown-menu .dropdown-item:focus {
    color: #ffffff;
  }
  .navbar-expand-sm .navbar-nav .show .dropdown-menu .dropdown-item.active {
    color: #ffffff;
    background-color: #3b3b3b;
  }
}

@media (max-width: 767px) {
  .navbar-expand-md .navbar-nav .show .dropdown-menu .dropdown-item {
    color: #9d9d9d;
  }
  .navbar-expand-md .navbar-nav .show .dropdown-menu .dropdown-item:hover,
  .navbar-expand-md .navbar-nav .show .dropdown-menu .dropdown-item:focus {
    color: #ffffff;
  }
  .navbar-expand-md .navbar-nav .show .dropdown-menu .dropdown-item.active {
    color: #ffffff;
    background-color: #3b3b3b;
  }
}

@media (max-width: 991px) {
  .navbar-expand-lg .navbar-nav .show .dropdown-menu .dropdown-item {
    color: #9d9d9d;
  }
  .navbar-expand-lg .navbar-nav .show .dropdown-menu .dropdown-item:hover,
  .navbar-expand-lg .navbar-nav .show .dropdown-menu .dropdown-item:focus {
    color: #ffffff;
  }
  .navbar-expand-lg .navbar-nav .show .dropdown-menu .dropdown-item.active {
    color: #ffffff;
    background-color: #3b3b3b;
  }
}

@media (max-width: 1199px) {
  .navbar-expand-xl .navbar-nav .show .dropdown-menu .dropdown-item {
    color: #9d9d9d;
  }
  .navbar-expand-xl .navbar-nav .show .dropdown-menu .dropdown-item:hover,
  .navbar-expand-xl .navbar-nav .show .dropdown-menu .dropdown-item:focus {
    color: #ffffff;
  }
  .navbar-expand-xl .navbar-nav .show .dropdown-menu .dropdown-item.active {
    color: #ffffff;
    background-color: #3b3b3b;
  }
}

.navbar-expand .navbar-nav .show .dropdown-menu .dropdown-item {
  color: #9d9d9d;
}
.navbar-expand .navbar-nav .show .dropdown-menu .dropdown-item:hover,
.navbar-expand .navbar-nav .show .dropdown-menu .dropdown-item:focus {
  color: #ffffff;
}
.navbar-expand .navbar-nav .show .dropdown-menu .dropdown-item.active {
  color: #ffffff;
  background-color: #3b3b3b;
}
</style>
