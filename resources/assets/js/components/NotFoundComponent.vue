<template>
  <div class="container jumbotron bg-light">
    <div class="display-1 text-dark mb-3">
      404
    </div>
    <p class="h2 text-dark">
      Oops, the page you're looking for does not exist.
    </p>
    <hr class="my-4">
    <p class="h4 text-dark mb-4">
        You may want to head back to the homepage.
    </p>
    <div class="buttons-container">
      <router-link class="btn btn-primary btn-lg" to="/">Go To Homepage</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>