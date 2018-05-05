<template>
<div class="container">
  <div class="row justify-content-md-center">
    <div class="col col-md-6">
      <div class="card">
        <h5 class="card-header">
          Login
        </h5>
        <div class="card-body">
        <div class="form-group">
          <label for="email">Email</label>
          <input name="email" class="form-control" :class="{error: errors.has('email')}" v-model="email" v-validate="'required|email'">
          <span class="text-danger" v-show="errors.has('email')">{{errors.first('email')}}</span>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" class="form-control" :class="{error: errors.has('password')}" v-model="password" v-validate="'required'">
          <span class="text-danger" v-show="errors.has('password')">{{errors.first('password')}}</span>
        </div>
          <div v-if="error" class="alert alert-danger">{{error}}</div>
          <button class="btn btn-primary" @click.prevent="signin">Login</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      username: null,
      email: null,
      password: null,
      error: null
    };
  },
  methods: {
    signin() {
      this.$validator.validateAll().then(success => {
        if (!this.errors.any()) {
          this.$store
            .dispatch("loginUser", {
              email: this.email,
              password: this.password
            })
            .then(result => {
              this.$router.push({ path: "/" });
            })
            .catch(err => {
              this.error = err.response.data.error;
            });
        }
      });
    }
  }
};
</script>

<style>
.error {
  border: 1px solid #dc3545;
}
</style>
