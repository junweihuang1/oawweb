<template>
  <div>
    <el-form size="mini" inline label-width="90px">
      <el-form-item label="供应商名称">
        <el-input v-model="supplierName" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getSupplierList">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="openaddSupplier"
          >添加供应商</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="deleteSupplier">删除供应商</el-button>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      style="width:60%;"
      :DataList="supplierList"
      :header="header"
      :headle="headle"
      :setselect="true"
      @setselect="getselect"
      @edit="modifySupplier"
      @checkleave="openAccount"
    ></Ca-rule-table>
    <paging
      :currentlimit="currentlimit"
      :currentpage="currentpage"
      :total="50"
      @setlimit="getlimit"
      @setpage="getpage"
    ></paging>
    <!-- 打卡添加供应商或修改供应商窗口 -->
    <el-dialog :visible.sync="isAdd" title="添加供应商" width="25%">
      <el-form size="mini" label-width="80px">
        <el-form-item label="名称">
          <el-input
            v-model="saveform.construct_supplier_name"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input
            v-model="saveform.construct_supplier_addr"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input
            v-model="saveform.construct_supplier_tel"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input
            v-model="username"
            @focus="isopenselect = true"
            clearable
            placeholder="请选择"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="savesupplier">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 选择负责人 -->
    <el-dialog :visible.sync="isopenselect" title="选择负责人" width="45%">
      <selectUser @setuser="getuser"></selectUser>
    </el-dialog>
    <!-- 打开台账 -->
    <el-dialog :visible.sync="isopenAccount">
      <account :accountid="accountid"></account>
    </el-dialog>
  </div>
</template>

<script>
import account from "./components/account";
import selectUser from "@/components/Ca-select/select-User";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import {
  apisupplierList,
  apideleSupplier,
  apisaveSupplier
} from "@/request/api.js";
import { setTimeout } from "timers";
export default {
  name: "supplierAccount",
  data() {
    return {
      supplierName: "",
      header: [
        ["供应商编号", "construct_supplier_id", 110],
        ["供应商名称", "construct_supplier_name"],
        ["供应商地址", "construct_supplier_addr", 110],
        ["供应商电话", "construct_supplier_tel", 110],
        ["负责人", "username"]
      ],
      currentlimit: 15,
      currentpage: 1,
      supplierList: [],
      headle: ["台账", "", "修改"],
      idarr: [],
      isAdd: false,
      isopenselect: false,
      username: "",
      saveform: {},
      isopenAccount: false,
      accountid: null
    };
  },
  components: {
    CaRuleTable,
    paging,
    selectUser,
    account
  },
  mounted() {
    this.getSupplierList();
  },
  watch: {
    username(val) {
      if (val == "") {
        this.saveform.construct_supplier_charger = "";
      }
    }
  },
  methods: {
    //修改供应商
    modifySupplier(row) {
      console.log(row);
      this.saveform = row;
      this.username = row.username;
      this.isAdd = true;
    },
    //保存供应商
    savesupplier() {
      console.log(this.saveform);
      apisaveSupplier(this.saveform).then(() => {
        this.$message.success("提交成功");
        setTimeout(() => {
          this.isAdd = false;
          this.getSupplierList();
        }, 500);
      });
    },
    //双击从子组件获取用户信息
    getuser(row) {
      console.log(row);
      this.isopenselect = false;
      this.username = row.username;
      this.saveform.construct_supplier_charger = row.userid;
    },
    //打开添加供应商的窗口
    openaddSupplier() {
      this.saveform = {
        construct_supplier_id: "",
        construct_supplier_name: "",
        construct_supplier_addr: "",
        construct_supplier_tel: "",
        construct_supplier_charger: ""
      };
      this.username = "";
      this.isAdd = true;
    },
    //删除指定供应商
    deleteSupplier() {
      apideleSupplier({ ids: this.idarr }).then(res => {
        this.$message.success("删除成功");
        this.getSupplierList();
      });
    },
    //获取多选ID
    getselect(row) {
      this.idarr = row.map(item => item.construct_supplier_id);
      console.log(this.idarr);
    },
    getlimit(e) {
      this.currentlimit = e;
      this.getSupplierList();
    },
    getpage(e) {
      this.currentpage = e;
      this.getSupplierList();
    },
    //打开对应台账窗口
    openAccount(row) {
      this.isopenAccount = true;
      this.accountid = row.construct_supplier_id;
    },
    getSupplierList() {
      apisupplierList({
        rows: this.currentlimit,
        page: this.currentpage,
        construct_suppliername: this.supplierName
      }).then(res => {
        this.supplierList = res.rows;
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
