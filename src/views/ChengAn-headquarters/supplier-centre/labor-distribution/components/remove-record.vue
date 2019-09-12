<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="申请时间">
        <el-date-picker
          type="date"
          value-format="yyyy-MM-dd"
          v-model="ApplyTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getRemoveRecord">查询</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="RecordList"
      :header="header"
      :setheight="0.5"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="total"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apiworkerApplyList } from "@/request/api";
export default {
  name: "removeRecord",
  data() {
    return {
      currentlimit: 15,
      currentpage: 1,
      total: 0,
      ApplyTime: "",
      RecordList: [],
      header: [
        ["姓名", "username"],
        ["申请时间", "suppliermod_worker_apply_creatTime"],
        ["所在项目", "projectName"],
        ["申请调动项目", "construct_project_name"],
        ["申请原因", "suppliermod_worker_apply_reason"],
        ["状态", "suppliermod_worker_apply_status"]
      ]
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  props: {
    userId: Number
  },
  mounted() {
    this.getRemoveRecord();
  },
  methods: {
    getlimit(val) {
      this.currentlimit = val;
      this.getRemoveRecord();
    },
    getpage(val) {
      this.currentpage = val;
      this.getRemoveRecord();
    },
    getRemoveRecord() {
      console.log(this.ApplyTime);
      let data = {
        rows: this.currentlimit,
        page: this.currentpage,
        supplierMod_worker_userId: this.userId,
        suppliermod_worker_apply_creatTime: this.ApplyTime
      };
      apiworkerApplyList(data).then(res => {
        console.log(res);
        this.total = res.total;
        this.RecordList = res.data.map(item => {
          item.suppliermod_worker_apply_status =
            item.suppliermod_worker_apply_status == 0
              ? "审批中"
              : item.suppliermod_worker_apply_status == 2
              ? "审核通过"
              : "审核不通过";
          return item;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
