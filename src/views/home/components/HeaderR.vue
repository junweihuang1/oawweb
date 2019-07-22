<template>
  <div class="main">
    <el-tooltip placement="bottom-start" content="单页刷新">
      <div class="left">
        <!-- <div class="wind hover" @click="handleFullScreen">
        <i class="iconfont iconShapecopy" />
      </div> -->
        <i class="iconfont icon-huanyipi" @click="reloadPage"></i>
      </div>
    </el-tooltip>
    <div>
      <el-menu
        class="set_el_menu"
        text-color="#fff"
        mode="horizontal"
        @select="handleSelect"
        background-color="#0190a0"
        ><!--#409EFF-->
        <el-submenu index="1">
          <template slot="title">
            <img
              src="../../../assets/logo2.png"
              style="width:30px;border-radius:50%;"
            />
            <span style="margin-left:10px;"
              >{{ company_name }}/{{ center_name }}/{{ username }}</span
            >
          </template>
          <el-menu-item index="1-1" @click="handleLoginOut"
            >退出登录</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderR",
  inject: ["reload"],
  data() {
    return {
      fullscreen: "",
      activeIndex: "1",
      username: "",
      center_name: "",
      company_name: ""
    };
  },
  created() {
    this.username = localStorage.getItem("username");
    this.company_name = localStorage.getItem("company_name");
    this.center_name = localStorage.getItem("center_name");
  },
  methods: {
    reloadPage() {
      this.reload();
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleFullScreen() {
      const element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    handleLoginOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role_name");
      localStorage.removeItem("userid");
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
.icon-huanyipi {
  color: #0190a0;
  font-size: 20px;
  font-weight: 800;
}
.left {
  height: 30px;
  width: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
  background: #fff;
}
.left:hover {
  background: #017380;
}
.main {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wind {
  padding: 0 8px;
  cursor: pointer;
}
.wind .iconfont {
  font-size: 18px;
}
.hover:hover {
  outline: 0;
  background-color: #ecf5ff;
}
.el-submenu {
  width: 100%;
}
.el-menu-item {
  text-align: center;
}
</style>
