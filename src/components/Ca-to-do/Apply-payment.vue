<template>
  <div>
    <el-divider content-position="left">项目信息</el-divider>
    <el-row>
      <el-form inline size="mini" label-width="130px" label-position="left">
        <el-form-item label="项目名称">
          <el-input
            v-if="headform.construct_project_name"
            v-model="headform.construct_project_name"
            readonly
            clearable
          ></el-input>
          <el-input
            v-else
            v-model="headform.manage_contract_name"
            readonly
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="工程地址">
          <el-input
            v-if="headform.construct_project_addr"
            v-model="headform.construct_project_addr"
            readonly
            clearable
          ></el-input>
          <el-input
            v-else
            v-model="headform.manage_contract_address"
            readonly
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="项目经理">
          <el-input
            v-model="headform.construct_project_leader"
            readonly
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="项目经理联系方式">
          <el-input
            v-model="headform.construct_project_leaderTel"
            readonly
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-divider content-position="left">材料信息</el-divider>
    <el-row>
      <el-form inline size="mini" label-width="130px" label-position="left">
        <el-form-item label="计划日期">
          <el-input
            readonly
            clearable
            v-model="activeForm.construct_purchase_planDate"
          ></el-input>
        </el-form-item>
        <el-form-item label="希望送达时间">
          <el-input
            readonly
            clearable
            v-model="activeForm.construct_purchase_arriveDate"
          ></el-input>
        </el-form-item>
        <el-form-item label="材料计划员">
          <el-input
            v-model="activeForm.construct_purchase_planMan"
            readonly
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="复核员">
          <el-input
            readonly
            v-model="activeForm.construct_purchase_reviewer"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商">
          <el-input
            v-model="activeForm.construct_purchase_supplier"
            readonly
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商联系方式">
          <el-input
            readonly
            clearable
            v-model="activeForm.construct_purchase_supplierTel"
          ></el-input>
        </el-form-item>
        <el-form-item label="材料类别" v-if="openType !== 'check'">
          <el-input
            readonly
            clearable
            v-model="activeForm.construct_purchase_materialSerName"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-divider content-position="left">班组信息</el-divider>
    <el-form inline>
      <el-form-item
        v-if="
          currentTaskName == '成本中心经理' ||
            currentTaskName == '成本材料中心总监' ||
            currentTaskName == '采购核对单价'
        "
      >
        <el-button type="success" @click="chooseSup">选择供应商</el-button>
      </el-form-item>
      <el-form-item
        v-else-if="
          currentTaskName == '项目部签收' ||
            currentTaskName == '项目经理签收' ||
            currentTaskName == '核对签收'
        "
      >
        <el-upload
          ref="upload"
          :action="file_url"
          :headers="{ token: token }"
          :data="{ construct_purchase_id: activeForm.construct_purchase_id }"
          :limit="1"
          :on-success="headleSuccess"
          :before-upload="beforeUp"
        >
          <el-button size="mini" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item v-if="activeForm.photo != null">
        <el-button type="success" size="mini" @click="openpic"
          >打开图片</el-button
        ></el-form-item
      >
    </el-form>

    <el-table
      :data="entryList"
      border
      :header-cell-style="getRowClass"
      show-summary
    >
      <el-table-column
        :label="item[0]"
        v-for="(item, index) in header"
        :key="index"
        :width="item[2]"
        align="center"
        :prop="item[1]"
      >
        <template slot-scope="{ row }">
          <input
            type="text"
            v-model="row[item[1]]"
            class="inputbox"
            v-if="openType !== 'check' && item[0] == '材料名称'"
            placeholder="请选择"
          />
          <input
            type="text"
            v-model="row[item[1]]"
            class="inputbox"
            @input="changeValue(row, item[1])"
            placeholder="请输入"
            v-else-if="openType !== 'check' && item[3] == 'edit'"
          />
          <span v-else>
            {{ row[item[1]] }}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="openType == 'headle'">
      <el-divider content-position="left">流程审批</el-divider>
      <el-form label-width="70px">
        <el-row style="width:70%">
          <el-col :span="24">
            <el-form-item label="意见">
              <el-input v-model="reasons" type="textarea" :row="3"></el-input>
            </el-form-item>
          </el-col>
          <template v-if="userTaskName != '结束' && openType == 'headle'">
            <el-col :span="12">
              <el-form-item label="下一节点">
                <el-input readonly v-model="userTaskName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="审核人">
                <el-select
                  v-model="userid"
                  style="width:100%;"
                  placeholder="没绑定审核人"
                >
                  <el-option
                    v-for="(item, index) in userList"
                    :key="index"
                    :value="item.userid"
                    :label="item.username"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </template>
          <el-col :span="12">
            <el-form-item>
              <template v-for="(item, index) in buttonList">
                <el-button
                  v-if="item == 'submit'"
                  :key="index"
                  type="success"
                  size="small"
                  @click="headleprocess(true)"
                  >提交</el-button
                >
                <el-button
                  v-if="item == 'Resubmit'"
                  :key="index"
                  type="success"
                  size="mini"
                  @click="headleprocess(true)"
                  >重新提交</el-button
                >
                <el-dropdown
                  split-button
                  type="warning"
                  size="small"
                  style="margin-left:10px;"
                  :key="index"
                  v-else-if="item == 'reject'"
                  @click="headleprocess(false)"
                  @command="getReturnName"
                >
                  驳回到{{ returnName }}
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="(item, index) in taskList"
                      :key="index"
                      :command="index"
                      >{{ item.name }}</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button
                  v-else-if="item == 'disagree'"
                  :key="index"
                  type="danger"
                  size="small"
                  @click="headleprocess('finish')"
                  >不同意</el-button
                >
              </template>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <template v-if="openType == 'headle'">
      <el-divider content-position="left">流程线</el-divider>
      <el-steps
        :active="current"
        :align-center="true"
        :space="200"
        finish-status="success"
      >
        <el-step
          v-for="(item, index) in activityList"
          :title="item.name"
          :key="index"
        ></el-step>
      </el-steps>
    </template>
    <template v-if="openType != 'add'">
      <el-divider content-position="left">审批记录</el-divider>
      <Ca-view-process :Approvaltable="ProcessList"></Ca-view-process>
    </template>
  </div>
</template>

<script>
import http from "@/request/http";
import CaViewProcess from "@/components/Ca-view-process/Ca-view-process";
import { apipassPayApply, apigetProcessList } from "@/request/api.js";
export default {
  name: "projectInfor",
  data() {
    return {
      fileName: "",
      token: localStorage.getItem("token"),
      file_url: http.base_url + "uploadPurchasePhoto",
      Process_header: [
        ["步骤名称", "name_", 100],
        ["相关人员", "username", 100],
        ["发生时间", "END_TIME_", 120],
        ["中心", "center_name", 100],
        ["部门", "department_name", 100],
        ["审核意见", "MESSAGE_"]
      ],
      header: [
        ["材料名称", "construct_purchase_material", 100],
        ["型号规格", "construct_purchase_model", 100],
        ["单位", "construct_purchase_unit", 80],
        ["合同工程量", "construct_purchase_quantities", 120],
        ["累计审批量", "construct_purchase_approvalNum", 120],
        ["计划采购量", "construct_purchase_applyNum", 120, "edit"],
        ["合同单价", "construct_purchase_contractPrice", 100],
        ["采购单价", "construct_purchase_purchasePrice", 100],
        ["采购小计", "construct_purchase_purchaseTotal", 100],
        ["材料品牌", "construct_purchase_brand", 100, "edit"],
        ["备注", "construct_purchase_remarks", "", "edit"]
      ],
      currentSelect: {},
      isreviewer: false,
      isselect: false,
      reasons: "",
      userTaskName: "",
      currentTaskName: "",
      userid: 0,
      userList: [],
      current: 1,
      buttonList: [],
      activityList: [],
      usertask: 1,
      Ids: [],
      taskList: [],
      picitem: 2, //可以打开图片的节点
      returnName: "项目助理" //驳回节点名字
    };
  },
  props: {
    ProcessList: Array,
    headform: Object,
    openType: String,
    entryList: Array,
    activeForm: {
      type: Object
    },
    active: Object
  },
  components: {
    CaViewProcess
  },
  mounted() {
    this.getprossList();
  },
  methods: {
    //打开图片
    openpic() {
      console.log(this.activeForm.photo);
      let url = this.activeForm.photo
        ? this.activeForm.photo
        : `/PurchasePhoto/${this.fileName}`;
      if (this.fileName != "" || this.activeForm.photo) {
        window.open("http://file.casdapi.com" + url);
      } else {
        this.$message.warning("没上传文件");
      }
    },
    headleSuccess(res) {
      console.log(res);
      this.$refs.upload.clearFiles();
      this.$message.success(res.msg);
    },
    //上传
    beforeUp(file) {
      this.fileName = file.name;
    },
    close(supplist) {
      console.log(supplist);
      this.activeForm.construct_purchase_supplier = supplist[0];
      this.activeForm.construct_purchase_supplierTel = supplist[1];
      this.isselect = false;
    },
    //选择供应商
    chooseSup() {
      this.Ids = this.entryList.map(item => item.construct_purchase_entryId);
      this.isselect = true;
    },
    getReturnName(command) {
      this.taskList.forEach((item, index) => {
        if (command == index) {
          this.usertask = index + 1;
          this.returnName = item.name;
        }
      });
    },
    changeValue(row, filter) {
      if (
        filter == "construct_purchase_applyNum" &&
        row.construct_purchase_quantities - row.construct_purchase_approvalNum <
          parseInt(row.construct_purchase_applyNum)
      ) {
        this.$message.error("计划采购量已超量");
        return;
      }
    },
    //办理
    headleprocess(type) {
      console.log(this.activeForm);
      if (this.reasons == "") {
        this.$message.error("请填写审核意见");
        return;
      }
      if (this.userid === "") {
        this.$message.error("审核人为空不能提交！");
        return;
      }
      this.$confirm(
        `确定${type === true ? "办理" : type === false ? "驳回" : "不同意"}吗？`
      )
        .then(() => {
          let data = {
            taskId: this.active.ID_, //(必填)：任务id；
            comment: this.reasons, //(必填)：办理意见；
            sign: type //(必填)：是否通过，true骑过，false不通过；
          };
          console.log(data);
          apipassPayApply(data).then(res => {
            console.log(res);
            this.$message.success(res.msg);
            this.$emit("close");
          });
        })
        .catch(() => {});
    },
    getprossList() {
      let data = {};
      //当active（待办）不为空时
      if (this.active) {
        data = {
          taskid: this.active.ID_,
          processInstanceId: this.active.PROC_INST_ID_
            ? this.active.PROC_INST_ID_
            : this.active.taskid,
          key: "purcase_payapply_process",
          type: ""
        };
        apigetProcessList(data).then(res => {
          console.log(res);
          this.userTaskName = res.userlist.userTaskName;
          this.buttonList = res.startForm.split(",");
          this.userid =
            this.userTaskName == "结束"
              ? 0
              : res.userlist.userList && res.userlist.userList != ""
              ? res.userlist.userList[0].userid
              : "";
          this.userList =
            res.userlist.userList && res.userlist.userList != ""
              ? res.userlist.userList
              : [];
          //获取驳回节点的数组
          //当前步骤名称
          if (this.ProcessList != "") {
            let currentTask = this.ProcessList[this.ProcessList.length - 1];
            this.currentTaskName = currentTask.name_;
            this.activityList = res.activityList.map((item, index) => {
              if (item.name == this.currentTaskName) {
                this.current = currentTask.END_TIME_ == "" ? index : index + 1;
              }
              return item;
            });
          } else {
            this.activityList = res.activityList;
          }
        });
      }
    },
    cancel() {
      this.entryList.pop();
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
