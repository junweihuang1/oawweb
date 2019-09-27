<template>
  <div class="login">
    <div class="el-form-login">
      <div class="login-title">
        <img src="@/assets/logo-title.png" alt="诚安时代" />
        <p class="title">诚安时代猪猴管理系统</p>
      </div>
      <el-form
        ref="formInline"
        label-position="left"
        status-icon
        :rules="rules"
        :model="formInline"
        size="medium"
      >
        <el-input type="password" style="display: none;" />
        <el-form-item prop="checkUser">
          <el-input style="position:fixed;bottom:-99999px;"></el-input>
          <el-input
            v-model="formInline.checkUser"
            prefix-icon="iconfont iconpeople_fill"
            placeholder="请输入用户名"
            autocomplete="off"
            clearable
          />
        </el-form-item>
        <!-- 
            @keyup.enter.native="submitForm('formInline')" -->
        <el-form-item prop="checkPassword">
          <el-input
            style="position:fixed;bottom:-99999px;"
            type="password"
          ></el-input>
          <el-input
            v-model="formInline.checkPassword"
            type="password"
            autocomplete="off"
            prefix-icon="iconfont iconunlock_fill"
            placeholder="请输入密码"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <slide-verify
            v-if="isreload"
            :l="42"
            :r="10"
            :w="310"
            :h="100"
            @success="onSuccess"
            @fail="onFail"
            @refresh="onRefresh"
            :slider-text="text"
          ></slide-verify>
          <div>{{ msg }}</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import List from "./navList";
import { apiLogin, apiUserInf, apiuserMenuTree } from "@/request/api";
export default {
  name: "Login",
  data() {
    // 表单验证
    const checkUser = (rule, value, callback) => {
      if (!value) {
        this.disabled = true;
        return callback(new Error("用户名不能为空"));
      }
      setTimeout(() => {
        if (typeof value !== "string") {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 500);
    };
    const checkPassword = (rule, value, callback) => {
      if (!value) {
        this.disabled = true;
        return callback(new Error("密码不能为空"));
      } else {
        setTimeout(() => {
          callback();
        }, 500);
      }
    };
    return {
      formInline: {
        user: "",
        password: ""
      },
      isreload: true,
      loading: false,
      disabled: true,
      rules: {
        checkUser: [
          {
            validator: checkUser,
            trigger: "blur"
          }
        ],
        checkPassword: [
          {
            validator: checkPassword,
            trigger: "blur"
          }
        ]
      },
      msg: "",
      text: "向右滑进行登录",
      navList: List.navList
    };
  },
  computed: {
    password() {
      return this.formInline.checkPassword;
    },
    username() {
      return this.formInline.checkUser;
    }
  },
  watch: {
    password(e) {
      if (e && this.username) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    }
  },
  methods: {
    //两菜单找重
    getNewTree(returnList, locatList) {
      var ret = [];
      locatList.forEach(itemA => {
        var r = returnList.find(itemB => itemB.id == itemA.id);
        if (r) {
          var obj = new Object({
            children: [],
            icon: r.icon ? r.icon : "",
            id: r.id,
            route: r.route ? r.route : "",
            title: itemA.text
          });
          ret.push(obj);
          if (itemA.children && r.children) {
            obj.children = this.getNewTree(r.children, itemA.children);
          }
        }
      });
      return ret;
    },
    getTree() {
      apiuserMenuTree().then(res => {
        console.log(res);
        let newTree = this.getNewTree(this.navList, res.data);
        // newTree
        newTree.splice(0, 0, {
          id: "0",
          title: "首页",
          route: "/",
          icon: "icon-home",
          children: []
        });

        sessionStorage.setItem("tree", JSON.stringify(newTree));
        apiUserInf().then(res2 => {
          this.$router.replace("/");
          sessionStorage.setItem("userid", res2.data.userid);
          sessionStorage.setItem("role_name", res2.data.role_name);
          sessionStorage.setItem("center_name", res2.data.center_name);
          sessionStorage.setItem("company_name", res2.data.company_name);
        });
      });
    },
    onSuccess() {
      this.msg = "验证成功,登录中...";
      setTimeout(() => {
        apiLogin({
          pcOrApp: "pc",
          username: this.username,
          password: this.password
        })
          .then(res => {
            console.log(res);
            this.getTree();
            sessionStorage.setItem("token", res.token);
            sessionStorage.setItem("username", this.username);
            this.loading = false;
            this.$message({
              message: "登录成功",
              type: "success"
            });
            this.$store.commit("clearTabs");
          })
          .catch(err => {
            console.log(err);
            if (err && err.errorCode == "10004") {
              this.$message.warning(err.msg);
            } else {
              this.$message.warning("无法登陆，请联系技术人员");
            }
            this.$nextTick(() => {
              this.isreload = true;
              this.msg = "";
            });
            this.isreload = false;
            this.loading = false;
          });
      }, 500);
    },
    onFail() {
      this.msg = "";
    },
    onRefresh() {
      this.msg = "";
    },
    handleEnter(e) {
      this.submitForm(e);
    }
  }
};
</script>

<style lang="scss">
.login {
  background: url(../../assets/GQ.jpg);
  background-size: 100% 100%;
  width: 100%;
  height: 100vh;
  // background-color: rgb(45, 58, 75);
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-form-login {
  // min-width: 350px;
  background: rgba($color: #fff, $alpha: 0.7);
  border-radius: 3px;
  text-align: center;
  padding: 50px 100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.login-title {
  width: 100%;
  text-align: center;
  color: #fff;
}
.title {
  font-size: 22px;
  color: #383838;
  text-align: center;
  font-weight: 700;
  margin: 0px auto 40px;
}
</style>
