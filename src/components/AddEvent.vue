<template>
  <div class="add-event-button">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn add-event"
      data-toggle="modal"
      data-target="#addEventSheet"
    >新增行程</button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="addEventSheet"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addEventSheetLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addEventSheetLabel">新增一筆行程</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label for="event" class="event-label">行程</label>
            <input type="text" id="event" value="event" v-model="event">
            <label for="date" class="date-label">日期</label>
            <input type="date" id="date" value="date" v-model="date"> 
            <label for="time" class="time-label">時間</label>
            <select name="time" id="time" v-model="time">
              <option v-for="time in times" :key="time" :value="time">{{ time }}</option>
            </select>
            <label class="color-title-label">選擇顏色</label>
            <label for="grey" class="color-label">灰色</label>
            <input type="radio" name="color" id="grey" value="grey" v-model="color">
            <label for="violet" class="color-label">紫色</label>
            <input type="radio" name="color" id="violet" value="violet" v-model="color">
            <label for="red" class="color-label">紅色</label>
            <input type="radio" name="color" id="red" value="red" v-model="color">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary">新增</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddEvent',
  data() {
    return {
      date: '',
      time: '',
      event: '',
      color: '',
      times: ["1:00am", "2:00am", "3:00am", "4:00am", "5:00am", "6:00am", "7:00am", "8:00am", "9:00am", "10:00am", "11:00am", "12:00pm", "1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm", "7:00pm", "8:00pm", "9:00pm", "10:00pm", "11:00pm", "0:00pm", ]
    }
  }
}
</script>

<style scoped>
.add-event {
  position: fixed;
  bottom: 15px;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: #7f74b5;
  color: #ffffff;
  box-shadow: 1px 1px 8px .2px rgba(0, 0, 0, .3);
}
</style>