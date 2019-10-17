<template>
  <div>
    <el-divider content-position="left">项目信息</el-divider>
    <el-form inline size="mini" label-width="130px" label-position="left">
      <el-form-item label="项目名称">
        <el-input
          v-model="headform.construct_project_name"
          @focus="selectContract"
          placeholder="请选择"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="工程地址">
        <el-input
          v-model="headform.manage_contract_address"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="甲方">
        <el-input
          v-model="headform.manage_contract_firstParty"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="合同总价">
        <el-input v-model="headform.manage_contract_amount" readonly></el-input>
      </el-form-item>
      <el-form-item label="合同项目开始时间">
        <el-input
          v-model="headform.manage_contract_startTime"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="合同项目结束时间">
        <el-input
          v-model="headform.manage_contract_endTime"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="项目经理">
        <el-input
          readonly
          placeholder="请选择"
          v-model="headform.construct_project_leader"
          @focus="selectProjectManager"
        ></el-input>
      </el-form-item>
      <el-form-item label="项目经理联系方式">
        <el-input
          v-model="headform.construct_project_leaderTel"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="所属项目部">
        <el-input
          readonly
          v-model="headform.depName"
          placeholder="请选择"
          @focus="openselectProDep"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">班组信息</el-divider>
    <el-button-group v-if="openType != 'check'">
      <el-button type="primary" size="mini" @click="additem">添加行</el-button>
      <el-button type="warning" size="mini" @click="cancel">撤销</el-button>
    </el-button-group>
    <div style="width:80%;">
      <el-table :data="entryList" border :header-cell-style="getRowClass">
        <el-table-column
          :label="item[0]"
          v-for="(item, index) in header"
          :key="index"
          :width="item[2]"
          align="center"
          :prop="item[1]"
        >
          <template slot-scope="{ row }">
            <el-select v-model="row[item[1]]" v-if="item[0] == '施工项目'">
              <el-option
                v-for="(item, index) in projectList"
                :value="index + 1"
                :label="item"
                :key="index"
              ></el-option>
            </el-select>
            <input
              type="text"
              v-model="row[item[1]]"
              class="inputbox"
              @focus="selectTeams(row, item[0])"
              v-else-if="openType !== 'check'"
            />
            <span v-else>
              {{ row[item[1]] }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        v-if="openType == 'add'"
        type="primary"
        size="mini"
        style="float:right;margin:20px 100px 20px 0;"
        @click="save"
        >保存</el-button
      >
      <el-button
        v-else-if="openType == 'modify'"
        type="primary"
        size="mini"
        style="float:right;margin:20px 100px 20px 0;"
        @click="modify"
        >修改</el-button
      >
    </div>
    <el-dialog :visible.sync="isselect" :append-to-body="true" v-dialogDrag>
      <select-teams
        @setSelectName="getSelectName"
        v-if="isselect"
      ></select-teams>
    </el-dialog>
    <el-dialog
      :visible.sync="isselectProjectManager"
      :append-to-body="true"
      v-dialogDrag
    >
      <select-teams
        @setSelectName="getProjectManager"
        v-if="isselectProjectManager"
      ></select-teams>
    </el-dialog>
    <el-dialog
      :visible.sync="isselectdep"
      :append-to-body="true"
      v-dialogDrag
      title="选择项目部"
    >
      <select-project-dep
        @setSelectName="getProjectDepName"
        v-if="isselectdep"
      ></select-project-dep>
    </el-dialog>
    <el-dialog
      v-dialogDrag
      :visible.sync="isselectContract"
      :append-to-body="true"
      title="选择合同"
      top="8vh"
    >
      <contract-manage
        :setheight="0.5"
        v-if="isselectContract"
        @setSelectName="getContract"
      ></contract-manage>
    </el-dialog>
  </div>
</template>

<script>
import ContractManage from "@/views/ChengAn-headquarters/Financial-center/contract-manage/contract-manage";
import selectProjectDep from "@/components/Ca-select/select-project-dep";
import selectTeams from "@/components/Ca-select/select-teams";
import { apisaveProjectTeam, apimodProjectTeam } from "@/request/api.js";
export default {
  name: "projectInfor",
  data() {
    return {
      header: [
        ["施工项目", "construct_project_workTeam_category", 150],
        ["班组", "username"],
        ["合同金额", "construct_project_workTeam_amount"],
        ["单价", "construct_project_workTeam_price"]
      ],
      isselect: false,
      active: Object,
      isselectdep: false,
      isselectProjectManager: false,
      isselectContract: false,
      projectList: ["预埋", "消防水", "消防电", "防排烟", "消防水电"],
      entryListLen: this.entryList.length
    };
  },
  props: {
    headform: {
      type: Object
    },
    entryList: Array,
    openType: String,
    activeForm: Object
  },
  components: {
    selectTeams,
    selectProjectDep,
    ContractManage
  },
  mounted() {},
  methods: {
    //获取合同信息
    getContract(row) {
      this.headform.construct_project_contractId = row.manage_contract_id;
      this.headform.construct_project_name = row.manage_contract_name;
      this.headform.manage_contract_address = row.manage_contract_address;
      this.headform.manage_contract_amount = row.manage_contract_amount;
      this.headform.manage_contract_endTime = row.manage_contract_endTime;
      this.headform.manage_contract_startTime = row.manage_contract_startTime;
      this.headform.manage_contract_firstParty = row.manage_contract_firstParty;
      this.isselectContract = false;
    },
    //打开选择合同
    selectContract() {
      if (this.openType !== "check") {
        this.isselectContract = true;
      }
    },
    //获取项目经理信息
    getProjectManager(row) {
      this.headform.construct_project_leader = row.username;
      this.headform.construct_project_leaderTel = row.phone_number;
      this.isselectProjectManager = false;
    },
    //打开选择项目经理
    selectProjectManager() {
      if (this.openType !== "check") {
        this.isselectProjectManager = true;
      }
    },
    //打开选择项目部
    openselectProDep() {
      if (this.openType !== "check") {
        this.isselectdep = true;
      }
    },
    //获取项目部
    getProjectDepName(row) {
      console.log(row);
      this.headform.depName = row.constuct_project_dep_name;
      this.headform.construct_project_dep = row.constuct_project_dep_id;
      this.isselectdep = false;
    },
    //获取项目部信息
    getSelectName(row) {
      this.active.username = row.username;
      this.active.construct_project_workTeam_projectId = this.activeForm.constuct_project_dep_id;
      this.active.construct_project_workTeam_departmentId = row.department_id;
      this.active.construct_project_workTeam_userId = row.userid;
      this.isselect = false;
    },
    selectTeams(row, val) {
      this.active = row;
      if (val == "班组") {
        this.isselect = true;
      }
    },
    //撤销
    cancel() {
      if (this.entryList.length > this.entryListLen) {
        this.entryList.pop();
      } else {
        this.$message.warning("原有项目不能删除");
      }
    },
    //保存
    save() {
      let data = {
        construct_project_name: this.headform.construct_project_name, //(必填)项目名
        construct_project_contractId: this.headform
          .construct_project_contractId, //(必填)合同id
        construct_project_addr: this.headform.manage_contract_address, //(必填)项目地址
        manage_contract_firstParty: this.headform.manage_contract_firstParty, //(必填)甲方
        total: this.headform.manage_contract_amount, //(必填)合同总价
        construct_project_startDate: this.headform.manage_contract_startTime, //(必填)合同开始时间
        construct_project_endDate: this.headform.manage_contract_endTime, //(必填)合同结束时间
        construct_project_leader: this.headform.construct_project_leader, //(必填)项目经理
        construct_project_leaderTel: this.headform.construct_project_leaderTel, //(必填)项目经理电话
        depName: this.headform.depName, //(必填)项目名名称
        construct_project_dep: this.headform.construct_project_dep, //(必填)项目部id
        entry: JSON.stringify(this.entryList)
      };
      this.$confirm(`确定保存吗？`)
        .then(() => {
          apisaveProjectTeam(data).then(res => {
            this.$message.success(res.msg);
            this.$emit("close");
          });
        })
        .catch(() => {});
    },
    modify() {
      let data = {
        construct_project_id: this.headform.construct_project_id,
        construct_project_name: this.headform.construct_project_name, //(必填)项目名
        construct_project_contractId: this.headform
          .construct_project_contractId, //(必填)合同id
        construct_project_addr: this.headform.manage_contract_address, //(必填)项目地址
        manage_contract_firstParty: this.headform.manage_contract_firstParty, //(必填)甲方
        total: this.headform.manage_contract_amount, //(必填)合同总价
        construct_project_startDate: this.headform.manage_contract_startTime, //(必填)合同开始时间
        construct_project_endDate: this.headform.manage_contract_endTime, //(必填)合同结束时间
        construct_project_leader: this.headform.construct_project_leader, //(必填)项目经理
        construct_project_leaderTel: this.headform.construct_project_leaderTel, //(必填)项目经理电话
        depName: this.activeForm.constuct_project_dep_name, //(必填)项目名名称
        construct_project_dep: this.activeForm.constuct_project_dep_id, //(必填)项目部id
        entry: JSON.stringify(this.entryList)
      };
      console.log(data);
      this.$confirm(`确定修改吗？`)
        .then(() => {
          apimodProjectTeam(data).then(res => {
            this.$message.success(res.msg);
            this.$emit("close");
          });
        })
        .catch(() => {});
    },
    //添加行
    additem() {
      this.entryList.push({
        construct_project_workTeam_id: "",
        construct_project_workTeam_category: "",
        construct_project_workTeam_amount: "",
        construct_project_workTeam_price: "",
        construct_project_workTeam_projectId: "",
        construct_project_workTeam_departmentId: "",
        construct_project_workTeam_userId: "",
        username: ""
      });
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return `background: ${
          this.$store.state.tableColor
        };color:#fff;height:40px;padding:0px;`;
      } else {
        return "height:40px;padding:0px;";
      }
    }
  }
};
</script>

<style lang="scss">
.el-divider {
  text-shadow: 2px 2px 2px #aaa;
}
.el-table--border td:first-child .cell {
  padding-left: 0;
}
.el-table td .cell {
  padding: 0;
  line-height: 30px;
}
.el-table--small td {
  padding: 0;
}

.el-step__title {
  font-size: 12px;
}
</style>
