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
    <el-dialog :visible.sync="isopen" :title="opentitle">
      <updata-process
        :activeform="activeform"
        v-if="isopen"
        @close="closewin"
      ></updata-process>
    </el-dialog>
  </div>
</template>

<script>
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
      currentlimit: 15,
      currentpage: 1,
      processName: "",
      processList: [],
      header: [
        ["流程编号", "ID_"],
        ["流程名称", "NAME_"],
        ["流程描述位", "KEY_"],
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

<style lang="scss" scoped></style>
