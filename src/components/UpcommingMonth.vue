<template>
  <div class="upcomming-month-wrapper">
    {{ upcommingMonth }}
  </div>
</template>

<script>
export default {
  name: 'UpcommingMonth',
  props: {
    selectedDate: {
      type: Object,
      required: true
    }
  },
  computed: {
    upcommingMonth() {
      return this.selectedDate.add(1, "month").format('MMMM YYYY')
    }
  }
}
</script>