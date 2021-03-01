<template>
  <div class="calendar-day">
    <div class="header d-flex flex-column justify-content-between p-2">
      <div class="selector d-flex align-items-center">
        <DaySelector :inital-date="date" />
        <ViewSelector />
      </div>
      <div class="week-list-wrapper d-flex">
        <div class="calendar-icon-wrapper d-flex justify-content-center align-items-center mt-1">
          <font-awesome-icon :icon="['far', 'calendar']" />
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

    <div class="row d-flex flex-nowrap">
      <Timeline />
      <CalendarDayContent
        :initial-schedule-data="scheduleData"
        @after-edit-event="handleAfterEditEvent"
      />
    </div>

    <AddEvent @after-submit="handleAfterSubmit" />
  </div>
</template>

<script>
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import DaySelector from "../components/DaySelector";
import ViewSelector from "../components/VIewSelector";
import CalendarDayContent from "../components/CalendarDayContent";
import Timeline from "../components/Timeline";
import AddEvent from "../components/AddEvent";
dayjs.extend(weekday);

export default {
  name: "CalendarDay",
  data() {
    return {
      date: this.$route.params.date,
      scheduleData: []
    };
  },
  components: {
    DaySelector,
    ViewSelector,
    CalendarDayContent,
    Timeline,
    AddEvent
  },
  methods: {
    getWeekday(date) {
      return dayjs(date).weekday();
    },
    selectDate(date) {
      this.$router.push({ name: "calendar-day", params: { date } });
    },
    fetchScheduleData() {
      const storageData = JSON.parse(localStorage.getItem("schedule")) || [];
      if (!storageData.filter(data => data.date === this.date).length) {
        this.scheduleData = [];
      } else {
        this.scheduleData = [
          ...storageData.filter(data => data.date === this.date)[0].contents
        ];
      }
    },
    handleAfterSubmit(time, event, color) {
      const storageData = JSON.parse(localStorage.getItem("schedule")) || [];
      const isSelectedDayContentExist = storageData.some(
        item => item.date === this.date
      );
      if (!isSelectedDayContentExist) {
        storageData.push({
          date: this.date,
          contents: [{ time, events: [{ event, color }] }]
        });
        localStorage.setItem("schedule", JSON.stringify(storageData));
        console.log("no date");
      } else {
        const isSelectedDayContentTimeExist = storageData
          .find(item => item.date === this.date)
          .contents.some(content => content.time === time);
        if (!isSelectedDayContentTimeExist) {
          storageData
            .find(item => item.date === this.date)
            .contents.push({
              time,
              events: [{ event, color }]
            });
          localStorage.setItem("schedule", JSON.stringify(storageData));
          console.log("have date, no time");
        } else {
          storageData
            .find(item => item.date === this.date)
            .contents.find(content => content.time === time)
            .events.push({
              event,
              color
            });
          localStorage.setItem("schedule", JSON.stringify(storageData));
          console.log("have date, have time");
        }
      }
      this.fetchScheduleData();
    },
    handleAfterEditEvent(newEditItem, initialEditItem) {
      const storageData = JSON.parse(localStorage.getItem("schedule"));
      //未修改時間
      if (newEditItem.time === initialEditItem.time) {
        //找出對應的行程方塊物件，修改其行程名稱與顏色
        storageData
          .find(data => data.date === this.date)
          .contents.find(content => content.time === initialEditItem.time)
          .events.find(item => item.event === initialEditItem.event).color =
          newEditItem.color;

        storageData
          .find(data => data.date === this.date)
          .contents.find(content => content.time === initialEditItem.time)
          .events.find(item => item.event === initialEditItem.event).event =
          newEditItem.event;

        localStorage.setItem("schedule", JSON.stringify(storageData));
      } else {
        //刪除該時間點上的行程方塊物件
        storageData
          .find(data => data.date === this.date)
          .contents.find(
            content => content.time === initialEditItem.time
          ).events = storageData
          .find(data => data.date === this.date)
          .contents.find(content => content.time === initialEditItem.time)
          .events.filter(item => item.event !== initialEditItem.event);

        //在新的時間點上新增行程方塊物件
        const timeObjectExist = storageData
          .find(data => data.date === this.date)
          .contents.some(content => content.time === newEditItem.time);

        if (timeObjectExist) {
          storageData
            .find(data => data.date === this.date)
            .contents.find(content => content.time === newEditItem.time)
            .events.push({
              event: newEditItem.event,
              color: newEditItem.color
            });
        } else {
          storageData
            .find(data => data.date === this.date)
            .contents.push({
              time: newEditItem.time,
              events: [
                {
                  event: newEditItem.event,
                  color: newEditItem.color
                }
              ]
            });
        }

        localStorage.setItem("schedule", JSON.stringify(storageData));
      }

      this.fetchScheduleData();
    }
  },
  created() {
    this.fetchScheduleData();
  },
  watch: {
    date() {
      console.log("change");
      this.fetchScheduleData();
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
            .format("YYYY-MM-DD"),
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
            .add(index + 1, "day")
            .format("YYYY-MM-DD"),
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
  background-color: $bg_color;
  color: $font_color;

  .calendar-icon-wrapper {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #dedaf4;
    color: #7f74b6;
  }

  .week-list-wrapper {
    height: 50px;

    .week-list {
      ol {
        height: 100%;
      }
      li {
        width: 100%;
        border-radius: 5px;
        text-align: center;
        &:not(.is-selected-day):hover {
          background-color: $theme_color;
          filter:saturate(60%);
        }
        &.is-selected-day {
          background-color: $theme_color;
          color: $font_color;
        }
      }
    }
  }
}
</style>