<template>
  <div class="main">
    <el-tooltip placement="bottom-start" content="全屏">
      <div class="left">
        <div @click="handleFullScreen">
          <i class="el-icon-monitor elclick" />
        </div>
      </div>
    </el-tooltip>
    <el-tooltip placement="bottom-start" content="单页刷新">
      <div class="left">
        <i class="iconfont icon-huanyipi elclick" @click="reloadPage"></i>
      </div>
    </el-tooltip>
    <div>
      <el-menu
        class="set_el_menu"
        text-color="#fff"
        mode="horizontal"
        @select="handleSelect"
        :background-color="this.$store.state.theme"
        ><!--#409EFF-->
        <el-submenu index="1">
          <template slot="title">
            <img src="../../../assets/logo.png" class="headpic" />
            <span style="margin-left:10px;"
              >{{ company_name }}{{ center_name }}{{ username }}</span
            >
          </template>
          <el-menu-item index="1-1" @click="handleChangePw"
            >修改密码</el-menu-item
          >
          <el-menu-item index="1-2" @click="handleLoginOut"
            >退出登录</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </div>
    <el-dialog title="修改密码" :visible.sync="openChangePw" width="20%">
      <el-form label-width="70px">
        <el-form-item label="用户">
          <el-input :value="username" readonly></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="newPw"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="modifyPw" type="primary">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { apimodUserPwd } from "@/request/api.js";
export default {
  name: "HeaderR",
  inject: ["reload"],
  data() {
    return {
      fullscreen: "",
      activeIndex: "1",
      username: sessionStorage.getItem("username"),
      center_name: "",
      company_name: "",
      openChangePw: false,
      newPw: ""
    };
  },
  created() {
    this.company_name =
      sessionStorage.getItem("company_name") != "undefined"
        ? `${sessionStorage.getItem("company_name")}/`
        : "";
    this.center_name =
      sessionStorage.getItem("center_name") != "undefined"
        ? `${sessionStorage.getItem("center_name")}/`
        : "";
  },
  methods: {
    //修改密码
    modifyPw() {
      this.$confirm("确定修改密码吗？")
        .then(() => {
          apimodUserPwd({
            password: this.newPw
          }).then(res => {
            this.$message.success(res.msg);
            this.openChangePw = false;
          });
        })
        .catch(() => {});
    },
    reloadPage() {
      this.reload();
    },
    handleChangePw() {
      this.openChangePw = true;
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
      sessionStorage.removeItem("token");
      // this.$store.state.token = "";
      // sessionStorage.clear();
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("role_name");
      sessionStorage.removeItem("userid");
      sessionStorage.removeItem("center_name");

      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
.headpic {
  width: 30px;
  border-radius: 50%;
}
.left {
  height: 30px;
  width: 30px;
  line-height: 30px;
  text-align: center;
  margin-right: 10px;
  border-radius: 50%;
  background: #fff;
}
.left:hover {
  background: #ddd;
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
.elclick {
  font-size: 20px;
  font-weight: 700;
  color: #0190a0;
}
</style>
