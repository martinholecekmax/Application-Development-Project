<template>
<form>
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
</form>
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
      axios
        .post("/signup", {
          name: this.username,
          email: this.email,
          password: this.password
        })
        .then(response => {
          console.log(response);
          this.$router.push({ path: "/signin" });
        })
        .catch(error => console.log(error));
    }
  }
};
</script>
