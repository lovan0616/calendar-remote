<template>
  <div class="view-selector">
    <select v-model="selected">
      <option
        v-for="view in views"
        :key="view.name"
        :value="view.name"
        :selected="view.name === routeName"
      >{{ view.name_ch }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "ViewSelector",
  data() {
    return {
      selected: this.$route.name,
      views: [
        {
          name: "calendar-day",
          name_ch: "日檢視"
        },
        {
          name: "calendar-week",
          name_ch: "週檢視"
        }
      ],
      routeName: this.$route.name
    };
  },
  watch: {
    selected(newValue, oldValue) {
      console.log({
        newValue: newValue,
        oldValue: oldValue
      });
      const { date } = this.$route.params;
      this.$router.push({ name: newValue, date });
    }
  }
};
</script>

<style scoped>
.view-selector {
  width: 5vw;
  min-width: 85px;
  position: relative;
  background-color: #dedaf4;
  border-radius: 20px;
  margin-left: auto ;
}

.view-selector::after {
  content: "\25BE";
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translate(0, -50%);
  color: #7f74b5;
}
select {
  -webkit-appearance: none;
  cursor: pointer;
  border:none;
  background-color: #dedaf4;
  border-radius: 20px;
  padding: 10px;
  color: #7f74b5;
}
</style>