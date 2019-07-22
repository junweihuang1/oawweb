<template>
  <div>
    <el-button
      type="success"
      style="margin-bottom:20px;"
      @click="openApply"
      size="mini"
      >申请盖章</el-button
    >
    <rule-table
      id="table"
      style="overflow:auto;width:90%;"
      :header="headerList"
      :DataList="DataList"
      @RowClassName="tableRowClassName"
      @checkleave="opanLeaveList"
      @delete="deleteApply"
      :headle="headle"
    ></rule-table>
    <paging
      @setlimit="getlimit"
      @setpage="getpage"
      :total="total"
      :currentpage="currentpage"
      :currentlimit="currentlimit"
    ></paging>
    <Ca-view-process
      :setform="selectList"
      :isopen="isopen"
      :header="ProcessHeader"
      :title="dialogtitle"
      :ApprovalHeaderList="ApprovalHeaderList"
      @setclose="closeopen"
      :Approvaltable="Approvaltable"
    ></Ca-view-process>
    <Seal-Apply
      :isopen="isApplyOpen"
      @closewidow="closeApplyWidow"
    ></Seal-Apply>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import SealApply from "./components/Seal-Apply";
import CaViewProcess from "@/components/Ca-view-process/Ca-view-process";
import ruleTable from "@/components/Ca-table/Ca-rule-table.vue";
import { apigetSealList, apiSealById, apidelSeal } from "@/request/api.js";
export default {
  name: "Sealappliction",
  data() {
    return {
      dialogtitle: "盖章详情",
      DataList: [],
      headerList: [
        ["ID", "own_seal_id", 80],
        ["文件名称", "own_seal_fileName", 100],
        ["用章公司", "own_seal_company", 140],
        ["用章类别", "own_seal_chapCategory", 100],
        ["主送单位", "own_seal_sender", 280],
        ["创建时间", "own_seal_creatTime", 120],
        ["状态", "own_seal_status", 80],
        ["备注", "own_seal_remark"]
      ],
      headle: ["查看", "删除"],
      isopen: false,
      selectList: {},
      ProcessHeader: [
        ["文件名称", "own_seal_fileName"],
        ["预结算金额", "own_seal_settle"],
        ["用章公司", "own_seal_company"],
        ["主送单位", "own_seal_sender"],
        ["用章类别", "own_seal_chapCategory"],
        ["盖章用途", "own_seal_remark"]
      ],
      Approvaltable: [],
      ApprovalHeaderList: [],
      isApplyOpen: false,
      currentlimit: 15,
      currentpage: 1,
      total: 50
    };
  },
  components: {
    ruleTable,
    SealApply,
    paging,
    CaViewProcess
  },
  mounted() {
    document.getElementById("table").style.height =
      document.body.scrollHeight * 0.77 + "px";
    this.getsealList();
  },
  methods: {
    getsealList() {
      apigetSealList({
        pageSize: this.currentlimit,
        limit: this.currentpage
      }).then(res => {
        console.log(res);
        this.DataList = res.data.map(item => {
          switch (item.own_seal_company) {
            case 12:
              item.own_seal_company = "诚安时代（1）";
              break;
            case 13:
              item.own_seal_company = "传诚管理（2）";
              break;
            case 14:
              item.own_seal_company = "诚安科技（3）";
              break;
            case 15:
              item.own_seal_company = "传诚教育（5）";
              break;
            case 16:
              item.own_seal_company = "诚安建设（6）";
              break;
            case 17:
              item.own_seal_company = "分供方";
              break;
            case 18:
              item.own_seal_company = "诚安投资";
              break;
            default:
              break;
          }
          switch (item.own_seal_chapCategory) {
            case 1:
              item.own_seal_chapCategory = "公章";
              break;
            case 2:
              item.own_seal_chapCategory = "业务章";
              break;
            case 3:
              item.own_seal_chapCategory = "出图章";
              break;
            case 4:
              item.own_seal_chapCategory = "竣工章";
              break;
            case 5:
              item.own_seal_chapCategory = "项目章";
              break;
          }
          item.own_seal_status = item.own_seal_status == 2 ? "通过" : "待审批";
          return item;
        });
      });
    },
    getpage(e) {
      this.currentpage = e;
      this.getsealList();
    },
    getlimit(e) {
      this.currentlimit = e;
      this.getsealList();
    },
    closeApplyWidow() {
      this.isApplyOpen = false;
    },
    deleteApply(e) {
      this.$confirm("确认删除？").then(_ => {
        console.log(e);
        // apidelSeal({
        //   own_seal_id: e.own_seal_id
        // }).then(res => {
        //   console.log(res);
        // });
      });
    },
    openApply() {
      this.isApplyOpen = true;
    },
    opanLeaveList(e) {
      console.log(e);
      this.selectList = e;
      // apiSealById({ own_seal_id: e.own_seal_id }).then(res => {
      //   console.log(res);
      // });
      this.isopen = true;
    },
    tableRowClassName(e) {},
    closeopen() {
      this.isopen = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
