<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="公司">
        <el-input
          placeholder="请输入"
          v-model="company_name"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="月份">
        <el-input
          placeholder="请输入"
          v-model="query_month"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="primary" @click="additem">新增</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      style="width:45%;"
      :DataList="evaluateList"
      :header="header"
      :headle="headle"
      @checkleave="checkitem"
      @delete="deleteitem"
      @edit="edititem"
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
      @setSavelist="Savelist"
      :itemList="itemList"
      :openType="openType"
      :setDate="creatDate"
    ></portrait-table>
  </div>
</template>

<script>
import portraitTable from "@/components/Ca-table/portrait-table.vue";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import {
  apiachReviewLists,
  apiachReviewView,
  apisave_achReview
} from "@/request/api.js";
import {
  getDate_cn,
  getYearMonth_cn
} from "@/components/global-fn/global-fn.js";
export default {
  name: "meritsEvaluate",
  data() {
    return {
      company_name: "",
      query_month: "",
      currentpage: 1,
      currentlimit: 15,
      evaluateList: [],
      itemList: [],
      total: 15,
      header: [
        ["ID", "achReview_id", 70],
        ["考核公司", "achReview_company", 100],
        ["考核时间", "achReview_month"],
        ["创建时间", "achReview_creatDate.time"]
      ],
      headle: ["查看", "删除", "编辑"],
      isopen: false,
      creatDate: "",
      openType: ""
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
    query() {
      this.currentlimit = 15;
      this.currentpage = 1;
      this.getevaluateList();
    },
    //子组件回调的保存方法
    Savelist([row, id]) {
      let data = {
        userId: id,
        achReview_id: "",
        achReview_company: row[0].value,
        achReview_supCenter: row[1].value,
        achReview_dirOpinion: row[2].value,
        achReview_comOpinion: row[3].value,
        achReview_month: getYearMonth_cn(new Date()),
        username: sessionStorage.getItem("userid")
      };
      console.log(data);
      apisave_achReview(data).then(res => {
        console.log(res);
      });
    },
    additem() {
      this.isopen = true;
      this.openType = "edit";
      this.itemList = [
        {
          name: "被考核公司",
          value: ""
        },
        {
          name: "监察中心\n考核意见",
          value: ""
        },
        {
          name: "被考核公司\n自评意见",
          value: ""
        },
        {
          name: "董事会意见",
          value: ""
        },
        {
          name: "备注",
          value:
            "1、以上考核以公司为单位\n\
2、考核涉及到各公司、各部门的工作执行力、效率、态度、专业技能及管理等综合能力\n\
3、监察中心每月10日前完成考核意见递交被考核公司自评，被考核公司每月15日前完成自评意见递交董事会考核，董事会每月20日前给出考核意见公示并存档，作为年底绩效依据\n\
4、公示时间：一个月\n\
5、为更好的形成企业的考核文化，请各管理层必须做到由上而下，以身作则"
        }
      ];
    },
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
      this.openType = "";
      apiachReviewView({ bizId: row.achReview_id }).then(res => {
        console.log(res);
        this.isopen = true;
        this.itemList = [
          {
            name: "被考核公司",
            value: res.data.achReview_company
          },
          {
            name: "监察中心\n考核意见",
            value: res.data.achReview_supCenter
          },
          {
            name: "被考核公司\n自评意见",
            value: res.data.achReview_comOpinion
          },
          {
            name: "董事会意见",
            value: res.data.achReview_dirOpinion
          },
          {
            name: "备注",
            value:
              "1、以上考核以公司为单位\n\
2、考核涉及到各公司、各部门的工作执行力、效率、态度、专业技能及管理等综合能力\n\
3、监察中心每月10日前完成考核意见递交被考核公司自评，被考核公司每月15日前完成自评意见递交董事会考核，董事会每月20日前给出考核意见公示并存档，作为年底绩效依据\n\
4、公示时间：一个月\n\
5、为更好的形成企业的考核文化，请各管理层必须做到由上而下，以身作则"
          }
        ];
        this.creatDate = getDate_cn(res.data.achReview_creatDate);
      });
    },
    //删除
    deleteitem(row) {},
    //编辑
    edititem(row) {
      this.openType = "edit";
      apiachReviewView({ bizId: row.achReview_id }).then(res => {
        console.log(res);
        this.isopen = true;
        this.itemList = [
          {
            name: "被考核公司",
            value: res.data.achReview_company
          },
          {
            name: "监察中心\n考核意见",
            value: res.data.achReview_supCenter
          },
          {
            name: "被考核公司\n自评意见",
            value: res.data.achReview_comOpinion
          },
          {
            name: "董事会意见",
            value: res.data.achReview_dirOpinion
          },
          {
            name: "备注",
            value:
              "1、以上考核以公司为单位\n\
2、考核涉及到各公司、各部门的工作执行力、效率、态度、专业技能及管理等综合能力\n\
3、监察中心每月10日前完成考核意见递交被考核公司自评，被考核公司每月15日前完成自评意见递交董事会考核，董事会每月20日前给出考核意见公示并存档，作为年底绩效依据\n\
4、公示时间：一个月\n\
5、为更好的形成企业的考核文化，请各管理层必须做到由上而下，以身作则"
          }
        ];
        this.creatDate = getDate_cn(res.data.achReview_creatDate);
      });
    },
    getevaluateList() {
      apiachReviewLists({
        limit: this.currentlimit,
        page: this.currentpage,
        achReview_company: this.company_name,
        achReview_month: this.query_month
      }).then(res => {
        this.evaluateList = res.data.map(item => {
          item.achReview_creatDate.time = getDate_cn(
            item.achReview_creatDate.time
          );
          return item;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
