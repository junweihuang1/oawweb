<template>
  <div>
    <el-form size="mini" inline="">
      <el-form-item
        ><el-button type="success" @click="newgoout"
          >新增</el-button
        ></el-form-item
      >
    </el-form>

    <Ca-rule-table
      id="table"
      :DataList="goOutList"
      :header="header"
      :headle="headle"
      @checkleave="edit"
      @delete="deleteitem"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="total"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
    <el-dialog title="发起外勤申请" :visible.sync="isgoout" width="35%">
      <go-out-table
        :openType="openType"
        @setclose="getclose"
        v-if="isgoout"
        :activeform="activeform"
      ></go-out-table>
    </el-dialog>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import GoOutTable from "@/components/Ca-to-do/go-out-table";
import {
  apiFieldPersonnelList,
  apigetField,
  apidelFieldPersonnel
} from "@/request/api.js";
export default {
  name: "goout",
  data() {
    return {
      isgoout: false,
      currentlimit: 15,
      currentpage: 1,
      total: null,
      goOutList: [],
      header: [
        ["申请人", "username", 90],
        ["公司名称", "field_personnel_company", 100],
        ["职位/岗位", "field_personnel_rolename", 140],
        ["外出地址", "field_personnel_place", 170],
        ["车牌号", "field_personnel_license", 90],
        ["是否用车", "field_personnel_car2", 100],
        ["驾驶员", "field_personnel_driver", 90],
        ["外出事由", "field_personnel_cause"],
        ["开始时间", "start_time", 150],
        ["结束时间", "end_time", 150],
        ["状态", "field_personnel_status2", 80]
      ],
      headle: ["编辑", "删除"],
      activeform: {},
      openType: ""
    };
  },
  components: {
    GoOutTable,
    CaRuleTable,
    paging
  },
  mounted() {
    this.getFieldList();
  },
  methods: {
    getlimit(val) {
      this.currentlimit = val;
      this.getFieldList();
    },
    getpage(val) {
      this.currentpage = val;
      this.getFieldList();
    },
    getFieldList() {
      apiFieldPersonnelList({
        pageSize: this.currentlimit,
        limit: this.currentpage
      })
        .then(res => {
          console.log(res);
          this.total = res.totalCount;
          this.goOutList = res.data.map(item => {
            item.field_personnel_car2 =
              item.field_personnel_car == 1 ? "否" : "是";
            item.field_personnel_status2 =
              item.field_personnel_status == 4
                ? "外勤结束"
                : item.field_personnel_status == 3
                ? "未通过"
                : item.field_personnel_status == 2
                ? "审核通过"
                : "审核中";
            return item;
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    edit(e) {
      this.openType = "edit";
      this.activeform = e;
      console.log(e);
      this.isgoout = true;
      apigetField({ id: e.field_personnel_id }).then(res => {
        console.log(res);
      });
    },
    deleteitem(e) {
      this.$confirm(`确定删除 { ${e.username} } 的外勤记录吗？`)
        .then(() => {
          apidelFieldPersonnel({
            field_personnel_id: e.field_personnel_id
          }).then(res => {
            this.$message.success(res.msg);
            this.getFieldList();
          });
        })
        .catch(() => {});
    },
    newgoout() {
      this.activeform = {};
      this.openType = "add";
      this.isgoout = true;
    },
    getclose() {
      this.isgoout = false;
      this.getFieldList();
    }
  }
};
</script>

<style lang="less" scoped></style>
