<template>
  <div>
    <el-dialog
      :visible="myopenSelect"
      title="选择中心名称"
      @close="closewin"
      width="40%"
      top="8vh"
      class="abow_dialog"
    >
      <el-form label-width="80px" size="mini" inline>
        <el-form-item label="中心名称">
          <el-input v-model="centerName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="query">查询</el-button>
        </el-form-item>
      </el-form>
      <Ca-rule-table
        class="table"
        :DataList="centerList"
        :header="header"
        @dblclick="dblclick"
      ></Ca-rule-table>
      <paging
        @setpage="getpage"
        @setlimit="getlimit"
        :total="total"
        :currentlimit="currentlimit"
        :currentpage="currentpage"
      ></paging>
    </el-dialog>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apicenterHome } from "@/request/api.js";
export default {
  name: "selectCenter",
  data() {
    return {
      myopenSelect: this.isopenSelect,
      centerName: "",
      centerList: [],
      currentpage: 1,
      currentlimit: 15,
      total: 130,
      header: [
        ["中心编号", "center_id"],
        ["中心名称", "center_name"],
        ["所属公司", "company_name"]
      ]
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  props: {
    isopenSelect: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isopenSelect(val) {
      this.myopenSelect = val;
      if (val && this.centerList == "") {
        this.getcenterList();
      }
    }
  },
  methods: {
    dblclick(row) {
      this.$emit("setSelectName", row);
    },
    getpage(e) {
      this.currentpage = e;
      this.getcenterList();
    },
    getlimit(e) {
      this.currentlimit = e;
      this.getcenterList();
    },
    query() {
      this.currentlimit = 15;
      this.currentpage = 1;
      this.getcenterList();
    },
    closewin() {
      this.$emit("closewin");
    },
    //获取项目名称
    getcenterList() {
      apicenterHome({
        center_name: this.centerName,
        rows: this.currentlimit,
        page: this.currentpage
      }).then(res => {
        console.log(res);
        this.total = res.total;
        this.centerList = res.data;
      });
    }
  }
};
</script>

<style lang="scss">
.abow_dialog {
  display: flex;
  justify-content: center;
  align-items: Center;
  overflow: hidden;
  .el-dialog {
    margin: 0 auto !important;
    height: 90%;
    overflow: hidden;
    .el-dialog__body {
      position: absolute;
      left: 0;
      top: 54px;
      bottom: 0;
      right: 0;
      padding: 0;
      z-index: 1;
      overflow: hidden;
      overflow-y: auto;
    }
  }
  .table {
    height: 85%;
    overflow: auto;
  }
}
</style>
