<template>
  <div>
    <el-divider content-position="left">项目信息</el-divider>
    <el-form size="mini" inline label-width="100px">
      <el-form-item label="项目名称">
        <el-input
          v-if="projectList.construct_project_name"
          v-model="projectList.construct_project_name"
          readonly
        ></el-input>
        <el-input
          v-else
          v-model="projectList.manage_contract_name"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="工程地址">
        <el-input
          v-if="projectList.construct_project_addr"
          v-model="projectList.construct_project_addr"
          readonly
        ></el-input>
        <el-input
          v-else
          v-model="projectList.manage_contract_address"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="项目经理">
        <el-input v-model="projectList.construct_project_leader" readonly>
        </el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-input readonly value="乙供材"></el-input>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">材料单</el-divider>
    <el-form inline v-if="current == 1">
      <el-form-item>
        <el-button type="primary" @click="additem" size="mini"
          >添加行</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="myDataList" border :height="maxheight">
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
            v-if="column.label == '新增主材数量'"
            type="text"
            class="inputbox"
            placeholder="请输入"
            v-model="row[item[1]]"
          />
          <span v-else>{{ row[item[1]] }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="160"
        fixed="right"
        v-if="!active"
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
    <paging
      :currentlimit="15"
      :currentpage="1"
      :total="myDataList.length"
    ></paging>
    <el-form
      size="mini"
      style="margin-top:10px;"
      label-position="left"
      label-width="60px"
    >
      <el-form-item label="审核人">
        <el-select v-model="userid">
          <el-option
            v-for="(item, index) in userList"
            :key="index"
            :value="item.userid"
            :label="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <template v-if="openType == 'headle'">
        <el-form-item label="意见">
          <el-input
            type="textarea"
            :rows="2"
            v-model="reason"
            style="width:50%;"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <el-form-item label=" ">
          <template v-for="(item, index) in buttonList">
            <el-button
              v-if="item == 'submit'"
              :key="index"
              type="success"
              size="mini"
              @click="headleprocess(true)"
              >提交</el-button
            >
            <el-button
              v-else-if="item == 'reject'"
              :key="index"
              type="warning"
              size="mini"
              @click="headleprocess(false)"
              >驳回</el-button
            >
            <el-button
              v-else-if="item == 'disagree'"
              :key="index"
              type="danger"
              size="mini"
              @click="headleprocess('finish')"
              >不同意</el-button
            >
          </template>
        </el-form-item>
      </template>
      <el-form-item label=" " v-else-if="openType == 'add'">
        <el-button type="primary" size="mini" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
    <template v-if="openType == 'headle'">
      <el-divider content-position="left">流程线</el-divider>
      <el-steps
        :space="250"
        :active="current"
        style="margin-left:50px;"
        align-center
      >
        <el-step
          :title="item.name"
          v-for="(item, index) in activityList"
          :key="index"
          :description="item.username"
        ></el-step>
      </el-steps>
    </template>
    <template v-if="openType !== 'add'">
      <el-divider content-position="left">审批流程</el-divider>
      <Ca-view-process
        style="width:75%;"
        :Approvaltable="Approvaltable"
        :ApprovalHeaderList="ApprovalHeaderList"
      ></Ca-view-process>
    </template>
    <el-dialog :visible.sync="isopen" :append-to-body="true" top="8vh">
      <select-quantity
        :projectList="projectList"
        @setQuantity="getQuantity"
      ></select-quantity>
    </el-dialog>
  </div>
</template>

<script>
import CaViewProcess from "@/components/Ca-view-process/Ca-view-process";
import {
  apistart_record,
  apigetProcessList,
  apipass_record
} from "@/request/api.js";
import selectQuantity from "./select-quantity";
import paging from "@/components/paging/paging";
import { changetime } from "@/components/global-fn/global-fn";
export default {
  name: "ContractQuantity",
  data() {
    return {
      maxheight: document.documentElement.scrollHeight * 0.25,
      header: [
        ["工程量编号", "construct_project_quantities_id", 100],
        ["材料类别", "construct_material_seriesName", 90],
        ["材料名称", "construct_material_name", 120],
        ["型号规格", "construct_material_model_name"],
        ["原材料名称和规格", "", 150],
        ["单位", "construct_material_model_unit", 65],
        ["主材数量", "construct_project_quantities_num", 90],
        ["已采购量", "construct_project_quantities_num", 90],
        ["合同单价", "purNum", 90],
        ["新增主材数量", "afterAddingNum", 110, "", "", true]
      ],
      headle: ["选择", "删除"],
      isopen: false,
      addid: 1,
      activeList: [],
      current: 1,
      activityList: [],
      reason: "",
      userid: 0,
      buttonList: [],
      Approvaltable: [],
      ApprovalHeaderList: [
        ["序号", "index", 80],
        ["流程节点", "name_", 100],
        ["审核人", "username", 100],
        ["审核时间", "END_TIME_", 160],
        ["审核意见", "MESSAGE_"]
      ],
      userList: [],
      myDataList: []
    };
  },
  components: {
    selectQuantity,
    paging,
    CaViewProcess
  },
  props: {
    projectList: Object,
    DataList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    openType: String,
    active: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    DataList() {
      this.myDataList = this.DataList;
      console.log(this.myDataList);
    }
  },
  mounted() {
    this.myDataList = this.DataList;
    console.log(this.myDataList);
    this.getprossList();
  },
  methods: {
    //办理

    headleprocess(type) {
      if (this.reason == "") {
        this.$message.error("请填写审核意见");
        return;
      }
      if (this.userid === 0) {
        this.$message.error("没有下一审核人不能提交！");
        return;
      }
      let data = {
        taskid: this.active.ID_,
        reasons: this.reason,
        sign: type,
        taskName: this.active.NAME_,
        headId: this.projectList.id,
        type: this.projectList.type,
        rows: JSON.stringify(this.myDataList),
        userid: this.userid
      };

      apipass_record(data).then(res => {
        console.log(res);
        this.$message.success(res.Msg);
        this.$emit("close");
      });
    },
    getprossList() {
      let data = {};
      if (this.active) {
        data = {
          taskid: this.active.ID_, //(必填)流程任务id
          processInstanceId: this.active.PROC_INST_ID_
            ? this.active.PROC_INST_ID_
            : this.active.taskid, //(必填)流程实例id
          key: "afterAddingNum", //(必填)流程定义key
          position: localStorage.getItem("role_name"), //(必填)申请人角色
          type: "" //(必填)新增new/运行中
        };
      } else {
        data = {
          taskid: "", //(必填)流程任务id
          processInstanceId: "", //(必填)流程实例id
          key: "afterAddingNum", //(必填)流程定义key
          position: localStorage.getItem("role_name"), //(必填)申请人角色
          type: "new" //(必填)新增new/运行中
        };
      }
      console.log(data);
      apigetProcessList(data).then(res => {
        console.log(res);
        this.Approvaltable = res.historyList
          ? res.historyList.map(item => {
              item.END_TIME_ = item.END_TIME_ ? changetime(item.END_TIME_) : "";
              return item;
            })
          : [];
        this.buttonList = res.startForm.split(",");
        this.userid = res.userlist.userList
          ? res.userlist.userList[0].userid
          : "";
        this.userList = res.userlist.userList ? res.userlist.userList : [];
        //当进入办理流程后，遍历流程线，判断出当前的节点
        this.activityList = res.activityList.map((item, index) => {
          if (this.active && item.name == this.active.NAME_) {
            this.current = index;
          }
          return item;
        });
      });
    },
    //保存
    submit() {
      this.$confirm(`确定提交吗？`)
        .then(() => {
          // let rows = this.myDataList.map(item => {
          //   delete item.id;
          //   return item;
          // });
          let data = {
            type: "BSupply",
            construct_project_id: this.projectList.construct_project_id,
            rows: JSON.stringify(this.myDataList),
            userid: this.userid
          };
          console.log(data);
          apistart_record(data).then(res => {
            console.log(res);
            this.$message.success(res.msg);
            this.$emit("close");
          });
        })
        .catch();
    },
    deleteitem(row) {
      console.log(this.myDataList);
      this.myDataList = this.myDataList.filter(item => item.id !== row.id);
    },
    //添加行
    additem() {
      this.myDataList.push({
        id: this.addid,
        construct_project_quantities_id: "",
        construct_material_seriesName: "",
        construct_material_name: "",
        construct_material_model_name: "",
        construct_material_model_unit: "",
        construct_project_quantities_num: "",
        afterAddingNum: "",
        purNum: ""
      });
      this.addid++;
    },
    selectQuantity(row) {
      this.isopen = true;
      this.activeList = row;
    },
    getQuantity(row) {
      //遍历是否有重复选项
      let isrepeat = this.myDataList.some(
        item =>
          item.construct_project_quantities_id ==
          row.construct_project_quantities_id
      );
      if (isrepeat) {
        this.$message.error("此材料已存在");
        return;
      }
      this.isopen = false;
      this.myDataList = this.myDataList.map(item => {
        if (item.id == this.activeList.id) {
          item = {
            id: item.id,
            construct_material_model_name: row.construct_material_model_name,
            construct_material_model_unit: row.construct_material_model_unit,
            construct_material_name: row.construct_material_name,
            construct_material_seriesName: row.construct_material_seriesName,
            construct_project_quantities_id:
              row.construct_project_quantities_id,
            construct_project_quantities_num:
              row.construct_project_quantities_num,
            afterAddingNum: item.afterAddingNum,
            purNum: item.purNum
          };
        }
        return item;
      });
      console.log(this.myDataList);
    }
  }
};
</script>

<style lang="scss"></style>
