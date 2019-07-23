<template>
  <div></div>
</template>

<script>
import { apiLeaveList2 } from "@/request/api.js";
export default {
  name: "leaveRecord",
  data() {
    return {
      form: {
        start_time: "",
        end_time: "",
        department: "",
        applicant: "",
        status: "",
        leave_category: ""
      },
      statuslist: [
        [0, "初次录入"],
        [1, "审批不通过"],
        [2, "审核中"],
        [3, "审核通过"]
      ]
    };
  },
  mounted() {
    this.getLeaveRecord();
  },
  methods: {
    getLeaveRecord() {
      apiLeaveList2({
        start_time: this.form.start_time,
        end_time: this.form.end_time,
        department: this.form.department,
        applicant: this.form.applicant,
        status: this.form.status,
        leave_category: this.form.leave_category
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
