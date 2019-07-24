<template>
  <div>
    <el-dialog
      :visible.sync="myopen"
      width="75%"
      title="编辑职员信息"
      @close="closeWindow"
      top="8vh"
    >
      <el-button
        type="success"
        @click="submitForm"
        style="float:right;margin:0 30px 20px 0;"
        >提交</el-button
      >
      <template v-for="(items, index) in formTitleList">
        <el-table :data="form" border size="mini" :key="index">
          <el-table-column
            v-for="(item, index2) in items"
            :label="item[0]"
            align="center"
            :key="index2"
            :width="
              index2 == 3 || index2 == 2 || index2 == 1
                ? 150
                : index2 == 4
                ? 200
                : ''
            "
          >
            <template slot-scope="{ row }">
              <template v-if="item[2] == 'date'">
                <el-date-picker
                  v-model="row[item[1]]"
                  type="date"
                  size="mini"
                  @change="selectDate(item[1])"
                  format="yyyy.MM.dd"
                  placeholder="请选择时间"
                  style="width:100%;text-align:center;"
                >
                </el-date-picker>
              </template>
              <template v-else-if="item[2] == 'select'">
                <el-select
                  v-model="row[item[1]]"
                  placeholder="请选择"
                  filterable
                  clearable
                >
                  <el-option
                    v-for="i in item[3]"
                    :key="i[0]"
                    :label="i[1]"
                    :value="i[0]"
                  >
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item[2] == 'openselect'">
                <input
                  type="text"
                  v-if="item[1]"
                  clearable
                  v-model="row[item[1]]"
                  @focus="selectDepartment"
                  placeholder="请选择"
                  style="border:none;height:20px;width:100%;text-align:center;outline:none;"
                />
              </template>
              <template v-else>
                <input
                  type="text"
                  v-if="item[1]"
                  clearable
                  v-model="row[item[1]]"
                  style="border:none;height:20px;width:100%;text-align:center;outline:none;"
                />
              </template>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <Tabs @setJobChanges="getJobChanges" :DataList="recordList"></Tabs>
    </el-dialog>
    <select-department
      :isopenSelect="isopenSelect"
      @closewin="closewin"
      @setSelectName="setSelectName"
    ></select-department>
  </div>
</template>

<script>
import selectDepartment from "./select-department";
import Tabs from "./Tabs";
import { apisavePersonalRecords, apipersonalRecords } from "@/request/api.js";
export default {
  name: "modifyWindow",
  data() {
    return {
      JobChanges: [],
      myopen: this.isopen,
      isopenSelect: false,
      form: [
        {
          userid: this.userid,
          username: "",
          sex: "",
          age: "",
          birth_date: "",
          blood: "",
          nation: "",
          weight: "",
          birth: "",
          health: "",
          marital_status: "",
          card_address: "",
          native_place: "",
          education: "",
          user_card: "",
          role_id: "",
          email: "",
          phone_number: "",
          emergent_contact: "",
          emergent_phone: "",
          permanent_address: "",
          company: "",
          incorporation_date: "",
          close_time: "",
          on_trial: "",
          center_name: "",
          worker: "",
          department_name: "",
          department: "",
          center_id: "",
          status: "",
          level: "",
          major: "",
          profl_certificate: "",
          sign: "",
          age_limit: "",
          expiry: "",
          renew: "",
          user_num: "",
          type: ""
        }
      ],
      formTitleList: [
        [
          ["姓名", "username"],
          ["性别", "sex", "select", [[1, "男"], [2, "女"]]],
          ["年龄", "age"],
          ["出生日期", "birth_date", "date"],
          [
            "血型",
            "blood",
            "select",
            [[1, "O型"], [2, "A型"], [3, "B型"], [4, "AB型"]]
          ],
          ["民族", "nation"],
          ["体重", "weight"],
          ["生日", "birth"],
          [
            "健康状态",
            "health",
            "select",
            [[1, "健康"], [2, "良好"], [3, "较差"]]
          ],
          ["婚姻状况", "marital_status", "select", [[1, "未婚"], [2, "已婚"]]]
        ],
        [
          ["户籍地", "card_address"],
          ["籍贯", "native_place"],
          [
            "学历",
            "education",
            "select",
            [
              ["1", "初中"],
              ["2", "高中"],
              ["3", "中专"],
              ["4", "大专"],
              ["5", "本科"],
              ["6", "硕士"],
              ["7", "博士"]
            ]
          ],
          ["身份证号", "user_card"],
          ["职位", "role_id", "select", this.roleList],
          ["邮箱", "email"],
          ["联系电话", "phone_number"],
          ["紧急联系人", "emergent_contact"],
          ["紧急联系人电话", "emergent_phone"],
          ["常住地址", "permanent_address"]
        ],
        // ["公司", "company"],
        [
          ["试用期待遇", "on_trial"],
          ["转正工资", "worker"],
          ["入司日期", "incorporation_date", "date"],
          ["转正日期", "close_time", "date"],
          ["部门", "department_name", "openselect"],
          ["中心", "center_name", "openselect"],
          [
            "状态",
            "status",
            "select",
            [[1, "在职"], [2, "离职"], [3, "试用期"], [4, "实习"]]
          ],
          [
            "级别",
            "level",
            "select",
            [
              [1, "一级"],
              [2, "二级"],
              [3, "三级"],
              [4, "四级"],
              [5, "五级"],
              [6, "六级"],
              [7, "七级"],
              [8, "八级"],
              [9, "九级"],
              [10, "十级"],
              [11, "十一级"]
            ]
          ],
          ["专业", "major"],
          ["职业资格证", "profl_certificate"]
        ],
        [
          ["年限", "age_limit"],
          ["签约时间", "sign", "date"],
          ["到期时间", "expiry", "date"],
          ["续约", "renew", "date"],
          ["人员类型", "type", "select", [[1, "工人"], [2, "办公室人员"]]],
          ["工号", "user_num"],
          ["", ""],
          ["", ""],
          ["", ""],
          ["", ""]
        ]
        // ["直属上级", "superiors"],
        // ["直属公司上级", "CompanySuperiors", 120]
      ],
      recordList: {}
    };
  },
  components: {
    Tabs,
    selectDepartment
  },
  props: {
    isopen: Boolean,
    department: String,
    userid: Number,
    roleList: Array
  },
  watch: {
    isopen(val) {
      this.myopen = val;
      if (val) {
        apipersonalRecords({
          cid: this.userid,
          department: this.department
        }).then(res => {
          this.form = [];
          for (let r in res.data.userDetail) {
            // console.log(r, res.data.userDetail[r]);
            if (res.data.userDetail[r] == 0) {
              res.data.userDetail[r] = "";
            }
          }
          this.form.push(res.data.userDetail);
          this.recordList = res.data;
          if (this.formTitleList[1][4][3] == "") {
            res.roles.forEach(item => {
              this.formTitleList[1][4][3].push([item.role_id, item.role_name]);
            });
          }
        });
      }
    }
  },
  methods: {
    selectDate(row) {
      if (row == "birth_date") {
        let now = new Date();
        let now_year = now.getFullYear();
        let now_month = now.getMonth() + 1;
        let now_Date = now.getDate();
        let birth = this.form[0].birth_date;
        let birth_year = birth.getFullYear();
        let birth_month = birth.getMonth() + 1;
        let birth_Date = birth.getDate();
        let Date_Differ = now_Date - birth_Date;
        let month_Differ = now_month - birth_month;
        let year_Differ = now_year - birth_year;
        if ((Date_Differ >= 0 && month_Differ >= 0) || month_Differ >= 1) {
          this.form[0].age = year_Differ;
        } else {
          this.form[0].age = year_Differ - 1;
        }
      }
    },
    setSelectName(row) {
      this.isopenSelect = false;
      this.form[0].department_name = row.department_name;
      this.form[0].department = row.department_id;
      this.form[0].center_name = row.center_name;
      this.form[0].center_id = row.center_id;
    },
    selectDepartment() {
      this.isopenSelect = true;
    },
    closewin() {
      this.isopenSelect = false;
    },
    getJobChanges(e) {
      this.JobChanges = e;
    },
    submitForm() {
      let data = {
        userid: this.form[0].userid,
        username: this.form[0].username,
        department: this.form[0].department_id,
        phone_number: this.form[0].phone_number,
        email: this.form[0].email,
        sex: this.form[0].sex,
        major: this.form[0].major,
        user_card: this.form[0].user_card,
        card_address: this.form[0].card_address,
        role_id: this.form[0].role_id,
        age: this.form[0].age,
        marital_status: this.form[0].marital_status,
        on_trial: this.form[0].on_trial,
        worker: this.form[0].worker,
        birth_date: this.form[0].birth_date,
        close_time: this.form[0].close_time,
        incorporation_date: this.form[0].incorporation_date,
        emergent_contact: this.form[0].emergent_contact,
        education: this.form[0].education,
        profl_certificate: this.form[0].profl_certificate,
        permanent_address: this.form[0].permanent_address,
        status: this.form[0].status,
        health: this.form[0].health,
        weight: this.form[0].weight,
        nation: this.form[0].nation,
        birth: this.form[0].birth,
        blood: this.form[0].blood,
        native_place: this.form[0].native_place,
        renew: this.form[0].renew,
        remarks: this.form[0].remarks,
        level: this.form[0].level,
        emergent_phone: this.form[0].emergent_phone,
        sign: this.form[0].sign,
        age_limit: this.form[0].age_limit,
        expiry: this.form[0].expiry,
        user_num: this.form[0].user_num,
        center_id: this.form[0].center_id
      };
      apisavePersonalRecords(data).then(res => {
        console.log(res);
      });
    },
    closeWindow() {
      this.$emit("closewindow");
    }
  }
};
</script>

<style lang="scss" scoped></style>
