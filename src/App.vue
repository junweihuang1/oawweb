<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      winHeight: "100%",
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style lang="scss">
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 15px;
  height: 15px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  height: 8px;
  -webkit-box-shadow: inset 0 0 1px #7e8eac5e;
  border-radius: 10px;
  background-color: #f5f5f5;
}

//
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  height: 8px;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 0 6px #7e8eac5e;
  background-color: #c3c7d170;
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

.scrollbar-wrapper {
  overflow-x: hidden !important;
}
.el-scrollbar {
  height: calc(100% - 50px);
}
.has-logo,
.el-aside {
  height: 100vh;
  width: 100%;
}

//tabs是去掉内容padding
.el-tabs--border-card > .el-tabs__content {
  padding: 0px !important;
}

.el-submenu__title {
  height: 50px !important;
  line-height: 50px !important;
  border-bottom: 0 !important;
}

.el-menu.el-menu--horizontal {
  border-bottom: 0 !important;
}
.inputbox {
  width: 100%;
  border: none;
  height: 30px;
  text-align: center;
  outline-color: #0191a0;
}
</style>
