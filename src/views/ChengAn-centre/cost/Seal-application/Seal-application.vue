<template>
  <div>
    <el-form inline size="mini">
      <el-form-item>
        <select-company @setCompanyName="getCompanyName"></select-company>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="fileName"
          clearable
          placeholder="文件名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="query">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="openApply" size="mini"
          >申请盖章</el-button
        >
      </el-form-item>
    </el-form>

    <rule-table
      :setheight="0.77"
      :header="headerList"
      :DataList="DataList"
      @checkleave="opanLeaveList"
      @delete="deleteApply"
      @edit="downfile"
      @modify="print"
      :headle="headle"
    ></rule-table>
    <paging
      @setlimit="getlimit"
      @setpage="getpage"
      :total="total"
      :currentpage="currentpage"
      :currentlimit="currentlimit"
    ></paging>
    <el-dialog
      title="盖章申请"
      :visible.sync="isApplyOpen"
      width="35%"
      top="10vh"
      v-dialogDrag
    >
      <Seal-Apply
        :form="addform"
        v-if="isApplyOpen"
        :openType="openType"
        :Approvaltable="Approvaltable"
        @close="closeApplyWidow"
      ></Seal-Apply>
    </el-dialog>
    <el-dialog
      width="100%"
      :visible.sync="isprint"
      title="盖章申请"
      :fullscreen="true"
      :show-close="false"
      top="8vh"
      v-dialogDrag
    >
      <details-print
        v-if="isprint"
        :setform="setform"
        :Approvaltable="Approvaltable"
      ></details-print>
    </el-dialog>
  </div>
</template>

<script>
import selectCompany from "@/components/Ca-select/select-company";
import detailsPrint from "./components/details-print";
import paging from "@/components/paging/paging";
import SealApply from "@/components/Ca-to-do/Seal-Apply";
import ruleTable from "@/components/Ca-table/Ca-rule-table.vue";
import { getDate_cn, changetime } from "@/components/global-fn/global-fn";
import { apigetSealList, apiSealById, apidelSeal } from "@/request/api.js";
export default {
  name: "Sealappliction",
  data() {
    return {
      companyList: JSON.parse(sessionStorage.getItem("companyList")),
      dialogtitle: "盖章详情",
      fileName: "",
      companyName: "",
      DataList: [],
      headerList: [
        ["ID", "own_seal_id", 80],
        ["文件名称", "own_seal_fileName", 100],
        ["用章公司", "own_seal_company", 140],
        ["用章类别", "own_seal_chapCategory2", 100],
        ["主送单位", "own_seal_sender", 280],
        ["创建时间", "own_seal_creatTime", 120],
        ["状态", "own_seal_status", 80],
        ["备注", "own_seal_remark"]
      ],
      headle: ["查看", "删除", "下载", "打印"],
      isopen: false,
      selectList: {},
      ProcessHeader: [
        ["文件名称", "own_seal_fileName"],
        ["预结算金额", "own_seal_settle"],
        ["用章公司", "own_seal_company"],
        ["主送单位", "own_seal_sender"],
        ["用章类别", "own_seal_chapCategory"],
        ["盖章用途", "own_seal_remark"]
      ],
      ApprovalHeaderList: [
        ["序号", "index", 60],
        ["流程节点", "name_", 100],
        ["审核人", "username", 80],
        ["审核时间", "END_TIME_", 160],
        ["审核意见", "MESSAGE_"]
      ],
      Approvaltable: [],
      setform: {},
      isApplyOpen: false,
      currentlimit: 15,
      currentpage: 1,
      total: 0,
      addform: {},
      openType: "",
      isprint: false,
      Seals: [
        ["1", "公章"],
        ["2", "业务章"],
        ["3", "出图章"],
        ["4", "竣工章"],
        ["5", "项目章"]
      ]
    };
  },
  components: {
    ruleTable,
    SealApply,
    paging,
    detailsPrint,
    selectCompany
  },
  mounted() {
    this.getsealList();
  },
  methods: {
    getCompanyName(val) {
      this.companyName = val.company_id;
    },
    query() {
      this.currentlimit = 15;
      this.currentpage = 1;
      this.getsealList();
    },
    print(row) {
      apiSealById({
        own_seal_id: row.own_seal_id
      }).then(res => {
        this.isprint = true;
        this.Approvaltable = res.hisComment.map(item => {
          item.START_TIME_ = changetime(item.START_TIME_);
          return item;
        });
        this.setform = res.data;
        this.setform.own_seal_chapCategory = this.setform.own_seal_chapCategory
          .split(",")
          .map(item => {
            return this.Seals[item - 1][1];
          });
        this.companyList.forEach(item => {
          if (item.company_id === this.setform.own_seal_company) {
            this.setform.own_seal_companyName = item.company_name;
          }
        });
        this.setform.Category = this.setform.own_seal_chapCategory.join("、");
        setTimeout(() => {
          this.isprint = false;
        }, 100);
      });
    },
    downfile(row) {
      if (row.own_seal_filePath && row.own_seal_filePath !== "") {
        window.open(
          "http://file.casdapi.com/sealFile/" + row.own_seal_filePath
        );
      } else {
        this.$message.warning("没有附件");
      }
    },
    getsealList() {
      apigetSealList({
        own_seal_fileName: this.fileName,
        own_seal_company: this.companyName,
        pageSize: this.currentlimit,
        limit: this.currentpage
      }).then(res => {
        this.total = res.totalCount;
        this.DataList = res.data.map(item => {
          //遍历公司用对应的文字替换
          this.companyList.forEach(item2 => {
            if (item2.company_id === item.own_seal_company) {
              item.own_seal_company = item2.company_name;
            }
          });
          //盖章类型由字符串转数组，遍历用对应的文字替换
          item.own_seal_chapCategory2 = item.own_seal_chapCategory
            .split(",")
            .map(item => {
              switch (item) {
                case "1":
                  item = "公章";
                  break;
                case "2":
                  item = "业务章";
                  break;
                case "3":
                  item = "出图章";
                  break;
                case "4":
                  item = "竣工章";
                  break;
                case "5":
                  item = "项目章";
                  break;
              }
              return item;
            });
          item.own_seal_chapCategory2 = item.own_seal_chapCategory2.join(",");
          item.own_seal_status = item.own_seal_status == 2 ? "通过" : "待审批";
          return item;
        });
      });
    },
    getpage(e) {
      this.currentpage = e;
      this.getsealList();
    },
    getlimit(e) {
      this.currentlimit = e;
      this.getsealList();
    },
    closeApplyWidow() {
      this.isApplyOpen = false;
      this.getsealList();
    },
    deleteApply(e) {
      this.$confirm("确认删除？")
        .then(() => {
          apidelSeal({
            own_seal_id: e.own_seal_id
          }).then(res => {
            this.$message.success(res.msg);
            this.getsealList();
          });
        })
        .catch(() => {});
    },
    openApply() {
      this.openType = "add";
      this.addform = {
        own_seal_fileName: "", //文件名称
        own_seal_settle: 0, //预结算金额
        own_seal_company: 12, //用章公司
        own_seal_sender: "", //主送单位
        own_seal_chapCategory: ["1"], //用章类别
        own_seal_remark: "", //盖章用途
        userid: "",
        own_seal_filePath: ""
      };
      this.isApplyOpen = true;
      this.Approvaltable = [];
    },
    opanLeaveList(e) {
      this.openType = "check";
      this.selectList = e;
      apiSealById({ own_seal_id: e.own_seal_id }).then(res => {
        console.log(res);
        this.addform = res.data;
        this.addform.own_seal_chapCategory = this.addform.own_seal_chapCategory.split(
          ","
        );
        this.Approvaltable = res.hisComment
          ? res.hisComment.map(item => {
              item.END_TIME_ = item.END_TIME_ ? getDate_cn(item.END_TIME_) : "";
              return item;
            })
          : [];
        this.isApplyOpen = true;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
