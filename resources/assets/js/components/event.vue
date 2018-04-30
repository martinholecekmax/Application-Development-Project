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
      <div class="row">
        <div class="col">
          From: {{ printDate(event.start_date) }} -
          To: {{ printDate(event.end_date) }}
        </div>
      </div>
      <div class="row">
        <div class="col" v-if="!event.all_day">
          {{printTime(event.start_date)}} -
          {{printTime(event.end_date)}}
        </div>
        <div class="col" v-else>
          All Day
        </div>
      </div>
      <hr>
        Description: {{ event.description }}
      <hr>
      <div class="mt-2">
        Location: {{ event.location }}
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
      this.$store
        .dispatch("inspectToken")
        .then(result => {
          EventBus.$emit("editEventButton", {
            event: event
          });
        })
        .catch(err => {
          this.$router.push({ path: "/signin" });
        });
    },
    deleteEvent(event) {
      const token = this.$store.state.token;
      this.$store
        .dispatch("inspectToken")
        .then(result => {
          axios
            .delete("/event/" + event.id + "?token=" + token)
            .then(response => {
              EventBus.$emit("eventDeleted", {
                message: "Event Deleted",
                event: this.event
              });
            })
            .catch(error => {
              this.$router.push({ path: "/signin" });
            });
        })
        .catch(err => {
          this.$router.push({ path: "/signin" });
        });
    }
  }
};
</script>

<style>

</style>
