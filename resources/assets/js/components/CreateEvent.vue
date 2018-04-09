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
      <date-picker v-model="start_date" type="datetime" format="yyyy-MM-dd HH:mm:ss" :first-day-of-week="1" lang="en"></date-picker>
  </div>
  <div class="form-group" v-if="!all_day">
      <label for="end_date">End date</label>
      <date-picker v-model="end_date" type="datetime" format="yyyy-MM-dd HH:mm:ss" :first-day-of-week="1" lang="en"></date-picker>
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
import DatePicker from "vue2-datepicker";
import moment from "moment";

export default {
  components: { DatePicker },
  data() {
    return {
      events: [],
      title: "",
      description: "",
      location: "",
      start_date: "",
      end_date: "",
      all_day: false,
      shortcuts: [
        {
          text: "Today",
          start: new Date(),
          end: new Date()
        }
      ]
    };
  },
  methods: {
    signin() {
      const token = localStorage.getItem("token");
      if (this.all_day) {
        this.end_date = this.start_date;
      }
      axios
        .post(
          "/jwt/public/api/event?token=" + token,
          {
            title: this.title,
            description: this.description,
            location: this.location,
            start_date: moment(this.start_date).format("YYYY-MM-DD HH:mm:ss"),
            end_date: moment(this.end_date).format("YYYY-MM-DD HH:mm:ss"),
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
