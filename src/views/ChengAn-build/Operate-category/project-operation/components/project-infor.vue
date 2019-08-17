<template>
  <div>
    <el-divider content-position="left">项目信息</el-divider>
    <el-form inline size="mini" label-width="130px" label-position="left">
      <el-form-item label="项目选择">
        <el-input v-model="headform.construct_project_name"></el-input>
      </el-form-item>
      <el-form-item label="工程地址">
        <el-input v-model="headform.manage_contract_address"></el-input>
      </el-form-item>
      <el-form-item label="甲方">
        <el-input v-model="headform.manage_contract_firstParty"></el-input>
      </el-form-item>
      <el-form-item label="合同总价">
        <el-input v-model="headform.manage_contract_amount"></el-input>
      </el-form-item>
      <el-form-item label="合同项目开始时间">
        <el-input v-model="headform.manage_contract_startTime"></el-input>
      </el-form-item>
      <el-form-item label="合同项目结束时间">
        <el-input v-model="headform.manage_contract_endTime"></el-input>
      </el-form-item>
      <el-form-item label="项目经理">
        <el-input v-model="headform.construct_project_leader"></el-input>
      </el-form-item>
      <el-form-item label="项目经理联系方式">
        <el-input v-model="headform.construct_project_leaderTel"></el-input>
      </el-form-item>
    </el-form>
    <el-divider content-position="left">班组信息</el-divider>
    <el-button-group v-if="openType != 'check'">
      <el-button type="primary">添加行</el-button>
      <el-button type="warning">撤销</el-button>
    </el-button-group>
    <el-table :data="entryList" border :header-cell-style="getRowClass">
      <el-table-column
        :label="item[0]"
        v-for="(item, index) in header"
        :key="index"
        align="center"
        :prop="item[1]"
      >
        <template slot-scope="{ row }">
          <input type="text" v-model="row[item[1]]" class="inputbox" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "projectInfor",
  data() {
    return {
      header: [
        ["施工项目", "construct_project_workTeam_category"],
        ["班组", "username"],
        ["合同金额", "construct_project_workTeam_amount"],
        ["单价", "construct_project_workTeam_price"]
      ]
    };
  },
  props: {
    headform: Object,
    entryList: Array,
    openType: String
  },
  mounted() {},
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return `background: ${
          this.$store.state.tableColor
        };color:#fff;height:40px;padding:0px;`;
      } else {
        return "height:40px;padding:0px;";
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
