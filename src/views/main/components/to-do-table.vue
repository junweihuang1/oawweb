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
import FoldTable from "@/components/Ca-table/Ca-fold-table.vue";
import { apigetField, apipassField } from "@/request/api";
export default {
  name: "ToDoTable",
  data() {
    return {
      todoHeader: [
        ["流程ID", "ID_"],
        ["流程名称", "pdname"],
        ["审批部门", "NAME_"],
        ["申请人", "applicant"]
      ],
      newlist: [],
      expands: [],
      userid: "",
      taskid: "",
      isreasons: true,
      openid: ""
    };
  },
  props: {
    processList: Array
  },
  components: { FoldTable },
  methods: {
    getrow([row, expandedRows]) {
      this.taskid = row.ID_;
      if (this.openid != row.ID_) {
        let that = this;
        //把需要展开行的ID放进expands数组
        if (expandedRows.length) {
          that.expands = [];
          if (row) {
            that.expands.push(row.ID_);
          }
        } else {
          that.expands = [];
        }
        //获取外出内容放进将要打开的数组
        let id = row.BUSINESS_KEY_.split(".")[1];
        this.openid = row.ID_;
        apigetField({ id: id }).then(res => {
          this.userid = res.data.field_personnel_userid;
          that.newlist = [
            ["流程ID", row.ID_],
            ["流程名称", row.pdname],
            ["审批部门", row.NAME_],
            ["申请人", row.applicant],
            ["外出地点", res.data.field_personnel_place],
            ["外出内容", res.data.field_personnel_cause]
          ];
        });
      }
    },
    approvalProgress([e, reasons]) {
      let data = {
        taskid: this.taskid,
        userid: this.userid,
        reasons: reasons,
        sign: e
      };
      // apipassField(data)
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  }
};
</script>

<style lang="scss" scoped></style>
