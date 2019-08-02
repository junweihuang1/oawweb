<template>
  <div>
    <el-dialog :visible.sync="myadd" title="材料系列" @close="closewin">
      <el-form size="mini" inline>
        <el-form-item label="材料系列">
          <el-input v-model="materialCategory" clearable></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="remark" clearable></el-input>
        </el-form-item>
      </el-form>
      <el-button-group style="margin-bottom:10px;">
        <el-button type="primary" size="mini" @click="add">
          添加
        </el-button>
        <el-button type="danger" size="mini" @click="deleteitem">
          删除
        </el-button>
      </el-button-group>
      <el-table
        :data="DataList"
        border
        size="mini"
        @row-dblclick="dblClick"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column
          v-for="(item, index) in add_header"
          :key="index"
          align="center"
          :label="item[0]"
          :prop="item[1]"
          :width="item[2]"
          style="height:50px;"
        ></el-table-column>
      </el-table>
      <el-button
        size="mini"
        @click="submit"
        type="primary"
        style="margin-top:10px;"
        >提交</el-button
      >
    </el-dialog>
    <el-dialog
      title="选择供应商"
      :visible.sync="isselect"
      :append-to-body="true"
    >
      <select-supplier @setSupplier="getSupplier"></select-supplier>
    </el-dialog>
  </div>
</template>

<script>
import { apisaveSeries } from "@/request/api.js";
import selectSupplier from "@/components/Ca-select/select-supplier";
export default {
  name: "addmaterial",
  data() {
    return {
      add_header: [
        ["供应商编号", "supplierId", 100],
        ["供应商名称", "SupplierName", 180]
      ],
      isselect: false,
      getitem: {},
      dbItem: {},
      DataList: this.supplierList,
      remark: this.setremark,
      materialCategory: this.setmaterialCategory,
      id: 1,
      idarr: [],
      myadd: this.isadd
    };
  },
  props: {
    isadd: {
      type: Boolean,
      default: false
    },
    setmaterialCategory: {
      type: String
    },
    setremark: {
      type: String
    },
    supplierList: Array,
    seriesID: {
      type: Number,
      default: null
    }
  },
  components: {
    selectSupplier
  },
  watch: {
    isadd(val) {
      this.myadd = val;
    },
    //监听以下从父组件传回的参数，实时更新
    setmaterialCategory(val) {
      this.materialCategory = val;
    },
    setremark(val) {
      this.remark = val;
    },
    supplierList(val) {
      if (val != []) {
        this.id = val.length + 1;
      }
      this.DataList = val;
    }
  },
  methods: {
    closewin() {
      this.materialCategory = "";
      this.remark = "";
      this.DataList = [];
      this.$emit("closewin");
    },
    handleSelectionChange(val) {
      this.idarr = val.map(item => item.id);
    },
    //删除选择的项
    deleteitem() {
      if (this.idarr == "") {
        this.$message.warning("请选择需要删除的供应商");
        return;
      }
      this.DataList = this.DataList.filter(item => {
        return this.idarr.indexOf(item.id) < 0;
      });
    },
    //提交
    submit() {
      //在表格数据中遍历，获得供应商编号
      let supplierIdarr = [];
      this.DataList.forEach(item => {
        if (item.supplierId != "") {
          supplierIdarr.push(item.supplierId);
        }
      });
      let data = {
        construct_material_seriesName: this.materialCategory,
        remarks: this.remark,
        rowData: `[${supplierIdarr.toString()}]`
      };
      if (this.seriesID !== null) {
        data.construct_material_seriesID = this.seriesID;
      }
      apisaveSeries(data).then(res => {
        this.$message.success("保存成功");
        this.myadd = false;
        this.$emit("closewin");
      });
    },
    //从子组件双击获取所选择的供应商信息
    getSupplier(row) {
      //遍历是否有重复添加供应商，进行判断
      let check = this.DataList.every(
        item => item.supplierId != row.construct_supplier_id
      );
      if (check) {
        //遍历给双击的单元格重新赋值
        this.DataList = this.DataList.map(item => {
          if (item.id == this.dbItem.id) {
            item = {
              id: this.dbItem.id,
              supplierId: row.construct_supplier_id,
              SupplierName: row.construct_supplier_name
            };
          }
          return item;
        });
      } else {
        this.$message.error("重复选择供应商");
        return;
      }
      this.isselect = false;
    },
    //双击无法获取行索引
    dblClick(row) {
      this.dbItem = row;
      this.isselect = true;
    },
    //添加按钮
    add() {
      this.DataList.push({
        id: this.id,
        supplierId: "",
        SupplierName: "双击选择"
      });
      this.id++;
    }
  }
};
</script>
