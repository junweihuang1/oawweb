<template>
  <div>
    <el-form ref="form" :model="form" label-width="90px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="申请人">
            <el-input v-model="applicant" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请时间">
            <el-input v-model="nowtime" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公司部门">
            <el-input
              placeholder="请选择"
              v-model="form.costapp_company"
              @focus="openselect"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="申请类型">
            <el-select v-model="form.costapp_application" style="width:100%;">
              <el-option
                v-for="(item, index) in applyType"
                :value="item"
                :label="item"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="费用金额">
            <el-input v-model="form.costapp_amount"></el-input
          ></el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="金额(大写)">
            <el-input v-model="big_costapp_amount" readonly></el-input
          ></el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="申请事项">
            <el-input
              type="textarea"
              :row="3"
              v-model="form.costapp_appitem"
            ></el-input
          ></el-form-item>
        </el-col>
        <el-col :span="24" v-if="Approvaltable == ''">
          <el-form-item label=" ">
            <el-button type="primary" @click="submit" v-if="openType == 'new'"
              >提交</el-button
            >
            <el-button
              type="primary"
              @click="modify"
              v-else-if="openType == 'modify'"
              >修改</el-button
            >
            <el-button
              type="primary"
              @click="headle"
              v-else-if="openType == 'headle'"
              >提交</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider content-position="left">流程线</el-divider>
    <el-steps :active="current" align-center>
      <el-step
        v-for="(item, index) in processLine"
        :title="item.name"
        :key="index"
      ></el-step>
    </el-steps>
    <el-divider content-position="left">审核记录</el-divider>
    <el-table :data="Approvaltable" border>
      <el-table-column
        v-for="(item, index) in ApprovalHeaderList"
        :key="index"
        :label="item[0]"
        :prop="item[1]"
        :type="index == 0 ? 'index' : ''"
        :width="item[2]"
        align="center"
      ></el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="isopenselect"
      title="选择部门"
      :append-to-body="true"
      top="8vh"
    >
      <select-department @setSelectName="getSelectName"></select-department>
    </el-dialog>
  </div>
</template>

<script>
import selectDepartment from "@/components/Ca-select/select-department";
import {
  apisaveCostapp,
  apimodCostapp,
  apipassCostapp,
  apigetProcessList
} from "@/request/api.js";
import { getDates, number_chinese } from "@/components/global-fn/global-fn";
export default {
  name: "costDetails",
  data() {
    return {
      applicant: localStorage.getItem("username"),
      form: this.setform,
      isopenselect: false,
      applyType: ["费用审批", "借支申请", "报销申请"],
      ApprovalHeaderList: [
        ["序号", "index", 60],
        ["流程节点", "name_", 100],
        ["审核人", "username", 80],
        ["审核时间", "END_TIME_", 160],
        ["审核意见", "MESSAGE_"]
      ],
      processLine: [],
      current: 1,
      userid: Number //下一审核人id
    };
  },
  components: {
    selectDepartment
  },
  props: {
    setform: {
      type: Object,
      default: () => {
        return {
          costapp_company: "",
          costapp_appitem: "",
          costapp_amount: "",
          costapp_application: ""
        };
      }
    },
    openType: String,
    Approvaltable: Array,
    processType: Object
  },
  watch: {
    setform(val) {
      this.form = val;
    }
  },
  mounted() {
    console.log(this.processType);
    apigetProcessList(this.processType).then(res => {
      console.log(res);
      this.processLine = res.activityList;
      this.form.userid = res.userlist.userList[0].userid;
    });
  },
  computed: {
    nowtime() {
      if (this.openType == "modify") {
        return getDates(new Date());
      }
      return this.form.costapp_time
        ? this.form.costapp_time
        : getDates(new Date());
    },
    big_costapp_amount() {
      return number_chinese(this.form.costapp_amount);
    }
  },
  methods: {
    modify() {
      let data = {
        costapp_id: this.form.costapp_id,
        costapp_company: this.form.costapp_company,
        costapp_appitem: this.form.costapp_appitem,
        costapp_amount: this.form.costapp_amount,
        costapp_application: this.form.costapp_application
      };
      apimodCostapp(data).then(res => {
        console.log(res);
        this.$message.success(res.msg);
        this.$emit("close");
      });
    },
    submit() {
      console.log(this.form);
      apisaveCostapp(this.form).then(res => {
        console.log(res);
        this.$message.success(res.msg);
        this.$emit("close");
      });
    },
    headle() {
      apipassCostapp(this.form).then(res => {
        this.$message.success(res.msg);
        this.$emit("close");
      });
    },
    getSelectName(row) {
      console.log(row);
      this.isopenselect = false;
      this.form.costapp_company =
        row.company_name + row.center_name + row.department_name;
    },
    openselect() {
      this.isopenselect = true;
    }
  }
};
</script>

<style lang="scss" scoped></style>
