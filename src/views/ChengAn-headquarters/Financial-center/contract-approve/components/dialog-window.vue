<template>
  <div>
    <el-form
      size="mini"
      :model="contractapprove"
      label-width="110px"
      label-position="left"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="项目名称">
            <el-input
              v-model="contractapprove.manage_contractapprove_name"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="所属公司">
            <el-input
              v-model="contractapprove.manage_contractapprove_company"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="项目地址">
            <el-input
              v-model="contractapprove.manage_contractapprove_address"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="发包方（甲方）">
            <el-input
              v-model="contractapprove.manage_contractapprove_firstParty"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合同金额">
            <el-input
              v-model="contractapprove.manage_contractapprove_amount"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="乙方">
            <el-input
              v-model="contractapprove.manage_contractapprove_secondParty"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="contractapprove.manage_contractapprove_startTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择时间"
              style="width:100%;"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="contractapprove.manage_contractapprove_endTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择时间"
              style="width:100%;"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="付款比例">
            <el-input
              v-model="contractapprove.manage_contractapprove_payment"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item>
          <el-col :span="12">
            <el-radio-group
              v-model="contractapprove.manage_contractapprove_taxIncluded"
              size="mini"
            >
              <el-radio :label="1" border>含税</el-radio>
              <el-radio :label="2" border>不含税</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="12">
            <el-radio-group v-model="contractapprove.category" size="mini">
              <el-radio :label="1" border>施工合同</el-radio>
              <el-radio :label="2" border>供应商合同</el-radio>
              <el-radio :label="3" border>合作合同</el-radio>
            </el-radio-group>
          </el-col>
        </el-form-item>
      </el-row>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          :rows="5"
          v-model="contractapprove.manage_contractapprove_remark"
        ></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="8"
          ><el-form-item v-if="isnew" label="选择审核人"
            ><Ca-picker-c
              @setApprover="getSpprover"
            ></Ca-picker-c> </el-form-item
        ></el-col>
        <el-col :span="8">
          <!-- <div style="margin-left:20px;">
            <el-button type="primary" size="mini">立即提交</el-button>
          </div> -->
          <el-upload
            style="margin-left:20px;"
            ref="upload"
            action="string"
            :auto-upload="false"
            :before-upload="beforeUpload"
          >
            <el-button
              type="success"
              style="margin-left: 10px;"
              size="mini"
              @click="submitUpload"
              >立即提交</el-button
            >
            <el-button slot="trigger" size="mini" type="primary"
              >选取文件</el-button
            >
            <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </el-col>
      </el-row>
      <el-form-item label="流程线">
        <el-steps :space="400" :active="0" finish-status="success">
          <el-step
            :title="item.name"
            v-for="(item, index) in activityList[contractapprove.category - 1]"
            :key="index"
          ></el-step>
        </el-steps>
      </el-form-item>
    </el-form>
    <h5>审批流程</h5>
    <el-table :data="history" border="">
      <el-table-column
        v-for="(item, index) in HeaderList"
        :key="index"
        :label="item[0]"
        :prop="item[1]"
        :type="index == 0 ? 'index' : ''"
        :width="item[2]"
        align="center"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import { apisave_conApprove } from "@/request/api.js";
import CaPickerC from "@/components/Ca-picker-c/Ca-picker-c";
export default {
  name: "dialogWindow",
  data() {
    return {
      HeaderList: [
        ["序号", ""],
        ["步骤名称", "name_"],
        ["相关人员", "username"],
        ["开始时间", "starttime"],
        ["结束时间", "endtime"],
        ["审核意见", "MESSAGE_"],
        ["内容", ""]
      ]
    };
  },
  components: {
    CaPickerC
  },
  props: {
    history: Array,
    contractapprove: Object,
    activityList: Array,
    isnew: Boolean
  },
  methods: {
    //文件上传前的钩子
    beforeUpload(file) {
      let Url = "http://192.168.11.124:8081/casd2/admin";
      let fd = new FormData();
      fd.append("file", file); //传文件
      console.log(fd);
      axios({
        method: "post",
        url: "http://192.168.11.124:8081/casd2/admin/uploadContractFile",
        data: fd,
        headers: {
          "Content-Type": "multipart/form-data",
          token: localStorage.getItem("token")
        }
      })
        .then(res => {
          console.log(res);
          this.contractapprove.manage_contractapprove_attachAddress =
            Url + res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //提交审批
    submitUpload() {
      apisave_conApprove(this.contractapprove).then(res => {
        console.log(res);
        this.$refs.upload.submit();
        this.$message.success("提交成功！");
        this.$emit("closewin");
      });
    },
    //从子组件中获取下一审核人ID
    getSpprover(userid) {
      this.contractapprove.userid = userid;
    }
  }
};
</script>

<style lang="scss" scoped></style>
