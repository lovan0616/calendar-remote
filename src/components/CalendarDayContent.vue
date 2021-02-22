<template>
  <div class="calendar-day-content px-2">
    <div class="row d-flex" v-for="schedule in schedules" :key="schedule.time">
      <div class="time d-flex align-items-end justify-content-center">
        <p>{{ schedule.time }}</p>
      </div>
      <div class="sheet flex-grow-1">
        <div class="schedule-item" v-if="schedule.event">{{ schedule.event }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarDayContent",
  data() {
    return { 
      schedules: [{time: "1:00am", event: ''},
      {time: "2:00am", event: ''},
      {time: "3:00am", event: ''},
      {time: "4:00am", event: ''},
      {time: "5:00am", event: ''},
      {time: "6:00am", event: ''},
      {time: "7:00am", event: ''},
      {time: "8:00am", event: ''},
      {time: "9:00am", event: ''},
      {time: "10:00am", event: ''},
      {time: "11:00am", event: ''}, 
      {time: "12:00pm", event: ''},
      {time: "1:00pm", event: ''},
      {time: "2:00pm", event: ''},
      {time: "3:00pm", event: ''},
      {time: "4:00pm", event: ''},
      {time: "5:00pm", event: ''},
      {time: "6:00pm", event: ''},
      {time: "7:00pm", event: ''},
      {time: "8:00pm", event: ''},
      {time: "9:00pm", event: ''},
      {time: "10:00pm", event: ''},
      {time: "11:00pm", event: ''},
      {time: "00:00am", event: ''},
      ]
    };
  },
  props: {
    initialScheduleData: {
      type: Array,
      required: true
    }
  },
  methods: {
    dispatchEvent() {
      this.schedules.forEach(schedule => {
        schedule.event = ''
        this.initialScheduleData.forEach(item => {
          if(item.time === schedule.time) {
            schedule.event = item.event
          }
        })
      })
    }
  },
  created() {
    this.dispatchEvent()
  },
  watch: {
    initialScheduleData() {
      this.dispatchEvent()
    }
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
  cursor: pointer;
}

.sheet:hover {
  background-color: #f6f6f6;
}

.schedule-item {
  background-color: #e5e5e5;
  height: 100%;
  border-radius: 10px;
  padding: 10px;
}
</style>