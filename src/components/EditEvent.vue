<template>
  <div class="edit-event">
    <div
      class="modal fade"
      id="editEventSheet"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editEventSheetLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editEventSheetLabel">修改行程</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label for="event" class="event-label">行程</label>
            <input type="text" id="event" value="event" v-model="newEditItem.event" />
            <label for="time" class="time-label">時間</label>
            <select name="time" id="time" v-model="newEditItem.time">
              <option v-for="time in times" :key="time" :value="time">{{ time }}</option>
            </select>
            <label class="color-title-label">選擇顏色</label>
            <label for="grey" class="color-label">灰色</label>
            <input type="radio" name="color" id="grey" value="grey" v-model="newEditItem.color" />
            <label for="violet" class="color-label">紫色</label>
            <input type="radio" name="color" id="violet" value="violet" v-model="newEditItem.color" />
            <label for="red" class="color-label">紅色</label>
            <input type="radio" name="color" id="red" value="red" v-model="newEditItem.color" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger mr-auto">刪除</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button
              type="button"
              class="btn btn-primary"
              @click.stop="handleSubmit"
              data-dismiss="modal"
            >修改</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { Toast } from '../utils/helpers'
export default {
  name: 'EditItem',
  props: {
    initialEditItem: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      newEditItem: {
        time: "",
        event: "",
        color: ""
      },
      times: [
        "1:00am",
        "2:00am",
        "3:00am",
        "4:00am",
        "5:00am",
        "6:00am",
        "7:00am",
        "8:00am",
        "9:00am",
        "10:00am",
        "11:00am",
        "12:00pm",
        "1:00pm",
        "2:00pm",
        "3:00pm",
        "4:00pm",
        "5:00pm",
        "6:00pm",
        "7:00pm",
        "8:00pm",
        "9:00pm",
        "10:00pm",
        "11:00pm",
        "0:00pm"
      ]
    };
  },
  watch: {
    initialEditItem(newValue) {
      this.newEditItem = {
        ...this.newEditItem,
        ...newValue
      }
    }
  },
  methods: {
    handleSubmit() {
      if (!this.newEditItem.time || !this.newEditItem.event.trim() || !this.newEditItem.color) {
        Toast.fire({
          icon: "warning",
          title: "請填寫所有項目"
        });
        return;
      }
      
      this.$emit('after-edit-event', this.newEditItem, this.initialEditItem)

      $('#editEventSheet').modal('hide')
    }
  }
}
</script>