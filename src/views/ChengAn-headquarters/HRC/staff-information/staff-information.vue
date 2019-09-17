<template>
  <div>
    <el-row>
      <el-col :span="3" class="menu_main" :style="{ height: winheight }">
        <div class="menu">
          <i class="el-icon-document"></i>
          菜单
        </div>
        <el-tree
          :data="TreeList"
          @node-click="nodeClick"
          accordion
          :props="defaultProps"
          style="padding:5px;background:#E4E7ED;"
        ></el-tree>
      </el-col>
      <el-col :span="21" style="padding-left:20px;">
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
              <el-button type="primary" @click="openNotCorrected"
                >未转正</el-button
              >
              <el-button type="warning" @click="quit">离职</el-button
              ><el-button type="primary" @click="openCard">打卡记录</el-button>
            </el-button-group>
          </el-form-item>
        </el-form>
        <Ca-rule-table
          :header="headerList"
          :DataList="staffList"
          :headle="headle"
          @checkline="checkline"
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
      </el-col>
    </el-row>

    <el-dialog :visible.sync="isadd" width="75%" title="编辑职员信息" top="8vh">
      <modify-window
        v-if="isadd"
        :submitType="submitType"
        :roleList="roleList"
        @close="closewin"
        :recordList="recordList"
        :userList="userList"
      ></modify-window>
    </el-dialog>
    <el-dialog :visible.sync="isopenNoCor" title="未转正人员" top="8vh">
      <corrented-Tabs v-if="isopenNoCor"></corrented-Tabs>
    </el-dialog>
    <el-dialog :visible.sync="isopenCard" width="70%">
      <card-record v-if="isopenCard"></card-record>
    </el-dialog>
    <el-dialog title="启动离职流程" :visible.sync="isstartQuit" width="25%">
      <el-form size="mini" label-width="110px">
        <el-form-item label="申请日期">
          <el-date-picker
            v-model="quitform.hr_resign_applyDate"
            type="date"
            value-format="yyyy-MM-dd"
            readonly
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="预定离职日期">
          <el-date-picker
            v-model="quitform.hr_resign_schLeave"
            type="date"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="离职类型">
          <el-select v-model="quitform.hr_resign_category">
            <el-option :value="1" label="离职"></el-option>
            <el-option :value="2" label="辞退"></el-option>
            <el-option :value="3" label="合同终止"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="startQuit" type="primary">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import cardRecord from "./components/card-record";
import correntedTabs from "./components/corrented-Tabs";
import modifyWindow from "./components/modify-window";
import Paging from "@/components/paging/paging";
import { getDates } from "@/components/global-fn/global-fn";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table";
import {
  apiuserTreeList,
  apipmuserList,
  apipersonalRecords,
  apiaddResign
} from "@/request/api.js";
export default {
  name: "staffInformation",
  data() {
    return {
      winheight: document.documentElement.scrollHeight - 126 + "px",
      defaultProps: {
        children: "children",
        label: "name"
      },
      TreeList: [],
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
        ["身份证地址", "card_address", 270],
        ["状态", "status", 80]
      ],
      headle: ["编辑", "删除"],
      total: 400,
      currentpage: 1,
      currentlimit: 15,
      roleList: [],
      isopenNoCor: false,
      userList: {},
      recordList: {},
      submitType: "",
      company_name: "",
      isopenCard: false,
      activeLine: {},
      isstartQuit: false,
      quitform: {
        hr_resign_applyDate: getDates(new Date())
      }
    };
  },
  components: {
    Paging,
    CaRuleTable,
    modifyWindow,
    correntedTabs,
    cardRecord
  },
  mounted() {
    this.getpmuserList();
    this.getuserTree();
  },
  methods: {
    //启动离职流程
    startQuit() {
      this.quitform.username = this.activeLine.username;
      this.quitform.hr_resign_userid = this.activeLine.userid;
      console.log(this.quitform);
      this.$confirm(`你确定提交吗?`)
        .then(() => {
          apiaddResign(this.quitform).then(res => {
            console.log(res);
            this.$message.success(`${res.msg}，${res.message}`);
            this.isstartQuit = false;
            this.getpmuserList();
          });
        })
        .catch(() => {});
    },
    quit() {
      console.log(this.activeLine.sex);
      this.$confirm(
        `你确定${this.activeLine.sex == "女" ? "她" : "他"}要离职吗？`
      )
        .then(() => {
          this.isstartQuit = true;
        })
        .catch(() => {});
    },
    //点击行的回调
    checkline([row, event, column]) {
      console.log(row);
      this.activeLine = row;
    },
    openCard() {
      this.isopenCard = true;
    },
    //打开未转正窗口
    openNotCorrected() {
      this.isopenNoCor = true;
    },
    deleteline(e) {
      console.log(e);
    },
    //编辑
    edit(e) {
      this.submitType = "";
      apipersonalRecords({
        cid: e.userid,
        department: e.department ? e.department : ""
      }).then(res => {
        console.log(res);
        this.isadd = true;
        this.userList = res.data.userDetail;
        //如果职位列表为空则历遍获得职位列表数组
        if (this.roleList == "") {
          res.roles.forEach(item => {
            this.roleList.push([item.role_id, item.role_name]);
          });
        }
        this.recordList = res.data;
      });
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
        this.TreeList = res.data;
      });
    },
    nodeClick(row) {
      this.company_name = "";
      this.centerName = "";
      this.departmentName = "";
      this.TreeList.forEach(item => {
        if (item.id == row.id) {
          this.company_name = item.name;
          this.getpmuserList();
          return;
        } else {
          item.children.forEach(item2 => {
            if (item2.id == row.id) {
              this.centerName = item2.name;
              this.getpmuserList();
              return;
            } else {
              item2.children.forEach(item3 => {
                if (item3.id == row.id) {
                  this.departmentName = item3.name;
                  this.getpmuserList();
                  return;
                }
              });
            }
          });
        }
      });
    },
    getpmuserList() {
      let data = {
        rows: this.currentlimit,
        page: this.currentpage,
        username: this.form.name,
        userid: this.form.number,
        department_name: this.departmentName,
        center_name: this.centerName,
        company_name: this.company_name,
        status: this.form.status == "" ? 0 : this.form.status
      };
      apipmuserList(data).then(res => {
        console.log(res);
        this.total = res.total;
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
    closewin() {
      this.isadd = false;
    },
    addstaff() {
      this.isadd = false;
      this.$nextTick(() => {
        this.isadd = true;
      });
      this.userList = {};
      this.submitType = "new";
      if (this.roleList == "") {
        apipersonalRecords().then(res => {
          //如果职位列表为空则历遍获得职位列表数组
          res.roles.forEach(item => {
            this.roleList.push([item.role_id, item.role_name]);
          });
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.menu {
  padding: 10px;
  border-bottom: 1px solid #e4e7ed;
  font-weight: 700;
}
.menu_main {
  border: 1px solid #e4e7ed;
  background: #e4e7ed;
}
</style>
