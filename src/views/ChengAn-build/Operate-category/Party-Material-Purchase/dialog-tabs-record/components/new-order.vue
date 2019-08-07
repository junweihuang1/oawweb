<template>
  <div>
    <h3>订单信息</h3>
    <el-form
      inline
      size="mini"
      label-width="90px"
      label-position="left"
      class="elform"
    >
      <el-form-item label="项目名称">
        <el-input
          v-model="projectList.construct_project_name"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="收货地址">
        <el-input
          v-model="projectList.construct_project_addr"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input
          v-model="projectList.construct_project_leader"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input
          v-model="projectList.construct_project_leaderTel"
          readonly
        ></el-input>
      </el-form-item>
    </el-form>
    <el-form
      inline
      size="mini"
      label-width="90px"
      label-position="left"
      class="elform"
    >
      <el-form-item label="订单号">
        <el-input
          v-model="projectList.construct_Aparty_purchase_orderNum"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item label="供货单位">
        <el-input
          v-model="projectList.construct_Aparty_purchase_supplier"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input
          v-model="projectList.construct_Aparty_purchase_contacts"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input
          v-model="projectList.construct_Aparty_purchase_tel"
        ></el-input>
      </el-form-item>
    </el-form>
    <h3>材料单</h3>
    <el-form inline size="mini">
      <el-form-item>
        <el-button type="primary" @click="additem">添加行</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="entriesList" border :height="maxheight">
      <el-table-column
        align="center"
        :label="item[0]"
        :prop="item[1]"
        :width="item[2]"
        v-for="(item, index) in header"
        :key="index"
      >
        <template slot-scope="{ row, column }">
          <input
            size="mini"
            v-if="column.label == '计划采购量' || column.label == '备注'"
            type="text"
            placeholder="请输入"
            v-model="row[item[1]]"
            style="border:none;outline:none;height:25px;width:100%;margin:0;padding:0;text-align:center;"
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
    <paging :currentlimit="15" :currentpage="1"></paging>
    <el-form
      size="mini"
      style="margin-top:10px;"
      label-position="left"
      label-width="60px"
    >
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
import {
  apigetAPartyPur,
  apiupdateAPartyPur,
  apisave_aPartyPur
} from "@/request/api.js";
import selectQuantity from "./select-quantity";
import paging from "@/components/paging/paging";
export default {
  name: "newOrder",
  data() {
    return {
      purchase_supplier: "",
      purchase_contacts: "",
      purchase_tel: "",
      maxheight: document.documentElement.scrollHeight * 0.25,
      activityList: [],
      entriesList: [],
      activeList: [], //当前选择的那一行
      header: [
        ["采购id", "construct_Aparty_purEntry_id", 90],
        ["材料id", "construct_Aparty_purEntry_materialId", 90],
        ["材料分类", "construct_Aparty_material_category", 120],
        ["材料名称", "construct_Aparty_material_name", 100],
        ["型号规格", "construct_Aparty_material_model"],
        ["单位", "construct_Aparty_material_unit", 80],
        ["工程量", "construct_Aparty_material_num", 80],
        ["累计审批量", "construct_aParty_byedNum", 100],
        ["计划采购量", "construct_Aparty_purEntry_num", 100],
        ["备注", "construct_Aparty_purEntry_remark", 130]
      ],
      aParty: [],
      isopen: false,
      id: 1,
      projectList: this.ProList
    };
  },
  components: {
    selectQuantity,
    paging
  },
  props: {
    ProList: Object,
    OrderId: {
      type: String,
      default: ""
    }
  },
  watch: {
    OrderId() {
      this.getApartyPur();
    }
  },
  mounted() {
    this.getApartyPur();
  },
  methods: {
    submit() {
      let entries = this.entriesList.map(item => {
        return {
          construct_Aparty_purEntry_materialId:
            item.construct_Aparty_purEntry_materialId,
          construct_Aparty_category: item.construct_Aparty_material_category,
          construct_Aparty_entryName: item.construct_Aparty_material_name,
          construct_Aparty_model: item.construct_Aparty_material_model,
          construct_Aparty_unit: item.construct_Aparty_material_unit,
          construct_aParty_byedNum: item.construct_aParty_byedNum,
          construct_Aparty_purEntry_num: item.construct_Aparty_purEntry_num,
          construct_Aparty_purEntry_remark:
            item.construct_Aparty_purEntry_remark
        };
      });
      let data;
      if (this.OrderId == "") {
        //当订单id为空时新增
        data = {
          construct_Aparty_purchase_constructId: this.projectList
            .construct_project_id,
          construct_Aparty_purchase_supplier: this.projectList
            .construct_Aparty_purchase_supplier,
          construct_Aparty_purchase_contacts: this.projectList
            .construct_Aparty_purchase_contacts,
          construct_Aparty_purchase_tel: this.projectList
            .construct_Aparty_purchase_tel,
          construct_Aparty_purchase_remarks: "",
          rows: JSON.stringify(entries)
        };
        apisave_aPartyPur(data).then(res => {
          this.$message.success("新增订单成功");
          this.$emit("close");
        });
      } else {
        //当订单id为非空时修改
        let AParty = {
          construct_Aparty_purchase_id: this.OrderId,
          construct_Aparty_purchase_constructId: this.projectList
            .construct_project_id,
          construct_Aparty_purchase_supplier: this.projectList
            .construct_Aparty_purchase_supplier,
          construct_Aparty_purchase_contacts: this.projectList
            .construct_Aparty_purchase_contacts,
          construct_Aparty_purchase_tel: this.projectList
            .construct_Aparty_purchase_tel,
          construct_Aparty_purchase_remarks: ""
        };
        data = {
          aParty: JSON.stringify(AParty),
          entries: JSON.stringify(entries)
        };
        apiupdateAPartyPur(data).then(res => {
          console.log(res);
          this.$message.success("修改订单成功");
          this.$emit("close");
        });
      }
    },
    //删除
    deleteitem(row) {
      this.entriesList = this.entriesList.filter(
        item =>
          item.construct_Aparty_purEntry_id !== row.construct_Aparty_purEntry_id
      );
    },
    //添加行
    additem() {
      this.entriesList.push({
        construct_Aparty_material_category: "",
        construct_Aparty_material_constructId: "",
        construct_Aparty_material_id: "",
        construct_Aparty_material_model: "",
        construct_Aparty_material_name: "",
        construct_Aparty_material_num: "",
        construct_Aparty_material_unit: "",
        construct_Aparty_purEntry_id: this.id,
        construct_Aparty_purEntry_materialId: "",
        construct_Aparty_purEntry_num: "",
        construct_Aparty_purEntry_parentId: "",
        construct_Aparty_purEntry_remark: "",
        construct_aParty_byedNum: ""
      });
      this.id++;
    },
    //从子组件选择材料
    getQuantity(row) {
      console.log(row);
      let isrepeat = this.entriesList.some(
        item =>
          item.construct_Aparty_material_id == row.construct_Aparty_material_id
      );
      if (isrepeat) {
        this.$message.error("此材料已存在");
        return;
      }
      this.isopen = false;
      this.entriesList = this.entriesList.map(item => {
        if (
          item.construct_Aparty_purEntry_id ==
          this.activeList.construct_Aparty_purEntry_id
        ) {
          item = {
            construct_Aparty_material_category:
              row.construct_Aparty_material_category,
            construct_Aparty_material_constructId: "",
            construct_Aparty_material_id: "",
            construct_Aparty_material_model:
              row.construct_Aparty_material_model,
            construct_Aparty_material_name: row.construct_Aparty_material_name,
            construct_Aparty_material_num: row.construct_Aparty_material_num,
            construct_Aparty_material_unit: row.construct_Aparty_material_unit,
            construct_Aparty_purEntry_id: item.construct_Aparty_purEntry_id,
            construct_Aparty_purEntry_materialId:
              row.construct_Aparty_material_id,
            construct_Aparty_purEntry_num: "",
            construct_Aparty_purEntry_parentId: "",
            construct_Aparty_purEntry_remark: "",
            construct_aParty_byedNum: ""
          };
        }
        return item;
      });
    },
    //打开材料选择窗口
    selectQuantity(row) {
      this.isopen = true;
      this.activeList = row;
    },
    getApartyPur() {
      console.log(this.OrderId);
      if (this.OrderId != "") {
        apigetAPartyPur({ construct_Aparty_purchase_id: this.OrderId }).then(
          res => {
            this.entriesList = res.data.entries.map(item => {
              if (item.construct_Aparty_purEntry_id > this.id) {
                this.id = item.construct_Aparty_purEntry_id;
              }
              return item;
            });
            this.id++;
            this.projectList = res.data.aParty[0];
            // this.purchase_supplier =
            //   res.data.aParty[0].construct_Aparty_purchase_supplier;
            // this.purchase_contacts =
            //   res.data.aParty[0].construct_Aparty_purchase_contacts;
            // this.purchase_tel =
            //   res.data.aParty[0].construct_Aparty_purchase_tel;
            console.log(res);
          }
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
