<template>
  <div>
    <el-form size="mini" inline="">
      <el-form-item
        ><el-button type="success" @click="newgoout"
          >新增</el-button
        ></el-form-item
      >
    </el-form>

    <Ca-rule-table
      id="table"
      :DataList="goOutList"
      :header="header"
      :headle="headle"
      @checkleave="edit"
      @delete="deleteitem"
    ></Ca-rule-table>
    <go-out-table :isgoout="isgoout" @setmygoout="getmygoout"></go-out-table>
  </div>
</template>

<script>
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import GoOutTable from "./components/go-out-table";
import {
  apiFieldPersonnelList,
  apigetField,
  apidelFieldPersonnel
} from "@/request/api.js";
export default {
  name: "goout",
  data() {
    return {
      isgoout: false,
      goOutList: [],
      header: [
        ["申请人", "username", 90],
        ["公司名称", "field_personnel_company", 100],
        ["职位/岗位", "field_personnel_rolename", 140],
        ["外出地址", "field_personnel_place", 170],
        ["车牌号", "field_personnel_license", 90],
        ["是否用车", "field_personnel_car", 100],
        ["驾驶员", "field_personnel_driver", 90],
        ["外出事由", "field_personnel_cause"],
        ["开始时间", "start_time", 150],
        ["结束时间", "end_time", 150],
        ["状态", "field_personnel_status", 100]
      ],
      headle: ["编辑", "删除"]
    };
  },
  components: {
    GoOutTable,
    CaRuleTable
  },
  methods: {
    edit(e) {
      apigetField({ id: e.field_personnel_id }).then(res => {
        console.log(res);
      });
      console.log(e);
    },
    deleteitem(e) {
      apidelFieldPersonnel({ field_personnel_id: e.field_personnel_id }).then(
        res => {
          console.log(res);
        }
      );
      console.log(e);
    },
    newgoout() {
      this.isgoout = true;
    },
    getmygoout() {
      this.isgoout = false;
    }
  },
  mounted() {
    apiFieldPersonnelList({ pageSize: "10", limit: "1" })
      .then(res => {
        console.log(res);
        this.goOutList = res.data.map(item => {
          item.field_personnel_car =
            item.field_personnel_car == 1 ? "否" : "是";
          item.field_personnel_status =
            item.field_personnel_status == 4 ? "外勤结束" : "外勤中";
          return item;
        });
        console.log(this.goOutList);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="less" scoped></style>
