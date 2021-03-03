<template>
  <ol class="day-of-week mb-2">
    <li v-for="(weekday, index) in weekdays" :key="index">
      {{ weekday }}
    </li>
  </ol>
</template>

<script>
export default {
  name: "CalendarWeekdays",
  data() {
    return {
      weekdays: ["M","T","W","T","F","S","S"]
    }
  }
}
</script>

<style scoped>
ol {
  list-style: none;
  display: flex;
  justify-content: space-around;
}
</style>