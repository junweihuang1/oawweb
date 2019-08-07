<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="项目">
        <el-input
          placeholder="请选择"
          clearable
          v-model="projectName"
          @focus="selectProject"
        ></el-input>
      </el-form-item>
      <el-form-item label="材料名称">
        <el-input v-model="materialName" clearable></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select placeholder="请选择" v-model="status" clearable>
          <el-option
            v-for="(item, index) in statusList"
            :value="index"
            :label="item"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getPurdetails">查询</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="PurdetailsList"
      :header="header"
      style="width:90%;"
    ></Ca-rule-table>
    <paging
      :currentpage="currentpage"
      :currentlimit="currentlimit"
      :total="200"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
    <el-dialog :visible.sync="isopen">
      <select-project @setProject="getProject"></select-project>
    </el-dialog>
  </div>
</template>

<script>
import selectProject from "@/components/Ca-select/select-project";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apidevePurReport } from "@/request/api.js";
export default {
  name: "TechnicalPurchaseDetails",
  data() {
    return {
      currentlimit: 15,
      currentpage: 2,
      materialName: "",
      projectName: "",
      statusList: [
        "保存",
        "项目经理提交",
        "经营部审核",
        "总经理审核",
        "采购核对单价",
        "财务经理审核",
        "采购审核单价",
        "财务经理审批",
        "董事会审核",
        "下单",
        "配货",
        "签收",
        "财务复核价格及数量",
        "申请请款",
        "通知财务审核",
        "待付款"
      ],
      status: "",
      PurdetailsList: [],
      header: [
        ["项目名称", "construct_project_name"],
        ["建单时间", "construct_purchase_creatTime"],
        ["采购状态", "construct_purchase_status"],
        ["材料名称", "construct_purchase_material"],
        ["规格名称", "construct_purchase_model"],
        ["单位", "construct_purchase_unit", 90],
        ["合同量", "construct_purchase_quantities", 90],
        ["采购量", "construct_purchase_applyNum", 90],
        ["累计审批量", "construct_purchase_approvalNum", 120],
        ["采购单价", "construct_purchase_purchasePrice", 120],
        ["采购小计", "construct_purchase_purchaseTotal", 120]
      ],
      isopen: false
    };
  },
  components: {
    CaRuleTable,
    paging,
    selectProject
  },
  mounted() {
    this.getPurdetails();
  },
  methods: {
    getProject(row) {
      this.projectName = row.construct_project_name;
      this.isopen = false;
    },
    getpage(val) {
      this.currentpage = val;
      this.getPurdetails();
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getPurdetails();
    },
    //选择项目名称
    selectProject() {
      this.isopen = true;
    },
    getPurdetails() {
      let data = {
        construct_project_name: this.projectName,
        construct_purchase_material: this.materialName,
        construct_purchase_status: this.status,
        pageSize: this.currentlimit,
        limit: this.currentpage
      };
      apidevePurReport(data).then(res => {
        this.PurdetailsList = res.data.map(item => {
          item.construct_purchase_status = this.statusList[
            item.construct_purchase_status
          ];
          return item;
        });
        console.log(this.PurdetailsList);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
