// 选择公司组件
<template>
  <div>
    <el-select
      v-model="company_id"
      placeholder="请选择公司"
      clearable
      style="width:100%;"
      @change="selcompanyName"
      @clear="clearselect"
    >
      <el-option
        v-for="(item, index) in companyList"
        :key="index"
        :label="item.company_name"
        :value="item.company_id"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
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
  created() {
    if (this.companyList == "") {
      this.getCompanyInf();
    }
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
    clearselect() {
      const data = {
        company_id: "",
        company_name: ""
      };
      this.$emit("setCompanyName", data);
    },
    getCompanyInf() {
      this.companyList = JSON.parse(sessionStorage.getItem("companyList"));
    },
    selcompanyName(e) {
      this.companyList.forEach(item => {
        if (item.company_id == e) {
          this.$emit("setCompanyName", item);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
