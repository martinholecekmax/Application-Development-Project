<template>
<div class="card mt-3">
  <div class="card-header" v-on:click="show = !show">
    {{ event.title }}
    <div class=" float-right">
      <i class="fas fa-caret-down"></i>
    </div>
  </div>
  <div class="card-body" v-if="show">
    <div class="card-text">
        From: {{ printDate(event.start_date) }} -
        To: {{ printDate(event.end_date) }}
        <hr>
        <div>
          Description: {{ event.description }}
        </div>
        <div class="mt-2">
          Location: {{ event.location }}
        </div>
        <hr>
        <div class="mt-2">
          All Day: {{ event.all_day }}
        </div>
        <hr>
        <button class="btn btn-danger float-right ml-3" v-on:click="deleteEvent(event)">Delete</button>
        <button class="btn btn-primary float-right" v-on:click="editModal(event)">Update</button>
      </div>
    </div>
</div>
</template>

<script>
import moment from "moment";
import EditEvent from "../components/edit-event.vue";

import { EventBus } from "../app";

export default {
  components: {
    "edit-event": EditEvent
  },
  props: ["event"],
  data() {
    return {
      show: false
    };
  },
  methods: {
    printDate(date) {
      return moment(date).format("Do MMMM YYYY");
    },
    printTime(date) {
      return moment(date).format("HH:mm");
    },
    editModal(event) {
      EventBus.$emit("editEventButton", {
        event: event
      });
    },
    deleteEvent(event) {
      const token = localStorage.getItem("token");
      axios
        .delete("/event/" + event.id + "?token=" + token)
        .then(response => {
          console.log(response);
          // this.$router.push({ path: "/" });
          EventBus.$emit("eventDeleted", {
            message: "Event Deleted",
            event: this.event
          });
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style>

</style>
