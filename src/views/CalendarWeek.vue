<template>
  <div class="calendar-day">
    <div class="header d-flex flex-column justify-content-between p-2">
      <div class="selector d-flex align-items-center">
        <h1>預約行事曆</h1>
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
import Timeline from "../components/Timeline"
dayjs.extend(weekday);

const dummyData = [
  {
    date: "2021-02-23",
    contents: [
      {
        time: "7:00am",
        events: ["載姪子上課"]
      },
      {
        time: "9:00pm",
        events: ["standup meeting"]
      },
      {
        time: "2:00pm",
        events: ["打電話訂pizza"]
      },
      {
        time: "5:00pm",
        events: ["接姪子下課"]
      }
    ]
  },
  {
    date: "2021-02-24",
    contents: [
      {
        time: "4:00pm",
        events: ["繳信用卡費"]
      },
      {
        time: "7:00pm",
        events: ["買連假火車票"]
      }
    ]
  },
  {
    date: "2021-02-26",
    contents: [
      {
        time: "11:00pm",
        events: ["搶五月天演場會票"]
      },
      {
        time: "6:00am",
        events: ["morning meditation"]
      },
      {
        time: "12:00pm",
        events: ["買健身餐食材","和Ben吃午餐"]
      },
      {
        time: "2:00pm",
        events: ["和Emily確認製作預算"]
      },
      {
        time: "4:00pm",
        events: ["請Paul幫忙看風水"]
      }
    ]
  },
  {
    date: "2021-03-03",
    contents: [
      {
        time: "9:00pm",
        evenst: ["複習電商網站切版"]
      },
      {
        time: "9:00am",
        events: ["和Gigi吃早餐"]
      },
      {
        time: "12:00pm",
        events: ["打電話給Tim的醫生"]
      }
    ]
  }
];

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
      this.days.forEach(day => {
        day.content = dummyData.filter(item => item.date === day.date).length ? dummyData.filter(item => item.date === day.date)[0].contents : []
      })
  },
  },
  created() {
    this.dispatchContents()
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
      switch(dayjs(date).format('ddd')) {
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

<style scoped>
.header {
  width: 100%;
  height: 120px;
  box-shadow: 0px 3px 5px 0.1px rgba(0, 0, 0, 0.1);
  position: fixed;
  z-index: 1000000;
  background-color: white;
}

.selector h1 {
  font-size: larger;
}

.view {
  background-color: #d9d5ee;
  color: #7d71b9;
  border-radius: 20px;
  padding: 10px;
}

.week-list-wrapper {
  height: 50px;
}

.week-list ol {
  height: 100%;
}

.week-list li {
  width: 100%;
  border-radius: 5px;
  text-align: center;
}

.week-list li:not(.is-selected-day):hover {
  background-color: #d9d5ee;
}

.calendar-icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #dedaf4;
  color: #7f74b6;
}

.is-selected-day {
  background-color: #7f74b5;
  color: #ffffff;
}

.week-content {
  width: 100%;
}
</style>