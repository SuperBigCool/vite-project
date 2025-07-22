<template>
  <div class="canvas_box" ref="canvasBox" :style="{ backgroundImage: `url(${props.data.imageUrl})` }">
    <canvas class="cvs" ref="cvs"></canvas>
    <CanvasInput ref="canvasInput" @confirm="handleInputConfirm" @cancel="handleInputcancel"/>
    <CanvasDropdown v-for="(item, index) in domList" :key="index" :value="item.value" :leftValue="item.x"
      :topValue="item.y" :list="item.dropDownList || []" @dropSelect="handleDropSelect"/>
  </div>
</template>

<script setup>
import CanvasInput from "./CanvasInput.vue";
import CanvasDropdown from "./CanvasDropdown.vue";
import { defineProps, onMounted, ref,onUnmounted,defineEmits } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  width: {
    required: true,
    default: "100%",
  },
  height: {
    required: true,
    default: "100%",
  },
});

const cvs = ref(null);
const canvasBox = ref(null);
const canvasInput = ref(null);
let ctx = null;

let shapes = [

];
const domList = ref([]);

const init = () => {
  domList.value = props.data.domList || [];

  ctx = cvs.value.getContext("2d");
  cvs.value.width = props.width * devicePixelRatio;
  cvs.value.height = props.height * devicePixelRatio;
  cvs.value.style.width = props.width + "px";
  cvs.value.style.height = props.height + "px";

  // 注册鼠标按下事件
  cvs.value.onmousedown = (e) => {
    const { offsetX, offsetY } = e;
    shapes = [];
    canvasInput.value.handleHide();
    shapes.push({ diagram: [] });
    const rectangleShape = new Rectangle(offsetX, offsetY, "red");
    shapes[shapes.length - 1].diagram.push(rectangleShape);
    window.onmousemove = (e) => {
      const { clientX, clientY } = e;
      const rect = cvs.value.getBoundingClientRect();
      const offsetX = clientX - rect.left;
      const offsetY = clientY - rect.top;
      rectangleShape.change(offsetX, offsetY);
    };
    window.onmouseup = () => {
      const circleShape = new Circle(
        (rectangleShape.endX - rectangleShape.startX) / 2 + rectangleShape.startX,
        (rectangleShape.endY - rectangleShape.startY) / 2 +
        rectangleShape.startY,
        5,
        "blue"
      );
      shapes[shapes.length - 1].diagram.push(circleShape);
      shapes[shapes.length - 1].domInfo = {
        value: "",
        x: circleShape.centerX,
        y: circleShape.centerY,
      };
      console.log(circleShape, "circleShape")

      const lineShape = new Line(
        circleShape.centerX + circleShape.radius,
        circleShape.centerY,
        circleShape.centerX + circleShape.radius + circleShape.diffusion + 20,
        circleShape.centerY - 15,
        "green"
      );
      shapes[shapes.length - 1].diagram.push(lineShape);
      const lineShapeTwo = new Line(
        lineShape.endX,
        lineShape.endY,
        lineShape.endX + 50,
        lineShape.endY,
        "green"
      );
      shapes[shapes.length - 1].diagram.push(lineShapeTwo);

      canvasInput.value.handleShow(lineShapeTwo.endX, lineShapeTwo.endY);
      window.onmousemove = null;
      window.onmouseup = null;

      console.log(shapes, "shapes");
    };
  };

  cvs.value.oncontextmenu = (e) => {
    e.preventDefault();
  };

  cvs.value.oncontextmenu = (e) => {
    e.preventDefault();
  };
  
  cvs.value.onclick = (e) => {
    e.stopPropagation();
  };

  canvasBox.value.addEventListener("click",(e)=>{
    e.stopPropagation();
  })

  document.addEventListener("click",()=>{
    canvasInput.value.handleHide();
    shapes.forEach(item => {
      item.diagram = [];
    });
  })
};

// 绘制矩形
class Rectangle {
  constructor(startX, startY, color) {
    this.startX = startX;
    this.startY = startY;
    this.color = color;
    this.endX = startX;
    this.endY = startY;
  }

  get minX() {
    return Math.min(this.startX, this.endX);
  }
  get minY() {
    return Math.min(this.startY, this.endY);
  }
  get maxX() {
    return Math.max(this.startX, this.endX);
  }
  get maxY() {
    return Math.max(this.startY, this.endY);
  }
  draw() {
    // 绘制边框
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2 * devicePixelRatio;
    ctx.strokeRect(
      this.minX * devicePixelRatio,
      this.minY * devicePixelRatio,
      (this.maxX - this.minX) * devicePixelRatio,
      (this.maxY - this.minY) * devicePixelRatio
    );
  }
  change(newX, newY) {
    this.endX = newX;
    this.endY = newY;
  }
};

// 绘制圆心
class Circle {
  constructor(centerX, centerY, radius, color, diffusion) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.color = color;
    this.diffusion = diffusion || 5; // 扩散半径
  }

  draw() {
    ctx.beginPath();
    ctx.arc(
      this.centerX * devicePixelRatio,
      this.centerY * devicePixelRatio,
      this.radius * devicePixelRatio,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = this.color;
    ctx.lineWidth = 2 * devicePixelRatio;
    ctx.fill();
    // 结束绘制
    ctx.beginPath();
    // 瞄边扩大2像素
    ctx.arc(
      this.centerX * devicePixelRatio,
      this.centerY * devicePixelRatio,
      this.radius * devicePixelRatio + this.diffusion,
      0,
      Math.PI * 2
    );
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2 * devicePixelRatio;
    ctx.stroke();
  }
}

// 绘制直线
class Line {
  constructor(startX, startY, endX, endY, color) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.startX * devicePixelRatio, this.startY * devicePixelRatio);
    ctx.lineTo(this.endX * devicePixelRatio, this.endY * devicePixelRatio);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2 * devicePixelRatio;
    ctx.stroke();
  }
}

let requestId = null;

/**
 * 绘制所有形状
 */
const drawAllShapes = () => {
  ctx.clearRect(0, 0, cvs.value.width, cvs.value.height);
  shapes.forEach((item) => {
    item.diagram.forEach((shape) => {
      shape.draw && shape.draw();
    });
  });
  requestId = requestAnimationFrame(drawAllShapes);
};

const handleInputConfirm = (value) => {
  shapes[shapes.length - 1].diagram = [];
  shapes[shapes.length - 1].domInfo.value = value;
  domList.value.push(shapes[shapes.length - 1].domInfo);
  // console.log(shapes[shapes.length - 1].domInfo);
}

const handleInputcancel = () =>{
  shapes = [];
};
const emit = defineEmits(["selectMenu"]);
const handleDropSelect = (data)=>{
  console.log(data, "handleDropSelect");
  emit("selectMenu", {domValue:props.data,dropSelectValue:data});
  
};

onMounted(() => {
  init();
  drawAllShapes();
});
onUnmounted(() => {
  if (requestId) {
    cancelAnimationFrame(requestId);
  }
});
</script>

<style lang="less" scoped>
.canvas_box {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;

  .cvs {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
