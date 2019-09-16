<template>
  <div style="width:70%;margin:0 auto;">
    <table class="Application_form" border="0" cellspacing="1" cellpadding="0">
      <tr align="center">
        <th colspan="4" align="center">开发票申请表</th>
      </tr>
      <tr>
        <td align="center">申请部门</td>
        <td align="center" colspan="3">
          <input
            type="text"
            v-model="ApplyForm.manage_department"
            class="inputbox"
            placeholder="请选择"
            @focus="selectDep"
          />
        </td>
      </tr>
      <tr>
        <td align="center">甲方单位名称</td>
        <td align="center" colspan="3">
          <input
            type="text"
            v-model="ApplyForm.manage_first_party"
            class="inputbox"
          />
        </td>
      </tr>
      <tr>
        <td align="center">开票内容</td>
        <td align="center" colspan="3">
          <input
            type="text"
            v-model="ApplyForm.manage_ticket_content"
            class="inputbox"
          />
        </td>
      </tr>
      <tr>
        <td align="center">开票金额</td>
        <td align="center">
          <input
            type="text"
            v-model="ApplyForm.manage_reqfunds_amount"
            class="inputbox"
          />
        </td>
        <td align="center">甲方单位电话</td>
        <td align="center">
          <input
            type="text"
            v-model="ApplyForm.manage_telephone"
            class="inputbox"
          />
        </td>
      </tr>
      <tr>
        <td align="center">纳税人类别</td>
        <td align="center">
          <el-radio-group v-model="manage_pay_taxes">
            <el-radio :label="1">一般纳税</el-radio>
            <el-radio :label="2">小规模纳税</el-radio></el-radio-group
          >
        </td>
        <td align="center">增值税类别</td>
        <td align="center">
          <el-radio-group v-model="manage_vat_category">
            <el-radio :label="1">增值税专票</el-radio>
            <el-radio :label="2">增值税普票</el-radio>
          </el-radio-group>
        </td>
      </tr>
      <tr>
        <td align="center">统一社会信用代码</td>
        <td align="center" colspan="3">
          <input
            type="text"
            v-model="ApplyForm.manage_credit_code"
            class="inputbox"
          />
        </td>
      </tr>
      <tr>
        <td align="center">公司地址</td>
        <td align="center" colspan="3">
          <input
            type="text"
            v-model="ApplyForm.manage_company_address"
            class="inputbox"
          />
        </td>
      </tr>
      <tr>
        <td align="center">开户行</td>
        <td align="center">
          <input
            type="text"
            v-model="ApplyForm.manage_opening_bank"
            class="inputbox"
          />
        </td>
        <td align="center">银行账号</td>
        <td align="center">
          <input
            type="text"
            v-model="ApplyForm.manage_bank_account"
            class="inputbox"
          />
        </td>
      </tr>
      <tr>
        <td align="center">备注</td>
        <td align="center" colspan="3">
          <input
            type="text"
            v-model="ApplyForm.manage_reqfunds_remark"
            class="inputbox"
          />
        </td>
      </tr>
      <tr v-if="openType == 'headle'">
        <td align="center">意见</td>
        <td align="center" colspan="3">
          <input type="text" v-model="reasons" class="inputbox" />
        </td>
      </tr>
    </table>

    <div>
      说明：“统一社会信用代码、地址、电话、开户行、银行账号”四项只需在第一次开票的时候填写即可，即同一项目从第二次开票开始此四项可省略。
    </div>
    <div style="width:100%;text-align:center;">
      <el-form inline size="mini">
        <el-form-item>
          <el-select
            v-model="userid"
            placeholder="请选择"
            v-if="AuditorList != ''"
          >
            <el-option
              v-for="item in AuditorList"
              :key="item.userid"
              :value="item.userid"
              :label="item.username"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="openType == 'add'">
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
        <el-form-item v-else-if="openType == 'headle'">
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
              v-if="item == 'Resubmit'"
              :key="index"
              type="success"
              size="mini"
              @click="headleprocess(true)"
              >重新提交</el-button
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
      </el-form>
    </div>
    <el-divider content-position="left">
      流程线
    </el-divider>
    <el-steps :active="current" :align-center="true" finish-status="success">
      <el-step
        v-for="(item, index) in activityList"
        :title="item.name"
        :key="index"
      ></el-step>
    </el-steps>
    <div v-if="openType !== 'add'">
      <el-divider content-position="left">审批记录</el-divider>
      <el-table :data="historyList" border>
        <el-table-column
          v-for="(item, index) in header"
          :key="index"
          :label="item[0]"
          :prop="item[1]"
          :type="index == 0 ? 'index' : ''"
          :width="item[2]"
          align="center"
        ></el-table-column>
      </el-table>
    </div>
    <el-dialog
      :visible.sync="isopenDep"
      title="选择部门"
      :append-to-body="true"
      top="10vh"
      width="30%"
    >
      <select-department @setSelectName="getSelectName"></select-department>
    </el-dialog>
  </div>
</template>

<script>
import selectDepartment from "@/components/Ca-select/select-department";
import { changetime } from "@/components/global-fn/global-fn";
import {
  apigetreqfundsView,
  apistartReqfunds,
  apisupOpinionNew,
  apipassReqfunds,
  apiReqfundsProcess
} from "@/request/api.js";
export default {
  name: "ApplicationForm",
  data() {
    return {
      ApplyForm: {},
      manage_pay_taxes: 1,
      manage_vat_category: 1,
      historyList: [],
      header: [
        ["序号"],
        ["审核人", "username"],
        ["步骤名称", "name_"],
        ["审核意见", "MESSAGE_"],
        ["审核时间", "END_TIME_"],
        ["中心", "center_name"]
      ],
      AuditorList: [],
      Auditor: "",
      isopenDep: false,
      buttonList: [],
      activityList: [],
      reasons: "",
      userid: 0,
      current: 1,
      userTaskName: ""
    };
  },
  components: {
    selectDepartment
  },
  props: {
    reqfundsId: Number,
    openType: String,
    active: Object
  },
  mounted() {
    this.getView();
  },
  methods: {
    headleprocess(type) {
      if (this.reasons == "") {
        this.$message.error("请填写审核意见");
        return;
      }
      if (this.userid === 0) {
        this.$message.error("审核人为空不能提交！");
        return;
      }

      this.$confirm(
        `确定${type === true ? "办理" : type === false ? "驳回" : "不同意"}吗？`
      )
        .then(() => {
          let data = {
            taskid: this.active.ID_, //(必填)流程实例id
            userid: this.userid, //(必填)下一审核人id
            reasons: this.reasons, //(必填)审批意见
            sign: type, //(必填)是否批准(true/false)
            taskName: this.active.NAME_
          };
          console.log(data);
          apipassReqfunds(data).then(res => {
            console.log(res);
            this.$message.success(res.msg);
            this.$emit("close");
          });
        })
        .catch(() => {});
    },
    getSelectName(row) {
      console.log(row);
      let companyName = row.company_name ? row.company_name : "";
      let centerName = row.center_name ? row.center_name : "";
      let departmentName = row.department_name ? row.department_name : "";
      this.ApplyForm.manage_department = `${companyName}、${centerName}、${departmentName}`;
      this.isopenDep = false;
    },
    selectDep() {
      this.isopenDep = true;
    },
    save() {
      this.$confirm(`确定提交吗？`)
        .then(() => {
          this.ApplyForm.manage_pay_taxes = this.manage_pay_taxes;
          this.ApplyForm.manage_vat_category = this.manage_vat_category;
          this.ApplyForm.userid = this.userid;
          apistartReqfunds(this.ApplyForm).then(res => {
            console.log(res);
            this.$message.success(res.msg);
            this.$emit("close");
          });
        })
        .catch(() => {});
    },
    getprossList() {
      let data = {};
      if (this.active) {
        data = {
          taskid: this.active.ID_, //(必填)流程任务id
          taskName: this.active.NAME_, //(必填)当前节点名称
          type: "" //(必填)新增new/运行中
        };
      } else {
        data = {
          taskid: "", //(必填)流程任务id
          taskName: "申请人", //(必填)当前节点名称
          type: "new" //(必填)新增new/运行中
        };
      }
      console.log(data);
      apiReqfundsProcess(data).then(res => {
        //获取当前审批的最后一行
        if (this.historyList != "") {
          let currentTask = this.historyList[this.historyList.length - 1];
          //遍历获取当前节点
          this.activityList = res.activityList.map((item, index) => {
            if (item.name == currentTask.name_) {
              this.current = currentTask.END_TIME_ == "" ? index : index + 1;
            }
            return item;
          });
        } else {
          this.activityList = res.activityList;
        }
        this.buttonList = res.startForm.split(",");
        this.userid = res.userlist != "" ? res.userlist[0].userid : "";
        this.AuditorList = res.userlist;
        console.log(this.AuditorList);
      });
    },
    getView() {
      apigetreqfundsView({ manage_reqfunds_id: this.reqfundsId }).then(res => {
        this.ApplyForm = res.data[0];
        this.historyList = res.historyList
          ? res.historyList.map(item => {
              item.END_TIME_ = item.END_TIME_ ? changetime(item.END_TIME_) : "";
              return item;
            })
          : [];
        this.getprossList();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.Application_form {
  width: 100%;
  background: #555;
}
.Application_form td:nth-child(n) {
  width: 20%;
}
.Application_form td:nth-child(2n) {
  width: 30%;
}
.Application_form td {
  height: 40px;
  background: #fff;
}
.Application_form th {
  height: 30px;
  background: #fff;
}
.inputbox {
  width: 100%;
  height: 40px;
}
</style>
