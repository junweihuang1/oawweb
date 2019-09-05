<template>
  <div>
    <canvas
      id="canvas"
      :width="canvasWidth"
      height="600"
      @mousedown="canvasDown($event)"
      @mousemove="canvasMove($event)"
      @mouseup="canvasUp($event)"
      @mouseleave="canvasLeave($event)"
      ref="canvas"
      style="background:#EEE;"
      >抱歉，您的浏览器不支持canvas元素</canvas
    >
    <div style="width:90%;margin:10px auto;">
      <el-button @click="clear" type="warning">清空</el-button>
      <el-button @click="print" type="primary" style="float:right;"
        >打印</el-button
      >
    </div>
  </div>
</template>

<script>
import { apiuploadSignature } from "@/request/api.js";
export default {
  name: "sign",
  data() {
    return {
      canvas: "",
      ctx: "",
      canvasMoveUse: false,
      canvasWidth: document.body.clientWidth / 2 - 40,
      dissHeight: window.screen.height - document.body.clientHeight - 40
    };
  },
  mounted() {
    var canvas = document.getElementById("canvas"); //检测浏览器是否支持canvas 该方法是否存在 取得上下文对象
    console.log(canvas);
    if (canvas.getContext) {
      this.canvas = this.$refs.canvas; //指定canvas
      this.ctx = this.canvas.getContext("2d"); //设置2D渲染区域
      this.ctx.lineWidth = 5; //设置线的宽度
    }
  },
  methods: {
    clear() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    },
    print() {
      let data = this.canvas.toDataURL();
      console.log(data);
      this.$confirm(`确定保存签名吗？`)
        .then(() => {
          apiuploadSignature({
            signatureImg: data
          }).then(res => {
            console.log(res);
            this.$message.success(res.msg);
            this.$emit("close", res.url);
          });
        })
        .catch(() => {});
    },
    canvasDown(e) {
      this.canvasMoveUse = true;
      const canvasX = e.clientX - e.path[3].offsetLeft;
      const canvasY =
        e.clientY -
        e.path[3].offsetTop -
        this.dissHeight +
        document.documentElement.scrollTop;
      this.ctx.beginPath(); // 移动的起点
      this.ctx.moveTo(canvasX, canvasY);
    },
    canvasMove(e) {
      if (this.canvasMoveUse) {
        // 只有允许移动时调用
        let canvasX;
        let canvasY;
        canvasX = e.clientX - e.path[3].offsetLeft;
        canvasY =
          e.clientY -
          e.path[3].offsetTop -
          this.dissHeight +
          document.documentElement.scrollTop;

        this.ctx.lineTo(canvasX, canvasY);
        this.ctx.stroke();
      }
    },
    canvasUp(e) {
      this.canvasMoveUse = false;
    },
    canvasLeave(e) {
      console.log(e);
      this.canvasMoveUse = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
