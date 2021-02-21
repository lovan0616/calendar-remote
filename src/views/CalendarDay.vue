<template>
  <div class="calendar-day">
    <div class="header d-flex flex-column justify-content-between p-2">
      <div class="date-selector d-flex align-items-center">
        <DaySelector :inital-date="date" />
        <div class="view">日檢視</div>
      </div>
      <div class="week-list-wrapper d-flex">
        <div class="calendar-icon">test here</div>
        <div class="week-list flex-grow-1">
          <CalendarWeekdays />
          <ol class="d-flex justify-content-around">
            <li v-for="day in days" :key="day.date">{{ day.date }}</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import DaySelector from "../components/DaySelector";
import CalendarWeekdays from "../components/CalendarWeekdays";
dayjs.extend(weekday);

export default {
  name: "CalendarDay",
  data() {
    return {
      date: this.$route.params.date
    };
  },
  components: {
    DaySelector,
    CalendarWeekdays
  },
  methods: {
    getWeekday(date) {
      return dayjs(date).weekday();
    }
  },
  computed: {
    thisWeekPreviousDay() {
      const visibleNumberOfPreviousDay = this.getWeekday(this.date)
        ? this.getWeekday(this.date) - 1
        : 6;
      return [...Array(visibleNumberOfPreviousDay)].map((day, index) => {
        return {
          date: dayjs(this.date)
            .subtract(visibleNumberOfPreviousDay - index, "day")
            .format("DD"),
          isToday: false
        };
      });
    },
    thisDay() {
      return {
        date: dayjs(this.date).format("DD"),
        isToday: true
      };
    },
    thisWeekNextDay() {
      const visibleNumberOfNextDay = this.getWeekday(this.date)
        ? 7 - this.getWeekday(this.date)
        : 0;
      return [...Array(visibleNumberOfNextDay)].map((day, index) => {
        return {
          date: dayjs(this.date)
            .add(index + 1, "day")
            .format("DD"),
          isToday: false
        };
      });
    },
    days() {
      return [
        ...this.thisWeekPreviousDay,
        this.thisDay,
        ...this.thisWeekNextDay
      ];
    }
  },
  beforeRouteUpdate(to, from, next) {
    const { date } = to.params;
    console.log(date);
    this.date = date;
    next();
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 100px;
  box-shadow: 0px 3px 5px 0.1px rgba(0, 0, 0, 0.1);
  position: fixed;
  z-index: 1000000;
  background-color: white;
}

.date-selector {
  border: 1px solid salmon;
}

.view {
  background-color: #d9d5ee;
  color: #7d71b9;
  border-radius: 20px;
  padding: 10px;
}

.week-list-wrapper {
  border: 1px solid green;
}

ol {
  border: 1px solid;
}

li {
  border: 1px solid firebrick;
}
</style>