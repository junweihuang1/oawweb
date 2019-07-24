<template>
  <div>
    <el-form inline size="mini" label-width="110px" label-position="left">
      <el-form-item
        :label="item[0]"
        v-for="(item, index) in propsList"
        :key="index"
        ref="form"
        v-model="form"
      >
        <template v-if="item[2] == 'select'">
          <select-company style="width:100%;"></select-company>
        </template>
        <template v-else>
          <el-input v-model="form[item[1]]"></el-input>
        </template>
      </el-form-item>
      <el-form-item label=" "
        ><el-button type="primary" @click="submitContract"
          >保存</el-button
        ></el-form-item
      >
    </el-form>
    <can-add-table @setTableList="getTableList"></can-add-table>
    <div style="width:100%;height:300px;" id="chart"></div>
  </div>
</template>

<script>
import selectCompany from "@/components/Ca-select/select-company.vue";
import { apisaveContract } from "@/request/api.js";
import CanAddTable from "./can-add-table";
export default {
  name: "echarts",
  data() {
    return {
      propsList: [
        ["合同编号", "manage_contract_num"],
        ["公司名称", "company_name", "select"],
        ["项目名称", "manage_contract_name"],
        ["发包方（甲方）", "manage_contract_firstParty"],
        ["项目地址", "manage_contract_address"],
        ["合同开始时间", "manage_contract_startTime"],
        ["合同结束时间", "manage_contract_endTime"],
        ["合同金额", "manage_contract_amount"],
        ["签证金额", "manage_contract_visaAmount"],
        ["备注", "manage_contract_remark"]
      ],
      form: this.setform,
      tableList: [],
      Companyid: ""
    };
  },
  components: {
    CanAddTable,
    selectCompany
  },
  props: {
    setform: {
      type: Object
    }
  },
  watch: {
    setform(value) {
      this.form = value;
      this.showecharts();
    }
  },
  mounted() {
    this.showecharts();
  },
  methods: {
    //从子组件获取表格的数据
    getTableList(arr) {
      this.tableList = arr;
    },
    submitContract() {
      console.log(this.form);
      console.log(this.tableList);
      let data = {
        type: "save",
        manage_contract_id: 0,
        manage_contract_name: this.form.manage_contract_name,
        manage_contract_address: this.form.manage_contract_address,
        manage_contract_amount: this.form.manage_contract_amount,
        manage_contract_startTime: this.form.manage_contract_startTime,
        manage_contract_endTime: this.form.manage_contract_endTime,
        manage_contract_firstParty: this.form.manage_contract_firstParty,
        manage_contract_payCompany: this.Companyid,
        manage_contract_visaAmount: this.form.manage_contract_visaAmount,
        manage_contract_num: this.form.manage_contract_num,
        manage_contract_remark: this.form.manage_contract_remark,
        manage_contract_company: 0,
        rows: ""
      };
      //   apisaveContract().then(res => {});
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
          data: ["已付款", "未付款"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 0, name: "已付款" },
              { value: this.form.manage_contract_amount, name: "未付款" }
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
