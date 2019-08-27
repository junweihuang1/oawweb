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
          <el-button type="primary" icon="el-icon-search" @click="getGoodsList"
            >搜索</el-button
          >
          <el-button type="success" @click="addGoods">新增</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="goodsList"
      :header="header"
      :headle="headle"
      :columnIndex="8"
      field="own_purchase_status"
      :progressstatus="0"
      @delete="delitem"
      @checkleave="checkitem"
    ></Ca-rule-table>
    <paging
      :currentpage="currentpage"
      :currentlimit="currentlimit"
      :total="10"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
    <el-dialog title="物品采购" :visible.sync="isopen">
      <add-goods
        v-if="isopen"
        :entryList="entryList"
        :ownHead="ownHead"
        :hisComment="hisComment"
        :openType="openType"
        @close="closewin"
      ></add-goods>
    </el-dialog>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import addGoods from "@/components/Ca-to-do/add-goods";
import { changetime } from "@/components/global-fn/global-fn";
import {
  apigetOwnHeadList,
  apiOwnHeadListById,
  apidelOwnEntry
} from "@/request/api.js";
export default {
  name: "GoodsPurchase",
  data() {
    return {
      companyName: "",
      projectName: "",
      username: "",
      currentlimit: 15,
      currentpage: 1,
      isopen: false,
      header: [
        ["单据编号", "own_purchase_id"],
        ["公司名称", "company_name"],
        ["项目名称", "construct_project_name"],
        ["建单时间", "own_purchase_time"],
        ["计划时间", "own_purchase_planDate"],
        ["希望送达时间", "own_purchase_arriveDate"],
        ["计划员", "own_purchase_planMan"],
        ["采购类型", "own_purchase_type"],
        ["状态", "own_purchase_status2"]
      ],
      headle: ["查看", "删除"],
      goodsList: [],
      entryList: [],
      ownHead: {},
      hisComment: [],
      openType: ""
    };
  },
  mounted() {
    this.getGoodsList();
  },
  components: {
    addGoods,
    CaRuleTable,
    paging
  },
  methods: {
    //关闭弹窗
    closewin() {
      this.isopen = false;
      this.getGoodsList();
    },
    delitem(row) {
      console.log(row);
      this.$confirm(`确认删除吗？`)
        .then(() => {
          apidelOwnEntry({
            own_purchase_entryId: row.own_purchase_id
          }).then(res => {
            console.log(res);
            this.getGoodsList();
          });
        })
        .catch();
    },
    //查看
    checkitem(row) {
      let data = {
        own_purchase_id: row.own_purchase_id
      };
      apiOwnHeadListById(data).then(res => {
        console.log(res);
        this.ownHead = res.data.ownHead;
        this.entryList = res.data.entryList;
        this.hisComment = res.hisComment.map(item => {
          item.START_TIME_ = changetime(item.START_TIME_);
          return item;
        });
        this.isopen = true;
        this.openType = "check";
      });
    },
    getpage(val) {
      this.currentpage = val;
      this.getGoodsList();
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getGoodsList();
    },
    addGoods() {
      this.openType = "add";
      this.isopen = true;
      this.ownHead = {
        own_purchase_companyId: "", //(必填)公司编号
        own_purchase_projectId: "16", //必填)项目编号
        own_purchase_planDate: "", //必填)计划日期
        own_purchase_arriveDate: "", //必填)希望送达日期
        own_purchase_planMan: localStorage.getItem("username"), //必填)复核员
        own_purchase_brand: "", //必填)品牌
        own_purchase_type: 1, //必填)采购类型
        userid: "1054" //必填)下一审核人id
      };
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
        this.goodsList = res.data.map(item => {
          item.own_purchase_type =
            item.own_purchase_type == 1 ? "普通采购" : "材料采购";
          item.own_purchase_status2 =
            item.own_purchase_status == 0 ? "审核中" : "";
          return item;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
