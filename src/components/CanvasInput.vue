<template>
  <div v-if="show" :style="{ width: '100%',position:'fixed', left: leftValue + 'px', top: topValue + 'px' }"
    class="canvas-input">
    <a-input v-model="inputValue" :style="{ width: '320px' }" :size="size"
      allow-clear />
    <a-button :size="size" @click="handleConfirm" style="margin-left: 10px;">确定</a-button>
    <a-button :size="size" @click="handleCancel" style="margin-left: 10px;">取消</a-button>
  </div>
</template>

<script setup>
import { ref,defineExpose,defineEmits } from "vue"

const emit = defineEmits(["confirm","cancel"]);
const show = ref(false);
const inputValue = ref("");
const leftValue = ref(0);
const topValue = ref(0);
const size = ref("mini");

const handleShow = (left,top) => {
  inputValue.value = "";
  leftValue.value = left;
  topValue.value = top;
  show.value = true;
};

const handleHide = () => {
  inputValue.value = "";
  show.value = false;
};

const handleConfirm = () => {
  emit("confirm", inputValue.value);
  handleHide();
};

const handleCancel = () => {
  emit("cancel");
  handleHide();
};


defineExpose({
  handleShow,
  handleHide,
  show
});
</script>

<style lang="scss" scoped></style>
