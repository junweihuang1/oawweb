<template>
  <div>
    <fold-table
      :dataList="processList"
      :header="todoHeader"
      @setrow="getrow"
      :clickDateList="newlist"
      :expands="expands"
      :isreasons="isreasons"
      @process="approvalProgress"
    ></fold-table>
  </div>
</template>

<script>
import {
  apiApplicationDetails,
  apiagreeAttendApply,
  apirejectAttendApply
} from "@/request/api";
import foldTable from "@/components/Ca-table/Ca-fold-table.vue";
export default {
  name: "CardApproval",
  props: {
    processList: Array
  },
  components: { foldTable },
  data() {
    return {
      todoHeader: [
        ["补卡类型", "hr_attend_typeCard"],
        ["原因", "hr_attend_apply_reason"],
        ["审核状态", "hr_attend_status"]
      ],
      newlist: [],
      expands: [],
      isreasons: false,
      openid: ""
    };
  },
  methods: {
    getrow([row, expandedRows]) {
      if (this.openid != row.hr_attend_apply_id) {
        let that = this;
        //把需要展开行的ID放进expands数组
        if (expandedRows.length) {
          that.expands = [];
          if (row) {
            that.expands.push(row.hr_attend_apply_id);
          }
        } else {
          that.expands = [];
        }
        //获取外出内容放进将要打开的数组
        this.openid = row.hr_attend_apply_id;
        apiApplicationDetails({
          hr_attend_apply_id: this.openid
        }).then(res => {
          that.newlist = [
            ["流程ID", this.openid],
            ["申请人", res.data.username],
            ["补卡类型", res.data.hr_attend_typeCard],
            ["补卡时间", res.data.hr_attend_apply_data],
            ["原因", res.data.hr_attend_apply_reason]
          ];
        });
      }
    },
    approvalProgress([e, reasons]) {
      e
        ? apiagreeAttendApply({ hr_attend_apply_id: this.openid }).then(res => {
            console.log(res);
          })
        : apirejectAttendApply({ hr_attend_apply_id: this.openid }).then(
            res => {
              console.log(res);
            }
          );
    }
  }
};
</script>

<style></style>
