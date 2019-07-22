<template>
  <div>
    <el-dialog
      title="请假详情"
      :visible.sync="myApply"
      @close="closeopen"
      width="35%"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-row
          ><el-col :span="12"
            ><el-form-item label="申请人">
              <el-input v-model="form.applicant" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职位">
              <el-input v-model="form.position" readonly />
            </el-form-item> </el-col
        ></el-row>
        <el-row
          ><el-col :span="12">
            <el-form-item label="开始时间">
              <date-time :startstauts="true" @settime="getStartTime">
              </date-time>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束时间">
              <date-time @settime="getEndTime"></date-time>
            </el-form-item> </el-col
        ></el-row>
        <el-row
          ><el-col :span="12">
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
        </el-row>
        <el-form-item label="请假事由">
          <el-input
            v-model="form.reason"
            type="textarea"
            rows="3"
            minlength="300px"
          />
        </el-form-item>
        <el-row
          ><el-col :span="12">
            <el-form-item label="审核人">
              <picker-c
                @setApprover="getApprover"
                :selected="myApply"
              ></picker-c>
            </el-form-item> </el-col
        ></el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">申请</el-button>
          <el-button type="danger" @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import pickerC from "@/components/Ca-picker-c/Ca-picker-c.vue";
import DateTime from "@/components/Ca-date-time/Ca-date-time";
import { changetime } from "@/components/global-fn/global-fn.js";
import { apiViewHisComment, apisaveLeave } from "@/request/api.js";
export default {
  name: "leavetable",
  data() {
    return {
      myApply: this.isApply,
      form: {
        applicant: localStorage.getItem("username"),
        position: localStorage.getItem("role_name"),
        start_time: "",
        end_time: "",
        leave_category: "",
        day_count: "",
        reason: "",
        userid: ""
      },
      options: [
        {
          value: "0",
          label: "事假"
        },
        {
          value: "1",
          label: "病假"
        },
        {
          value: "2",
          label: "婚假"
        },
        {
          value: "3",
          label: "产假"
        },
        {
          value: "4",
          label: "丧假"
        },
        {
          value: "5",
          label: "年假"
        }
      ]
    };
  },
  components: {
    DateTime,
    pickerC
  },
  props: {
    isApply: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isApply(newValue) {
      this.myApply = newValue;
    }
  },
  methods: {
    getApprover(e) {
      this.form.userid = e;
    },
    resetForm(formName) {},
    submitForm(formName) {
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
      });
      console.log(data);
    },
    //从组件获取结束时间
    getEndTime(time) {
      this.form.end_time = time;
    },
    //从组件获取开始时间
    getStartTime(time) {
      this.form.start_time = time;
    },
    closeopen() {
      this.$emit("setclose");
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
