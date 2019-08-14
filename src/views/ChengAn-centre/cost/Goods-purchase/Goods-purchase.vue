<template>
  <div>
    <el-form size="mini" inline>
      <el-form-item>
        <el-input
          v-model="companyName"
          placeholder="公司名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="projectName"
          placeholder="项目名称"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="username" placeholder="姓名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button type="primary" @click="getGoodsList">搜索</el-button>
          <el-button type="success" @click="addGoods">新增</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <el-dialog title="物品采购" :visible.sync="isopen">
      <add-goods v-if="isopen"></add-goods>
    </el-dialog>
  </div>
</template>

<script>
import addGoods from "./components/add-goods";
import { apigetOwnHeadList, apiOwnHeadListById } from "@/request/api.js";
export default {
  name: "GoodsPurchase",
  data() {
    return {
      companyName: "",
      projectName: "",
      username: "",
      currentlimit: 15,
      currentpage: 1,
      isopen: false
    };
  },
  mounted() {
    this.getGoodsList();
  },
  components: {
    addGoods
  },
  methods: {
    addGoods() {
      this.isopen = true;
    },
    getGoodsList() {
      let data = {
        company_name: this.companyName,
        construct_project_name: this.projectName,
        own_purchase_planMan: this.username,
        pageSize: this.currentlimit,
        limit: this.currentpage
      };
      apigetOwnHeadList(data).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
