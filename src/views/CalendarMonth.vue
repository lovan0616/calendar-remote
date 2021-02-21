<template>
  <div class="calendar-month">
    <div class="header d-flex flex-column justify-content-between p-2">
      <div class="select-wrapper d-flex">
        <CalendarDateSelector
        :current-date="today"
        :selected-date="selectedDate"
        @dateSelected="selectDate"
      />
        <div class="close ml-auto">
          <span>&#10005;</span>
        </div>
      </div>

      <CalendarWeekdays />
      
    </div>

    <div class="calendar-content">
      <div class="container">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3">
          <SelectedMonth :selected-date="selectedDate" class="selected-month" />
          <CalendarWeekdays v-if="viewport > 575" />
          <!-- selected month -->
          <CalendarMonthDayItem :show-date="selectedDate" />
        </div>

        <div class="col-12 col-sm-6 col-md-4 col-lg-3"
        v-for="count in countOfUpcommingDate"
        :key="count"
        >
          <SelectedMonth :selected-date="upcommingDate(count)" class="upcomming-month" />
          <CalendarWeekdays v-if="viewport > 575" />
          <!-- selected month -->
          <CalendarMonthDayItem :show-date="upcommingDate(count)" />
        </div>
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
      countOfUpcommingDate: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      viewport: window.innerWidth
    };
  },
  methods: {
    selectDate(newSelectedDate) {
      this.selectedDate = newSelectedDate;
    },
    upcommingDate(count) {
      return this.selectedDate.add(count, "month");
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

<style scoped>
.header {
  width: 100%;
  height: 100px;
  box-shadow: 0px 3px 5px .1px rgba(0, 0, 0, 0.1);
  position: fixed;
  z-index: 1000000;
  background-color: white;
}

.calendar-content {
  padding-top: 120px;
  background-color: #fafafa;
}

</style>