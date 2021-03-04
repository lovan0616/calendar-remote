<template>
  <ol class="days-grid d-flex flex-wrap">
    <li
      v-for="day in days"
      :key="day.date"
      class="calendar-day"
      :class="{
      'calendar-day--not-current':!day.isCurrentMonth,
      'calendar-day-today':isToday,
      'have-event':haveEventDate(day)
    }"
    >
      <router-link :to="{
      name: 'calendar-day',
      params: {date: day.date}
    }">
        <div class="date-item">
          <p>{{ day.date | dayFormat() }}</p>
        </div>
      </router-link>
    </li>
  </ol>
</template>

<script>
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekday);
dayjs.extend(weekOfYear);

export default {
  name: "CalendarMonthDayItem",
  props: {
    showDate: {
      type: Object,
      required: true
    },
    isToday: {
      type: Boolean,
      default: false
    }
  },
  filters: {
    dayFormat(date) {
      return dayjs(date).format("D");
    }
  },
  computed: {
    numberOfDaysInMonth() {
      return dayjs(this.showDate).daysInMonth();
    },
    month() {
      return Number(this.showDate.format("M"));
    },
    year() {
      return Number(this.showDate.format("YYYY"));
    },
    currentMonthDays() {
      return [...Array(this.numberOfDaysInMonth)].map((day, index) => {
        return {
          date: dayjs(`${this.year}-${this.month}-${index + 1}`).format(
            "YYYY-MM-DD"
          ),
          isCurrentMonth: true
        };
      });
    },
    previousMonthDays() {
      const firstDayOfTheMonthWeekday = this.getWeekday(
        this.currentMonthDays[0].date
      );
      const previousMonth = dayjs(`${this.year}-${this.month}-01`).subtract(
        1,
        "month"
      );

      // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
      const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
        ? firstDayOfTheMonthWeekday - 1
        : 6;

      const previousMonthLastMondayDayOfMonth = dayjs(
        this.currentMonthDays[0].date
      )
        .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
        .date();

      return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
        (day, index) => {
          return {
            date: dayjs(
              `${previousMonth.year()}-${previousMonth.month() +
                1}-${previousMonthLastMondayDayOfMonth + index}`
            ).format("YYYY-MM-DD"),
            isCurrentMonth: false
          };
        }
      );
    },
    nextMonthDays() {
      const lastDayOfTheMonthWeekday = this.getWeekday(
        `${this.year}-${this.month}-${this.currentMonthDays.length}`
      );
      const nextMonth = dayjs(`${this.year}-${this.month}-01`).add(1, "month");
      const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
        ? 7 - lastDayOfTheMonthWeekday
        : lastDayOfTheMonthWeekday;

      return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
        return {
          date: dayjs(
            `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
          ).format("YYYY-MM-DD"),
          isCurrentMonth: false
        };
      });
    },
    days() {
      return [
        ...this.previousMonthDays,
        ...this.currentMonthDays,
        ...this.nextMonthDays
      ];
    }
  },
  methods: {
    getWeekday(date) {
      return dayjs(date).weekday();
    },
    haveEventDate(day) {
      const storageData = JSON.parse(localStorage.getItem("schedule"));
      if (!storageData || !storageData.length) {
        return false;
      } else {
        const dateArray = storageData.map(item => {
          return item.date;
        });
        return dateArray.some(date => date === day.date)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  width: 100%;
  color: inherit;
  text-decoration: none;
}

ol {
  @include box-shadow;
  margin-bottom: 25px;
  padding: 10px;
}

.calendar-day {
  list-style: none;
  width: calc(100% / 7);
  text-align: center;
  padding: 10px 0px 10px 0px;
  color: #838383;
}

.calendar-day--not-current {
  color: #d3d3d3;
}

.have-event {
  @include box-shadow;
  background-color: $color_choice_1;
  filter: opacity(40%);
  color: $font_dark;
  border-radius: 5px;
  border: 1px solid #ffffff;
}

.date-item:hover {
  border-radius: 50%;
  background-color: $theme_color;
  color: $font_light;
}
</style>