<template>
  <div>
    <el-form size="mini" inline>
      <el-form-item>
        <el-input
          v-model="projectName"
          placeholder="项目名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getPartyConList">
          搜索
        </el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="PartyConList"
      :header="header"
      :headle="headle"
      @checkleave="openmaterial"
      @edit="applyPurchase"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="total"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
    <el-dialog
    v-dialogDrag
      :visible.sync="isopenMaterial"
      title="甲方材料单"
      top="8vh"
      width="75%"
    >
      <dialog-tabs :projectList="projectList" v-if="isopenMaterial">
      </dialog-tabs>
    </el-dialog>
    <el-dialog :visible.sync="isopenRecord" top="8vh" width="75%" v-dialogDrag>
      <dialog-tabs-record :projectList="projectList" v-if="isopenRecord">
      </dialog-tabs-record>
    </el-dialog>
  </div>
</template>

<script>
import dialogTabsRecord from "./dialog-tabs-record/dialog-tabs-record";
import dialogTabs from "./dialog-tabs/dialog-tabs.vue";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apiaPartyConList } from "@/request/api";
export default {
  name: "PartyMaterialPurchase",
  data() {
    return {
      total: 0,
      projectName: "",
      currentlimit: 15,
      currentpage: 1,
      PartyConList: [],
      header: [
        ["项目编号", "construct_project_id", 100],
        ["项目名称", "construct_project_name"],
        ["工程地址", "construct_project_addr"],
        ["项目经理", "construct_project_leader", 100],
        ["项目经理联系方式", "construct_project_leaderTel", 160],
        ["合同项目开始时间", "construct_project_startDate", 160],
        ["合同项目结束时间", "construct_project_endDate", 160]
      ],
      headle: ["材料单", "", "申请采购"],
      isopenMaterial: false,
      projectList: {},
      isopenRecord: false
    };
  },
  components: {
    CaRuleTable,
    paging,
    dialogTabs,
    dialogTabsRecord
  },
  mounted() {
    this.getPartyConList();
  },
  methods: {
    applyPurchase(row) {
      console.log(row);
      this.isopenRecord = true;
      this.projectList = row;
    },
    openmaterial(row) {
      console.log(row);
      this.isopenMaterial = true;
      this.projectList = row;
    },
    getpage(val) {
      this.currentpage = val;
      this.getPartyConList();
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getPartyConList();
    },
    getPartyConList() {
      apiaPartyConList({
        construct_project_name: this.projectName,
        pageSize: this.currentlimit,
        limit: this.currentpage
      }).then(res => {
        console.log(res);
        this.total = res.total;
        this.PartyConList = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
