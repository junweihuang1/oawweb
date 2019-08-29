<template>
  <div>
    <el-button type="success" size="mini" @click="addApply">添加</el-button>
    <Ca-rule-table
      :DataList="queryList"
      :header="header"
      :setheight="0.6"
    ></Ca-rule-table>
    <el-dialog
      :visible.sync="isopen"
      title="添加员工转正信息"
      :append-to-body="true"
      width="25%"
    >
      <el-form
        size="mini"
        style="padding:20px;"
        label-position="left"
        label-width="100px"
      >
        <el-form-item label="姓名">
          <el-input v-model="personnel.username"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="personnel.role_name"></el-input>
        </el-form-item>
        <el-form-item label="试用期">
          <el-input v-model="personnel.incorporation_date"></el-input>
        </el-form-item>
        <el-form-item label="~至">
          <el-input v-model="personnel.close_time"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="personnel.department_name"></el-input>
        </el-form-item>
        <el-form-item label="试用期待遇">
          <el-input v-model="personnel.on_trial"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="corrented">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apisubmitBecome } from "@/request/api.js";
export default {
  name: "NotCorrectedDetail",
  data() {
    return {
      header: [
        ["转正编号", "bc_id"],
        ["用户编号", "user_id"],
        ["用户名", "username"],
        ["职位", "role_name"],
        ["试用期待遇", "on_trial"],
        ["状态", "bc_status"],
        ["邮箱", ""]
      ],
      isopen: false
    };
  },
  components: {
    CaRuleTable
  },
  props: {
    personnel: Object,
    queryList: Array
  },
  mounted() {},
  methods: {
    corrented() {
      console.log(this.personnel);
      let data = {
        user_id: this.personnel.userid, //(必填)：用户id;
        username: this.personnel.username, //(必填)：转正人姓名；
        role_name: this.personnel.role_name, //(必填)：转正人职位；
        incorporation_date: this.personnel.incorporation_date, //(必填)：进入公司日期；
        close_time: this.personnel.close_time, //(必填)：试用期结束时间；
        bc_department: this.personnel.department_name, //(必填)：部门 ；
        on_trial: this.personnel.on_trial //(必填)：试用期待遇；
      };
      apisubmitBecome(data).then(res => {
        console.log(res);
      });
    },
    addApply() {
      this.isopen = true;
    }
  }
};
</script>

<style lang="scss"></style>
