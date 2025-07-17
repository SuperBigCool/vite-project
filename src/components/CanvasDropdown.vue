<template>
  <div :style="{position: 'fixed',left: leftValue + 'px', top: topValue + 'px'}">
    <a-dropdown>
      <a-button>{{ value }}</a-button>
      <template #content>
        <a-doption>Option 1</a-doption>
        <a-doption disabled>Option 2</a-doption>
        <a-doption>Option 3</a-doption>
      </template>
    </a-dropdown>
  </div>
  </template>
<script setup>
const props = defineProps({
  value:{
    type: String,
    default: "",
  },
  leftValue:{
    type: Number,
    required: true,
  },
  topValue:{
    type: Number,
    required: true,
  },
});
</script>