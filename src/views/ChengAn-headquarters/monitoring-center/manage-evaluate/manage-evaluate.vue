<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="公司">
        <el-input placeholder="请输入" v-model="company_name"></el-input>
      </el-form-item>
      <el-form-item label="月份">
        <el-input placeholder="请输入" v-model="query_month"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="primary" @click="additem">新增</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :DataList="supOpinionLists"
      style="width:45%;"
      :header="header"
      :headle="headle"
      @checkleave="checkitem"
      @delete="deleteitem"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="total"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
    <portrait-table
      :isopen="isopen"
      @closewin="closewin"
      :itemList="itemList"
      :setDate="creatDate"
    ></portrait-table>
  </div>
</template>

<script>
import portraitTable from "@/components/Ca-table/portrait-table.vue";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table.vue";
import { getDate_cn } from "@/components/global-fn/global-fn.js";
import {
  apisupOpinionLists,
  apisupOpinionView,
  apidelectsupOpinion
} from "@/request/api.js";
export default {
  name: "manageEvaluate",
  data() {
    return {
      company_name: "",
      query_month: "",
      currentpage: 1,
      total: 15,
      currentlimit: 15,
      supOpinionLists: [],
      creatDate: "",
      header: [
        ["ID", "supOpinion_id", 80],
        ["考核公司", "supOpinion_company", 100],
        ["考核时间", "supOpinion_title"],
        ["创建时间", "supOpinion_creatDate.time"]
      ],
      headle: ["查看", "删除"],
      itemList: [],
      isopen: false
    };
  },
  components: {
    CaRuleTable,
    paging,
    portraitTable
  },
  mounted() {
    this.getevaluateList();
  },
  methods: {
    closewin() {
      this.isopen = false;
    },
    getpage(e) {
      this.currentpage = e;
      this.getevaluateList();
    },
    getlimit(e) {
      this.currentlimit = e;
      this.getevaluateList();
    },
    //查看
    checkitem(row) {
      this.isopen = true;
      apisupOpinionView({ bizId: row.supOpinion_id }).then(res => {
        console.log(res);
        this.creatDate = getDate_cn(res.data.supOpinion_creatDate);
        this.itemList = [
          {
            name: "公司/部门",
            value: res.data.supOpinion_company
          },
          {
            name: "监察\n存在问题",
            value: res.data.supOpinion_supProblem
          },
          {
            name: "监察\n提出建议",
            value: res.data.supOpinion_supPropose
          },
          {
            name: "监察\n表扬/处分",
            value: res.data.supOpinion_praiOrPun
          },
          {
            name: "公司/部门\n自评",
            value: res.data.supOpinion_selfEva
          },
          {
            name: "监察\n评定结果",
            value: res.data.supOpinion_result
          },
          {
            name: "备注",
            value:
              "1、本监察意见由管理公司监察中心经理负责，以公司为单位\n\
2、监察报告内容应包含部门/公司当月存在的问题、监察中心提出的建议，做的好的地方\
应予以表扬，监察中心最终因对当月表现给出处理结果\n\
3、监察中心每月5日前完成监察存在问题、监察提出意见及监察表扬/处罚交给诚安发展\
自评，诚安发展负责人每月8日前完成自评交给监察中心，监察中心10日前将完整的监察\
报告结果递交董事会审核"
          }
        ];
      });
    },
    //删除
    deleteitem(row) {},
    search() {
      this.getevaluateList();
    },
    additem() {},
    getevaluateList() {
      apisupOpinionLists({
        limit: this.currentlimit,
        page: this.currentpage,
        supOpinion_company: this.company_name,
        supOpinion_title: this.query_month
      })
        .then(res => {
          console.log(res);
          this.supOpinionLists = res.data.map(item => {
            item.supOpinion_creatDate.time = getDate_cn(
              item.supOpinion_creatDate.time
            );
            return item;
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
