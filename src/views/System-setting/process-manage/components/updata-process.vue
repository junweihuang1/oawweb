<template>
  <div>
    <el-form size="mini" inline>
      <el-form-item>
        <el-button type="success" @click="updata">更新</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="processList" border size="mini" @cell-click="rowClick">
      <el-table-column
        label="节点编号"
        prop="user_task"
        align="center"
      ></el-table-column>
      <el-table-column
        label="节点名称"
        prop="user_task_name"
        align="center"
      ></el-table-column>
      <el-table-column label="绑定方式" align="center">
        <template slot-scope="{ row }">
          <el-select v-model="row.bindingMethod" clearable>
            <el-option
              :label="item[1]"
              :value="item[0]"
              :key="index"
              v-for="(item, index) in bindType"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="绑定角色id"
        prop="role_id"
        align="center"
      ></el-table-column>
      <el-table-column
        label="绑定角色名称"
        prop="role_name"
        align="center"
      ></el-table-column>
    </el-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="20"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
    <el-dialog
      :visible.sync="isselect"
      title="选择角色"
      :append-to-body="true"
      width="40%"
    >
      <select-role
        @setrole="getrole"
        v-if="isselect"
        @clear="clearselect"
      ></select-role>
    </el-dialog>
  </div>
</template>

<script>
import selectRole from "@/components/Ca-select/select-role";
import paging from "@/components/paging/paging";
import { apiprocessDetail, apiupdateTaskRoleId } from "@/request/api";
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
        ["版本", "VERSION_"]
      ],
      headle: ["查看"],
      bindType: [
        ["1", "直属上级"],
        ["2", "直属公司"],
        ["3", "角色"],
        ["4", "发起人"]
      ],
      active: {},
      isselect: false,
      fileName: ""
    };
  },
  props: {
    activeform: Object
  },
  components: {
    paging,
    selectRole
  },
  mounted() {
    this.getProcessdetail();
  },
  methods: {
    //清空角色名和id
    clearselect() {
      this.active.role_name = "";
      this.active.role_id = "";
      this.isselect = false;
    },
    getrole(row) {
      this.isselect = false;
      this.active.role_name = row.role_name;
      this.active.role_id = row.role_id;
    },
    //某一行
    rowClick(row, column, cell, event) {
      this.active = row;
      if (column.property == "role_name" || column.property == "role_id") {
        this.isselect = true;
      }
    },
    updata() {
      console.log(this.processList);
      let data = {
        param: JSON.stringify(this.processList)
      };
      console.log(data);
      apiupdateTaskRoleId(data).then(res => {
        console.log(res);
        this.$message.success(res.msg);
        this.$emit("close");
      });
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getProcessList();
    },
    getpage(val) {
      this.currentpage = val;
      this.getProcessList();
    },
    getProcessdetail() {
      console.log(this.activeform);
      apiprocessDetail({
        processDefinitionId: this.activeform.KEY_, //(必填):流程key
        version_: this.activeform.VERSION_, //(必填):流程版本
        pageSize: this.currentlimit, //(必填):每页显示多少数量
        limit: this.currentpage //(必填)当前页
      }).then(res => {
        console.log(res);
        this.processList = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
