<template>
  <div>
    <Ca-rule-table
      :DataList="NotCorList"
      :header="header"
      :setheight="0.6"
    ></Ca-rule-table>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apibecomeList } from "@/request/api.js";
export default {
  name: "NotCorrected",
  data() {
    return {
      currentlimit: 15,
      currentpage: 1,
      NotCorList: [],
      header: [
        ["用户编号", ""],
        ["职位编号", ""],
        ["姓名", ""],
        ["角色名称", ""],
        ["转正日期", ""],
        ["状态", ""]
      ]
    };
  },
  components: { CaRuleTable, paging },
  mounted() {
    this.getNotCorList();
  },
  methods: {
    getNotCorList() {
      console.log("getNotCorList");
      apibecomeList({
        rows: this.currentlimit,
        page: this.currentpage
      })
        .then(res => {
          console.log(res);
          this.NotCorList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
