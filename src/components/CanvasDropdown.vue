<template>
  <div :style="{position: 'absolute',left: leftValue + 'px', top: topValue + 'px'}">
    <a-dropdown @select="handleSelect">
      <a-button>{{ value }}</a-button>
      <template #content>
        <a-doption v-for="(item,index) in list" :key="index" :value="index">{{ item.label }}</a-doption>
      </template>
    </a-dropdown>
  </div>
  </template>
<script setup>
import { defineProps, defineEmits } from "vue";
const emit = defineEmits(["dropSelect"]);
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
  list:{
    type: Array,
    default: () => [],
  }
});

const handleSelect = (value)=>{
  emit("dropSelect",{inputValue:props.value,...props.list[value]});
}
</script>