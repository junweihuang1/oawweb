<template>
  <div>
    <rule-table
      id="table"
      style="overflow:auto;"
      :header="headerList"
      :DataList="DataList"
      @RowClassName="tableRowClassName"
      @checkleave="opanLeaveList"
      :headle="headle"
      @delete="deletefile"
      @edit="download"
    ></rule-table>
    <el-dialog title="模板" :visible.sync="isopen" width="30%">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="模板编号">
          <el-input v-model="form.hr_templatel_id" readonly></el-input>
        </el-form-item>
        <el-form-item label="模板名称">
          <el-input v-model="form.hr_template_name"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.hr_templatel_type" placeholder="请选择">
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
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <el-button
              style="margin-left: 10px;"
              size="small"
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
import ruleTable from "@/components/Ca-table/Ca-rule-table.vue";
import { apitemplatelList, apideleteTemplate } from "@/request/api.js";
export default {
  name: "chengan-standard",
  data() {
    return {
      isopen: false,
      DataList: [],
      headerList: [
        ["模板号", "hr_templatel_id", 85],
        ["模板名称", "hr_template_name", 150],
        ["时间", "hr_templatel_time", 120],
        ["路径", "hr_template_path", 500],
        ["类型", "type", 180],
        ["描述", "hr_templatel_describe"]
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
      ]
    };
  },
  components: {
    ruleTable
  },
  created() {
    apitemplatelList().then(res => {
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
  },
  methods: {
    tableRowClassName(e) {},
    opanLeaveList(e) {
      this.form = e;
      this.isopen = true;
    },
    deletefile(e) {
      this.$message.warning("此功能暂未开启");
      //   apideleteTemplate({
      //     biz: e.hr_templatel_id,
      //     hr_template_path: e.hr_template_path
      //   }).then(res => {
      //     console.log(res);
      //   });
    },
    download(e) {
      window.open(e.hr_template_path);
    },
    handlePreview(e) {
      console.log(e);
    },
    submitUpload(e) {
      let data = {
        hr_templatel_id: this.form.hr_templatel_id,
        hr_template_name: this.form.hr_template_name,
        hr_templatel_type: this.form.hr_templatel_type,
        hr_template_path: this.form.hr_template_path,
        hr_templatel_describe: this.form.hr_templatel_describe
      };
      console.log(data);
    }
  }
};
</script>

<style lang="scss" scoped></style>
