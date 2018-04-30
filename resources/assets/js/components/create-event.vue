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
            <div class="modal-body">
              <div class="form-group">
                <label for="title">Title</label>
                <input type="title" id="title" name="title" class="form-control" :class="{error: errors.has('title')}" v-model="title" v-validate="'required'">
                <span class="text-danger" v-show="errors.has('title')">{{errors.first('title')}}</span>
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <input type="description" id="description" name="description" class="form-control" :class="{error: errors.has('description')}" v-model="description" v-validate="'required'">
                <span class="text-danger" v-show="errors.has('description')">{{errors.first('description')}}</span>
              </div>
              <div class="form-group">
                <label for="location">Location</label>
                <input type="location" id="location" name="location" class="form-control" :class="{error: errors.has('location')}" v-model="location" v-validate="'required'">
                <span class="text-danger" v-show="errors.has('location')">{{errors.first('location')}}</span>
              </div>
              <div class="form-group">
                <div class="form-row">
                  <div class="col">
                    <label for="start_date">Start date</label>
                  </div>
                  <div class="col">
                    <date-picker :class="{errordate: errors.has('startdate')}" v-model="start_date" :first-day-of-week="1" lang="en"></date-picker>
                  </div>
                  <div class="col">
                    <select v-model="start_time" :disabled="all_day" class="custom-select time-select" :class="{error: errors.has('starttime')}">
                        <option :value="null" disabled>Select Time</option>
                        <option v-for="t in time" v-bind:key="t">{{ t }}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="form-row">
                  <div class="col">
                    <label for="end_date">End date</label>
                  </div>
                  <div class="col">
                    <date-picker :class="{errordate: errors.has('enddate')}" v-model="end_date" :first-day-of-week="1" lang="en"></date-picker>
                  </div>
                  <div class="col">
                    <select v-model="end_time" :disabled="all_day" class="custom-select time-select" :class="{error: errors.has('endtime')}">
                        <option :value="null" disabled>Select Time</option>
                        <option v-for="t in time" v-bind:key="t">{{ t }}</option>
                    </select>
                  </div>
                </div>
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
import { EventBus } from "../app";

export default {
  components: { DatePicker },
  data() {
    return {
      time: [],
      showModal: false,
      title: null,
      description: null,
      location: null,
      start_date: null,
      end_date: null,
      start_time: null,
      end_time: null,
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
      this.initModal();
    });
  },
  mounted: function() {
    this.initSelectBoxTime();
  },
  methods: {
    initModal() {
      this.showModal = true;
      this.title = null;
      this.description = null;
      this.location = null;
      this.start_date = null;
      this.end_date = null;
      this.start_time = null;
      this.end_time = null;
      this.all_day = false;
      this.errors.clear();
    },
    initSelectBoxTime() {
      this.time = [];
      let date = moment();
      var time = moment().startOf("day");
      var end = time.clone().endOf("day");

      while (time < end) {
        this.time.push(time.format("HH:mm").toString());
        time.add(30, "minutes");
      }
    },
    setTime(time, date) {
      let hours = 0;
      let min = 0;
      if (time) {
        let index = time.indexOf(":");
        hours = time.substring(0, index);
        min = time.substring(index + 1, date.length);
      }
      return new Date(date).setHours(hours, min, 0);
    },
    setDates() {
      if (this.all_day) {
        this.start_date = this.setTime(null, this.start_date);
        this.end_date = this.setTime(null, this.end_date);
      } else {
        this.start_date = this.setTime(this.start_time, this.start_date);
        this.end_date = this.setTime(this.end_time, this.end_date);
      }
    },
    createEvent() {
      if (this.validation()) {
        this.setDates();
      }
      this.$validator.validateAll().then(success => {
        if (success) {
          this.sendEvent();
        }
      });
    },
    validation() {
      let validate = true;
      if (this.start_date == null) {
        this.errors.add("startdate", "Start date is requred");
        validate = false;
      } else {
        this.errors.remove("startdate");
      }

      if (this.start_time == null) {
        this.errors.add("starttime", "Start time is requred");
        validate = false;
      } else {
        this.errors.remove("starttime");
      }

      if (this.end_date == null) {
        this.errors.add("enddate", "End date is requred");
        validate = false;
      } else {
        this.errors.remove("enddate");
      }

      if (this.end_time == null) {
        this.errors.add("endtime", "End time is requred");
        validate = false;
      } else {
        this.errors.remove("endtime");
      }

      return validate;
    },
    sendEvent() {
      const token = this.$store.state.token;
      let start_date = moment(this.start_date).format("YYYY-MM-DD HH:mm:ss");
      let end_date = moment(this.end_date).format("YYYY-MM-DD HH:mm:ss");

      axios
        .post("/event?token=" + token, {
          title: this.title,
          description: this.description,
          location: this.location,
          start_date: start_date,
          end_date: end_date,
          all_day: this.all_day
        })
        .then(response => {
          EventBus.$emit("eventCreated", {
            message: "Event Created",
            event: response.data
          });
          this.showModal = false;
        })
        .catch(error => {
          this.$router.push({ path: "/" });
        });
    }
  }
};
</script>

<style>
.error {
  border: 1px solid #dc3545;
}

.errordate input {
  border: 1px solid #dc3545;
}
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

.time-select {
  font-size: 14px;
  height: 34px !important;
  width: 127px;
  color: #73879c;
}
</style>