<template>
  <div>
    <el-select v-model="company_id" placeholder="请选择公司" clearable>
      <el-option
        v-for="item in companyList"
        :key="item.company_id"
        :label="item.company_name"
        :value="item.company_id"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { apicompanyList } from "@/request/api.js";
export default {
  name: "selectCompany",
  data() {
    return {
      companyList: [],
      companyPage: 1,
      companyrows: 15,
      company_id: ""
    };
  },
  watch: {
    company_id(val) {
      console.log(val);
      this.$emit("selectId", val);
    }
  },
  mounted() {
    apicompanyList({
      rows: this.companyrows,
      page: this.companyPage,
      companyname: ""
    }).then(res => {
      this.companyList = this.companyList.concat(res.data);
      if (res.data.length == this.companyrows) {
        this.companyPage++;
        this.getCompanyInf();
      }
    });
  }
};
</script>

<style lang="scss" scoped></style>
