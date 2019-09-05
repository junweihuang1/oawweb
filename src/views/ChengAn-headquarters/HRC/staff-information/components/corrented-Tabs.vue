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
          @close="close"
          :userid="userid"
          style="padding:10px;"
        ></notCorrented-detail>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import notCorrentedDetail from "./notCorrented-detail";
import NotCorrected from "./Not-Corrected";
export default {
  name: "correntedTabs",
  data() {
    return {
      activeName: "1",
      isopenDetail: false,
      userid: 0
    };
  },
  components: {
    NotCorrected,
    notCorrentedDetail
  },
  methods: {
    close() {
      this.isopenDetail = false;
      this.activeName = "1";
    },
    openCorrent(row) {
      this.userid = row.userid;
      this.isopenDetail = false;
      this.$nextTick(() => {
        this.isopenDetail = true;
      });
      this.activeName = "2";
    }
  }
};
</script>
