<template>
  <div class="calendar-day">
    <div class="header d-flex flex-column justify-content-between p-2">
      <div class="selector d-flex align-items-center">
        <h1>預約行事曆</h1>
        <ViewSelector />
      </div>
      <div class="week-list-wrapper d-flex">
        <div style="width: 80px;">
          <div class="calendar-icon-wrapper d-flex justify-content-center align-items-center mt-1">
            <font-awesome-icon :icon="['far', 'calendar']" />
          </div>
        </div>
        <div class="week-list flex-grow-1">
          <ol class="d-flex justify-content-around">
            <li
              v-for="day in days"
              :key="day.date"
              @click.stop.prevent="selectDate(day.date)"
              :class="{'is-selected-day':day.isSelectedDay}"
              class="d-flex flex-column justify-content-around align-items-center"
            >
              <span class="li-week-day">{{ day.date | weekDayFormat}}</span>
              <span class="li-date">{{ day.date | dateFormat }}</span>
            </li>
          </ol>
        </div>
      </div>
    </div>

    <div class="week-content d-flex">
      <Timeline />
      <CalendarDayContent v-for="day in days" :key="day.date" :initial-schedule-data="day.content" />
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import ViewSelector from "../components/VIewSelector";
import CalendarDayContent from "../components/CalendarDayContent";
import Timeline from "../components/Timeline";
dayjs.extend(weekday);

export default {
  name: "CalendarWeek",
  data() {
    return {
      date: this.$route.params.date,
      scheduleData: []
    };
  },
  components: {
    ViewSelector,
    CalendarDayContent,
    Timeline
  },
  methods: {
    getWeekday(date) {
      return dayjs(date).weekday();
    },
    selectDate(date) {
      this.$router.push({ name: "calendar-day", params: { date } });
    },
    dispatchContents() {
      const storageData = JSON.parse(localStorage.getItem("schedule"));
      this.days.forEach(day => {
        day.content = storageData.filter(item => item.date === day.date).length
          ? storageData.filter(item => item.date === day.date)[0].contents
          : [];
      });
    }
  },
  created() {
    this.dispatchContents();
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
            .format("YYYY-MM-DD"),
          isSelectedDay: false,
          content: []
        };
      });
    },
    thisDay() {
      return {
        date: dayjs(this.date).format("YYYY-MM-DD"),
        isSelectedDay: true,
        content: []
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
            .format("YYYY-MM-DD"),
          isSelectedDay: false,
          content: []
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
      return dayjs(date).format("DD");
    },
    weekDayFormat(date) {
      switch (dayjs(date).format("ddd")) {
        case "Sun":
          return "S";
        case "Mon":
          return "M";
        case "Tue":
          return "T";
        case "Wed":
          return "W";
        case "Thu":
          return "T";
        case "Fri":
          return "F";
        case "Sat":
          return "S";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 120px;
  box-shadow: 0px 3px 5px 0.1px rgba(0, 0, 0, 0.1);
  position: fixed;
  z-index: 1000000;
  background: linear-gradient(
    45deg,
    $bg_color_start,
    $bg_color_middle,
    $bg_color_end,
    $bg_color_end
  );

  .selector h1 {
    font-size: larger;
  }

  .week-list-wrapper {
    height: 50px;

    .week-list ol {
      height: 100%;

      li {
        width: 100%;
        border-radius: 5px;
        text-align: center;

        &:not(.is-selected-day):hover {
          @include box-shadow;
        }
        &.is-selected-day {
          background-color: transparent;
          color: $theme_color;
          @include box-shadow;
        }
      }
    }

    .calendar-icon-wrapper {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: $item_color;
      color: $theme_color;
      @include box-shadow;
    }
  }
}

.week-content {
  width: 100%;
}
</style>