<template>
  <div class="calendar-day-content">
    <div class="sheet" v-for="schedule in schedules" :key="schedule.time">
      <div class="schedule-item-wrapper d-flex h-100">
        <div
          class="schedule-item d-flex align-items-center mr-2"
          v-for="(item, index) in schedule.events"
          :key="index"
          :class="item.color"
          @click.stop="fillEditEventData(schedule, item)"
        >
          <div class="color-ball" :class="item.color"></div>
          <p>{{ item.event }}</p>
        </div>
      </div>
    </div>

    <EditEvent :initial-edit-item="editItem" v-on="$listeners" />
  </div>
</template>

<script>
import EditEvent from "../components/EditEvent";
import $ from "jquery";

export default {
  name: "CalendarDayContent",
  components: {
    EditEvent
  },
  data() {
    return {
      schedules: [
        { time: "1:00am", events: [] },
        { time: "2:00am", events: [] },
        { time: "3:00am", events: [] },
        { time: "4:00am", events: [] },
        { time: "5:00am", events: [] },
        { time: "6:00am", events: [] },
        { time: "7:00am", events: [] },
        { time: "8:00am", events: [] },
        { time: "9:00am", events: [] },
        { time: "10:00am", events: [] },
        { time: "11:00am", events: [] },
        { time: "12:00pm", events: [] },
        { time: "1:00pm", events: [] },
        { time: "2:00pm", events: [] },
        { time: "3:00pm", events: [] },
        { time: "4:00pm", events: [] },
        { time: "5:00pm", events: [] },
        { time: "6:00pm", events: [] },
        { time: "7:00pm", events: [] },
        { time: "8:00pm", events: [] },
        { time: "9:00pm", events: [] },
        { time: "10:00pm", events: [] },
        { time: "11:00pm", events: [] },
        { time: "00:00am", events: [] }
      ],
      editItem: {
        time: "",
        event: "",
        color: ""
      }
    };
  },
  props: {
    initialScheduleData: {
      type: Array,
      required: true
    }
  },
  methods: {
    dispatchEvent() {
      this.schedules.forEach(schedule => {
        schedule.events = [];
        this.initialScheduleData.forEach(item => {
          if (item.time === schedule.time) {
            schedule.events = [...schedule.events, ...item.events];
          }
        });
      });
    },
    fillEditEventData(schedule, item) {
      // 使用jq uery手動開啟modal：解決和v-on互斥的問題
      $("#editEventSheet").modal("show");

      this.editItem = {
        ...this.editItem,
        time: schedule.time,
        event: item.event,
        color: item.color
      };
    }
  },
  created() {
    this.dispatchEvent();
  },
  watch: {
    initialScheduleData() {
      this.dispatchEvent();
    }
  }
};
</script>

<style lang="scss" scoped>
.calendar-day-content {
  width: 100%;
  padding-top: 120px;
  background-color: #fafafa;

  .sheet {
    height: 60px;
    border: $sheet_border_size solid $sheet_border_color;
    background-color: $sheet_color;

    .schedule-item {
      height: 100%;
      border-radius: 10px;
      padding: 10px;
      position: relative;
      background-color: $item_color;
      color: $font_dark;
      @include box-shadow;
      cursor: pointer;
      &:active {
        filter: brightness(0.7);
      }
      .color-ball {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        position: absolute;
        top: 5px;
        left: 5px;
        &.pink {
          background-color: $color_choice_1;
        }
        &.green {
          background-color: $color_choice_2;
        }
        &.violet {
          background-color: $color_choice_3;
        }
      }
    }
  }
}

</style>