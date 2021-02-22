<template>
  <div class="calendar-week">
    <div class="header d-flex flex-column justify-content-between p-2">
      <div class="selector d-flex align-items-center">
        <h2 class="mr-auto">預約行事曆</h2>
        <ViewSelector />
      </div>
      <div class="week-list-wrapper d-flex">
        <div class="calendar-icon">test here</div>
        <div class="week-list flex-grow-1">
          <ol class="d-flex justify-content-around">
            <li v-for="day in days" :key="day.date" @click.stop.prevent="selectDate(day.date)" :class="{'is-selected-day':day.isSelectedDay}">{{ day.date | dateFormat }}</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import ViewSelector from "../components/VIewSelector"
dayjs.extend(weekday);

export default {
  name: "CalendarDay",
  data() {
    return {
      date: this.$route.params.date
    };
  },
  components: {
    ViewSelector
  },
  methods: {
    getWeekday(date) {
      return dayjs(date).weekday();
    },
    selectDate(date) {
      this.$router.push({ name: 'calendar-day',params: { date }})
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
            .subtract(visibleNumberOfPreviousDay - index, "day").format("YYYY-MM-DD"),
          isSelectedDay: false
        };
      });
    },
    thisDay() {
      return {
        date: dayjs(this.date).format("YYYY-MM-DD"),
        isSelectedDay: true
      };
    },
    thisWeekNextDay() {
      const visibleNumberOfNextDay = this.getWeekday(this.date)
        ? 7 - this.getWeekday(this.date)
        : 0;
      return [...Array(visibleNumberOfNextDay)].map((day, index) => {
        return {
          date: dayjs(this.date)
            .add(index + 1, "day").format("YYYY-MM-DD"),
          isSelectedDay: false
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
    this.date = date;
    next();
  },
  filters: {
    dateFormat(date) {
      return dayjs(date).format('DD')
    }
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

.selector {
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
  width: 100%;
  border-radius: 5px;
  text-align: center;
}

.is-selected-day {
  background-color: #7f74b5;
  color: #ffffff;
}
</style>