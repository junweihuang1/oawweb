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
        <el-form-item prop="checkUser">
          <el-input
            v-model="formInline.checkUser"
            prefix-icon="iconfont iconpeople_fill"
            placeholder="请输入用户名"
            clearable
          />
        </el-form-item>
        <!-- 
            @keyup.enter.native="submitForm('formInline')" -->
        <el-form-item prop="checkPassword">
          <el-input
            v-model="formInline.checkPassword"
            type="password"
            prefix-icon="iconfont iconunlock_fill"
            placeholder="请输入密码"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <slide-verify
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
        <!-- <el-form-item>
          <el-button
            type="primary"
            :disabled="disabled"
            :loading="loading"
            plain
            @click="submitForm('formInline')"
            >登录</el-button
          >
        </el-form-item> -->
      </el-form>
    </div>
  </div>
</template>
<script>
import { apiLogin, apiUserInf } from "@/request/api";
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
      text: "向右滑进行登录"
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
    onSuccess() {
      this.msg = "验证成功,登录中...";
      setTimeout(() => {
        apiLogin({
          pcOrApp: "pc",
          username: this.username,
          password: this.password
        })
          .then(res => {
            console.log("res");
            console.log(res);
            localStorage.setItem("token", res.token);
            localStorage.setItem("username", this.username);
            this.loading = false;
            this.$message({
              message: "登录成功",
              type: "success"
            });
            this.$store.commit("clearTabs");
            apiUserInf().then(res2 => {
              console.log(res2);
              this.$router.replace("/");
              localStorage.setItem("userid", res2.data.userid);
              localStorage.setItem("role_name", res2.data.role_name);
              localStorage.setItem("center_name", res2.data.center_name);
              localStorage.setItem("company_name", res2.data.company_name);
            });
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
            this.$message({
              message: err.msg,
              type: "error"
            });
          });
      }, 500);
    },
    onFail() {
      this.msg = "";
    },
    onRefresh() {
      this.msg = "";
    },
    submitForm() {
      this.loading = true;
      if (this.msg !== "验证成功") {
        this.$message.error("图片验证失败，请重试");
        this.loading = false;
        return;
      }
      setTimeout(() => {
        apiLogin({
          pcOrApp: "pc",
          username: this.username,
          password: this.password
        })
          .then(res => {
            localStorage.setItem("token", res.token);
            localStorage.setItem("username", this.username);
            this.loading = false;
            this.$message({
              message: "登录成功",
              type: "success"
            });
            this.$store.commit("clearTabs");
            apiUserInf().then(res2 => {
              console.log(res2);
              this.$router.replace("/");
              localStorage.setItem("userid", res2.data.userid);
              localStorage.setItem("role_name", res2.data.role_name);
              localStorage.setItem("center_name", res2.data.center_name);
              localStorage.setItem("company_name", res2.data.company_name);
            });
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
            this.$message({
              message: err.msg,
              type: "error"
            });
          });
      }, 500);
    },
    handleEnter(e) {
      this.submitForm(e);
    }
  }
};
</script>

<style lang="scss">
.login {
  background: url(../../assets/bg.jpg);
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
  background: rgba($color: #fff, $alpha: 0.1);
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
