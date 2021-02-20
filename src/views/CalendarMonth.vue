<template>
  <div class="calendar-month">
    <div class="calendar-month-header">
      <SelectedMonth
        :selected-date="selectedDate"
        class="selected-month"
      />
      <CalendarDateSelector
        :current-date="today"
        :selected-date="selectedDate"
        @dateSelected="selectDate"
      />
    </div>

    <!-- Mon to Sun -->
    <CalendarWeekdays />

    <!-- selected month -->
    <CalendarMonthDayItem
      :show-date="selectedDate"
    />

    <!-- upcomming month -->
    <SelectedMonth
        :selected-date="upcommingDate(1)"
        class="upcomming-month"
      />
    <CalendarMonthDayItem
      :show-date="upcommingDate(1)"
    />
     <SelectedMonth
        :selected-date="upcommingDate(2)"
        class="upcomming-month"
        v-if="viewport > 700"
      />
    <CalendarMonthDayItem
      :show-date="upcommingDate(2)"
      v-if="viewport > 700"
    />
     <SelectedMonth
        :selected-date="upcommingDate(3)"
        class="upcomming-month"
        v-if="viewport > 1000"
      />
    <CalendarMonthDayItem
      :show-date="upcommingDate(3)"
      v-if="viewport > 1000"
    />

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
      viewport: window.innerWidth
    };
  },
  methods: {
    selectDate(newSelectedDate) {
      this.selectedDate = newSelectedDate;
    },
    upcommingDate(count) {
      return this.selectedDate.add(count, "month")
    },
    updateViewport() {
      this.viewport = window.innerWidth
      return this.viewport
    }
  },
  created() {
    window.addEventListener('resize', this.updateViewport)
  }
};
</script>