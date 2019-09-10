<template>
  <div>
    <el-form
      inline
      size="mini"
      label-width="90px"
      label-position="left"
      class="elform"
    >
      <el-form-item label="项目名称">
        <el-input
          v-model="projectList.construct_project_name"
          clearable
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="收货地址">
        <el-input
          v-model="projectList.construct_project_addr"
          clearable
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input
          v-model="projectList.construct_project_leader"
          clearable
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input
          v-model="projectList.construct_project_leaderTel"
          clearable
          readonly
        ></el-input>
      </el-form-item>
    </el-form>
    <el-form
      inline
      size="mini"
      label-width="90px"
      label-position="left"
      class="elform"
    >
      <el-form-item label="订单号">
        <el-input
          v-model="projectList.construct_Aparty_purchase_orderNum"
          clearable
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="供货单位">
        <el-input
          v-model="projectList.construct_Aparty_purchase_supplier"
          clearable
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input
          v-model="projectList.construct_Aparty_purchase_contacts"
          clearable
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input
          v-model="projectList.construct_Aparty_purchase_tel"
          clearable
          readonly
        ></el-input>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="entriesList"
      :header="header"
      :setheight="0.3"
    ></Ca-rule-table>
  </div>
</template>

<script>
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apigetAPartyPur, apigetProcessList } from "@/request/api.js";
export default {
  name: "PurchaseDetails",
  data() {
    return {
      projectList: [],
      entriesList: [],
      header: [
        ["材料分类", "construct_Aparty_material_category", 100],
        ["材料名称", "construct_Aparty_material_name", 120],
        ["型号规格", "construct_Aparty_material_model"],
        ["单位", "construct_Aparty_material_unit", 70],
        ["合同工程量", "construct_Aparty_material_num", 120],
        ["累计审批量", "construct_aParty_byedNum", 120],
        ["计划采购量", "construct_Aparty_purEntry_num", 120],
        ["备注", "construct_Aparty_purEntry_remark", 120]
      ],
      activityList: []
    };
  },
  components: {
    CaRuleTable
  },
  props: {
    PurchaseId: Number,
    active: Object,
    openType: String
  },
  watch: {
    PurchaseId() {
      this.getApartyPur();
    }
  },
  mounted() {
    this.getApartyPur();
    this.getprocessList();
  },
  methods: {
    getApartyPur() {
      apigetAPartyPur({ construct_Aparty_purchase_id: this.PurchaseId }).then(
        res => {
          console.log(res);
          this.projectList = res.data.aParty[0];
          this.entriesList = res.data.entries;
        }
      );
    },
    getprocessList() {
      let data = {};
      if (this.active) {
        data = {
          taskid: this.active.ID_, //(必填)流程任务id
          processInstanceId: this.active.PROC_INST_ID_
            ? this.active.PROC_INST_ID_
            : this.active.taskid, //(必填)流程实例id
          key: "aPartyPurView", //(必填)流程定义key
          position: localStorage.getItem("role_name"), //(必填)申请人角色
          type: "" //(必填)新增new/运行中
        };
      } else {
        data = {
          taskid: "", //(必填)流程任务id
          processInstanceId: "", //(必填)流程实例id
          key: "aPartyPurView", //(必填)流程定义key
          position: localStorage.getItem("role_name"), //(必填)申请人角色
          type: "new" //(必填)新增new/运行中
        };
      }
      apigetProcessList(data).then(res => {
        console.log(res);
        this.activityList = res.activityList;
        // if (this.hisComment != "") {
        //   let currentTask = this.hisComment[this.hisComment.length - 1];
        //   this.activityList = res.activityList.map((item, index) => {
        //     if (item.name == currentTask.name_) {
        //       this.current = currentTask.END_TIME_ == "" ? index : index + 1;
        //     }
        //     return item;
        //   });
        // } else {
        //   this.activityList = res.activityList;
        // }
        this.buttonList = res.startForm.split(",");
        this.userid = res.userlist.userList
          ? res.userlist.userList[0].userid
          : "";
        this.userList = res.userlist.userList ? res.userlist.userList : [];
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.elform {
  margin-left: 20px;
}
.elform:first-child {
  margin-top: 30px;
}
</style>
