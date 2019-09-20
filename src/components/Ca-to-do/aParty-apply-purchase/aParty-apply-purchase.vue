<template>
  <div>
    <el-divider content-position="left">订单信息</el-divider>
    <el-form
      inline
      size="mini"
      label-width="90px"
      label-position="left"
      class="elform"
    >
      <el-form-item label="项目名称">
        <el-input
          v-model="projectList.construct_project_name"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="收货地址">
        <el-input
          v-model="projectList.construct_project_addr"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input
          v-model="projectList.construct_project_leader"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input
          v-model="projectList.construct_project_leaderTel"
          readonly
        ></el-input>
      </el-form-item>
    </el-form>
    <el-form
      inline
      size="mini"
      label-width="90px"
      label-position="left"
      class="elform"
    >
      <el-form-item label="订单号">
        <el-input
          v-model="projectList.construct_Aparty_purchase_orderNum"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="供货单位">
        <el-input
          v-model="projectList.construct_Aparty_purchase_supplier"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input
          v-model="projectList.construct_Aparty_purchase_contacts"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input
          v-model="projectList.construct_Aparty_purchase_tel"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">材料单</el-divider>
    <el-button
      type="primary"
      @click="additem"
      style="margin:10px 0;"
      v-if="openType == 'add'"
      >添加行</el-button
    >
    <el-table :data="entriesList" border :height="maxheight">
      <el-table-column
        align="center"
        :label="item[0]"
        :prop="item[1]"
        :width="item[2]"
        v-for="(item, index) in header"
        :key="index"
      >
        <template slot-scope="{ row, column }">
          <input
            size="mini"
            v-if="column.label == '计划采购量' || column.label == '备注'"
            type="text"
            placeholder="请输入"
            v-model="row[item[1]]"
            style="border:none;outline:none;height:25px;width:100%;margin:0;padding:0;text-align:center;"
          />
          <span v-else>{{ row[item[1]] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="160"
        fixed="right"
        v-if="openType == 'add'"
      >
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="selectQuantity(scope.row)"
            plain
            >选择</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="deleteitem(scope.row)"
            plain
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-form size="mini" style="margin-top:10px;" label-width="80px">
      <el-row
        ><el-col :span="24" v-if="openType == 'headle'">
          <el-form-item label="意见">
            <el-input
              type="textarea"
              :rows="2"
              v-model="reasons"
              style="width:50%;"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-col>
        <template v-if="openType != 'check' && userTaskName != '结束'">
          <el-col :span="8">
            <el-form-item label="下一节点">
              <el-input v-model="userTaskName" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="审核人">
              <el-select v-model="userid" placeholder="没绑定审核人">
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
        <el-col :span="8">
          <el-form-item label=" " v-if="openType == 'add'">
            <el-button type="success" size="mini" @click="submit"
              >提交</el-button
            >
          </el-form-item>
          <el-form-item v-else-if="openType == 'headle'">
            <template v-for="(item, index) in buttonList">
              <el-button
                v-if="item == 'submit'"
                :key="index"
                type="success"
                size="mini"
                @click="headle(true)"
                >提交</el-button
              >
              <el-button
                v-if="item == 'Resubmit'"
                :key="index"
                type="success"
                size="mini"
                @click="headle(true)"
                >重新提交</el-button
              >
              <el-button
                v-else-if="item == 'reject'"
                :key="index"
                type="warning"
                size="mini"
                @click="headle(false)"
                >驳回</el-button
              >

              <el-button
                v-else-if="item == 'disagree'"
                :key="index"
                type="danger"
                size="mini"
                @click="headle('finish')"
                >不同意</el-button
              >
            </template>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider content-position="left">流程线</el-divider>
    <el-steps
      :space="250"
      :active="current"
      align-center
      finish-status="success"
      style="margin-left:50px;"
    >
      <el-step
        :title="item.name"
        v-for="(item, index) in activityList"
        :key="index"
      ></el-step>
    </el-steps>
    <template v-if="openType != 'add'">
      <el-divider content-position="left">审核记录</el-divider>
      <el-table :data="hisComment" border style="width:70%;">
        <el-table-column
          v-for="(item, index) in ApprovalHeaderList"
          :key="index"
          :label="item[0]"
          :prop="item[1]"
          :type="index == 0 ? 'index' : ''"
          :width="item[2]"
          align="center"
        ></el-table-column>
      </el-table>
    </template>
    <el-dialog
      :visible.sync="isopen"
      :append-to-body="true"
      top="8vh"
      v-dialogDrag
    >
      <select-quantity
        :projectList="projectList"
        @setQuantity="getQuantity"
      ></select-quantity>
    </el-dialog>
  </div>
</template>

<script>
import {
  apigetAPartyPur,
  apiupdateAPartyPur,
  apisave_aPartyPur,
  apigetProcessList,
  apipass_aPartyPur
} from "@/request/api.js";
import selectQuantity from "./select-quantity";
import { changetime } from "@/components/global-fn/global-fn";
export default {
  name: "newOrder",
  data() {
    return {
      purchase_supplier: "",
      purchase_contacts: "",
      purchase_tel: "",
      maxheight: document.documentElement.scrollHeight * 0.25,
      activityList: [],
      entriesList: [],
      buttonList: [],
      hisComment: [],
      userTaskName: "",
      userid: 0,
      current: 0,
      userList: [],
      activeList: [], //当前选择的那一行
      ApprovalHeaderList: [
        ["序号", "index", 60],
        ["流程节点", "name_", 140],
        ["审核人", "username", 80],
        ["审核时间", "END_TIME_", 160],
        ["审核意见", "MESSAGE_"]
      ],
      header: [
        ["采购id", "construct_Aparty_purEntry_id", 90],
        ["材料id", "construct_Aparty_purEntry_materialId", 90],
        ["材料分类", "construct_Aparty_material_category", 120],
        ["材料名称", "construct_Aparty_material_name", 100],
        ["型号规格", "construct_Aparty_material_model", 200],
        ["单位", "construct_Aparty_material_unit", 80],
        ["工程量", "construct_Aparty_material_num", 80],
        ["累计审批量", "construct_aParty_byedNum", 100],
        ["计划采购量", "construct_Aparty_purEntry_num", 100],
        ["备注", "construct_Aparty_purEntry_remark", 130]
      ],
      aParty: [],
      isopen: false,
      id: 1,
      projectList: this.proList,
      reasons: ""
    };
  },
  components: {
    selectQuantity
  },
  props: {
    proList: {
      type: Object,
      default: () => {
        return {
          construct_project_name: "",
          construct_project_addr: "",
          construct_project_leader: "",
          construct_project_leaderTel: "",
          construct_Aparty_purchase_orderNum: "",
          construct_Aparty_purchase_supplier: "",
          construct_Aparty_purchase_contacts: "",
          construct_Aparty_purchase_tel: ""
        };
      }
    },
    OrderId: {
      type: String,
      default: ""
    },
    openType: String,
    active: Object
  },
  watch: {
    proList(val) {
      this.projectList = val;
    },
    OrderId() {
      this.getApartyPur();
    }
  },
  mounted() {
    this.getApartyPur();
  },
  methods: {
    headle(type) {
      if (this.reasons == "") {
        this.$message.error("请填写审核意见");
        return;
      }
      if (this.userid === "" && type) {
        this.$message.error("审核人为空不能提交！");
        return;
      }
      let data = {
        taskid: this.active.ID_,
        reasons: this.reasons,
        sign: type,
        userid: this.userid
      };
      this.$confirm(
        `确定${type === true ? "办理" : type === false ? "驳回" : "不同意"}吗？`
      )
        .then(() => {
          apipass_aPartyPur(data).then(res => {
            console.log(res);
            this.$message.success("办理成功");
            this.$emit("close");
          });
        })
        .catch(() => {});
    },
    //下一审核人和流程信息
    getprocessList() {
      let data = {};
      if (this.active) {
        data = {
          taskid: this.active.ID_, //(必填)流程任务id
          processInstanceId: this.active.PROC_INST_ID_
            ? this.active.PROC_INST_ID_
            : this.active.taskid, //(必填)流程实例id
          key: "aPartyPurView", //(必填)流程定义key
          position: this.active.role_name
            ? this.active.role_name
            : sessionStorage.getItem("role_name"), //(必填)申请人角色
          type: "" //(必填)新增new/运行中
        };
      } else {
        data = {
          taskid: "", //(必填)流程任务id
          processInstanceId: "", //(必填)流程实例id
          key: "aPartyPurView", //(必填)流程定义key
          position: sessionStorage.getItem("role_name"), //(必填)申请人角色
          type: "new" //(必填)新增new/运行中
        };
      }
      console.log(data);
      apigetProcessList(data).then(res => {
        console.log(res);
        if (this.hisComment != "") {
          let currentTask = this.hisComment[this.hisComment.length - 1];
          this.activityList = res.activityList.map((item, index) => {
            if (item.name == currentTask.name_) {
              this.current = currentTask.END_TIME_ == "" ? index : index + 1;
            }
            return item;
          });
        } else {
          this.activityList = res.activityList;
        }
        this.userTaskName = res.userlist.userTaskName;
        this.buttonList = res.startForm.split(",");
        this.userid =
          this.userTaskName == "结束"
            ? 0
            : res.userlist.userList && res.userlist.userList != ""
            ? res.userlist.userList[0].userid
            : "";
        if (this.userTaskName == "结束") {
          this.userid = 0;
        }
        console.log(this.userid);
        this.userList = res.userlist.userList ? res.userlist.userList : [];
      });
    },
    submit() {
      if (this.userid === "") {
        this.$message.error("审核人为空不能提交！");
        return;
      }
      let entries = this.entriesList.map(item => {
        return {
          construct_Aparty_purEntry_materialId:
            item.construct_Aparty_purEntry_materialId,
          construct_Aparty_category: item.construct_Aparty_material_category,
          construct_Aparty_entryName: item.construct_Aparty_material_name,
          construct_Aparty_model: item.construct_Aparty_material_model,
          construct_Aparty_unit: item.construct_Aparty_material_unit,
          construct_aParty_byedNum: item.construct_aParty_byedNum,
          construct_Aparty_purEntry_num: item.construct_Aparty_purEntry_num,
          construct_Aparty_purEntry_remark:
            item.construct_Aparty_purEntry_remark
        };
      });
      let data;
      if (this.OrderId == "") {
        //当订单id为空时新增
        data = {
          construct_Aparty_purchase_constructId: this.projectList
            .construct_project_id,
          construct_Aparty_purchase_supplier: this.projectList
            .construct_Aparty_purchase_supplier,
          construct_Aparty_purchase_contacts: this.projectList
            .construct_Aparty_purchase_contacts,
          construct_Aparty_purchase_tel: this.projectList
            .construct_Aparty_purchase_tel,
          construct_Aparty_purchase_remarks: "",
          userid: this.userid,
          project_name: this.projectList.construct_project_name,
          rows: JSON.stringify(entries)
        };
        console.log(data);
        this.$confirm(`确定提交吗？`)
          .then(() => {
            apisave_aPartyPur(data).then(res => {
              console.log(res);
              this.$message.success("新增订单成功");
              this.$emit("close");
            });
          })
          .catch(() => {});
      } else {
        //当订单id为非空时修改
        let AParty = {
          construct_Aparty_purchase_id: this.OrderId,
          construct_Aparty_purchase_constructId: this.projectList
            .construct_project_id,
          construct_Aparty_purchase_supplier: this.projectList
            .construct_Aparty_purchase_supplier,
          construct_Aparty_purchase_contacts: this.projectList
            .construct_Aparty_purchase_contacts,
          construct_Aparty_purchase_tel: this.projectList
            .construct_Aparty_purchase_tel,
          construct_Aparty_purchase_remarks: ""
        };
        data = {
          aParty: JSON.stringify(AParty),
          entries: JSON.stringify(entries)
        };
        apiupdateAPartyPur(data).then(res => {
          console.log(res);
          this.$message.success("修改订单成功");
          this.$emit("close");
        });
      }
    },
    //删除
    deleteitem(row) {
      this.entriesList = this.entriesList.filter(
        item =>
          item.construct_Aparty_purEntry_id !== row.construct_Aparty_purEntry_id
      );
    },
    //添加行
    additem() {
      this.entriesList.push({
        construct_Aparty_material_category: "",
        construct_Aparty_material_constructId: "",
        construct_Aparty_material_id: "",
        construct_Aparty_material_model: "",
        construct_Aparty_material_name: "",
        construct_Aparty_material_num: "",
        construct_Aparty_material_unit: "",
        construct_Aparty_purEntry_id: this.id,
        construct_Aparty_purEntry_materialId: "",
        construct_Aparty_purEntry_num: "",
        construct_Aparty_purEntry_parentId: "",
        construct_Aparty_purEntry_remark: "",
        construct_aParty_byedNum: ""
      });
      this.id++;
    },
    //从子组件选择材料
    getQuantity(row) {
      console.log(row);
      let isrepeat = this.entriesList.some(
        item =>
          item.construct_Aparty_material_id == row.construct_Aparty_material_id
      );
      if (isrepeat) {
        this.$message.error("此材料已存在");
        return;
      }
      this.isopen = false;
      this.entriesList = this.entriesList.map(item => {
        if (
          item.construct_Aparty_purEntry_id ==
          this.activeList.construct_Aparty_purEntry_id
        ) {
          item = {
            construct_Aparty_material_category:
              row.construct_Aparty_material_category,
            construct_Aparty_material_constructId: "",
            construct_Aparty_material_id: "",
            construct_Aparty_material_model:
              row.construct_Aparty_material_model,
            construct_Aparty_material_name: row.construct_Aparty_material_name,
            construct_Aparty_material_num: row.construct_Aparty_material_num,
            construct_Aparty_material_unit: row.construct_Aparty_material_unit,
            construct_Aparty_purEntry_id: item.construct_Aparty_purEntry_id,
            construct_Aparty_purEntry_materialId:
              row.construct_Aparty_material_id,
            construct_Aparty_purEntry_num: "",
            construct_Aparty_purEntry_parentId: "",
            construct_Aparty_purEntry_remark: "",
            construct_aParty_byedNum: row.sum
          };
        }
        return item;
      });
    },
    //打开材料选择窗口
    selectQuantity(row) {
      this.isopen = true;
      this.activeList = row;
    },
    getApartyPur() {
      if (this.OrderId != "") {
        apigetAPartyPur({ construct_Aparty_purchase_id: this.OrderId }).then(
          res => {
            console.log(res);
            this.entriesList = res.data.entries.map(item => {
              if (item.construct_Aparty_purEntry_id > this.id) {
                this.id = item.construct_Aparty_purEntry_id;
              }
              return item;
            });
            this.hisComment = res.hisComment
              ? res.hisComment.map(item => {
                  item.END_TIME_ = item.END_TIME_
                    ? changetime(item.END_TIME_)
                    : "";
                  return item;
                })
              : [];
            this.getprocessList();
            this.id++;
            this.projectList = res.data.aParty[0];
          }
        );
      } else {
        this.getprocessList();
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
