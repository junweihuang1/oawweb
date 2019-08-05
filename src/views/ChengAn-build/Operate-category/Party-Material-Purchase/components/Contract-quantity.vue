<template>
  <div>
    <h3>项目信息</h3>
    <el-form size="mini" inline label-width="100px">
      <el-form-item label="项目名称">
        <el-input
          v-model="projectList.construct_project_name"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="工程地址">
        <el-input
          v-model="projectList.construct_project_addr"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="项目经理">
        <el-input v-model="projectList.construct_project_leader" readonly>
        </el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-input readonly value="甲供材"></el-input>
      </el-form-item>
    </el-form>
    <h3>材料单</h3>
    <el-form inline>
      <el-form-item>
        <el-button type="primary" @click="additem">添加行</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="DataList"
      border
      @cell-click="clickinp"
      :height="maxheight"
    >
      <el-table-column
        align="center"
        :label="item[0]"
        :prop="item[1]"
        :width="item[2]"
        v-for="(item, index) in header"
        :key="index"
      >
        <template slot-scope="{ row, column }">
          <el-input
            size="mini"
            v-if="column.label == '新增主材数量' && row.isinput"
            type="text"
            placeholder="请输入"
            v-model="row[item[1]]"
            style="border:none;outline:none;height:25px;width:100%;margin:5px 0;"
          />
          <span v-else>{{ row[item[1]] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="160" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="selectQuantity(scope.row)"
            plain
            >选择</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="deleteitem(scope.row)"
            plain
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <paging
      :currentlimit="15"
      :currentpage="1"
      :total="DataList.length"
    ></paging>
    <el-form
      size="mini"
      style="margin-top:10px;"
      label-position="left"
      label-width="60px"
    >
      <el-form-item label="意见">
        <el-input
          type="textarea"
          :rows="2"
          style="width:50%;"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" size="mini" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>

    <h3>流程线</h3>
    <el-steps
      :space="250"
      :active="0"
      finish-status="success"
      style="margin-left:50px;"
    >
      <el-step
        :title="item.name"
        v-for="(item, index) in activityList"
        :key="index"
      ></el-step>
    </el-steps>
    <el-dialog :visible.sync="isopen" :append-to-body="true" top="8vh">
      <select-quantity
        :projectList="projectList"
        @setQuantity="getQuantity"
      ></select-quantity>
    </el-dialog>
  </div>
</template>

<script>
import { apistart_record, apiCostappProcessList } from "@/request/api.js";
import selectQuantity from "./select-quantity";
import paging from "@/components/paging/paging";
export default {
  name: "ContractQuantity",
  data() {
    return {
      DataList: [],
      maxheight: document.documentElement.scrollHeight * 0.25,
      header: [
        ["工程量编号", "construct_project_quantities_id", 100],
        ["材料类别", "construct_material_seriesName", 90],
        ["材料名称", "construct_material_name", 120],
        ["型号规格", "construct_material_model_name"],
        ["原材料名称和规格", "", 150],
        ["单位", "construct_material_model_unit", 65],
        ["主材数量", "construct_project_quantities_num", 90],
        ["已采购量", "construct_project_quantities_num", 90],
        ["合同单价", "purNum", 90],
        ["新增主材数量", "afterAddingNum", 110, "", "", true]
      ],
      headle: ["选择", "删除"],
      isopen: false,
      addid: 1,
      activeList: [],
      activityList: []
    };
  },
  components: {
    selectQuantity,
    paging
  },
  props: {
    projectList: Object
  },
  watch: {
    projectList() {
      this.getprossList();
    }
  },
  mounted() {
    this.getprossList();
  },
  methods: {
    getprossList() {
      apiCostappProcessList({
        type: "new"
      }).then(res => {
        console.log(res);
        this.activityList = res.activityList;
      });
    },
    submit() {
      let rows = this.DataList.map(item => {
        delete item.id;
        return item;
      });
      console.log();
      let data = {
        type: "ASupply",
        construct_project_id: this.projectList.construct_project_id,
        rows: JSON.stringify(rows),
        userid: "1054"
      };
      console.log(data);
      apistart_record(data).then(res => {
        console.log(res);
      });
    },
    clickinp(row, column, cell, event) {
      this.DataList = this.DataList.map(item => {
        item.isinput = false;
        if (item.id == row.id && column.label == "新增主材数量") {
          item.isinput = true;
        }
        return item;
      });
    },
    deleteitem(row) {
      this.DataList = this.DataList.filter(item => item.id !== row.id);
    },
    //添加行
    additem() {
      this.DataList.push({
        id: this.addid,
        construct_project_quantities_id: "",
        construct_material_seriesName: "",
        construct_material_name: "",
        construct_material_model_name: "",
        construct_material_model_unit: "",
        construct_project_quantities_num: "",
        afterAddingNum: "",
        purNum: "",
        isinput: false
      });
      this.addid++;
    },
    selectQuantity(row) {
      this.isopen = true;
      this.activeList = row;
    },
    getQuantity(row) {
      //遍历是否有重复选项
      let isrepeat = this.DataList.some(
        item =>
          item.construct_project_quantities_id ==
          row.construct_project_quantities_id
      );
      if (isrepeat) {
        this.$message.error("此材料已存在");
        return;
      }
      this.isopen = false;
      this.DataList = this.DataList.map(item => {
        if (item.id == this.activeList.id) {
          item = {
            id: item.id,
            construct_material_model_name: row.construct_material_model_name,
            construct_material_model_unit: row.construct_material_model_unit,
            construct_material_name: row.construct_material_name,
            construct_material_seriesName: row.construct_material_seriesName,
            construct_project_quantities_id:
              row.construct_project_quantities_id,
            construct_project_quantities_num:
              row.construct_project_quantities_num,
            afterAddingNum: item.afterAddingNum,
            purNum: item.purNum
          };
        }
        return item;
      });
      console.log(this.DataList);
    }
  }
};
</script>

<style lang="scss" scoped></style>
