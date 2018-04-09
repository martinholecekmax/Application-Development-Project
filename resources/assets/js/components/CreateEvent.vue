<template>
<form>
  <div class="form-group">
      <label for="title">Title</label>
      <input type="title" id="title" name="title" class="form-control" v-model="title">
  </div>
  <div class="form-group">
      <label for="description">Description</label>
      <input type="description" id="description" name="description" class="form-control" v-model="description">
  </div>
  <div class="form-group">
      <label for="location">Location</label>
      <input type="location" id="location" name="location" class="form-control" v-model="location">
  </div>
  <div class="form-group">
      <label for="start_date">Start date</label>
      <input type="start_date" id="start_date" name="start_date" class="form-control" v-model="start_date">
  </div>
  <div class="form-group">
      <label for="end_date">End date</label>
      <input type="end_date" id="end_date" name="end_date" class="form-control" v-model="end_date">
  </div>  
  <div class="form-group">
    <input type="checkbox" id="checkbox" v-model="all_day">
    <label for="checkbox">{{ all_day }}</label>
  </div>  
  <button type="submit" class="btn btn-primary" @click.prevent="signin">Create Event</button>
</form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      events: [],
      title: "",
      description: "",
      location: "",
      start_date: "",
      end_date: "",
      all_day: false
    };
  },
  methods: {
    signin() {
      const token = localStorage.getItem("token");
      axios
        .post(
          "/jwt/public/api/event?token=" + token,
          {
            title: this.title,
            description: this.description,
            location: this.location,
            start_date: "1992-12-10 04:06:36",
            end_date: "1992-12-10 04:06:36",
            all_day: this.all_day
          },
          {
            headers: {
              "X-Requested-With": "XMLHttpRequest"
            }
          }
        )
        .then(response => {
          console.log(response);
        })
        .catch(error => console.log(error));
    }
  }
};
</script>
