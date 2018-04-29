<template>
  <div>
    {{timeSelected}}
      <select v-model="timeSelected">
          <option value="null" disabled>Select Time</option>
          <option v-for="t in time" v-bind:key="t">{{ t }}</option>
      </select>
  </div>
</template>

<script>
export default {
  props: ["timeSelected"],
  data() {
    return {
      time: []
    };
  },
  mounted: function() {
    this.time = [];
    let minute;
    let day = 24;
    for (let hour = 0; hour < day; hour++) {
      for (let min = 0; min < 2; min++) {
        if (min == 0) {
          minute = "00";
        } else {
          minute = "30";
        }
        this.time.push(hour + ":" + minute);
      }
    }
    console.log(this.time);
  },
  methods: {}
};
</script>
