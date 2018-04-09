<template>
<div>
    <div v-for="event in events" v-bind:key="event.id">
        <div>{{event.title}}</div>
        <div>{{event.description}}</div>
        <div>{{event.location}}</div>
        <div>{{event.start_date}}</div>
        <div>{{event.end_date}}</div>
        <div>{{event.all_day}}</div>
        <hr>
    </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      events: []
    };
  },
  mounted: function() {
    this.signin();
  },
  methods: {
    signin() {
      const token = localStorage.getItem("token");
      axios
        .get("/jwt/public/api/events?token=" + token, {
          headers: {
            "X-Requested-With": "XMLHttpRequest"
          }
        })
        .then(response => {
          this.events = response.data.events;
          console.log(response);
        })
        .catch(error => console.log(error));
    }
  }
};
</script>
