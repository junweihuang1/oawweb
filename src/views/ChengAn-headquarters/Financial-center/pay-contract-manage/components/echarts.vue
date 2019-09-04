<template>
  <div>
    <el-row>
      <el-form size="mini" label-width="110px" label-position="left">
        <el-col :span="8" v-for="(item, index) in propsList" :key="index">
          <el-form-item :label="item[0]" :key="index" ref="form" v-model="form">
            <template v-if="item[2] == 'select'">
              <el-select v-model="form[item[1]]" v-if="openType">
                <el-option
                  v-for="(item, index) in companyList"
                  :key="index"
                  :label="item[1]"
                  :value="item[0]"
                ></el-option>
              </el-select>
              <select-company
                @setCompanyName="getCompanyName"
                :companyId="form.company_id"
                v-else
              ></select-company>
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
        <el-col :span="8" v-if="Type == 'add'">
          <el-form-item label=" "
            ><el-button type="primary" @click="submitContract"
              >保存</el-button
            ></el-form-item
          >
        </el-col>
      </el-form>
    </el-row>
    <can-add-table
      :Type="Type"
      @setTableList="getTableList"
      :rows="rows"
      @receiveAmount="receiveAmount"
    ></can-add-table>
    <div style="width:100%;height:300px;" id="chart" v-show="isshow"></div>
  </div>
</template>

<script>
import selectCompany from "@/components/Ca-select/select-company.vue";
import CanAddTable from "./can-add-table";
export default {
  name: "echarts",
  data() {
    return {
      propsList: [
        ["合同编号", "manage_contract_num"],
        ["公司名称", "manage_contract_company", "select"],
        ["项目名称", "manage_contract_name"],
        ["发包方（甲方）", "manage_contract_firstParty"],
        ["项目地址", "manage_contract_address"],
        ["合同开始时间", "manage_contract_startTime", "date"],
        ["合同结束时间", "manage_contract_endTime", "date"],
        ["合同金额", "manage_contract_amount"],
        ["签证金额", "manage_contract_visaAmount"],
        ["备注", "manage_contract_remark"]
      ],
      form: this.setform,
      tableList: [],
      Companyid: 1,
      Received: Number,
      noReceived: Number,
      isshow: true,
      companyList: [
        [1, "建设公司"],
        [2, "科技公司"],
        [11, "教育公司"],
        [3, "加盟合作"]
      ]
    };
  },
  components: {
    CanAddTable,
    selectCompany
  },
  props: {
    setform: {
      type: Object
    },
    Type: String,
    rows: Array,
    openType: String
  },
  watch: {
    setform(value) {
      this.form = value;
    }
  },
  mounted() {
    this.showecharts();
  },
  methods: {
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
    getTableList(arr) {
      this.tableList = arr;
    },
    submitContract() {
      console.log(this.form);
      let data = {
        type: "save",
        manage_contract_id: this.form.manage_contract_id,
        manage_contract_name: this.form.manage_contract_name,
        manage_contract_address: this.form.manage_contract_address,
        manage_contract_amount: this.form.manage_contract_amount,
        manage_contract_startTime: this.form.manage_contract_startTime,
        manage_contract_endTime: this.form.manage_contract_endTime,
        manage_contract_firstParty: this.form.manage_contract_firstParty,
        manage_contract_payCompany: this.form.manage_contract_payCompany,
        manage_contract_visaAmount: this.form.manage_contract_visaAmount,
        manage_contract_num: this.form.manage_contract_num,
        manage_contract_remark: this.form.manage_contract_remark,
        manage_contract_company: this.openType
          ? this.form.manage_contract_company
          : 0,
        rows: JSON.stringify(this.tableList)
      };
      console.log(data);
      this.$emit("setDate", data);
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
