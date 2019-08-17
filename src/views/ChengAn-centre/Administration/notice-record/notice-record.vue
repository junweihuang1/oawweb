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
          @checkleave="checkitem"
        ></Ca-rule-table>
        <paging
          :currentpage="currentpage"
          :currentlimit="currentlimit"
          :total="15"
          @setpage="getpage"
          @setlimit="getlimit"
        ></paging>
      </el-col>
      <el-col :span="16">
        <div class="right">
          <el-divider content-position="left">公告内容</el-divider>
          <div v-html="content"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import { apinoticeListViews, apinoticeviewss } from "@/request/api.js";
export default {
  name: "noticeRecord",
  data() {
    return {
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
      headle: ["查看"],
      content: ""
    };
  },
  components: {
    CaRuleTable,
    paging
  },
  mounted() {
    this.getNoticeList();
  },
  methods: {
    checkitem(row) {
      console.log(row);
      apinoticeviewss({
        bizId: row.notice_id
      }).then(res => {
        console.log(res);
        this.content = res.data.notice_content;
      });
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
      apinoticeListViews(data).then(res => {
        console.log(res);
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

<style lang="scss" scoped>
.right {
  margin-left: 7%;
  width: 90%;
  height: 800px;
  overflow: hidden;
  overflow-y: scroll;
}
.right::-webkit-scrollbar {
  display: none;
}
</style>
