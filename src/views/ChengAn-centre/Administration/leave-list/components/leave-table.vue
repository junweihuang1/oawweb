<template>
  <div>
    <Ca-view-process
      :setform="setform"
      :isopen="isopen"
      :header="header"
      :title="dialogtitle"
      :ApprovalHeaderList="ApprovalHeaderList"
      @setclose="closeopen"
      :Approvaltable="Approvaltable"
    ></Ca-view-process>
  </div>
</template>

<script>
import CaViewProcess from "@/components/Ca-view-process/Ca-view-process";
import { changetime } from "@/components/global-fn/global-fn.js";
import { apiViewHisComment } from "@/request/api.js";
export default {
  name: "leavetable",
  data() {
    return {
      Approvaltable: [],
      dialogtitle: "请假详情",
      ApprovalHeaderList: [
        ["序号", "index", 60],
        ["流程节点", "name_", 100],
        ["审核人", "username", 80],
        ["审核时间", "END_TIME_", 160],
        ["审核意见", "MESSAGE_"]
      ],
      header: [
        ["申请人", "applicant"],
        ["职位", "position"],
        ["开始时间", "start_time"],
        ["结束时间", "end_time"],
        ["请假类型", "leave_category"],
        ["共计天数", "day_count"],
        ["请假事由", "reason"]
      ]
    };
  },
  props: {
    isopen: {
      type: Boolean,
      default: false
    },
    setform: {
      type: Object,
      default: null
    }
  },
  components: {
    CaViewProcess
  },
  watch: {
    isopen(newValue) {
      console.log(this.setform);
      if (newValue == true) {
        apiViewHisComment({ bizId: "275", beyId: "Leave_flow" })
          .then(res => {
            this.Approvaltable = res.map(item => {
              item.START_TIME_ = changetime(item.START_TIME_);
              item.END_TIME_ = changetime(item.END_TIME_);
              return item;
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.Approvaltable = [];
      }
    }
  },
  methods: {
    closeopen() {
      this.$emit("setclose");
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
