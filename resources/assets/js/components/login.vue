<template>
<div class="container">
  <div class="row justify-content-md-center">
    <div class="col col-md-6">
      <div class="card">
        <h5 class="card-header">
          Login
        </h5>
        <div class="card-body">
        <div v-if="error" class="alert alert-danger">{{error}}</div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" class="form-control" v-model="email">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" class="form-control" v-model="password">
        </div>
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
      username: "",
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    signin() {
      this.$store
        .dispatch("loginUser", {
          email: this.email,
          password: this.password
        })
        .then(result => {
          this.$router.push({ path: "/" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
