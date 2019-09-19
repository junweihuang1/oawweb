<template>
  <div>
    <el-row>
      <el-col :span="8" style="border-right:1px solid #ccc;">
        <el-form inline size="mini">
          <el-form-item label="申请人">
            <el-input v-model="username" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button-group>
              <el-button type="primary" @click="getNoticeList">搜索</el-button>
              <el-button type="success" @click="openadd">新增</el-button>
            </el-button-group>
          </el-form-item>
        </el-form>
        <Ca-rule-table
          style="width:80%;"
          :DataList="noticeList"
          :header="header"
          :headle="headle"
          @delete="delitem"
        ></Ca-rule-table>
        <paging
          :currentpage="currentpage"
          :currentlimit="currentlimit"
          :total="15"
          @setpage="getpage"
          @setlimit="getlimit"
        ></paging>
      </el-col>
      <el-col :span="14">
        <div style="margin-left:7%;width:100%;">
          <el-divider content-position="left" style="font-size:24px;"
            >发起公告</el-divider
          >
          <vue-ueditor-wrap
            v-model="msg"
            :config="myConfig"
            style="width:90%;"
          ></vue-ueditor-wrap>
          <el-checkbox
            style="margin-top:10px;"
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <div style="margin: 10px 0;"></div>
          <el-checkbox-group
            v-model="checkedCompany"
            @change="handleCheckedCompanyChange"
          >
            <el-checkbox
              v-for="(item, index) in companylist"
              :label="item[0]"
              :key="index"
              >{{ item[1] }}</el-checkbox
            >
          </el-checkbox-group>
          <el-button
            type="primary"
            @click="submit"
            style="float:right;margin-top:10px;"
            >提交</el-button
          >
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="isopen" style="z-index: 3;" v-dialogDrag>
      <add-notice v-if="isopen"></add-notice>
    </el-dialog>
  </div>
</template>

<script>
import VueUeditorWrap from "vue-ueditor-wrap";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import addNotice from "./components/add-notice";
import {
  apinoticeLists,
  apideleteNotice,
  apicompanyList,
  apiadd_Notice
} from "@/request/api.js";
export default {
  name: "noticeRecord",
  data() {
    return {
      checkedCompany: [],
      checkAll: false,
      isIndeterminate: true,
      msg: `<p style="text-align: center; line-height: 2em;">诚安通知2019第001号</p><p style="text-align: center; line-height: 2em;">关于2019年端午节放假的通知</p><p style="line-height: 2em;">&nbsp;&nbsp; &nbsp;诚安各公司：</p><p style="line-height: 2em;">&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2018年端午节即将来临，根据国务院办公厅公布的《2018年节假日安排通知》的相关规定，结合公司的经营情况，经公司研究决定，具体放假时间通知如下：</p><p style="line-height: 2em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一、办公室人员：端午节放假3天，即2018年6月16日（星期六）至2018年6月18日（星期一）放假，6月19日（星期二）正常上班。</p><p style="line-height: 2em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;二、项目部及传诚客栈人员：端午节放假1天，即2018年6月18日（星期一）放假，具体根据各项目部，传诚客栈安排。</p><p style="line-height: 2em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;三、请各项目部及传诚客栈安排好值班人员，放假期间值班人员请保持手机畅通状态。放假期间遇有重大突发事件发生，要按规定及时报告并妥善处理，确保人员群众祥和平安度过节假日。
 &nbsp;&nbsp;</p><p style="line-height: 2em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;祝大家度过一个愉快的节日！&nbsp; &nbsp; &nbsp;&nbsp;</p><p style="line-height: 2em;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;特此通知！ &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</p><p style="line-height: 2em;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 管理公司&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;二O一八年六月十一日</p>`,
      myConfig: {
        serverUrl: "http://35.201.165.105:8000/controller.php"
      },
      currentlimit: 15,
      currentpage: 1,
      username: "",
      noticeList: [],
      isopen: false,
      header: [
        ["起草人姓名", "username"],
        ["创建时间", "start_time"],
        ["状态", "status"]
      ],
      headle: ["", "删除"],
      companylist: [
        [12, "诚安时代(1)"],
        [13, "传诚管理(2)"],
        [14, "诚安科技(3)"],
        [15, "传诚教育(5)"],
        [16, "诚安建设(6)"],
        [17, "分供方"],
        [18, "诚安投资"]
      ]
    };
  },
  components: {
    addNotice,
    CaRuleTable,
    paging,
    VueUeditorWrap
  },
  Create() {
    this.getCompanyList();
  },
  mounted() {
    this.getNoticeList();
  },
  methods: {
    //全选事件处理
    handleCheckAllChange(val) {
      this.checkedCompany = val ? this.companylist.map(item => item[0]) : [];
      this.isIndeterminate = false;
    },
    //多选事件处理
    handleCheckedCompanyChange(val) {
      //当传入的数量等于所有公司的数量，即为全选，选择按钮为true
      let checkedCount = val.length;
      this.checkAll = checkedCount === this.companylist.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.companylist.length;
    },
    getCompanyList() {
      apicompanyList({
        rows: 15,
        page: 1,
        companyname: ""
      }).then(res => {
        this.companyList = res.data;
        console.log(this.companyList);
      });
    },
    //提交公告
    submit() {
      this.$confirm(`确定要发起公告吗？`)
        .then(() => {
          let data = {
            delIds: JSON.stringify(this.checkedCompany),
            notice_content: this.msg,
            userid: "1054"
          };
          console.log(data);
          apiadd_Notice(data).then(() => {
            this.$message.success("提交成功!");
            this.getNoticeList();
          });
        })
        .catch();
    },
    //删除
    delitem(row) {
      this.$confirm(
        `确定要删除<span style="color:red;">“${
          row.username
        }”</span>起草的这条公告吗？`,
        {
          dangerouslyUseHTMLString: true
        }
      )
        .then(() => {
          apideleteNotice({ bizId: row.notice_id }).then(res => {
            this.$message.success(res.msg);
            this.getNoticeList();
          });
        })
        .catch();
    },
    getpage(val) {
      this.currentpage = val;
      this.getNoticeList();
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getNoticeList();
    },
    openadd() {
      this.isopen = true;
    },
    getNoticeList() {
      let data = {
        page: this.currentpage,
        limit: this.currentlimit,
        username: this.username
      };
      apinoticeLists(data).then(res => {
        this.noticeList = res.data.map(item => {
          item.status =
            item.status == 1
              ? "审核中"
              : item.status == 3
              ? "已发文"
              : "审核不通过";
          return item;
        });
      });
    }
  }
};
</script>

<style lang="scss"></style>
