<template>
  <div class="selected-month-wrapper">
    {{ selectedMonth }}
  </div>
</template>

<script>
export default {
  name: 'SelectedMonth',
  props: {
    selectedDate: {
      type: Object,
      required: true
    }
  },
  computed: {
    selectedMonth() {
      return this.selectedDate.format('YYYY / MM')
    }
  }
}
</script>

<style scoped>
.selected-month-wrapper {
  margin: 15px 0px 10px 0px ;
  text-align: center;
}
</style>