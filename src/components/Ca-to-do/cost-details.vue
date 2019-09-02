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
        <el-col :span="12" v-if="userList !== ''">
          <el-form-item label="审核人">
            <el-select v-model="userid" style="width:100%;">
              <el-option
                v-for="(item, index) in userList"
                :key="index"
                :value="item.userid"
                :label="item.username"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label=" " v-if="openType == 'new'">
            <el-button type="primary" @click="submit">提交</el-button>
          </el-form-item>
          <div v-else-if="openType == 'headle'">
            <el-form-item label="意见">
              <el-input type="textarea" v-model="reasons" :rows="3"></el-input>
            </el-form-item>
            <el-form-item>
              <template v-for="(item, index) in buttonList">
                <el-button
                  v-if="item == 'submit'"
                  :key="index"
                  type="success"
                  size="mini"
                  @click="headle(true)"
                  >提交</el-button
                >
                <el-button
                  v-else-if="item == 'reject'"
                  :key="index"
                  type="warning"
                  size="mini"
                  @click="headle(false)"
                  >驳回</el-button
                >
                <el-button
                  v-else-if="item == 'disagree'"
                  :key="index"
                  type="danger"
                  size="mini"
                  @click="headle('finish')"
                  >不同意</el-button
                >
              </template>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <template v-if="openType == 'headle'">
      <el-divider content-position="left">流程线</el-divider>
      <el-steps :active="current" align-center>
        <el-step
          v-for="(item, index) in processLine"
          :title="item.name"
          :key="index"
        ></el-step>
      </el-steps>
    </template>
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
import {
  getDates,
  number_chinese,
  changetime
} from "@/components/global-fn/global-fn";
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
      userid: 0, //下一审核人id,
      buttonList: [],
      userList: [],
      Approvaltable: [],
      reasons: ""
    };
  },
  components: {
    selectDepartment
  },
  props: {
    setform: {
      type: Object
      // default: () => {
      //   return {
      //     costapp_company: "",
      //     costapp_appitem: "",
      //     costapp_amount: "",
      //     costapp_application: ""
      //   };
      // }
    },
    openType: String,
    active: Object
  },
  watch: {
    setform(val) {
      this.form = val;
    }
  },
  mounted() {
    this.getprossList();
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
    getprossList() {
      let data = {};
      if (this.active) {
        data = {
          taskid: this.active.ID_, //(必填)流程任务id
          processInstanceId: this.active.PROC_INST_ID_
            ? this.active.PROC_INST_ID_
            : this.active.taskid, //(必填)流程实例id
          key: "costappView", //(必填)流程定义key
          position: this.active.role_name, //(必填)申请人角色
          type: "" //(必填)新增new/运行中
        };
      } else {
        data = {
          taskid: "", //(必填)流程任务id
          processInstanceId: "", //(必填)流程实例id
          key: "costappView", //(必填)流程定义key
          position: localStorage.getItem("role_name"), //(必填)申请人角色
          type: "new" //(必填)新增new/运行中
        };
      }
      console.log(data);
      apigetProcessList(data).then(res => {
        console.log(res);
        this.processLine = res.activityList.map((item, index) => {
          if (this.active && item.name == this.active.NAME_) {
            this.current = index;
          } else if (res.userlist.userTaskName == "结束") {
            this.current = res.activityList.length;
          }
          return item;
        });
        this.Approvaltable = res.historyList
          ? res.historyList.map(item => {
              item.END_TIME_ = item.END_TIME_ ? changetime(item.END_TIME_) : "";
              return item;
            })
          : [];
        this.buttonList = res.startForm.split(",");
        this.userid =
          res.userlist.userList != "" ? res.userlist.userList[0].userid : "";
        this.userList =
          res.userlist.userList != "" ? res.userlist.userList : [];
      });
    },
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
      this.$confirm(`确定提交吗？`)
        .then(() => {
          apisaveCostapp(this.form).then(res => {
            console.log(res);
            this.$message.success(res.msg);
            this.$emit("close");
          });
        })
        .catch(() => {});
    },
    headle(type) {
      if (this.reasons == "") {
        this.$message.error("请填写审核意见");
        return;
      }
      if (this.userid === 0) {
        this.$message.error("没有下一审核人不能提交！");
        return;
      }
      let data = {
        taskid: this.active.ID_, //(必填)流程实例id
        userid: this.userid, //(必填)下一审核人id
        reasons: this.reasons, //(必填)审批意见
        type: type //(必填)是否批准(true/false)
      };
      apipassCostapp(data).then(res => {
        this.$message.success(res.msg);
        this.$emit("close");
      });
    },
    getSelectName(row) {
      console.log(row);
      this.isopenselect = false;
      row.company_name = row.company_name ? row.company_name : "";
      row.center_name = row.center_name ? row.center_name : "";
      row.department_name = row.department_name ? row.department_name : "";
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
