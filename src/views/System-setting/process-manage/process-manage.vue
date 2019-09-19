<template>
  <div>
    <el-form size="mini" inline>
      <el-form-item label="流程名称">
        <el-input v-model="processName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getProcessList">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="updata">更新</el-button>
      </el-form-item>
      <el-form-item>
        <el-upload
          ref="upload"
          :headers="{ token: token }"
          :action="upload_url"
          :on-success="headleSuccess"
          :auto-upload="false"
          :before-upload="beforeUpload"
        >
          <el-button slot="trigger" size="mini" type="primary"
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px;"
            size="mini"
            type="success"
            @click="submitUpload"
            >部署流程文件</el-button
          >
          <div slot="tip" class="el-upload__tip upload">
            只能上传zip文件
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="processList"
      :header="header"
      style="width:60%;"
      @checkleave="checkitem"
      :headle="headle"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="20"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
    <el-dialog :visible.sync="isopen" :title="opentitle" v-dialogDrag>
      <updata-process
        :activeform="activeform"
        v-if="isopen"
        @close="closewin"
      ></updata-process>
    </el-dialog>
  </div>
</template>

<script>
import http from "@/request/http";
import UpdataProcess from "./components/updata-process";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import {
  apiprocessList,
  apisaveTaskRole,
  apiprocessDetail
} from "@/request/api";
export default {
  name: "processManage",
  data() {
    return {
      token: localStorage.getItem("token"),
      upload_url: http.base_url + "deploymentProcessDefinition_zip",
      currentlimit: 15,
      currentpage: 1,
      processName: "",
      processList: [],
      header: [
        ["流程编号", "ID_"],
        ["流程名称", "NAME_", 200],
        ["流程描述位", "KEY_", 200],
        ["版本", "VERSION_", 90]
      ],
      headle: ["查看"],
      isopen: false,
      opentitle: "",
      activeform: {}
    };
  },
  components: {
    CaRuleTable,
    paging,
    UpdataProcess
  },
  mounted() {
    this.getProcessList();
  },
  methods: {
    headleSuccess(res, file, fileList) {
      console.log(res);
    },
    beforeUpload(file) {
      console.log(file);
      this.fileName = file.name;
      if (
        file.type !== "application/x-zip-compressed" &&
        file.type !== "application/zip"
      ) {
        this.$message.error("上传文件不是zip压缩文件格式");
        return false;
      }
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    //关闭窗口
    closewin() {
      this.isopen = false;
    },
    //更新
    updata() {
      apisaveTaskRole().then(res => {
        console.log(res);
        this.$message.success(res.msg);
        this.getProcessList();
      });
    },
    checkitem(row) {
      this.opentitle = row.NAME_;
      this.activeform = row;
      console.log(row);
      this.isopen = true;
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getProcessList();
    },
    getpage(val) {
      this.currentpage = val;
      this.getProcessList();
    },
    //获取所有流程信息
    getProcessList() {
      let data = {
        pageSize: this.currentlimit,
        limit: this.currentpage,
        process_name: this.processName
      };
      apiprocessList(data).then(res => {
        console.log(res);
        this.processList = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.upload {
  display: inline;
  margin-left: 10px;
}
</style>
