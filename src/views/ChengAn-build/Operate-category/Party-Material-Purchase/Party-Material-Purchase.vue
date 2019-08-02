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
      :total="60"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
    <el-dialog
      :visible.sync="isopenMaterial"
      title="甲方材料单"
      top="8vh"
      width="75%"
    >
      <Party-material-list :projectId="projectId"></Party-material-list>
    </el-dialog>
  </div>
</template>

<script>
import PartyMaterialList from "./components/Party-material-list";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apiaPartyConList } from "@/request/api";
export default {
  name: "PartyMaterialPurchase",
  data() {
    return {
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
      projectId: ""
    };
  },
  components: {
    CaRuleTable,
    paging,
    PartyMaterialList
  },
  mounted() {
    this.getPartyConList();
  },
  methods: {
    applyPurchase(row) {
      console.log(`申请采购：`);
      console.log(row);
    },
    openmaterial(row) {
      this.isopenMaterial = true;
      this.projectId = row.construct_project_id;
      // console.log(row);
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
        this.PartyConList = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
