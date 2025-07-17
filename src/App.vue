<template>
  <div id="app">
    <a-carousel :style="{
      width: '600px',
      height: '240px',
    }" :default-current="2" @change="handleChange">
      <a-carousel-item v-for="(item, index) in images" :key="index">
        <CanvasBox :data="item" :width="600" :height="240"/>
      </a-carousel-item>
    </a-carousel>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CanvasBox from './components/CanvasBox.vue';
const images = ref([
  {
    imageUrl: "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp",
    domList:[
      {
        x: 100,
        y: 50,
        value:"123"
      },
      {
        x: 200,
        y: 100,
        value:"666"
      },
    ]
  },
  {
    imageUrl: "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6480dbc69be1b5de95010289787d64f1.png~tplv-uwbnlip3yd-webp.webp"
  },
  {
    imageUrl: "https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/0265a04fddbd77a19602a15d9d55d797.png~tplv-uwbnlip3yd-webp.webp"
  }
]);

const handleChange = (current) => {
  console.log('Current slide:', current);
};
</script>

<style scoped></style>