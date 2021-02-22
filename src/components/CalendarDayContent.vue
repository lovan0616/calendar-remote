<template>
  <div class="calendar-day-content px-2">
    <div class="row d-flex" v-for="time in times" :key="time">
      <div class="time d-flex align-items-end justify-content-center">
        <p>{{ time }}</p>
      </div>
      <div class="sheet flex-grow-1"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarDayContent",
  data() {
    return {
      times: [
        "1:00am",
        "2:00am",
        "3:00am",
        "4:00am",
        "5:00am",
        "6:00am",
        "7:00am",
        "8:00am",
        "9:00am",
        "10:00am",
        "11:00am",
        "12:00pm",
        "1:00pm",
        "2:00pm",
        "3:00pm",
        "4:00pm",
        "5:00pm",
        "6:00pm",
        "7:00pm",
        "8:00pm",
        "9:00pm",
        "10:00pm",
        "11:00pm",
        "00:00am"
      ]
    };
  }
};
</script>

<style scoped>
.calendar-day-content {
  padding-top: 100px;
  background-color: #fafafa;
}

.time {
  width: 80px;
  height: 60px;
  border: 1px solid #c4c4c4;
  border-left: transparent;
  border-top: transparent;
  position: relative;
}

.sheet {
  border-bottom: 1px solid #c4c4c4;
}

.sheet:hover {
  background-color: #f6f6f6;
}

</style>