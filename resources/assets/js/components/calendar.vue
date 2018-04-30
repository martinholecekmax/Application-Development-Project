<template>
<div class="row">
  <div class="col col-md-8">
    <div class="month">
      <ul>
        <li v-on:click="previousMonth()" class="prev">&#10094;</li>
        <li v-on:click="nextMonth()" class="next">&#10095;</li>
        <li>
        {{ getMonthName() }}<br>
        <span style="font-size:18px">{{year}}</span>
        </li>
      </ul>
    </div>
    <ul class="weekdays">
      <li v-for="weekday in weekdays" v-bind:key="weekday">{{weekday}}</li>
    </ul>
    <ul class="days">
      <li v-for="(day, index) in getDayOfMonth" v-bind:key="index">
        <span v-if="day === 0">
        </span>
        <div v-else :class="{ 'event' : isEvent(day), 'today' : isToday(day) }" v-on:click="showEvent(day)">
          {{day}}
        </div>
      </li>
    </ul>
  </div>
  <div class="col col-md-4 mb-3">
    <div class="text-center mb-3">
      <span class="title">{{title}}</span>
    </div>
    <div id="message" class="alert alert-success mt-3" style="display:none;">{{message}}</div>
    <button class="btn btn-primary mr-2" v-on:click="showModal()">Create Event</button>
    <button class="btn btn-primary" v-on:click="auth()">Show All Event</button>
      <div v-for="event in eventsById" v-bind:key="event.id">
      <single-event :event="event"></single-event>
      </div>
    </div>
    <create-event></create-event>
    <edit-event></edit-event>
</div>
</template>

<script>
import moment from "moment";
import CreateEvent from "../components/create-event.vue";
import EditEvent from "../components/edit-event.vue";
import SingleEvent from "../components/event.vue";
import jwt_decode from "jwt-decode";

import { EventBus } from "../app";

export default {
  components: {
    "create-event": CreateEvent,
    "edit-event": EditEvent,
    "single-event": SingleEvent
  },
  data() {
    return {
      title: "All Events",
      daySelected: "",
      message: "",
      dayEvents: [],
      events: [],
      days: [],
      month: 0,
      year: 0,
      weekdays: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ]
    };
  },
  created() {
    EventBus.$on("eventCreated", data => {
      this.showMessage(data.message);
      $("#message").fadeIn();
      $("#message").fadeOut(2000);
      console.log(data.event);
      this.events.push(data.event);
    });
    EventBus.$on("eventChanged", data => {
      this.showMessage(data.message);
      $("#message").fadeIn();
      $("#message").fadeOut(2000);
    });
    EventBus.$on("eventDeleted", data => {
      this.showMessage(data.message);
      $("#message").fadeIn();
      $("#message").fadeOut(2000);
      let index = this.events.findIndex(el => el.id == data.event.id);
      this.events.splice(index, 1);
    });
  },
  mounted: function() {
    this.auth();
    this.month = new Date().getMonth();
    this.year = new Date().getFullYear();
  },
  methods: {
    auth() {
      this.$store
        .dispatch("inspectToken")
        .then(result => {
          console.log("get events");
          this.getAllEvents();
        })
        .catch(err => {
          console.log("redirect to login");
          this.$router.push({ path: "/signin" });
        });
    },
    getAllEvents() {
      const token = this.$store.state.token;
      axios
        .get("/events?token=" + token)
        .then(response => {
          this.events = response.data.events;
          this.dayEvents = response.data.events;
        })
        .catch(error => {
          console.log(error);
          // this.$router.push({ path: "/signin" });
        });
    },
    previousMonth() {
      if (this.month == 0) {
        this.month = 11;
        this.year--;
      } else {
        this.month--;
      }
    },
    nextMonth() {
      if (this.month == 11) {
        this.month = 0;
        this.year++;
      } else {
        this.month++;
      }
    },
    getMonthName() {
      return moment()
        .month(this.month)
        .format("MMMM");
    },
    isEvent(day) {
      let currentDate = new Date(this.year, this.month, day).setHours(
        0,
        0,
        0,
        0
      );
      for (let event in this.events) {
        let eventStartDate = new Date(this.events[event].start_date).setHours(
          0,
          0,
          0,
          0
        );
        let eventEndDate = new Date(this.events[event].end_date).setHours(
          0,
          0,
          0,
          0
        );
        if (
          eventStartDate === currentDate ||
          eventEndDate === currentDate ||
          (currentDate >= eventStartDate && currentDate <= eventEndDate)
        ) {
          return true;
        }
      }
      return false;
    },
    isToday(day) {
      let date = new Date(this.year, this.month, day).setHours(0, 0, 0, 0);
      let today = new Date().setHours(0, 0, 0, 0);
      return date === today;
    },
    showEvent(day) {
      let currentDate = new Date(this.year, this.month, day).setHours(
        0,
        0,
        0,
        0
      );
      let currentDayEvents = [];
      for (let event in this.events) {
        let eventStartDate = new Date(this.events[event].start_date).setHours(
          0,
          0,
          0,
          0
        );
        let eventEndDate = new Date(this.events[event].end_date).setHours(
          0,
          0,
          0,
          0
        );
        if (
          eventStartDate === currentDate ||
          eventEndDate === currentDate ||
          (currentDate >= eventStartDate && currentDate <= eventEndDate)
        ) {
          currentDayEvents.push(this.events[event]);
        }
      }
      this.dayEvents = currentDayEvents;
      this.title = moment(currentDate).format("Do MMMM YYYY");
      this.daySelected = day;
    },
    printDate(date) {
      return moment(date).format("Do MMMM YYYY");
    },
    printTime(date) {
      return moment(date).format("HH:mm");
    },
    showModal() {
      this.$store
        .dispatch("inspectToken")
        .then(result => {
          EventBus.$emit("createEventButton", {
            day: this.daySelected
          });
        })
        .catch(err => {
          console.log("redirect to login");
          this.$router.push({ path: "/signin" });
        });
    },
    showMessage(message) {
      this.message = message;
    }
  },
  computed: {
    eventsById: function() {
      return _.orderBy(this.dayEvents, "id", "desc");
    },
    getDayOfMonth: function() {
      let date = new Date(this.year, this.month, 1);
      let days = [];
      switch (date.getDay()) {
        case 2:
          days.push(0);
          break;
        case 3:
          days.push(0);
          days.push(0);
          break;
        case 4:
          days.push(0);
          days.push(0);
          days.push(0);
          break;
        case 5:
          days.push(0);
          days.push(0);
          days.push(0);
          days.push(0);
          break;
        case 6:
          days.push(0);
          days.push(0);
          days.push(0);
          days.push(0);
          days.push(0);
          break;
        case 0:
          days.push(0);
          days.push(0);
          days.push(0);
          days.push(0);
          days.push(0);
          days.push(0);
          break;
      }
      while (date.getMonth() === this.month) {
        days.push(new Date(date).getDate());
        date.setDate(date.getDate() + 1);
      }
      return days;
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

.title {
  border-radius: 16px 16px;
  padding: 2px 15px 2px 15px;
  background-color: #1a81bc;
  color: white;
  text-align: center;
  font-size: 20px;
}

ul {
  list-style-type: none;
}
body {
  font-family: Verdana, sans-serif;
}

.month {
  padding: 70px 25px;
  width: 100%;
  background: #1a81bc;
  text-align: center;
}

.month ul {
  margin: 0;
  padding: 0;
}

.month ul li {
  color: white;
  font-size: 20px;
  letter-spacing: 3px;
}

.month .prev {
  float: left;
  padding-top: 10px;
  cursor: pointer;
}

.month .next {
  cursor: pointer;
  float: right;
  padding-top: 10px;
}

.weekdays {
  margin: 0;
  padding: 10px 0;
  background-color: #ddd;
}

.weekdays li {
  display: inline-block;
  width: 13.6%;
  color: #666;
  text-align: center;
}

.days {
  padding: 10px 0;
  background: #eee;
  margin: 0;
}

.days li {
  list-style-type: none;
  display: inline-block;
  width: 13.6%;
  text-align: center;
  margin-bottom: 5px;
  font-size: 15px;
  color: #777;
  cursor: pointer;
  padding: 18px;
}

.days li .active {
  padding: 5px;
  background: #1abc9c;
  color: white !important;
}

.event {
  background-color: #1abc50;
  color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin: 0 auto;
  line-height: 30px;
}

.today {
  background-color: #1a73bc;
  color: white;
  width: 30px;
  height: 30px;
  margin: 0 auto;
  line-height: 30px;
  border-radius: 50%;
}

/* Add media queries for smaller screens */
@media screen and (max-width: 720px) {
  .weekdays li,
  .days li {
    width: 13.1%;
  }
}

@media screen and (max-width: 420px) {
  .weekdays li,
  .days li {
    width: 12.5%;
  }
  .days li .active {
    padding: 2px;
  }
}

@media screen and (max-width: 290px) {
  .weekdays li,
  .days li {
    width: 12.2%;
  }
}
</style>
