<template>
  <div>
    <el-form
      ref="form"
      size="mini"
      :model="form"
      inline
      label-width="90px"
      label-position="left"
    >
      <el-row>
        <template v-for="(item, index) in titleList">
          <el-col :span="12" :key="index">
            <el-form-item :label="item[0]" :key="index">
              <template v-if="item[2]">
                <el-input
                  v-model="form[item[1]]"
                  placeholder="请选择"
                  @focus="openSelect"
                />
              </template>
              <template v-else>
                <el-input v-model="form[item[1]]"></el-input>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
      <el-form-item label=" ">
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      :visible.sync="isopenSelect"
      title="选择用户"
      :append-to-body="true"
      width="45%"
    >
      <select-User @setuser="getuser"></select-User>
    </el-dialog>
  </div>
</template>

<script>
import selectUser from "@/components/Ca-select/select-User";
import { apisaveHistoricalWage } from "@/request/api";
export default {
  name: "IncomingWages",
  data() {
    return {
      username: "",
      form: {
        uc_wage_username: "",
        uc_wage_userid: "",
        uc_wage_company_name: "",
        uc_wage_center_name: "",
        finance_wages_attCount: "",
        finance_wages_vacaCount: "",
        finance_wages_leaveCount: "",
        uc_wage_actualDay: "",
        uc_wage_base: "",
        uc_wage_post: "",
        uc_wage_achieve: "",
        uc_wage_subsidy: "",
        uc_wage_socSec: "",
        uc_wage_accFund: "",
        uc_wage_tax: "",
        uc_wage_dedu: "",
        uc_wage_baseTotal: "",
        uc_wage_realhair: ""
      },
      titleList: [
        ["用户名", "username", "select"],
        ["中心名称", "uc_wage_center_name"],
        ["公司名称", "uc_wage_company_name"],
        ["出勤天数", "finance_wages_attCount"],
        ["休假天数", "finance_wages_vacaCount"],
        ["请假天数", "finance_wages_leaveCount"],
        ["实际天数", "uc_wage_actualDay"],
        ["基本工资", "uc_wage_base"],
        ["岗位工资", "uc_wage_post"],
        ["绩效工资", "uc_wage_achieve"],
        ["津贴补助", "uc_wage_subsidy"],
        ["代扣社保", "uc_wage_socSec"],
        ["代扣公积金", "uc_wage_accFund"],
        ["代扣个税", "uc_wage_tax"],
        ["考勤扣除", "uc_wage_dedu"],
        ["应发小计", "uc_wage_baseTotal"],
        ["实发工资", "uc_wage_realhair"]
      ],
      isopenSelect: false
    };
  },
  components: {
    selectUser
  },
  props: {},
  watch: {},
  methods: {
    //从子组件获取选择的用户信息（信息不完善）
    getuser(row) {
      this.isopenSelect = false;
      console.log(row);
      this.form.uc_wage_username = row.username;
      this.form.uc_wage_userid = row.userid;
      // this.form.uc_wage_company_name = row;
    },
    closewin() {
      this.isopenSelect = false;
    },
    submit() {
      console.log(this.form);
      apisaveHistoricalWage(this.form).then(res => {
        console.log(res);
      });
      console.log(this.form);
    },
    openSelect() {
      this.isopenSelect = true;
    }
  }
};
</script>

<style lang="scss" scoped></style>
