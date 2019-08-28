<template>
  <div>
    <el-divider content-position="left">材料信息</el-divider>
    <el-form label-width="100px" size="mini">
      <el-row>
        <el-col :span="8">
          <el-form-item label="公司">
            <el-input
              v-if="form.company_name"
              v-model="form.company_name"
            ></el-input>
            <select-company
              @setCompanyName="getCompanyName"
              v-else
            ></select-company>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目名称">
            <el-input
              v-if="form.construct_project_name"
              v-model="form.construct_project_name"
              @focus="openselectProject"
            ></el-input>
            <el-input
              v-else
              v-model="projectName"
              @focus="openselectProject"
              placeholder="请选择项目"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="计划员">
            <el-input v-model="form.own_purchase_planMan" readonly></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="计划时间">
            <el-date-picker
              style="width:100%;"
              type="date"
              value-format="yyyy-MM-dd"
              clearable
              v-model="form.own_purchase_planDate"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="希望送达时间">
            <el-date-picker
              style="width:100%;"
              clearable
              value-format="yyyy-MM-dd"
              type="date"
              v-model="form.own_purchase_arriveDate"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="品牌">
            <el-input v-model="form.own_purchase_brand"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="">
            <el-radio v-model="form.own_purchase_type" border :label="1"
              >普通采购</el-radio
            >
            <el-radio v-model="form.own_purchase_type" border :label="2"
              >材料采购</el-radio
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider content-position="left">材料单</el-divider>
    <el-button
      v-if="openType == 'add'"
      type="primary"
      size="mini"
      style="margin-left:30px;margin-bottom:10px;"
      @click="additem"
      >添加</el-button
    >
    <el-table :data="addlist" border>
      <el-table-column
        :label="item[0]"
        v-for="(item, index) in header"
        :key="index"
        align="center"
        :prop="item[1]"
      >
        <template slot-scope="{ row }">
          <input type="text" v-model="row[item[1]]" class="inputbox" />
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        fixed="right"
        v-if="openType == 'add'"
      >
        <template slot-scope="{ row }">
          <el-button
            type="danger"
            @click="delitem(row)"
            size="mini"
            icon="el-icon-delete"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-form size="mini" label-width="80px" style="margin-top:10px;">
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
        <el-form-item label="审核意见">
          <el-input type="textarea" :row="2" v-model="reasons"></el-input>
        </el-form-item>
        <el-form-item label=" ">
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
      </template>
      <el-form-item v-else-if="openType == 'add'">
        <el-button type="primary" size="mini" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>

    <el-divider content-position="left">
      流程线
    </el-divider>
    <el-steps :active="current" :align-center="true">
      <el-step
        v-for="(item, index) in activityList"
        :title="item.name"
        :key="index"
      ></el-step>
    </el-steps>

    <!-- 审核记录表 -->
    <template v-if="openType != 'add'">
      <el-divider content-position="left">
        审核记录
      </el-divider>
      <el-table :data="hisComment" border>
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
    <el-dialog :visible.sync="isselect" :append-to-body="true">
      <select-project
        v-if="isselect"
        @setSelectName="getSelectName"
      ></select-project>
    </el-dialog>
  </div>
</template>

<script>
import selectProject from "@/components/Ca-select/select-project";
import selectCompany from "@/components/Ca-select/select-company";
import {
  apigetProcessList,
  apisaveOwnHead,
  apipassOwnHead
} from "@/request/api.js";
export default {
  name: "addGoods",
  data() {
    return {
      reasons: "",
      projectName: "",
      applicant: localStorage.getItem("username"),
      form: this.ownHead,
      isselect: false,
      header: [
        ["材料名称", "own_purchase_material"],
        ["型号规格", "own_purchase_model"],
        ["单位", "own_purchase_unit"],
        ["合同工程量", "own_purchase_quantities"],
        ["库存", "own_purchase_stock"],
        ["计划采购量", "own_purchase_applyNum"],
        ["最低单价", "own_purchase_leastPrice"],
        ["本次单价", "own_purchase_price"],
        ["小计", "own_purchase_purchaseTotal"],
        ["备注", "own_purchase_remarks"]
      ],
      addlist: this.entryList,
      id: 1,
      activityList: [],
      ApprovalHeaderList: [
        ["序号", "index", 60],
        ["流程节点", "name_", 100],
        ["审核人", "username", 80],
        ["开始时间", "START_TIME_", 160],
        ["审核意见", "MESSAGE_"]
      ],
      userid: 0,
      userList: [],
      current: 1,
      buttonList: []
    };
  },
  props: {
    ownHead: {
      type: Object
    },
    entryList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    openType: String,
    hisComment: Array,
    active: Object
  },
  components: {
    selectCompany,
    selectProject
  },
  mounted() {
    this.getprossList();
  },
  methods: {
    headle(type) {
      console.log(this.active);
      let data = {
        taskid: this.active.ID_,
        userid: this.userid,
        reasons: this.reasons,
        type: type,
        own_purchase_id: this.active.BUSINESS_KEY_.split(".")[1],
        own_purchase_planMan: this.form.own_purchase_planMan
      };
      console.log(data);
      apipassOwnHead(data).then(res => {
        this.$message.success(res.msg);
        this.$emit("close");
      });
    },
    submit() {
      this.form.userid = this.userid;
      console.log(this.form);
      this.$confirm(`确定提交吗？`)
        .then(() => {
          this.form.ownEntry = JSON.stringify(this.addlist);

          apisaveOwnHead(this.form).then(res => {
            this.$message.success(res.msg);
            this.$emit("close");
          });
        })
        .catch(() => {});
    },
    //获取流程线和下一审核人
    getprossList() {
      let data = {};
      if (this.active) {
        data = {
          taskid: this.active.ID_, //(必填)流程任务id
          processInstanceId: this.active.PROC_INST_ID_, //(必填)流程实例id
          key: "ownHeadView", //(必填)流程定义key
          position: localStorage.getItem("role_name"), //(必填)申请人角色
          type: "" //(必填)新增new/运行中
        };
      } else {
        data = {
          taskid: "", //(必填)流程任务id
          processInstanceId: "", //(必填)流程实例id
          key: "ownHeadView", //(必填)流程定义key
          position: localStorage.getItem("role_name"), //(必填)申请人角色
          type: "new" //(必填)新增new/运行中
        };
      }
      console.log(data);
      apigetProcessList(data).then(res => {
        console.log(res);
        this.activityList = res.activityList.map((item, index) => {
          if (item.name == res.userlist.userTaskName && this.active) {
            this.current = index;
          }
          return item;
        });
        this.buttonList = res.startForm.split(",");
        this.userid = res.userlist.userList[0].userid;
        this.userList = res.userlist.userList;
      });
    },
    delitem(row) {
      console.log(row);
      this.addlist = this.addlist.filter(item => item.id !== row.id);
    },
    //添加行
    additem() {
      this.addlist.push({
        id: this.id,
        own_purchase_material: "", //材料名称),
        own_purchase_model: "", //型号规格)
        own_purchase_unit: "", //单位)
        own_purchase_quantities: "", //合同工程量)
        own_purchase_stock: "", //库存)
        own_purchase_applyNum: "", //计划采购量)
        own_purchase_leastPrice: "", //最低价)
        own_purchase_price: "", //本次单价)
        own_purchase_purchaseTotal: "", //采购小计)
        own_purchase_remarks: "" //备注)
      });
      this.id++;
    },
    getSelectName(row) {
      this.projectName = row.construct_project_name;
      this.form.own_purchase_projectId = row.construct_project_id;
      this.isselect = false;
    },
    openselectProject() {
      this.isselect = true;
    },
    //选择公司
    getCompanyName(id) {
      this.form.own_purchase_companyId = id;
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
.inputbox {
  width: 100%;
  border: none;
  height: 30px;
  text-align: center;
  outline-color: #0191a0;
}
.el-step__title {
  font-size: 12px;
}
</style>
