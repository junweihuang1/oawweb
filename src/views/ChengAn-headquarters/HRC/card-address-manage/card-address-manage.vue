<template>
  <div style="width:60%;">
    <el-form label-width="80px" inline>
      <el-form-item label="项目名称">
        <el-input v-model="projectName" />
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button type="primary" size="mini" @click="query">查询</el-button>
          <el-button type="success" size="mini" @click="addCompanyInf"
            >新增</el-button
          >
          <el-button type="danger" size="mini" @click="deleteitem"
            >删除</el-button
          >
        </el-button-group>
      </el-form-item>
    </el-form>

    <Ca-rule-table
      :DataList="cardAddressList"
      :header="headerList"
      :headle="headleList"
      @checkleave="openwindow"
      :setselect="isselect"
      @setselect="getselect"
    ></Ca-rule-table>
    <el-dialog :visible.sync="isopen" title="地址信息" width="30%" >
      <el-form ref="form" :model="form" label-width="90px">
        <el-form-item label="项目地址" prop="project_address_name">
          <el-input v-model="form.project_address_name"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="construct_project_name">
          <el-input
            v-model="form.construct_project_name"
            readonly="readonly"
            @focus="openSelect"
          ></el-input>
        </el-form-item>
        <el-form-item label="范围（米）" prop="address_radius">
          <el-input v-model="form.address_radius"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="modify">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <paging
      @setlimit="getlimit"
      @setpage="getpage"
      :total="total"
      :currentpage="currentpage"
      :currentlimit="currentlimit"
    ></paging>
    <el-dialog
    v-dialogDrag
      :visible.sync="isopenSelect"
      title="选择项目名称"
      top="8vh"
      width="60%"
      class="abow_dialog"
    >
      <select-project
        @setSelectName="setSelectName"
        v-if="isopenSelect"
      ></select-project>
    </el-dialog>
  </div>
</template>

<script>
import selectProject from "@/components/Ca-select/select-project";
import paging from "@/components/paging/paging";
import CaRuleTable from "@/components/Ca-table/Ca-rule-table.vue";
import {
  apiattendAddress,
  addattendAddress,
  modifyattendAddress
} from "@/request/api.js";
export default {
  name: "companyRecord",
  data() {
    return {
      projectName: "",
      isselect: true,
      cardAddressList: [],
      headerList: [
        ["地址ID", "project_address_id", 85],
        ["项目名称", "construct_project_name", 280],
        ["地址", "project_address_name"],
        ["范围(米)", "address_radius", 90]
      ],
      headleList: ["修改"],
      isopen: false,
      form: {},
      selectList: [],
      currentpage: 1,
      currentlimit: 15,
      total: 85,
      isopenSelect: false
    };
  },
  components: {
    CaRuleTable,
    paging,
    selectProject
  },
  mounted() {
    this.getCardAddressInf();
  },
  methods: {
    //选择项目名称子组件回调的方法
    setSelectName(row) {
      this.isopenSelect = false;
      this.form.construct_project_name = row.construct_project_name;
      this.form.project_id = row.construct_project_id;
    },
    openSelect() {
      this.isopenSelect = true;
    },

    //获取当前页数
    getpage(e) {
      this.currentpage = e;
      this.getCardAddressInf();
    },
    //获取当前页显示数量
    getlimit(e) {
      this.currentlimit = e;
      this.getCardAddressInf();
    },
    //增加公司
    addCompanyInf() {
      this.form = {
        address_radius: "",
        construct_project_name: "",
        project_address_id: "",
        project_address_name: "",
        project_id: ""
      };
      this.isopen = true;
    },
    //查询公司信息
    query() {
      this.currentlimit = 15;
      this.currentpage = 1;
      this.getCardAddressInf();
    },
    //获取所有打卡地址信息
    getCardAddressInf() {
      apiattendAddress({
        pageSize: this.currentlimit,
        limit: this.currentpage
      }).then(res => {
        this.total = res.total;
        this.cardAddressList = res.data;
      });
    },
    //打开编辑窗口
    openwindow(e) {
      this.form = {
        address_radius: e.address_radius,
        construct_project_name: e.construct_project_name,
        project_address_id: e.project_address_id,
        project_address_name: e.project_address_name,
        project_id: e.project_id
      };
      this.isopen = true;
    },
    modify() {
      console.log(this.form);
      if (this.form.project_address_id == "") {
        this.addAddress();
      } else {
        modifyattendAddress({
          project_address_id: this.form.project_address_id,
          project_address_name: this.form.project_address_name,
          project_id: this.form.project_id,
          address_radius: this.form.address_radius
        }).then(res => {
          this.$message.success(res.msg);
          this.isopen = false;
          this.getCardAddressInf();
          console.log(res);
        });
      }
    },
    addAddress() {
      addattendAddress({
        project_address_name: this.form.project_address_name,
        project_id: this.form.project_id,
        address_radius: this.form.address_radius
      }).then(res => {
        console.log(res);
        this.cardAddressList.forEach(item => {
          if (item.project_address_id == this.form.project_address_id) {
            item.project_address_name = this.form.project_address_name;
            item.address_radius = this.form.address_radius;
          }
        });
        this.$message.success("修改成功");
        setTimeout(() => {
          this.form.old_name = this.form.company_name;
          this.isopen = false;
        }, 1500);
      });
    },
    deleteitem() {
      if (this.selectList == "") {
        this.$message.error("请选择公司");
        return;
      }
    },
    getselect(val) {
      this.selectList = val.map(item => item.company_id);
    }
  }
};
</script>

<style lang="scss" scoped></style>
