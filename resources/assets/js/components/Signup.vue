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
          <input type="text" id="username" name="username" class="form-control" v-model="username">
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" class="form-control" v-model="email">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" class="form-control" v-model="password">
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
      username: "",
      email: "",
      password: ""
    };
  },
  methods: {
    signup() {
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
  }
};
</script>
