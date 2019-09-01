<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="公司">
        <el-input v-model="department" clearable></el-input>
      </el-form-item>
      <el-form-item label="请假人">
        <el-input v-model="applicant" clearable></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="status" placeholder="请选择" clearable>
          <el-option
            v-for="(item, index) in statuslist"
            :key="index"
            :label="item"
            :value="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请假时间">
        <el-date-picker
          v-model="start_time"
          type="date"
          placeholder="开始日期"
          style="width:30%;"
        >
        </el-date-picker
        ><span style="padding:0 10px;">至</span>
        <el-date-picker
          v-model="end_time"
          type="date"
          placeholder="结束日期"
          style="width:30%;"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getLeaveRecord">查询</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="leaveList"
      :header="header"
      :headle="headle"
      style="width:90%;"
      @delete="deleteitem"
    ></Ca-rule-table>
    <paging
      :currentpage="currentpage"
      :currentlimit="currentlimit"
      :total="300"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { getDates } from "@/components/global-fn/global-fn";
import { apiLeaveList2, apideleLeave } from "@/request/api.js";
export default {
  name: "leaveRecord",
  data() {
    return {
      start_time: "",
      end_time: "",
      department: "",
      applicant: "",
      status: "",
      leave_category: "",
      statuslist: ["初次录入", "审批不通过", "审核中", "审核通过"],
      currentpage: 1,
      currentlimit: 15,
      leave_category_list: [
        "事假",
        "病假",
        "婚假",
        "产假",
        "丧假",
        "年假",
        "其他"
      ],
      leaveList: [],
      header: [
        ["单据号", "id", 90],
        ["请假人", "applicant", 90],
        ["公司", "company_name", 110],
        ["职位", "position", 140],
        ["请假类别", "leave_category", 100],
        ["创建时间", "createdate", 100],
        ["起始时间", "start_time", 100],
        ["结束时间", "end_time", 100],
        ["请假天数", "day_count", 100],
        ["事由", "reason"],
        ["状态", "status", 100]
      ],
      headle: ["", "删除"]
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  mounted() {
    this.getLeaveRecord();
  },
  methods: {
    deleteitem(row) {
      this.$confirm("确定删除？")
        .then(() => {
          apideleLeave({
            leaveId: row.id
          }).then(res => {
            this.$message.success(res.msg)
            this.getLeaveRecord();
          });
        })
        .catch(() => {});
    },
    getpage(val) {
      this.currentpage = val;
      this.getLeaveRecord();
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getLeaveRecord();
    },
    getLeaveRecord() {
      let data = {
        start_time: this.start_time,
        end_time: this.end_time,
        department: this.department,
        applicant: this.applicant,
        status: this.status,
        leave_category: this.leave_category,
        page: this.currentpage,
        rows: this.currentlimit
      };
      console.log(data);
      apiLeaveList2(data).then(res => {
        this.leaveList = res.data.map(item => {
          item.status = this.statuslist[item.status];
          item.start_time = getDates(item.start_time);
          item.end_time = getDates(item.end_time);
          item.leave_category = this.leave_category_list[item.leave_category];
          return item;
        });
        console.log(this.leaveList);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
