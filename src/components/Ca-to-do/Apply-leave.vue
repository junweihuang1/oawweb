<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-row
        ><el-col :span="12"
          ><el-form-item label="申请人">
            <el-input v-model="form.applicant" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职位">
            <el-input v-model="form.position" readonly />
          </el-form-item>
        </el-col>
        <div v-if="openType == 'check'">
          <el-col :span="12">
            <el-form-item label="开始时间">
              <el-input v-model="form.start_time" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间">
              <el-input v-model="form.end_time" readonly></el-input>
            </el-form-item>
          </el-col>
        </div>
        <div v-else>
          <el-col :span="12">
            <el-form-item label="开始时间">
              <date-time
                v-if="isreload"
                :startstauts="true"
                @settime="getStartTime"
              >
              </date-time>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间">
              <date-time v-if="isreload" @settime="getEndTime"></date-time>
            </el-form-item>
          </el-col>
        </div>
        <el-col :span="12">
          <el-form-item label="请假类型">
            <el-select
              v-model="form.leave_category"
              placeholder="请选择"
              style="width:100%;"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="共计天数">
            <el-input v-model="form.day_count" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="请假事由">
            <el-input
              v-model="form.reason"
              type="textarea"
              rows="3"
              minlength="300px"
            /> </el-form-item></el-col
      ></el-row>
      <div v-if="openType == 'add'">
        <el-row>
          <el-col :span="12">
            <el-form-item label="审核人">
              <picker-c @setApprover="getApprover"></picker-c>
            </el-form-item> </el-col
        ></el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">申请</el-button>
          <el-button type="danger" @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </div>
      <div v-else-if="openType == 'headle'">
        <el-row>
          <el-col :span="24">
            <el-form-item label="意见">
              <el-input type="textarea" :row="3" v-model="reasons"></el-input>
            </el-form-item> </el-col
        ></el-row>
        <el-form-item>
          <el-button type="success" @click="process_leave(true)"
            >同意</el-button
          >
          <el-button type="warning" @click="process_leave(false)"
            >驳回</el-button
          >
        </el-form-item>
      </div>
    </el-form>

    <template>
      <el-divider content-position="left">审批流程</el-divider>
      <el-table :data="DataList" border>
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
import pickerC from "@/components/Ca-picker-c/Ca-picker-c.vue";
import DateTime from "@/components/Ca-date-time/Ca-date-time";

import { apisaveLeave, apipassLeave } from "@/request/api.js";
export default {
  name: "leavetable",
  data() {
    return {
      ApprovalHeaderList: [
        ["序号", "index", 60],
        ["流程节点", "name_", 100],
        ["审核人", "username", 80],
        ["审核时间", "END_TIME_", 160],
        ["审核意见", "MESSAGE_"]
      ],
      reasons: "",
      options: [
        {
          value: 0,
          label: "事假"
        },
        {
          value: 1,
          label: "病假"
        },
        {
          value: 2,
          label: "婚假"
        },
        {
          value: 3,
          label: "产假"
        },
        {
          value: 4,
          label: "丧假"
        },
        {
          value: 5,
          label: "年假"
        }
      ],
      isreload: true
    };
  },
  components: {
    DateTime,
    pickerC
  },
  props: {
    DataList: Array,
    form: {
      type: Object,
      default: () => {}
    },
    openType: String,
    active: Object
  },
  methods: {
    //办理流程
    process_leave(type) {
      let data = {
        taskid: this.active.ID_,
        userid: "1054",
        reasons: this.reasons,
        sign: type
      };
      apipassLeave(data).then(res => {
        console.log(res);
        this.$message.success(res.msg);
        this.$emit("close");
      });
    },
    //重置数据
    reload() {
      this.isreload = false;
      this.$nextTick(() => {
        this.isreload = true;
      });
      this.form = {
        applicant: localStorage.getItem("username"),
        position: localStorage.getItem("role_name"),
        start_time: "",
        end_time: "",
        leave_category: "",
        day_count: "",
        reason: "",
        userid: ""
      };
    },
    getApprover(e) {
      this.form.userid = e;
    },
    resetForm(formName) {
      this.reload();
      this.$refs[formName].resetFields();
    },
    submitForm() {
      if (this.form.start_time >= this.form.end_time) {
        this.$message.error("开始时间须早于结束时间");
        return;
      }
      let data = {
        leave_category: this.form.leave_category,
        start_time: this.form.start_time,
        end_time: this.form.end_time,
        reason: this.form.reason,
        day_count: this.form.day_count,
        userid: this.form.userid
      };
      apisaveLeave(data).then(res => {
        console.log(res);
        this.$message.success(res.msg);
        this.$emit("close");
      });
    },
    //从组件获取结束时间
    getEndTime(time) {
      this.form.end_time = time;
    },
    //从组件获取开始时间
    getStartTime(time) {
      this.form.start_time = time;
    }
  }
};
</script>

<style lang="scss" scoped></style>
