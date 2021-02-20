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
      return this.selectedDate.format('MMMM YYYY')
    }
  }
}
</script>