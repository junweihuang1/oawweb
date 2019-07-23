<template>
  <div>
    <Ca-rule-table :header="header" :DataList="userList"></Ca-rule-table>
  </div>
</template>

<script>
import CaRuleTable from "@/components/Ca-table/Ca-rule-table.vue";
import { apiuserLists } from "@/request/api.js";
export default {
  name: "selectUser",
  data() {
    return {
      currentPage: 1,
      currentlimit: 15,
      userList: [],
      header: [
        ["员工编号", "userid"],
        ["员工名称", "username"],
        ["联系方式", "phone_number"],
        ["员工职位", "major"],
        ["部门", "department"],
        ["中心", "center_id"],
        ["公司", ""],
        ["部门id", "department"]
      ]
    };
  },
  props: {},
  watch: {},
  components: {
    CaRuleTable
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    submit() {
      console.log(this.form);
    },
    getUserList() {
      apiuserLists({
        Limit: this.currentPage,
        pageSize: this.currentlimit
      }).then(res => {
        console.log(res);
        this.userList = res.data;
        // this.StaffData = res.data.map(item => {
        //   item.sex = item.sex == 1 ? "男" : "女";
        //   item.status = item.status == 1 ? "在职" : "离职";
        //   return item;
        // });
      });
    },
    closewin() {
      this.$emit("closewin");
    }
  }
};
</script>

<style lang="scss" scoped></style>
