<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules2">
      <el-row>
        <el-col :span="12">
          <el-form-item label="开始时间">
            <date-time
              v-if="nextopen == true"
              :startstauts="true"
              @settime="getStartTime"
            ></date-time>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束时间">
            <date-time
              v-if="nextopen == true"
              @settime="getEndTime"
            ></date-time>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="是否用车">
        <el-switch
          v-model="form.field_personnel_car"
          :active-value="2"
          :inactive-value="1"
        ></el-switch>
      </el-form-item>
      <template v-if="form.field_personnel_car == 2">
        <el-row>
          <el-col :span="12">
            <el-form-item label="车牌号">
              <el-input
                v-model="form.field_personnel_license"
                placeholder="用车必填"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="驾驶员">
              <el-input
                v-model="form.field_personnel_driver"
                placeholder="用车必填"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <el-form-item label="外出地点" prop="field_personnel_place">
        <el-input
          v-model="form.field_personnel_place"
          placeholder="必填"
        ></el-input>
      </el-form-item>
      <el-form-item label="外出内容" prop="field_personnel_cause">
        <el-input
          v-model="form.field_personnel_cause"
          placeholder="必填"
        ></el-input>
      </el-form-item>
      <el-form-item label="审核人" v-if="username !== ''">
        <el-input v-model="username" readonly />
      </el-form-item>
      <template v-if="openType == 'headle'">
        <el-form-item label="意见">
          <el-input
            type="textarea"
            :row="3"
            v-model="reasons"
            placeholder="必填"
          ></el-input>
        </el-form-item>
        <el-form-item>
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
      <template v-else-if="openType == 'add'">
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">申请</el-button>
          <el-button @click="resetForm('form')" type="danger" plain=""
            >重置</el-button
          >
        </el-form-item>
      </template>
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
  </div>
</template>

<script>
import DateTime from "@/components/Ca-date-time/Ca-date-time";
import { apigoout, apipassField, apigetProcessList } from "@/request/api.js";
import { changetime } from "@/components/global-fn/global-fn";
export default {
  name: "goouttable",
  data() {
    var validatecontent = (rule, value, callback) => {
      if (value == "") {
        return callback("外出内容不能为空");
      }
      callback();
    };
    var validateaddress = (rule, value, callback) => {
      if (value == "") {
        return callback("外出地点不能为空");
      }
      callback();
    };
    return {
      nextopen: true,
      form: this.activeform,
      rules2: {
        field_personnel_cause: [
          { validator: validatecontent, trigger: "blur" }
        ],
        field_personnel_place: [{ validator: validateaddress, trigger: "blur" }]
      },
      reasons: "",
      userid: 0,
      username: "",
      current: 1,
      buttonList: [],
      activityList: [],
      hisComment: [],
      ApprovalHeaderList: [
        ["序号", "index", 60],
        ["流程节点", "name_", 140],
        ["审核人", "username", 80],
        ["审核时间", "END_TIME_", 160],
        ["审核意见", "MESSAGE_"]
      ]
    };
  },
  components: {
    DateTime
  },
  props: {
    activeform: {
      type: Object,
      default: () => {
        return {
          field_personnel_cause: "",
          field_personnel_place: "",
          field_personnel_driver: "",
          field_personnel_car: 1,
          start_time: "",
          end_time: "",
          userid: ""
        };
      }
    },
    openType: {
      type: String,
      default: () => {
        return "";
      }
    },
    active: Object
  },
  watch: {
    //监听窗口状态
    activeform(val) {
      this.form = val;
    }
  },
  mounted() {
    this.getprossList();
  },
  methods: {
    //获取流程信息
    getprossList() {
      let data = {};
      //当active（待办）不为空时
      if (this.active) {
        data = {
          taskid: this.active.ID_, //(必填)流程任务id
          processInstanceId: this.active.PROC_INST_ID_
            ? this.active.PROC_INST_ID_
            : this.active.taskid, //(必填)流程实例id
          key: "findFieldpView", //(必填)流程定义key
          position: localStorage.getItem("role_name"), //(必填)申请人角色
          type: "" //(必填)新增new/运行中
        };
      } else {
        data = {
          taskid: "", //(必填)流程任务id
          processInstanceId: "", //(必填)流程实例id
          key: "findFieldpView", //(必填)流程定义key
          position: localStorage.getItem("role_name"), //(必填)申请人角色
          type: "new" //(必填)新增new/运行中
        };
      }
      console.log(data);

      apigetProcessList(data).then(res => {
        console.log(res);
        this.hisComment = res.historyList.map(item => {
          item.END_time = item.END_time ? changetime(item.END_time) : "";
          return item;
        });
        this.activityList = res.activityList.map((item, index) => {
          if (item.name == res.userlist.userTaskName && this.active) {
            this.current = index;
          }
          return item;
        });
        this.buttonList = res.startForm.split(",");
        if (res.userlist.userList) {
          this.userid = res.userlist.userList[0].userid;
          this.username = res.userlist.userList[0].username;
        } else {
          this.current = 2;
        }
      });
    },
    headle(type) {
      let data = {
        taskid: this.active.ID_,
        userid: this.userid,
        reasons: this.reasons,
        sign: type
      };
      console.log(data);
      apipassField(data).then(res => {
        console.log(res);
        this.$message.success(res.msg);
        this.$emit("setclose");
      });
    },
    resetForm(formName) {
      this.reload();
      this.$refs[formName].resetFields();
    },
    //从组件获取结束时间
    getEndTime(time) {
      this.form.end_time = time;
    },
    //从组件获取开始时间
    getStartTime(time) {
      this.form.start_time = time;
    },
    reload() {
      this.form = {
        field_personnel_cause: "",
        field_personnel_place: "",
        field_personnel_driver: "",
        field_personnel_car: 2,
        start_time: "",
        end_time: ""
      };
    },
    onSubmit(formName) {
      if (this.form.field_personnel_car == 2) {
        if (this.form.field_personnel_license == "") {
          this.$message.warning("用车必填车牌号");
          return;
        }
        if (this.form.field_personnel_driver == "") {
          this.$message.warning("用车必填驾驶人");
          return;
        }
      }
      if (this.form.start_time >= this.form.end_time) {
        this.$message.warning("结束时间应大于开始时间");
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.form.userid = this.userid;
          console.log(this.form);
          apigoout(this.form)
            .then(res => {
              this.$message.success(res.msg);
              this.closegoouttable();
              setTimeout(() => {
                this.reload();
              }, 1000);
            })
            .catch(() => {
              this.$message.warning("请查看是否重复办理或联系开发人员");
              setTimeout(() => {
                this.reload();
              }, 1000);
            });
        } else {
          this.$message.warning("缺少内容，请补充后才提交");
        }
      });
    },
    closegoouttable() {
      this.$emit("setclose");
      this.nextopen = false;
      this.resetForm("form");
    }
  }
};
</script>

<style lang="scss" scoped></style>
