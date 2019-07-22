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
          />
        </el-form-item>
        <el-form-item prop="checkPassword">
          <el-input
            v-model="formInline.checkPassword"
            type="password"
            prefix-icon="iconfont iconunlock_fill"
            @keyup.enter.native="submitForm('formInline')"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :disabled="disabled"
            :loading="loading"
            style="width:100%;margin-bottom:150px;"
            @click="submitForm('formInline')"
            >登录</el-button
          >
        </el-form-item>
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
      }
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
    submitForm() {
      this.loading = true;
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
            this.$router.replace("/");
            apiUserInf().then(res2 => {
              console.log(res2);
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
  width: 100%;
  height: 100vh;
  //background-color:rgb(45, 58, 75);
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-form-login {
  min-width: 350px;
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
