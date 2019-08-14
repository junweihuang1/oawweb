<template>
  <div>
    <fieldset
      style="border-top:1px #ccc solid;border-left:none;border-right:none;border-bottom:none;"
    >
      <legend style="font-size:18px;">材料信息</legend>
      <el-form label-width="100px" size="mini">
        <el-row>
          <el-col :span="8">
            <el-form-item label="公司">
              <select-company @setCompanyName="getCompanyName"></select-company>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目名称">
              <el-input
                v-model="projectName"
                @focus="openselectProject"
                placeholder="请选择项目"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计划员">
              <el-input v-model="applicant" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="计划时间">
              <el-date-picker
                style="width:100%;"
                type="date"
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
          <el-col :span="8">
            <el-form-item label="">
              <el-radio v-model="form.own_purchase_type" label="普通采购"
                >普通采购</el-radio
              >
              <el-radio v-model="form.own_purchase_type" label="材料采购"
                >材料采购</el-radio
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </fieldset>
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
export default {
  name: "addGoods",
  data() {
    return {
      projectName: "",
      applicant: localStorage.getItem("username"),
      form: {
        own_purchase_companyId: "", //(必填)公司编号
        own_purchase_projectId: "", //必填)项目编号
        own_purchase_planDate: "", //必填)计划日期
        own_purchase_arriveDate: "", //必填)希望送达日期
        own_purchase_planMan: "", //必填)复核员
        own_purchase_brand: "", //必填)品牌
        own_purchase_type: "普通采购", //必填)采购类型
        ownEntry: {
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
        },
        userid: "" //必填)下一审核人id
      },
      isselect: false
    };
  },
  components: {
    selectCompany,
    selectProject
  },
  methods: {
    getSelectName(row) {
      console.log(row);
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

<style lang="scss" scoped></style>
