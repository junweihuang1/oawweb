<template>
  <div>
    <el-divider content-position="left">项目信息</el-divider>
    <el-row>
      <el-form inline size="mini" label-width="130px" label-position="left">
        <el-form-item label="项目名称">
          <el-input
            v-if="headform.construct_project_name"
            v-model="headform.construct_project_name"
            readonly
            clearable
          ></el-input>
          <el-input
            v-else
            v-model="headform.manage_contract_name"
            readonly
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="工程地址">
          <el-input
            v-if="headform.construct_project_addr"
            v-model="headform.construct_project_addr"
            readonly
            clearable
          ></el-input>
          <el-input
            v-else
            v-model="headform.manage_contract_address"
            readonly
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="项目经理">
          <el-input
            v-model="headform.construct_project_leader"
            readonly
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="项目经理联系方式">
          <el-input
            v-model="headform.construct_project_leaderTel"
            readonly
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-divider content-position="left">材料信息</el-divider>
    <el-row>
      <el-form inline size="mini" label-width="130px" label-position="left">
        <el-form-item label="计划日期">
          <el-date-picker
            type="date"
            style="width:100%;"
            v-model="activeForm.construct_purchase_planDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="希望送达时间">
          <el-date-picker
            type="date"
            style="width:100%;"
            v-model="activeForm.construct_purchase_arriveDate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="材料计划员">
          <el-input
            @focus="openselectplanMan"
            v-model="activeForm.construct_purchase_planMan"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="复核员">
          <el-input
            @focus="openselectreviewer"
            v-model="activeForm.construct_purchase_reviewer"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商">
          <el-input
            v-model="activeForm.construct_purchase_supplier"
            readonly
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="供应商联系方式">
          <el-input
            readonly
            clearable
            v-model="activeForm.construct_purchase_supplierTel"
          ></el-input>
        </el-form-item>
        <el-form-item label="材料类别" v-if="openType !== 'check'">
          <el-input
            @focus="openselectMaterialseries"
            clearable
            v-model="activeForm.construct_purchase_materialSerName"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-divider content-position="left">班组信息</el-divider>
    <el-form inline>
      <el-form-item v-if="openType == 'add' || openType == 'edit'">
        <el-button-group>
          <el-button type="primary" size="mini" @click="additem"
            >添加行</el-button
          >
          <el-button type="warning" size="mini" @click="cancel">撤销</el-button>
        </el-button-group>
      </el-form-item>
      <el-form-item
        v-if="
          currentTaskName == '成本中心经理' ||
            currentTaskName == '成本材料中心总监' ||
            currentTaskName == '采购核对单价'
        "
      >
        <el-button type="success" @click="chooseSup">选择供应商</el-button>
      </el-form-item>
      <el-form-item
        v-else-if="
          currentTaskName == '项目部签收' ||
            currentTaskName == '项目经理签收' ||
            currentTaskName == '核对签收'
        "
      >
        <el-upload
          ref="upload"
          :action="file_url"
          :headers="{ token: token }"
          :data="{ construct_purchase_id: activeForm.construct_purchase_id }"
          :limit="1"
          :on-success="headleSuccess"
          :before-upload="beforeUp"
        >
          <el-button size="mini" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item v-if="current >= picitem">
        <el-button
          :disabled="fileName == '' && activeForm.photo == null ? true : false"
          type="success"
          size="mini"
          @click="openpic"
          >打开图片</el-button
        ></el-form-item
      >
      <el-form-item v-if="openType !== 'add'">
        <el-button type="success" @click="print">打印</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="f_entryList"
      border
      :header-cell-style="getRowClass"
      max-height="400px"
      show-summary
    >
      <el-table-column
        :label="item[0]"
        v-for="(item, index) in header"
        :key="index"
        :width="item[2]"
        align="center"
        :prop="item[1]"
      >
        <template slot-scope="{ row }">
          <input
            type="text"
            v-model="row[item[1]]"
            class="inputbox"
            v-if="openType !== 'check' && item[0] == '材料名称'"
            placeholder="请选择"
            @focus="openselectMaterial(row)"
          />
          <input
            type="text"
            v-model="row[item[1]]"
            class="inputbox"
            @input="changeValue(row, item[1])"
            placeholder="请输入"
            v-else-if="openType !== 'check' && item[3] == 'edit'"
          />
          <span v-else>
            {{ row[item[1]] }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label=""
        width="80"
        align="center"
        fixed="right"
        v-if="openType == 'add' || openType == 'edit'"
      >
        <template slot-scope="{ row }">
          <el-button
            class="el-icon-delete-solid"
            type="warning"
            @click="deleteitem(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-form>
      <el-form-item style="text-align:right;">
        <el-button
          v-if="openType == 'add' || openType == 'edit'"
          type="primary"
          size="mini"
          style="margin:20px 100px 20px 0;"
          @click="save"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
    <div v-if="openType == 'headle'">
      <el-divider content-position="left">流程审批</el-divider>
      <el-form label-width="70px">
        <el-row style="width:70%">
          <el-col :span="24">
            <el-form-item label="意见">
              <el-input v-model="reasons" type="textarea" :row="3"></el-input>
            </el-form-item>
          </el-col>
          <template v-if="userTaskName != '结束' && openType == 'headle'">
            <el-col :span="12">
              <el-form-item label="下一节点">
                <el-input readonly v-model="userTaskName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="审核人">
                <el-select
                  v-model="userid"
                  style="width:100%;"
                  placeholder="没绑定审核人"
                >
                  <el-option
                    v-for="(item, index) in userList"
                    :key="index"
                    :value="item.userid"
                    :label="item.username"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </template>
          <el-col :span="12">
            <el-form-item>
              <template v-for="(item, index) in buttonList">
                <el-button
                  v-if="item == 'submit'"
                  :key="index"
                  type="success"
                  size="small"
                  @click="headleprocess(true)"
                  >提交</el-button
                >
                <el-button
                  v-if="item == 'Resubmit'"
                  :key="index"
                  type="success"
                  size="mini"
                  @click="headleprocess(true, 'again')"
                  >重新提交</el-button
                >
                <el-dropdown
                  split-button
                  type="warning"
                  size="small"
                  style="margin-left:10px;"
                  :key="index"
                  v-else-if="item == 'reject'"
                  @click="headleprocess(false)"
                  @command="getReturnName"
                >
                  驳回到{{ returnName }}
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item
                      v-for="(item, index) in taskList"
                      :key="index"
                      :command="index"
                      >{{ item.name }}</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
                <el-button
                  v-else-if="item == 'disagree'"
                  :key="index"
                  type="danger"
                  size="small"
                  @click="headleprocess('finish')"
                  >不同意</el-button
                >
              </template>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <template v-if="openType == 'headle'">
      <el-divider content-position="left">流程线</el-divider>
      <el-steps
        :active="current"
        :align-center="true"
        :space="200"
        finish-status="success"
      >
        <el-step
          v-for="(item, index) in activityList"
          :title="item.name"
          :key="index"
        ></el-step>
      </el-steps>
    </template>
    <template v-if="openType != 'add'">
      <el-divider content-position="left">审批记录</el-divider>
      <Ca-view-process :Approvaltable="ProcessList"></Ca-view-process>
    </template>
    <el-dialog
      :visible.sync="isselectMaterialseries"
      :append-to-body="true"
      v-dialogDrag
    >
      <select-material-series
        @setSelectName="getSelectName"
        v-if="isselectMaterialseries"
      ></select-material-series>
    </el-dialog>
    <el-dialog
      :visible.sync="isselectMaterial"
      :append-to-body="true"
      v-dialogDrag
    >
      <select-material
        @setSelectName="getMaterialName"
        :projectId="headform.construct_project_id"
        :materialSerId="activeForm.construct_purchase_materialSerId"
        v-if="isselectMaterial"
      ></select-material>
    </el-dialog>
    <el-dialog :visible.sync="isreviewer" :append-to-body="true" v-dialogDrag>
      <select-teams
        @setSelectName="getreviewerName"
        v-if="isreviewer"
      ></select-teams>
    </el-dialog>
    <el-dialog :visible.sync="isplanMan" :append-to-body="true" v-dialogDrag>
      <select-teams
        @setSelectName="getplanManName"
        v-if="isplanMan"
      ></select-teams>
    </el-dialog>
    <el-dialog :visible.sync="isselect" :append-to-body="true" v-dialogDrag>
      <select-supplist
        :Ids="Ids"
        v-if="isselect"
        :activeform="activeForm"
        @close="close"
        :entryList="f_entryList"
      ></select-supplist>
    </el-dialog>
  </div>
</template>

<script>
import http from "@/request/http";
import selectSupplist from "./select-supplist";
import CaViewProcess from "@/components/Ca-view-process/Ca-view-process";
import selectTeams from "@/components/Ca-select/select-teams";
import selectMaterial from "@/components/Ca-select/select-material";
import selectMaterialSeries from "@/components/Ca-select/select-material-series";
import {
  apisavePurchase,
  apimodPurchase,
  apiPurchaseProcess,
  apipassPurchase,
  apipurchaseExcelprint
} from "@/request/api.js";
export default {
  name: "projectInfor",
  data() {
    return {
      fileName: "",
      token: sessionStorage.getItem("token"),
      file_url: http.base_url + "uploadPurchasePhoto",
      Process_header: [
        ["步骤名称", "name_", 100],
        ["相关人员", "username", 100],
        ["发生时间", "END_TIME_", 120],
        ["中心", "center_name", 100],
        ["部门", "department_name", 100],
        ["审核意见", "MESSAGE_"]
      ],
      header: [
        ["材料名称", "construct_purchase_material", 100],
        ["型号规格", "construct_purchase_model", 100],
        ["单位", "construct_purchase_unit", 80],
        ["合同工程量", "construct_purchase_quantities", 120],
        ["累计审批量", "construct_purchase_approvalNum", 120],
        ["计划采购量", "construct_purchase_applyNum", 120, "edit"],
        ["合同单价", "construct_purchase_contractPrice", 100],
        ["采购单价", "construct_purchase_purchasePrice", 100],
        ["采购小计", "construct_purchase_purchaseTotal", 100],
        ["材料品牌", "construct_purchase_brand", 100, "edit"],
        ["备注", "construct_purchase_remarks", "", "edit"]
      ],
      isselectMaterialseries: false,
      isselectMaterial: false,
      currentSelect: {},
      isreviewer: false,
      isplanMan: false,
      isselect: false,
      reasons: "",
      userTaskName: "",
      currentTaskName: "",
      userid: 0,
      maxid: 0,
      userList: [],
      current: 1,
      buttonList: [],
      activityList: [],
      usertask: 1,
      Ids: [],
      taskList: [],
      picitem: 2, //可以打开图片的节点
      returnName: "项目助理", //驳回节点名字
      f_entryList: this.entryList //从父组件传过来的材料列表不能删除，只能赋值后再删除
    };
  },
  props: {
    ProcessList: Array,
    headform: Object,
    openType: String,
    entryList: Array,
    activeForm: {
      type: Object
    },
    active: Object
  },
  components: {
    selectMaterialSeries,
    selectMaterial,
    selectTeams,
    CaViewProcess,
    selectSupplist
  },
  created() {
    this.getprossList();
  },
  watch: {
    // f_entryList(val) {
    //   if (val != "") {
    //     this.maxid = val[0].construct_purchase_entryId;
    //     val.forEach(item => {
    //       if (item.construct_purchase_entryId > this.maxid) {
    //         this.maxid = item.construct_purchase_entryId;
    //       }
    //     });
    //     this.maxid++;
    //   }
    // },
    entryList(val) {
      this.f_entryList = val;
    }
  },
  computed: {
    // maxid() {
    //   let id =
    //     this.f_entryList && this.f_entryList != ""
    //       ? this.f_entryList[0].construct_purchase_entryId
    //       : 0;
    //   this.f_entryList.forEach(item => {
    //     if (item.construct_purchase_entryId > id) {
    //       id = item.construct_purchase_entryId;
    //     }
    //   });
    //   console.log(id);
    //   return id++;
    // }
  },
  methods: {
    deleteitem(row) {
      console.log(this.f_entryList);
      this.f_entryList = this.f_entryList.filter(item => {
        if (item.id) {
          return item.id !== row.id;
        } else {
          return (
            item.construct_purchase_entryId !== row.construct_purchase_entryId
          );
        }
      });
    },
    //导出表格
    print() {
      window.open(
        `${http.base_url}purchaseExcelprint?bizId=${
          this.activeForm.construct_purchase_id
        }`
      );
      // window.location.href = ;
    },
    //打开图片
    openpic() {
      console.log(this.activeForm.photo);
      let url = this.activeForm.photo
        ? this.activeForm.photo
        : `/PurchasePhoto/${this.fileName}`;
      if (this.fileName != "" || this.activeForm.photo) {
        window.open("http://file.casdapi.com" + url);
      } else {
        this.$message.warning("没上传文件");
      }
    },
    headleSuccess(res) {
      console.log(res);
      this.$refs.upload.clearFiles();
      this.$message.success(res.msg);
    },
    //上传
    beforeUp(file) {
      this.fileName = file.name;
    },
    close(supplist) {
      console.log(supplist);
      this.activeForm.construct_purchase_supplier = supplist[0];
      this.activeForm.construct_purchase_supplierTel = supplist[1];
      this.isselect = false;
    },
    //选择供应商
    chooseSup() {
      this.Ids = this.f_entryList.map(item => item.construct_purchase_entryId);
      this.isselect = true;
    },
    getReturnName(command) {
      this.taskList.forEach((item, index) => {
        if (command == index) {
          this.usertask = index + 1;
          this.returnName = item.name;
        }
      });
      console.log(this.returnName);
    },
    changeValue(row, filter) {
      if (
        filter == "construct_purchase_applyNum" &&
        row.construct_purchase_quantities - row.construct_purchase_approvalNum <
          parseInt(row.construct_purchase_applyNum)
      ) {
        this.$message.error("计划采购量已超量");
        return;
      }
    },
    //办理
    headleprocess(type, re) {
      console.log(this.activeForm);
      if (this.reasons == "") {
        this.$message.error("请填写审核意见");
        return;
      }
      if (this.userid === "" && type) {
        this.$message.error("审核人为空不能提交！");
        return;
      }
      if (
        (this.currentTaskName == "成本中心经理" ||
          this.currentTaskName == "成本材料中心总监" ||
          this.currentTaskName == "采购核对单价") &&
        this.activeForm.construct_purchase_supplier == "" &&
        type
      ) {
        this.$message.error("请选择供应商");
        return;
      }
      let data = {
        processInstanceId: this.active.PROC_INST_ID_
          ? this.active.PROC_INST_ID_
          : this.active.taskid, //(必填)运行时id
        taskid: this.active.ID_, //(必填)实例id
        sign: type, //(必填)是否同意
        reason: this.reasons, //(必填)审核意见
        usertask: this.usertask, //(必填)驳回节点
        taskName: this.active.NAME_, //(必填)当前节点id
        construct_purchase_id: this.active.BUSINESS_KEY_
          ? this.active.BUSINESS_KEY_.split(".")[1]
          : this.active.businessId, //(必填)材料单id
        userid: this.userid //(必填)下一审批人id
      };
      console.log(data);
      this.$confirm(
        `确定${type === true ? "办理" : type === false ? "驳回" : "不同意"}吗？`
      )
        .then(() => {
          apipassPurchase(data).then(res => {
            console.log(res);
            this.$message.success(res.msg);
            this.$emit("close");
          });
        })
        .catch(() => {});
    },
    getprossList() {
      let data = {};
      //当active（待办）不为空时
      if (this.active) {
        data = {
          taskid: this.active.ID_,
          processInstanceId: this.active.PROC_INST_ID_
            ? this.active.PROC_INST_ID_
            : this.active.taskid,
          taskName: this.active.NAME_,
          key: "Purchase_payment",
          construct_purchase_id: this.active.BUSINESS_KEY_
            ? this.active.BUSINESS_KEY_.split(".")[1]
            : this.active.businessId
        };
        apiPurchaseProcess(data).then(res => {
          console.log(res);
          this.userTaskName = res.userlist.userTaskName;
          this.buttonList = res.startForm.split(",");
          this.userid =
            this.userTaskName == "结束"
              ? 0
              : res.userlist.userList && res.userlist.userList != ""
              ? res.userlist.userList[0].userid
              : "";
          this.userList =
            res.userlist.userList && res.userlist.userList != ""
              ? res.userlist.userList
              : [];
          //获取驳回节点的数组
          //当前步骤名称
          if (this.ProcessList != "") {
            let currentTask = this.ProcessList[this.ProcessList.length - 1];
            this.currentTaskName = currentTask.name_;
            this.activityList = res.activityList.map((item, index) => {
              if (item.name == this.currentTaskName) {
                this.current = currentTask.END_TIME_ == "" ? index : index + 1;
              }
              if (
                item.name == "项目部签收" ||
                item.name == "项目经理签收" ||
                item.name == "核对签收"
              ) {
                this.picitem = index + 1;
              }
              return item;
            });
          } else {
            this.activityList = res.activityList;
          }
          //获取驳回节点的数组
          if (
            this.active.PROC_DEF_ID_ &&
            this.active.PROC_DEF_ID_.split(":")[1] !== 2
          ) {
            this.taskList = this.activityList.slice(0, this.current);
          }
        });
      }
    },
    //
    //从子组件获取计划员姓名
    getplanManName(row) {
      this.activeForm.construct_purchase_planMan = row.username;
      this.isplanMan = false;
    },
    //从子组件获取复核员姓名
    getreviewerName(row) {
      this.activeForm.construct_purchase_reviewer = row.username;
      this.isreviewer = false;
    },
    //打开选择计划员
    openselectplanMan() {
      this.isplanMan = true;
    },
    //打开选择复核员
    openselectreviewer() {
      this.isreviewer = true;
    },
    //双击选择材料，接收子组件回调的方法。赋值给点击的行
    getMaterialName(row) {
      //判断当前是否有选择该材料
      console.log(row);
      if (
        this.f_entryList &&
        this.f_entryList.some(
          item =>
            item.construct_purchase_quantitiesId ==
            row.construct_project_quantities_id
        )
      ) {
        this.$message.error("该材料已选择");
        return;
      }
      this.currentSelect.construct_purchase_quantitiesId =
        row.construct_project_quantities_id;
      this.currentSelect.construct_purchase_material =
        row.construct_material_name;
      this.currentSelect.construct_purchase_model =
        row.construct_material_model_name;
      this.currentSelect.construct_purchase_unit =
        row.construct_material_model_unit;
      this.currentSelect.construct_purchase_quantities =
        row.construct_project_quantities_num;
      this.currentSelect.construct_purchase_approvalNum = row.sum;
      this.currentSelect.construct_purchase_contractPrice =
        row.construct_project_quantities_price;
      this.currentSelect.construct_purchase_purchasePrice = "";
      this.currentSelect.construct_purchase_purchaseTotal = "";
      this.isselectMaterial = false;
    },
    openselectMaterial(row) {
      this.currentSelect = row;
      this.isselectMaterial = true;
    },
    //获取材料系列信息
    getSelectName(row) {
      this.activeForm.construct_purchase_materialSerName =
        row.construct_material_seriesName;
      this.activeForm.construct_purchase_materialSerId =
        row.construct_material_seriesID;
      this.isselectMaterialseries = false;
    },
    openselectMaterialseries() {
      this.isselectMaterialseries = true;
    },
    cancel() {
      this.f_entryList.pop();
    },
    additem() {
      let select = this.activeForm.construct_purchase_materialSerName;
      if (select == "") {
        this.$message.error("请先选择材料类别");
        return;
      }
      //construct_purchase_entryId
      this.maxid++;
      this.f_entryList.push({
        id: this.maxid,
        construct_purchase_entryId: 0,
        construct_purchase_material: "", //(必填)材料名称
        construct_purchase_model: "", //(必填)型号规格
        construct_purchase_unit: "", //(必填)单位
        construct_purchase_quantities: "", //(必填)合同工程量
        construct_purchase_approvalNum: "", //(必填)累计审批量
        construct_purchase_applyNum: "", //(必填)计划采购量
        construct_purchase_contractPrice: "", //(必填)合同单价
        construct_purchase_purchasePrice: "", //(必填)采购单价
        construct_purchase_purchaseTotal: "", //(必填)采购小计
        construct_purchase_remarks: "", //(必填)备注
        construct_purchase_brand: "", //(必填)品牌
        construct_purchase_quantitiesId: "" //(必填)合同工程量id
      });
      console.log(this.f_entryList);
    },
    save() {
      if (this.activeForm.construct_purchase_planDate == "") {
        this.$message.error("计划时间不能为空");
        return;
      }
      if (this.activeForm.construct_purchase_arriveDate == "") {
        this.$message.error("希望送到时间不能为空");
        return;
      }
      if (
        this.activeForm.construct_purchase_planMan == "" ||
        !this.activeForm.construct_purchase_planMan
      ) {
        this.$message.error("计划员不能为空");
        return;
      }
      if (
        this.activeForm.construct_purchase_reviewer == "" ||
        !this.activeForm.construct_purchase_reviewer
      ) {
        this.$message.error("复核员不能为空");
        return;
      }
      if (
        this.currentTaskName == "成本中心经理" ||
        this.currentTaskName == "成本材料中心总监" ||
        (this.currentTaskName == "采购核对单价" &&
          this.construct_purchase_supplier == "")
      ) {
        this.$message.error("请选择供应商");
        return;
      }
      let i = 0,
        len = this.f_entryList.length;
      for (i; i < len; i++) {
        if (this.f_entryList[i].construct_purchase_applyNum == "") {
          this.$message.error("计划采购量不能为空");
          return;
        }
        if (
          this.f_entryList[i].construct_purchase_quantities -
            this.f_entryList[i].construct_purchase_approvalNum <
          parseInt(this.f_entryList[i].construct_purchase_applyNum)
        ) {
          this.$message.error("计划采购量已超量");
          return;
        }
      }
      if (this.f_entryList == "") {
        this.$message.error("请增加材料");
        return;
      }
      // this.f_entryList = this.f_entryList.map(item => {
      //   console.log()
      //   return {
      //     construct_project_workTeam_projectId: "", //(必填)项目id
      //     construct_project_workTeam_category: "", //(必填)班组类型
      //     construct_project_workTeam_amount: "", //(必填)合同金额
      //     construct_project_workTeam_price: "", //(必填)单价
      //     construct_project_workTeam_departmentId: "", //(必填)项目部id
      //     construct_project_workTeam_userId: "" //(必填)人员id
      //   };
      // });
      this.activeForm.entry = JSON.stringify(this.f_entryList);
      console.log(this.activeForm);
      if (this.openType == "add") {
        this.$confirm(`确定保存吗？`)
          .then(() => {
            apisavePurchase(this.activeForm).then(res => {
              console.log(res);
              this.$message.success(res.msg);
              this.$emit("close");
            });
          })
          .catch(() => {});
      } else {
        this.$confirm(`确定修改吗？`)
          .then(() => {
            apimodPurchase(this.activeForm)
              .then(res => {
                console.log(res);
                this.$message.success(res.msg);
                this.$emit("close");
              })
              .catch(err => console.log(err));
          })
          .catch(() => {});
      }
    },
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

<style lang="scss">
.el-divider {
  text-shadow: 2px 2px 2px #aaa;
}
.el-table--border td:first-child .cell {
  padding-left: 0;
}
.el-table td .cell {
  padding: 0;
  line-height: 30px;
}
.el-table--small td {
  padding: 0;
}

.el-step__title {
  font-size: 12px;
}
</style>
