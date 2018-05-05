<template>
<div class="container">
  <div class="row justify-content-md-center">
    <div class="col col-md-6">
      <div class="card">
        <h5 class="card-header">
          Register
        </h5>
        <div class="card-body">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" class="form-control" :class="{error: errors.has('username')}" v-model="username" v-validate="'required'">
          <span class="text-danger" v-show="errors.has('username')">{{errors.first('username')}}</span>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="text" id="email" name="email" class="form-control" :class="{error: errors.has('email')}" v-model="email" v-validate="'required|email'">
          <span class="text-danger" v-show="errors.has('email')">{{errors.first('email')}}</span>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" class="form-control" :class="{error: errors.has('password')}" v-model="password" v-validate="'required|min:8'">
          <span class="text-danger" v-show="errors.has('password')">{{errors.first('password')}}</span>
        </div>
        <div class="form-group">
          <label for="password">Confirm Password</label>
          <input type="password" id="password_confirmation" name="password_confirmation" class="form-control" :class="{error: errors.has('password_confirmation')}" v-model="match" v-validate="'required|min:8|confirmed:password'" data-vv-as="password">
          <span class="text-danger" v-show="errors.has('password_confirmation')">{{errors.first('password_confirmation')}}</span>
        </div>
          <button type="submit" class="btn btn-primary" @click.prevent="signup">Register</button>
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
      match: null
    };
  },
  methods: {
    signup() {
      this.$validator.validateAll().then(success => {
        if (!this.errors.any()) {
          this.$store
            .dispatch("registerUser", {
              name: this.username,
              email: this.email,
              password: this.password
            })
            .then(result => {
              this.$router.push({ path: "/signin" });
            })
            .catch(err => {
              console.log(err);
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
