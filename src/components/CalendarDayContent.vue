<template>
  <div class="calendar-day-content">
    <div class="sheet" v-for="schedule in schedules" :key="schedule.time">
      <div class="schedule-item-wrapper d-flex h-100">
        <div class="schedule-item d-flex align-items-center mr-2" v-for="(event, index) in schedule.events" :key="index"><p>{{ event }}</p></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarDayContent",
  data() {
    return {
      schedules: [
        { time: "1:00am", events: [] },
        { time: "2:00am", events: [] },
        { time: "3:00am", events: [] },
        { time: "4:00am", events: [] },
        { time: "5:00am", events: [] },
        { time: "6:00am", events: [] },
        { time: "7:00am", events: [] },
        { time: "8:00am", events: [] },
        { time: "9:00am", events: [] },
        { time: "10:00am", events:[] },
        { time: "11:00am",events: []},
        { time: "12:00pm",events: []},
        { time: "1:00pm", events: [] },
        { time: "2:00pm", events: [] },
        { time: "3:00pm", events: [] },
        { time: "4:00pm", events: [] },
        { time: "5:00pm", events: [] },
        { time: "6:00pm", events: [] },
        { time: "7:00pm", events: [] },
        { time: "8:00pm", events: [] },
        { time: "9:00pm", events: [] },
        { time: "10:00pm", events: [] },
        { time: "11:00pm", events: [] },
        { time: "00:00am", events: [] }
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
        schedule.events = [];
        this.initialScheduleData.forEach(item => {
          if (item.time === schedule.time) {
            schedule.events = [
              ...schedule.events,
              ...item.events
            ];
          }
        });
      });
    }
  },
  created() {
    this.dispatchEvent();
  },
  watch: {
    initialScheduleData() {
      this.dispatchEvent();
    }
  }
};
</script>

<style scoped>
.calendar-day-content {
  width: 100%;
  padding-top: 120px;
  background-color: #fafafa;
}

.sheet {
  height: 60px;
  border: 1px solid #c4c4c4;
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