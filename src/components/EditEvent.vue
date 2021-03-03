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
            <h5 class="modal-title lead" id="editEventSheetLabel">修改行程</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="event" class="event-label mb-2 lead">行程</label>
              <input
                class="form-control"
                type="text"
                id="event"
                value="event"
                v-model="newEditItem.event"
              />
            </div>
            <div class="form-group">
              <label for="time" class="time-label mb-2 lead">時間</label>
              <select class="form-control" name="time" id="time" v-model="newEditItem.time">
                <option v-for="time in times" :key="time" :value="time">{{ time }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="color-title-label d-block mb-2 lead">選擇顏色</label>
              <div
                class="color-options-wrapper form-check form-check-inline"
                v-for="colorOp in colors"
                :key="colorOp.name"
              >
                <label :for="colorOp.name" class="color-label pr-1">{{ colorOp.name_ch }}</label>
                <input
                  type="radio"
                  name="color"
                  :id="colorOp.name"
                  :value="colorOp.name"
                  v-model="newEditItem.color"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-delete mr-auto" @click.stop="handleDelete">刪除</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button
              type="button"
              class="btn btn-submit"
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
import $ from "jquery";
import { Toast } from "../utils/helpers";
export default {
  name: "EditItem",
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
      ],
      colors: [
        { name: "pink", name_ch: "粉" },
        { name: "green", name_ch: "綠" },
        { name: "violet", name_ch: "紫" }
      ]
    };
  },
  watch: {
    initialEditItem(newValue) {
      this.newEditItem = {
        ...this.newEditItem,
        ...newValue
      };
    }
  },
  methods: {
    handleSubmit() {
      if (
        !this.newEditItem.time ||
        !this.newEditItem.event.trim() ||
        !this.newEditItem.color
      ) {
        Toast.fire({
          icon: "warning",
          title: "請填寫所有項目"
        });
        return;
      }

      this.$emit("after-edit-event", this.newEditItem, this.initialEditItem);

      $("#editEventSheet").modal("hide");
    },
    handleDelete() {
      this.$emit("after-delete-event", this.initialEditItem)
      $("#editEventSheet").modal("hide");
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-content {
  border: 10px solid transparent;
  @include box-shadow;
  border-radius: 20px;
  .modal-header {
    background: linear-gradient(
      $bg_color_start,
      $bg_color_middle,
      $bg_color_end
    );
  }
  z-index: 100;
  .color-options-wrapper {
    input {
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      border: 1px solid #ced4da;
      border-radius: 50%;
      cursor: pointer;
      &:checked {
        box-shadow: inset 0 0 0 5px #ced4da;
      }
    }
  }
  .modal-footer {
    .btn-submit {
      background-color: $theme_color;
      color: $font_light;
    };
    .btn-delete {
      background-color: $color_choice_1;
      color: $font_light;
    }
  }
}
</style>