<template>
  <div>
    <Ca-rule-table
      :DataList="NotCorList"
      :header="header"
      :setheight="0.6"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="15"
      @setlimit="getlimit"
      @setpage="getpage"
    ></paging>
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
        ["用户编号", "userid"],
        ["职位编号", "role_id"],
        ["姓名", "username"],
        ["角色名称", "role_name"],
        ["转正日期", "close_time"],
        ["状态", "status"]
      ]
    };
  },
  components: { CaRuleTable, paging },
  mounted() {
    this.getNotCorList();
  },
  methods: {
    getlimit(val) {
      this.currentlimit = val;
      this.getNotCorList();
    },
    getpage(val) {
      this.currentpage = val;
      this.getNotCorList;
    },
    getNotCorList() {
      apibecomeList({
        rows: this.currentlimit,
        page: this.currentpage
      }).then(res => {
        this.NotCorList = res.data.map(item => {
          switch (item.status) {
            case 3:
              item.status = "试用期";
              break;
          }
          return item;
        });
      });
    }
  }
};
</script>
