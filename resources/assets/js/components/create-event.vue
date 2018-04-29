<template>
<div>
  <transition v-if="showModal" name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Create Event</h4>
            </div>
              <form>
            <div class="modal-body">
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
                  <date-picker class="float-right" v-model="start_date" :first-day-of-week="1" lang="en"></date-picker>
                </div>
                <div class="form-group">
                  <label for="end_date">End date</label>
                  <date-picker class="float-right" v-model="end_date" :first-day-of-week="1" lang="en"></date-picker>
                </div>
                <div class="form-group">
                  <!-- <timepicker :time-selected="time"></timepicker> -->
                  {{time}}
                </div>
                <div class="form-group mb-0">
                  <input type="checkbox" id="checkbox" v-model="all_day">
                  <label for="checkbox">All Day</label>
                </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary mr-2" @click.prevent="createEvent">Create Event</button>
              <button class="btn btn-outline-secondary" v-on:click.prevent="showModal = false">Cancel</button>
            </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import moment from "moment";

import TimePicker from "./timepicker";

import { EventBus } from "../app";

export default {
  components: { DatePicker, timepicker: TimePicker },
  data() {
    return {
      time: "",
      showModal: false,
      event: {},
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
  created() {
    EventBus.$on("createEventButton", data => {
      this.showModal = true;
    });
  },
  mounted: function() {
    this.auth();
  },
  methods: {
    auth() {
      if (localStorage.getItem("token") === null) {
        this.$router.push({ path: "/signin" });
      }
    },
    createEvent() {
      const token = localStorage.getItem("token");

      this.event = {
        title: this.title,
        description: this.description,
        location: this.location,
        start_date: this.start_date,
        end_date: this.end_date,
        all_day: this.all_day
      };

      if (this.all_day) {
      }
      axios
        .post("/event?token=" + token, {
          title: this.title,
          description: this.description,
          location: this.location,
          start_date: moment(this.start_date).format("YYYY-MM-DD HH:mm:ss"),
          end_date: moment(this.end_date).format("YYYY-MM-DD HH:mm:ss"),
          all_day: this.all_day
        })
        .then(response => {
          console.log(response);
          // this.$router.push({ path: "/" });
          EventBus.$emit("eventCreated", {
            message: "Event Created",
            event: this.event
          });
          this.showModal = false;
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style>
/**
*   Modal Box
*/
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 0px 10px 0 10px;
}

.modal-default-button {
  float: right;
}

/*
* The following styles are auto-applied to elements with
* transition="modal" when their visibility is toggled
* by Vue.js.
*
*/
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>