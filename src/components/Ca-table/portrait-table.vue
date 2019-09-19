// 竖向表头的table
<template>
  <div style="text-align:center;">
    <el-dialog :visible.sync="myopen" @close="closewin" width="40%" top="8vh" v-dialogDrag>
      <h2>诚安时代绩效考核评定表</h2>
      <h3>{{ setDate }}</h3>
      <el-table
        v-if="myopen"
        :data="itemList"
        @cell-click="cellclick"
        :row-style="{ height: '100px' }"
      >
        <el-table-column prop="name" width="180"></el-table-column>
        <el-table-column prop="value">
          <template slot-scope="{ row }">
            <textarea
              v-if="openType == 'edit'"
              type="text"
              align="top"
              :readonly="row.name == '备注' ? true : false"
              style="border:none;outline:none;height:80px;width:100%;"
              v-model="row.value"
            />
            <span v-else>
              {{ row.value }}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-form
        inline
        size="mini"
        style="margin-top:10px;"
        v-if="openType == 'edit'"
      >
        <el-form-item>
          <el-select v-model="Auditor" placeholder="请选择">
            <el-option
              v-for="item in AuditorList"
              :key="item.userid"
              :value="item.userid"
              :label="item.username"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="savelist">保存</el-button>
          <el-button type="warning" @click="closewin">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { apisupOpinionNew } from "@/request/api.js";
export default {
  name: "portraitTable",
  data() {
    return {
      DataList: [],
      myopen: this.isopen,
      activeName: "",
      AuditorList: [],
      Auditor: ""
    };
  },
  props: {
    openType: String,
    isopen: {
      type: Boolean,
      default: false
    },
    itemList: Array,
    setDate: {
      type: String,
      default: ""
    }
  },
  watch: {
    isopen(val) {
      this.myopen = val;
    }
  },
  mounted() {
    this.getNextAuditor();
  },
  methods: {
    savelist() {
      this.$emit("setSavelist", [this.itemList, this.Auditor]);
    },
    cellclick(row, column, cell, event) {
      this.activeName = row.name;
    },
    closewin() {
      this.$emit("closewin");
    },
    getNextAuditor() {
      if (this.AuditorList == "") {
        apisupOpinionNew().then(res => {
          console.log(res);
          this.AuditorList = res.userList;
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
