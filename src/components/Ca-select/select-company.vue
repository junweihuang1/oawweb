// 选择公司组件
<template>
  <div>
    <el-select
      v-model="company_id"
      placeholder="请选择公司"
      clearable
      style="width:100%;"
      @change="selcompanyName"
    >
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
      company_id: this.companyId,
      companyList: [],
      companyPage: 1,
      companyrows: 15
    };
  },
  mounted() {
    this.getCompanyInf();
  },
  props: {
    companyId: {
      type: Number,
      default: null
    }
  },
  watch: {
    companyId(val) {
      this.company_id = val;
    }
  },
  methods: {
    getCompanyInf() {
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
    },
    selcompanyName(e) {
      this.$emit("setCompanyName", e);
    }
  }
};
</script>

<style lang="scss" scoped></style>
