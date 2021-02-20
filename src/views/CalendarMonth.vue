<template>
  <div class="calendar-month">
    <div class="calendar-month-header">
      <CalendarDateSelector
        :current-date="today"
        :selected-date="selectedDate"
        @dateSelected="selectDate"
      />
    </div>

    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <SelectedMonth :selected-date="selectedDate" class="selected-month" />
          <CalendarWeekdays />
          <!-- selected month -->
          <CalendarMonthDayItem :show-date="selectedDate" />
        </div>

        <div class="col-12 col-sm-6 col-md-4 col-lg-3"
        v-for="count in countOfUpcommingDate"
        :key="count"
        >
          <SelectedMonth :selected-date="upcommingDate(count)" class="upcomming-month" />
          <CalendarWeekdays />
          <!-- selected month -->
          <CalendarMonthDayItem :show-date="upcommingDate(count)" />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import CalendarDateSelector from "../components/CalendarDateSelector";
import SelectedMonth from "../components/SelectedMonth";
import CalendarWeekdays from "../components/CalendarWeekdays";
import CalendarMonthDayItem from "../components/CalendarMonthDayItem";

export default {
  name: "CalendarMonth",
  components: {
    SelectedMonth,
    CalendarDateSelector,
    CalendarWeekdays,
    CalendarMonthDayItem
  },
  data() {
    return {
      selectedDate: dayjs(),
      today: dayjs().format("YYYY-MM-DD"),
      countOfUpcommingDate: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    };
  },
  methods: {
    selectDate(newSelectedDate) {
      this.selectedDate = newSelectedDate;
    },
    upcommingDate(count) {
      return this.selectedDate.add(count, "month");
    },
  },
};
</script>