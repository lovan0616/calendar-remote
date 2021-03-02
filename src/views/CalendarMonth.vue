<template>
  <div class="calendar-month">
    <div class="header d-flex flex-column justify-content-between px-3 pt-3 pb-1">
      <div class="select-wrapper d-flex">
        <div class="calendar-icon-wrapper d-flex justify-content-center align-items-center">
          <font-awesome-icon :icon="['far', 'calendar']" />
        </div>

        <!-- <CalendarDateSelector
        :current-date="today"
        :selected-date="selectedDate"
        @dateSelected="selectDate"
        />-->
        <div class="close-icon-wrapper ml-auto">
          <font-awesome-icon :icon="['fas', 'times']" size="2x" />
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

          <div
            class="col-12 col-sm-6 col-md-4 col-lg-3"
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
import SelectedMonth from "../components/SelectedMonth";
import CalendarWeekdays from "../components/CalendarWeekdays";
import CalendarMonthDayItem from "../components/CalendarMonthDayItem";

export default {
  name: "CalendarMonth",
  components: {
    SelectedMonth,
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
      this.viewport = window.innerWidth;
      return this.viewport;
    }
  },
  created() {
    window.addEventListener("resize", this.updateViewport);
  }
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 130px;
  @include box-shadow;
  position: fixed;
  z-index: 1000000;
  background-color: white;
  color: $theme_color;
  font-weight: bold;

  .calendar-icon-wrapper {
    width: 30px;
    height: 30px;
    background-color: $item_color;
    border-radius: 50%;
    color: $theme_color;
    @include box-shadow;
  }

  .close-icon-wrapper {
    color: #000000;
  }
}

.calendar-content {
  padding-top: 140px;
  background: $bg_color_2;
}

@media (min-width: 576px), print {
  .header {
    visibility: hidden;
  }
  .calendar-content {
    padding-top: 0;
  }
}
</style>