<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      :data="{ uploadPath: 'userfile/' }"
      :action="upload_url"
      name="pic"
      :limit="1"
      :headers="{ token: token }"
      :on-success="handleSuccess"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px;"
        size="small"
        type="success"
        @click="submitUpload"
        >提交</el-button
      >
    </el-upload>
    <iframe
      v-if="isreload"
      style="margin-top:20px;"
      src="http://file.casdapi.com/userfile/address_list.pdf"
      width="90%"
      frameborder="0"
      :height="boxheight"
    ></iframe>
  </div>
</template>

<script>
import http from "@/request/http.js";
import { apiuploadPdf } from "@/request/api.js";
import { setTimeout } from "timers";
export default {
  name: "Maillist",
  data() {
    return {
      upload_url: http.base_url + "uploadPdf/",
      token: sessionStorage.getItem("token"),
      isdisplay: true,
      boxheight: document.documentElement.scrollHeight * 0.8,
      fileList: [],
      isreload: true
    };
  },
  methods: {
    handleSuccess(res) {
      this.$message.success(res.msg);
      this.$refs.upload.clearFiles();
      setTimeout(() => {
        this.isreload = false;
        this.$nextTick(() => {
          this.isreload = true;
        });
      }, 600);
    },
    submitUpload() {
      this.$confirm(`确定提交吗？`)
        .then(() => {
          this.$refs.upload.submit();
          //当没有附件时单独提交
        })
        .catch(() => {});
    },
    submit() {
      console.log(this.form);
      apiuploadPdf(this.form).then(res => {
        this.$message.success(res.msg);
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
