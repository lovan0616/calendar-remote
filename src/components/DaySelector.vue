<template>
  <div class="day-selector d-flex justify-content-between">
    <div @click="selectPrevious">﹤</div>
    <span>{{ initalDate | dateFormat }}</span>
    <div @click="selectNext">﹥</div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'CalendarDateSelector',
  props: {
    initalDate: {
      type: String,
      required: true
    },
  },
  methods: {
    selectPrevious() {
      const previousDate = dayjs(this.initalDate).subtract(1, "day").format('YYYY-MM-DD')
      this.$router.push({ name: 'calendar-day',params: { date: previousDate }})
    },
    selectNext() {
      const nextDate = dayjs(this.initalDate).add(1, "day").format('YYYY-MM-DD')
      this.$router.push({ name: 'calendar-day',params: { date: nextDate }})
    }
  },
  filters: {
    dateFormat(date) {
      return dayjs(date).format("YYYY / MM / DD")
    }
  }
}
</script>

<style scoped>
.day-selector {
  width: 160px;
  margin-right: auto;
}
.day-selector div{
  width: 15px;
  height: 15px;
  background-color: #757575;
  border-radius: 50%;
  text-align: center;
  color: #ffffff;
  padding: 1px;
  font-size: 2px;
  line-height: 13px;
}
</style>