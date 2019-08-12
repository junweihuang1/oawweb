<template>
  <div>
    <el-dialog
      title="发起外勤申请"
      :visible.sync="mygoout"
      @close="closegoouttable"
      width="35%"
    >
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
                  v-model="form.number"
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
        <el-row>
          <el-col :span="12">
            <el-form-item label="审批人">
              <picker-c
                @setApprover="getApprover"
                :selected="mygoout"
              ></picker-c>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-if="Type == 'edit'">
          <el-button type="primary" @click="onSubmit('form')">申请</el-button>
          <el-button @click="resetForm('form')" type="danger" plain=""
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import DateTime from "@/components/Ca-date-time/Ca-date-time";
import pickerC from "@/components/Ca-picker-c/Ca-picker-c";
import { apigoout } from "@/request/api.js";
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
      mygoout: this.isgoout,
      form: this.activeform,
      rules2: {
        field_personnel_cause: [
          { validator: validatecontent, trigger: "blur" }
        ],
        field_personnel_place: [{ validator: validateaddress, trigger: "blur" }]
      },
      Type: this.openType
    };
  },
  components: {
    pickerC,
    DateTime
  },
  props: {
    isgoout: {
      type: Boolean,
      default: false
    },
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
          field_personnel_userid: ""
        };
      }
    },
    openType: {
      type: String,
      default: () => {
        return "";
      }
    }
  },
  watch: {
    //监听窗口状态
    isgoout(newValue) {
      this.mygoout = newValue;
      this.$nextTick(() => {
        this.nextopen = true;
      });
    },
    activeform(val) {
      this.form = val;
    },
    openType(val) {
      this.Type = val;
    }
  },
  methods: {
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
    //从组件中获取审批人
    getApprover(Approver) {
      this.form.field_personnel_userid = Approver;
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
        if (this.form.number == "") {
          this.$message.warning("用车必填车牌号");
          return;
        }
        if (this.form.field_personnel_driver == "") {
          this.$message.warning("用车必填驾驶人");
          return;
        }
      }
      let data = {
        field_personnel_place: this.form.field_personnel_place, //(必填)外出地点；
        field_personnel_license: this.form.number, //(必填)车牌号；
        field_personnel_car: this.form.field_personnel_car, //(必填)是否用车(1:否,2:是)；
        field_personnel_driver: this.form.field_personnel_driver, //(必填)驾驶员；
        field_personnel_cause: this.form.field_personnel_cause, //(必填)外出原因；
        start_time: this.form.start_time, //(必填)起始时间；
        end_time: this.form.end_time, //(必填)结束时间；
        userid: this.form.field_personnel_car
      };
      if (data.start_time >= data.end_time) {
        this.$message.warning("结束时间应大于开始时间");
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          apigoout(data)
            .then(res => {
              if (res.msg == "办理完成") {
                this.$message.success("办理成功！");
                this.closegoouttable();
              } else {
                this.$message.warning(res.msg);
                this.closegoouttable();
              }
              setTimeout(() => {
                this.reload();
              }, 1500);
            })
            .catch(() => {
              this.$message.warning("请查看是否重复办理或联系开发人员");
              setTimeout(() => {
                this.reload();
              }, 1500);
            });
        } else {
          this.$message.warning("缺少内容，请补充后才提交");
        }
      });
    },
    closegoouttable() {
      this.$emit("setclose");
      this.nextopen = false;
      this.mygoout = false;
      this.resetForm("form");
    }
  }
};
</script>

<style lang="scss" scoped></style>
