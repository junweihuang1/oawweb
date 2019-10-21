<template>
  <div>
    <el-row>
      <el-col :span="16">
        <el-form size="mini" label-width="110px" label-position="left">
          <el-col :span="8" v-for="(item, index) in propsList" :key="index">
            <el-form-item
              :label="item[0]"
              :key="index"
              ref="form"
              v-model="form"
            >
              <template v-if="item[2] == 'select'">
                <el-select
                  v-model="form['manage_contract_company']"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, index) in companys"
                    :label="item"
                    :value="index + 1"
                    :key="index"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="item[2] == 'date'">
                <el-date-picker
                  style="width:100%;"
                  v-model="form[item[1]]"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </template>
              <template v-else>
                <el-input v-model="form[item[1]]"></el-input>
              </template>
            </el-form-item>
          </el-col>
        </el-form>
        <el-col :span="24">
          <can-add-table
            v-if="ismodify"
            @setTableList="getTableList"
            :rows="rows"
            @openApplyForm="openApplyForm"
            @printApplyForm="printApplyForm"
            :projectList="projectList"
            @reload="reload"
            @receiveAmount="receiveAmount"
          ></can-add-table>
        </el-col>
      </el-col>
      <el-col :span="8">
        <div style="width:100%;height:300px;" id="chart" v-show="isshow"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CanAddTable from "./can-add-table";
import {
  apisavereqfunds,
  apimodreqfunds,
  apiContractInvoice
} from "@/request/api.js";
export default {
  name: "echarts",
  data() {
    return {
      propsList: [
        ["合同编号", "manage_contract_num"],
        ["项目名称", "manage_contract_name"],
        ["所属公司", "manage_contract_company", "select"],
        ["发包方（甲方）", "manage_contract_firstParty"],
        ["项目地址", "manage_contract_address"],
        ["合同开始时间", "manage_contract_startTime", "date"],
        ["合同结束时间", "manage_contract_endTime", "date"],
        ["合同金额", "manage_contract_amount"],
        ["签证金额", "manage_contract_visaAmount"],
        ["备注", "manage_contract_remark"]
      ],
      form: {},
      Companyid: "",
      Received: Number,
      noReceived: Number,
      isshow: true,
      companys: ["建设公司", "科技公司", "技术加盟"],
      rows: [],
      ismodify: true
    };
  },
  components: {
    CanAddTable
  },
  props: {
    projectList: Object
  },
  created() {
    this.showecharts();
    this.getFundsList();
  },
  methods: {
    printApplyForm(id) {
      this.$emit("printApplyForm", id);
    },
    openApplyForm(id) {
      this.$emit("openApplyForm", id);
    },
    //重載
    reload() {
      this.getFundsList();
      this.ismodify = false;
      this.$nextTick(() => {
        this.ismodify = true;
      });
    },
    getFundsList() {
      apiContractInvoice({
        manage_contract_id: this.projectList.manage_contract_id
      }).then(res => {
        console.log(res);
        this.rows = res.entry.map(item => {
          item.manage_status2 =
            item.manage_status == 0
              ? "开票"
              : item.manage_status == 2
              ? "已通过"
              : "审核中";
          return item;
        });
        this.form = res.head[0];
      });
    },
    //获取收款金额
    receiveAmount(val) {
      this.Received = val;
      this.noReceived = this.form.manage_contract_amount - val;
      this.isshow = false;
      this.$nextTick(() => {
        this.isshow = true;
        this.showecharts();
      });
    },
    getCompanyName(val) {
      this.form.manage_contract_payCompany = val;
    },
    //从子组件获取表格的数据
    getTableList(row) {
      console.log(row);
      if (row.manage_reqfunds_id) {
        this.$confirm(`是否确认修改？`)
          .then(() => {
            apimodreqfunds({ entry: JSON.stringify(row) }).then(res => {
              this.$message.success(res.msg);
              this.getFundsList();
            });
          })
          .catch();
      } else {
        let data = {
          manage_contract_id: this.form.manage_contract_id, //(必填)合同id
          manage_contract_firstParty: this.form.manage_contract_firstParty, //(必填)甲方单位名称
          manage_contract_name: this.form.manage_contract_name, //(必填)项目名
          entry: JSON.stringify(row)
        };
        apisavereqfunds(data).then(res => {
          this.$message.success(res.msg);
          this.getFundsList();
        });
      }
      this.reload();
    },
    showecharts() {
      let mychart = this.$echarts.init(document.getElementById("chart"));
      mychart.setOption({
        title: {
          text: "合同总金额：" + this.form.manage_contract_amount,
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        toolbox: {
          show: true,
          feature: {
            dataView: {
              readOnly: false
            },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["已收款", "未收款"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: this.Received, name: "已收款" },
              { value: this.noReceived, name: "未收款" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
