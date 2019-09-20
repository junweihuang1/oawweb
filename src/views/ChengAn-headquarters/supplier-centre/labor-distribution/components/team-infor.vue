<template>
  <div>
    <el-form inline size="mini">
      <el-form-item label="工人名字">
        <el-input v-model="workerName" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button type="primary" @click="query">查询</el-button>
          <el-button type="success" @click="openadd">添加</el-button>
          <el-button type="primary" @click="allremove">批量调动</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :setselect="true"
      @setselect="getselect"
      :setheight="0.5"
      :DataList="teamList"
      @checkleave="remove"
      @edit="checkmove"
      :header="header"
      :headle="headle"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="total"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
    <el-dialog
      v-dialogDrag
      top="30vh"
      title="调动申请"
      :visible.sync="isopen"
      width="20%"
      :append-to-body="true"
    >
      <el-form size="mini" label-width="70px">
        <el-form-item label="调动项目">
          <el-input
            v-model="removeForm.projectName"
            @focus="openselect"
            placeholder="请选择"
          ></el-input>
        </el-form-item>
        <el-form-item label="原因">
          <el-input
            v-model="removeForm.suppliermod_worker_apply_reason"
          ></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="isopenselect" :append-to-body="true" v-dialogDrag>
      <select-project @setSelectName="getSelectName"></select-project>
    </el-dialog>
    <el-dialog :visible.sync="isopenRecord" :append-to-body="true" v-dialogDrag>
      <remove-record :userId="userId"></remove-record>
    </el-dialog>
  </div>
</template>

<script>
import removeRecord from "./remove-record";
import selectProject from "@/components/Ca-select/select-project";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import {
  apiworkerList,
  apigetProcessList,
  apiworkerApply
} from "@/request/api";
export default {
  name: "teamInfor",
  data() {
    return {
      currentlimit: 15,
      currentpage: 1,
      total: 0,
      workerName: "",
      teamList: [],
      header: [
        ["用户id", "userid"],
        ["姓名", "username"],
        ["电话", "phone_number"],
        ["性别", "sex2"],
        ["状态", "status2"]
      ],
      headle: ["调动申请", "", "调动记录"],
      summary: [],
      idarr: [],
      namearr: [],
      isopen: false,
      isopenRecord: false,
      isopenselect: false,
      removeForm: {},
      currentList: [],
      userId: 0
    };
  },
  components: {
    CaRuleTable,
    selectProject,
    paging,
    removeRecord
  },
  props: {
    Inforlist: Object
  },
  mounted() {
    this.getTeamList();
  },
  methods: {
    //查看调动记录
    checkmove(row) {
      this.isopenRecord = true;
      this.userId = row.userid;
      console.log(row);
    },
    getprossList() {
      let data = {
        taskid: "", //(必填)流程任务id
        processInstanceId: "", //(必填)流程实例id
        key: "workerApplyViwe", //(必填)流程定义key
        position: sessionStorage.getItem("role_name"), //(必填)申请人角色
        type: "new" //(必填)新增new/运行中
      };
      console.log(data);
      apigetProcessList(data).then(res => {
        console.log(res);
      });
    },
    //启动调动
    submit() {
      if (!this.removeForm.suppliermod_worker_apply_reason) {
        this.$message.error("调动原因不能为空");
        return;
      }
      console.log(this.removeForm);
      this.$confirm(`确定调动吗？`)
        .then(() => {
          apiworkerApply(this.removeForm)
            .then(res => {
              console.log(res);
              this.$message.success(res.msg);
              this.isopen = false;
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    //子組件回調双击选中的信息
    getSelectName(row) {
      console.log(row);
      this.removeForm.leaderName = row.construct_project_leader;
      this.removeForm.projectName = row.construct_project_name;
      this.removeForm.suppliermod_worker_apply_proId = row.construct_project_id;
      this.removeForm.suppliermod_worker_apply_teamId =
        row.construct_project_workTeam_id;
      this.removeForm.suppliermod_worker_apply_oldProId = this.Inforlist.construct_project_id;
      this.removeForm.suppliermod_worker_apply_id = 0;
      this.removeForm.suppliermod_worker_apply_userId = row.userid;
      this.isopenselect = false;
    },
    //打开选择项目
    openselect() {
      this.isopenselect = true;
    },
    //单个调动
    remove(row) {
      console.log(row);
      this.isopen = true;
      this.currentList = row;
      //this.getprossList();
    },
    //批量调动
    allremove() {
      if (this.idarr == "") {
        this.$message.warning("请选择需要调动的人员");
        return;
      }
      this.$emit("openmove", [this.idarr, this.namearr]);
    },
    getselect(row) {
      this.namearr = row.map(item => item.username);
      this.idarr = row.map(item => item.userid);
    },
    getWorker(row) {
      console.log(row);
    },
    openadd() {
      this.$emit("openadd");
    },
    query() {
      this.teamList = this.summary.filter(item => {
        return item.username.indexOf(this.workerName) !== -1;
      });
    },
    getpage(val) {
      this.currentpage = val;
      this.getTeamList();
    },
    getlimit(val) {
      this.currentlimit = val;
      this.getTeamList();
    },
    getTeamList() {
      apiworkerList({
        rows: this.currentlimit,
        page: this.currentpage,
        construct_project_id: this.Inforlist.construct_project_id,
        construct_project_workTeam_id: this.Inforlist
          .construct_project_workTeam_id
      }).then(res => {
        console.log(res);
        this.total = res.total;
        this.teamList = res.rows.map(item => {
          item.sex2 = item.sex == 1 ? "男" : "女";
          item.status2 = item.isOnApply == 1 ? "调动中" : "可调动";
          return item;
        });
        this.summary = [].concat(this.teamList);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
