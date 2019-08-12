<template>
  <div>
    <el-dialog
      title="修改密码"
      :visible.sync="myChange"
      width="20%"
      v-loading="isChangeLoad"
      @close="closeChange"
    >
      <el-form
        ref="newpassForm"
        :model="newpassForm"
        label-width="100px"
        :rules="rules2"
      >
        <el-form-item label="用户名">
          <el-input v-model="username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="原始密码" prop="oldpassword">
          <el-input
            v-model="newpassForm.oldpassword"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpassword">
          <el-input
            auto-complete="off"
            v-model="newpassForm.newpassword"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码" prop="newpassword2">
          <el-input
            auto-complete="off"
            v-model="newpassForm.newpassword2"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('newpassForm')"
            v-loading.body.lock="isChangeLoad"
            >确认修改</el-button
          >
          <el-button type="danger" @click="resetForm('newpassForm')"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { apieditUser } from "@/request/api.js";
export default {
  name: "changePass",
  data() {
    var validateoldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入原始密码"));
      } else {
        if (this.newpassForm.oldpassword !== "") {
          this.$refs.newpassForm.validateField("newpassword");
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (this.newpassForm.oldpassword == value) {
        callback(new Error("和旧密码相同"));
      } else {
        if (this.newpassForm.newpassword !== "") {
          this.$refs.newpassForm.validateField("newpassword2");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (this.newpassForm.newpassword !== value) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      rules2: {
        oldpassword: [{ validator: validateoldPass, trigger: "blur" }],
        newpassword: [{ validator: validatePass, trigger: "blur" }],
        newpassword2: [{ validator: validatePass2, trigger: "blur" }]
      },
      isChangeLoad: false,
      myChange: this.isChange,
      newpassForm: {
        oldpassword: "",
        newpassword: "",
        newpassword2: ""
      }
    };
  },
  watch: {
    isChange(newValue) {
      if (newValue == false) {
        this.resetForm("newpassForm");
      }
      this.myChange = newValue;
    }
  },
  props: {
    isChange: {
      type: Boolean,
      default: false
    },
    userid: {
      tyep: String,
      default: ""
    },
    username: {
      tyep: String,
      default: ""
    }
  },
  methods: {
    closeChange() {
      this.$emit("mychange", false);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isChangeLoad = true;
          apieditUser({
            username: this.username,
            password: this.newpassForm.newpassword,
            userid: this.userid
          }).then(res => {
            console.log(res);
            this.isChangeLoad = false;
            if (res.code == "20000") {
              this.$message.success(res.msg);
              this.myChange = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped lang="scss"></style>
