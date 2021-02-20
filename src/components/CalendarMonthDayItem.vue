<template>
  <ol class="days-grid d-flex flex-wrap">
    <li
      class="calendar-day"
      :class="{
      'calendar-day--not-current':!isCurrentMonth,
      'calendar-day-today':isToday
    }"
    v-for="day in days"
    :key="day.date"

    >
      <span>{{ day.date | dayFormat() }}</span>
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
    isCurrentMonth: {
      type: Boolean,
      default: false
    },
    isToday: {
      type: Boolean,
      default: false
    }
  },
  filters: {
    dayFormat(date) {
      return dayjs(date).format('D')
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
    }
  }
};
</script>

<style scoped>
.calendar-day {
  list-style: none;
  width: calc(100% / 7);
}
</style>