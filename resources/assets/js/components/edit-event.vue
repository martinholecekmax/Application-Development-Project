<template>
<div>
  <transition v-if="showModal" name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Event</h4>
            </div>
              <form>
            <div class="modal-body">
              <div class="form-group">
                <label for="title">Title</label>
                <input type="title" id="title" name="title" class="form-control" v-model="event.title">
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <input type="description" id="description" name="description" class="form-control" v-model="event.description">
              </div>
              <div class="form-group">
                <label for="location">Location</label>
                <input type="location" id="location" name="location" class="form-control" v-model="event.location">
              </div>
              <div class="form-group">
                <div class="form-row">
                  <div class="col">
                    <label for="start_date">Start date</label>
                  </div>
                  <div class="col">
                    <date-picker class="" v-model="event.start_date" :first-day-of-week="1" lang="en"></date-picker>
                  </div>
                  <div class="col">
                  <select v-model="start_time" :disabled="event.all_day" class="custom-select time-select">
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
                    <date-picker class="float-right" v-model="event.end_date" :first-day-of-week="1" lang="en"></date-picker>
                  </div>
                  <div class="col">
                    <select v-model="end_time" :disabled="event.all_day" class="custom-select time-select">
                      <option :value="null" disabled>Select Time</option>
                      <option v-for="t in time" v-bind:key="t">{{ t }}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-group mb-0">
                <input type="checkbox" id="checkbox" v-model="event.all_day">
                <label for="checkbox">All Day</label>
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary mr-2" @click.prevent="updateEvent">Update Event</button>
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
import { EventBus } from "../app";

export default {
  components: { DatePicker },
  data() {
    return {
      event: {},
      time: [],
      start_time: null,
      end_time: null,
      showModal: false,
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
    EventBus.$on("editEventButton", data => {
      this.showModal = true;
      this.event = data.event;
      this.start_time = moment(data.event.start_date)
        .format("HH:mm")
        .toString();
      this.end_time = moment(data.event.end_date)
        .format("HH:mm")
        .toString();
      if (this.event.all_day == 0) {
        this.event.all_day = false;
      } else if (this.event.all_day == 1) {
        this.event.all_day = true;
      }
    });
  },
  mounted: function() {
    this.initSelectBoxTime();
  },
  methods: {
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
    updateEvent() {
      const token = this.$store.state.token;

      if (this.event.all_day) {
        this.event.start_date = this.setTime(null, this.event.start_date);
        this.event.end_date = this.setTime(null, this.event.end_date);
      } else {
        this.event.start_date = this.setTime(
          this.start_time,
          this.event.start_date
        );
        this.event.end_date = this.setTime(this.end_time, this.event.end_date);
      }

      axios
        .patch("/event/" + this.event.id + "?token=" + token, {
          title: this.event.title,
          description: this.event.description,
          location: this.event.location,
          start_date: moment(this.event.start_date).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          end_date: moment(this.event.end_date).format("YYYY-MM-DD HH:mm:ss"),
          all_day: this.event.all_day
        })
        .then(response => {
          EventBus.$emit("eventChanged", {
            message: "Event Changed",
            event: this.event
          });
          this.showModal = false;
        })
        .catch(error => {
          console.log(error);
        });
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