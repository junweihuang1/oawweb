<template>
  <div>
    <el-form inline size="mini">
      <el-form-item>
        <el-radio-group @change="selectType" v-model="templateType">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="合同标准"></el-radio-button>
          <el-radio-button label="行政标准"></el-radio-button>
          <el-radio-button label="财务标准"></el-radio-button>
          <el-radio-button label="企业标准"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="success" class="el-icon-plus" @click="openAddWin"
          >新增</el-button
        >
      </el-form-item>
    </el-form>
    <rule-table
      style="width:90%;"
      :header="headerList"
      :DataList="DataList"
      @checkleave="opanLeaveList"
      :headle="headle"
      @delete="deletefile"
      @edit="download"
    ></rule-table>
    <paging
      :currentpage="currentpage"
      :currentlimit="currentlimit"
      :total="10"
      @setpage="getpage"
      @setlimit="getlimit"
    ></paging>
    <el-dialog title="模板" :visible.sync="isopen" width="30%">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="模板编号">
          <el-input
            v-model="form.hr_templatel_id"
            clearable
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="模板名称">
          <el-input v-model="form.hr_template_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select
            style="width:100%"
            v-model="form.hr_templatel_type"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="普通文本域">
          <el-input
            type="textarea"
            row="2"
            v-model="form.hr_templatel_describe"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload
            v-if="isopen"
            ref="upload"
            :data="{ uploadPath: 'templatel/', oldfileName: oldFileName }"
            name="file"
            :action="file_src"
            :limit="1"
            :headers="{ token: token }"
            :on-change="handleChange"
            :on-success="handleSuccess"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="mini" type="primary"
              >选取文件</el-button
            >
            <el-button
              style="margin-left: 10px;"
              size="mini"
              type="success"
              @click="submitUpload"
              >上传</el-button
            >
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import http from "@/request/http.js";
import paging from "@/components/paging/paging";
import ruleTable from "@/components/Ca-table/Ca-rule-table.vue";
import {
  apitemplatelList,
  apideleteTemplate,
  apisaveTemplatel
} from "@/request/api.js";
export default {
  name: "chengan-standard",
  data() {
    return {
      file_src: http.base_url + "uploadFile",
      token: sessionStorage.getItem("token"),
      isopen: false,
      DataList: [],
      headerList: [
        ["模板号", "hr_templatel_id", 90],
        ["模板名称", "hr_template_name", 150],
        ["时间", "hr_templatel_time", 120],
        ["路径", "hr_template_path"],
        ["类型", "type", 120],
        ["描述", "hr_templatel_describe", 300]
      ],
      headle: ["编辑", "删除", "下载"],
      form: {},
      options: [
        {
          label: "合同标准",
          value: 1
        },
        {
          label: "行政标准",
          value: 2
        },
        {
          label: "财务标准",
          value: 3
        },
        {
          label: "企业资质",
          value: 4
        }
      ],
      currentpage: 1,
      currentlimit: 15,
      templateType: "全部",
      templateTypeid: "",
      fileList: [],
      oldFileName: ""
    };
  },
  components: {
    ruleTable,
    paging
  },
  created() {
    this.getStandardList();
  },
  methods: {
    //新增
    openAddWin() {
      this.form = {
        hr_templatel_id: 0
      };
      this.isopen = true;
      this.oldFileName = "";
    },
    selectType(e) {
      switch (e) {
        case "全部":
          this.templateTypeid = "";
          break;
        case "合同标准":
          this.templateTypeid = 1;
          break;
        case "行政标准":
          this.templateTypeid = 2;
          break;
        case "财务标准":
          this.templateTypeid = 3;
          break;
        case "企业标准":
          this.templateTypeid = 4;
          break;
      }
      this.getStandardList();
    },
    //改变当前页
    getpage(e) {
      this.currentpage = e;
      this.getStandardList();
    },
    getlimit(e) {
      this.currentlimit = e;
      this.getStandardList();
    },
    //编辑
    opanLeaveList(e) {
      this.form = {
        hr_template_name: e.hr_template_name,
        hr_template_path: e.hr_template_path,
        hr_templatel_describe: e.hr_templatel_describe,
        hr_templatel_id: e.hr_templatel_id,
        hr_templatel_time: e.hr_templatel_time,
        hr_templatel_type: e.hr_templatel_type,
        type: e.type
      };
      this.oldFileName = e.hr_template_path.split("/")[
        e.hr_template_path.split("/").length - 1
      ];
      console.log(this.oldFileName);
      // console.log(e)
      this.isopen = true;
    },
    //删除文件
    deletefile(e) {
      let fileName = e.hr_template_path.split("/")[
        e.hr_template_path.split("/").length - 1
      ];
      this.$confirm(`确定删除吗？`)
        .then(() => {
          apideleteTemplate({
            biz: e.hr_templatel_id,
            hr_template_path: `templatel/${fileName}`
          }).then(res => {
            this.$message.success(res.Msg);
            this.getStandardList();
          });
        })
        .catch(() => {});
    },
    download(e) {
      window.open(e.hr_template_path);
    },
    handleChange(file, fileList) {
      this.fileList = fileList.map(item => {
        return item.name;
      });
    },
    handleSuccess(res, file, fileList) {
      this.form.hr_template_path = `templatel/${file.name}`;
      this.submit();
    },
    submitUpload() {
      this.form.oldfileName = this.oldFileName;
      console.log(this.form);
      console.log(this.form);
      this.$confirm(`确定提交吗？`)
        .then(() => {
          this.$refs.upload.submit();
          //当没有附件时单独提交
          if (this.fileList == "") {
            this.submit();
          }
        })
        .catch(() => {});
    },
    submit() {
      apisaveTemplatel(this.form).then(res => {
        console.log(res);
        this.$message.success(res.msg);
        this.isopen = false;
        this.getStandardList();
      });
    },
    getStandardList() {
      let data = {
        page: this.currentpage,
        limit: this.currentlimit,
        hr_templatel_type: this.templateTypeid
      };
      apitemplatelList(data).then(res => {
        console.log(res);
        this.DataList = res.data.map(item => {
          switch (item.hr_templatel_type) {
            case 1:
              item.type = "合同标准";
              break;
            case 2:
              item.type = "行政标准";
              break;
            case 3:
              item.type = "财务标准";
              break;
            case 4:
              item.type = "企业资质";
              break;
            default:
              break;
          }
          return item;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
