<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="string"
      :on-preview="handlePreview"
      :before-upload="beforeUpload"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px;"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
    </el-upload>
  </div>
</template>

<script>
import axios from "axios";
import { apiuploadPdf } from "@/request/api.js";
export default {
  name: "Maillist",
  data() {
    return {};
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeUpload(file) {
      let fd = new FormData();
      fd.append("pic", file); //传文件
      axios({
        method: "post",
        url: "http://39.108.184.20:8080/casd2/admin/uploadPdf",
        data: fd,
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token")
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less" scoped></style>
