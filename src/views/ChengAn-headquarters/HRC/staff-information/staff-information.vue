<template>
  <div>
    <el-form ref="form" :model="form" inline="" size="mini">
      <el-form-item label="员工编号">
        <el-input v-model="form.number" clearable></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name" clearable></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="请选择" clearable>
          <el-option
            v-for="item in statusList"
            :key="item[0]"
            :label="item[1]"
            :value="item[0]"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="getpmuserList">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button type="success" @click="addstaff">新增员工</el-button>
          <el-button type="primary" @click="openNotCorrected">未转正</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <Ca-rule-table
      :header="headerList"
      :DataList="staffList"
      :headle="headle"
      @checkleave="edit"
      @delete="deleteline"
    ></Ca-rule-table>
    <paging
      @setlimit="getlimit"
      @setpage="getpage"
      :total="total"
      :currentpage="currentpage"
      :currentlimit="currentlimit"
    ></paging>

    <modify-window
      v-if="isreload"
      :isopen="isadd"
      :roleList="roleList"
      @closewindow="closewindow"
      :department="department"
      :userid="setuseid"
    ></modify-window>
    <el-dialog :visible.sync="isopenNoCor" title="未转正人员" top="8vh">
      <Not-Corrected v-if="isopenNoCor"></Not-Corrected>
    </el-dialog>
  </div>
</template>

<script>
import NotCorrected from "./components/Not-Corrected";
import modifyWindow from "./components/modify-window";
import Paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import {
  apiuserTreeList,
  apipmuserList,
  apisavePersonalRecords,
  apipersonalRecords
} from "@/request/api.js";
export default {
  name: "staffInformation",
  data() {
    return {
      isreload: true,
      isadd: false,
      form: {
        number: "",
        name: "",
        status: ""
      },
      statusList: [
        ["1", "在职"],
        ["2", "离职"],
        ["3", "试用期"],
        ["4", "实习"]
      ],
      staffList: [],
      headerList: [
        ["工号", "user_num", 80],
        ["姓名", "username", 80],
        ["电话号码", "phone_number", 120],
        ["性别", "sex", 80],
        ["邮箱", "email", 160],
        ["公司", "company_name", 130],
        ["中心", "center_name", 130],
        ["部门", "department_name", 130],
        ["身份证号码", "user_card", 180],
        ["身份证地址", "card_address"],
        ["状态", "status", 80]
      ],
      headle: ["编辑", "删除"],
      total: 400,
      currentpage: 1,
      currentlimit: 15,
      department: "",
      setuseid: 0,
      roleList: [],
      isopenNoCor: false
    };
  },
  components: {
    Paging,
    CaRuleTable,
    modifyWindow,
    NotCorrected
  },
  mounted() {
    this.getpmuserList();
    this.getuserTree();
  },
  methods: {
    openNotCorrected() {
      this.isopenNoCor = true;
    },
    deleteline(e) {
      console.log(e);
    },
    //编辑
    edit(e) {
      this.department = e.department;
      this.isadd = true;
      this.setuseid = e.userid;
    },
    getlimit(e) {
      this.currentlimit = e;
      this.getpmuserList();
    },
    getpage(e) {
      this.currentpage = e;
      this.getpmuserList();
    },
    getuserTree() {
      apiuserTreeList().then(res => {
        console.log(res);
      });
    },
    getpmuserList() {
      let data = {
        rows: this.currentlimit,
        page: this.currentpage,
        username: this.form.name,
        userid: this.form.number,
        department_name: "",
        center_name: "",
        company_name: "",
        status: this.form.status == "" ? 0 : this.form.status
      };
      apipmuserList(data).then(res => {
        this.staffList = res.data.map(item => {
          item.sex = item.sex == 1 ? "男" : "女";
          switch (item.status) {
            case 1:
              item.status = "在职";
              break;
            case 2:
              item.status = "离职";
              break;
            case 3:
              item.status = "试用期";
              break;
            case 4:
              item.status = "实习";
              break;
            default:
              break;
          }
          return item;
        });
      });
    },
    addstaff() {
      this.isreload = false;
      setTimeout(() => {
        this.$nextTick(() => {
          this.isadd = true;
          this.isreload = true;
        });
      }, 50);
      if (this.roleList == "") {
        apipersonalRecords().then(res => {
          res.roles.forEach(item => {
            this.roleList.push([item.role_id + "", item.role_name]);
          });
        });
      }
    },
    closewindow() {
      this.isadd = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
