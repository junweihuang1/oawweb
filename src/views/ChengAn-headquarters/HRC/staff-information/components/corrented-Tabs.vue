<template>
  <div style="border:1px solid #E4E7ED;">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="未转正人员" name="1">
        <Not-Corrected
          style="padding:10px;"
          @openCorrent="openCorrent"
        ></Not-Corrected>
      </el-tab-pane>
      <el-tab-pane label="转正信息" name="2" v-if="isopenDetail">
        <notCorrented-detail
          v-if="isopenDetail"
          style="padding:10px;"
          :personnel="personnel"
          :queryList="queryList"
        ></notCorrented-detail>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import notCorrentedDetail from "./notCorrented-detail";
import NotCorrected from "./Not-Corrected";
import { apiBecome_for } from "@/request/api.js";
export default {
  name: "correntedTabs",
  data() {
    return {
      activeName: "1",
      queryList: [],
      isopenDetail: false,
      personnel: {}
    };
  },
  components: {
    NotCorrected,
    notCorrentedDetail
  },
  methods: {
    openCorrent(row) {
      let data = { userid: row.userid };
      console.log(data);
      apiBecome_for(data).then(res => {
        console.log(res);
        this.personnel = res.mpaList;
        this.isopenDetail = true;
        this.activeName = "2";
        this.queryList = res.rows.rows1.rows.map(item => {
          item.bc_status =
            item.bc_status == 2
              ? "转正申请中"
              : item.bc_status == 0
              ? "初始录入"
              : "已转正";
          return item;
        });
      });
    }
  }
};
</script>
