<template>
  <div style="margin-top:20px;border:1px solid #d5d5d5;">
    <!-- 变动记录 -->
    <el-tabs v-model="activeName2" type="border-card">
      <el-tab-pane label="公司职位变动记录" name="first">
        <el-button-group>
          <el-button type="success" size="mini" @click="addline"
            >添加</el-button
          >
          <el-button type="danger" size="mini" @click="delline">删除</el-button>
          <el-button type="warning" size="mini">修改</el-button>
        </el-button-group>
        <el-table
          :data="JobChanges"
          border
          :header-row-style="{
            background: 'rgb(103, 194, 58)',
            color: 'rgb(103, 194, 58)',
            'border-bottom': '1px rgb(103, 194, 58) solid'
          }"
        >
          <el-table-column
            :label="item[0]"
            :prop="item[1]"
            v-for="(item, index) in headerList"
            :key="index"
            align="center"
          >
            <template slot-scope="{ row }">
              <input
                type="text"
                placeholder="请输入"
                v-model="row[item[1]]"
                style="border:none;outline:none;height:25px;width:100%;"
                @change="inputVal"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- 转正 -->
      <el-tab-pane label="转正记录" name="second">
        <el-table :data="bottomList.rows2.rows" border>
          <el-table-column
            label="转正编号"
            prop="bc_id"
            align="center"
          ></el-table-column>
          <el-table-column
            label="用户编号"
            prop="user_id"
            align="center"
          ></el-table-column>
          <el-table-column
            label="转正人姓名"
            prop="username"
            align="center"
          ></el-table-column>
          <el-table-column
            label="职位"
            prop="role_name"
            align="center"
          ></el-table-column>
          <el-table-column
            label="试用期待遇"
            prop="on_trial"
            align="center"
          ></el-table-column>
          <el-table-column
            label="状态"
            prop="bc_status"
            align="center"
          ></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{ row }">
              <el-button type="text" @click="check_corrented(row)"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="薪资调整记录" name="third">
        <el-button-group>
          <el-button type="success" size="mini">添加</el-button>
          <el-button type="danger" size="mini">删除</el-button>
          <el-button type="warning" size="mini">修改</el-button>
        </el-button-group>
        <el-table>
          <el-table-column label="调整时间"></el-table-column>
          <el-table-column label="原薪资"></el-table-column>
          <el-table-column label="调整后薪资"></el-table-column>
          <el-table-column label="调整原因"></el-table-column>
          <el-table-column label="记录人"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="合同期限" name="fourth"
        ><el-button-group>
          <el-button type="success" size="mini">添加</el-button>
          <el-button type="danger" size="mini">删除</el-button>
          <el-button type="warning" size="mini">修改</el-button>
        </el-button-group>
        <el-table>
          <el-table-column label="合同生效时间"></el-table-column>
          <el-table-column label="合同截止时间"></el-table-column>
          <el-table-column label="备注"></el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="离职记录" name="five">
        <el-table :data="bottomList.resignRows.rows" border>
          <el-table-column
            label="申请时间"
            prop="hr_resign_applyDate"
            align="center"
          ></el-table-column>
          <el-table-column
            label="离职类型"
            align="center"
            prop="hr_resign_category"
          ></el-table-column>
          <el-table-column
            prop="hr_resign_realLeave"
            label="实际离职时间"
            align="center"
          ></el-table-column>
          <el-table-column
            label="离职原因"
            align="center"
            prop="hr_resign_reason"
          ></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{ row }">
              <el-button type="text" @click="check_quit(row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :visible.sync="isopenCorrented" :append-to-body="true">
      <Apply-corrented
        openType="check"
        :active="active"
        v-if="isopenCorrented"
      ></Apply-corrented>
    </el-dialog>
  </div>
</template>

<script>
import ApplyCorrented from "@/components/Ca-to-do/Apply-corrented";
export default {
  name: "Tabs",
  data() {
    return {
      active: {},
      start_time: "",
      activeName2: "first",
      JobChanges: [],
      headerList: [
        ["开始时间", "start_time"],
        ["结束时间", "end_time"],
        ["公司名称", "company_name"],
        ["职位", "job_name"],
        ["变动原因", "reason"]
      ],
      bottomList: {
        resignRows: {
          rows: []
        },
        rows1: {
          rows: []
        },
        rows2: {
          rows: []
        },
        rows3: {
          rows: []
        },
        rows4: {
          rows: []
        }
      },
      isopenCorrented: false
    };
  },
  components: {
    ApplyCorrented
  },
  props: {
    DataList: Object
  },
  watch: {
    DataList(val) {
      this.bottomList = val;
    }
  },
  created() {
    this.bottomList = this.DataList;
  },
  methods: {
    check_corrented(row) {
      this.isopenCorrented = true;
      this.active = {
        businessId: this.bottomList.rows2.rows[0].bc_id,
        status: this.bottomList.rows2.rows[0].bc_status
      };
    },
    check_quit(row) {
      console.log(row);
    },
    inputVal() {
      this.$emit("setJobChanges", this.JobChanges);
    },
    addline() {
      let isadd = true;
      this.JobChanges.forEach(item => {
        if (item.start_time == "" || item.end_time == "") {
          isadd = false;
        }
      });
      if (isadd) {
        let data = {
          start_time: "",
          end_time: "",
          company_name: "",
          job_name: "",
          reason: ""
        };
        this.JobChanges.push(data);
      } else {
        this.$message.warning("时间不能为空");
      }
    },
    delline() {
      this.JobChanges.pop();
    }
  }
};
</script>
<style lang="scss" scoped></style>
