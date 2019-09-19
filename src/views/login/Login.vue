<template>
  <div class="login">
    <div class="el-form-login">
      <div class="login-title">
        <img src="@/assets/logo-title.png" alt="诚安时代" />
        <p class="title">诚安时代猪猴管理系统</p>
      </div>
      <el-form
        ref="formInline"
        label-position="left"
        status-icon
        :rules="rules"
        :model="formInline"
        size="medium"
      >
        <el-input type="password" style="display: none;" />
        <el-form-item prop="checkUser">
          <el-input
            v-model="formInline.checkUser"
            prefix-icon="iconfont iconpeople_fill"
            placeholder="请输入用户名"
            autocomplete="off"
            clearable
          />
        </el-form-item>
        <!-- 
            @keyup.enter.native="submitForm('formInline')" -->
        <el-form-item prop="checkPassword">
          <el-input
            v-model="formInline.checkPassword"
            type="password"
            autocomplete="off"
            prefix-icon="iconfont iconunlock_fill"
            placeholder="请输入密码"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <slide-verify
            v-if="isreload"
            :l="42"
            :r="10"
            :w="310"
            :h="100"
            @success="onSuccess"
            @fail="onFail"
            @refresh="onRefresh"
            :slider-text="text"
          ></slide-verify>
          <div>{{ msg }}</div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { apiLogin, apiUserInf, apiuserMenuTree } from "@/request/api";
export default {
  name: "Login",
  data() {
    // 表单验证
    const checkUser = (rule, value, callback) => {
      if (!value) {
        this.disabled = true;
        return callback(new Error("用户名不能为空"));
      }
      setTimeout(() => {
        if (typeof value !== "string") {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 500);
    };
    const checkPassword = (rule, value, callback) => {
      if (!value) {
        this.disabled = true;
        return callback(new Error("密码不能为空"));
      } else {
        setTimeout(() => {
          callback();
        }, 500);
      }
    };
    return {
      formInline: {
        user: "",
        password: ""
      },
      isreload: true,
      loading: false,
      disabled: true,
      rules: {
        checkUser: [
          {
            validator: checkUser,
            trigger: "blur"
          }
        ],
        checkPassword: [
          {
            validator: checkPassword,
            trigger: "blur"
          }
        ]
      },
      msg: "",
      text: "向右滑进行登录",
      navList: [
        {
          id: "1",
          title: "系统设置",
          route: "",
          icon: "icon-shezhi1",
          children: [
            {
              id: "3",
              title: "用户管理",
              route: "/User-manage",
              children: []
            },
            {
              id: "10",
              title: "职位管理",
              route: "/Position-manage",
              children: []
            },
            {
              id: "181",
              title: "流程管理",
              route: "/process-manage",
              children: []
            }
          ]
        },
        {
          id: "11",
          title: "诚安人中心",
          route: "",
          icon: "icon-earth",
          children: [
            {
              id: "147",
              title: "行政类",
              route: "",
              children: [
                {
                  id: "109",
                  title: "诚安标准",
                  route: "/chengAn-standard"
                },
                {
                  id: "83",
                  title: "通讯录",
                  route: "/Mail-list"
                },
                {
                  id: "106",
                  title: "通知/公告",
                  route: "/admin-notice-record"
                },
                {
                  id: "126",
                  title: "外勤申请",
                  route: "/Go-out"
                },
                {
                  id: "16",
                  title: "请假条",
                  route: "/leave-list"
                }
              ]
            },
            {
              id: "148",
              title: "费用类",
              route: "",
              children: [
                {
                  id: "103",
                  title: "盖章申请",
                  route: "Seal-application"
                },
                {
                  id: "114",
                  title: "费用申请",
                  route: "cost-application"
                },
                {
                  id: "129",
                  title: "物品采购",
                  route: "Goods-purchase"
                }
              ]
            },
            {
              id: "149",
              title: "任务类",
              route: "",
              children: [
                {
                  id: "51",
                  title: "待办事项",
                  route: "to-do"
                },
                {
                  id: "182",
                  title: "已办事项",
                  route: "already-do"
                },
                {
                  id: "130",
                  title: "任务管理",
                  route: "task-manage"
                },
                {
                  id: "134",
                  title: "任务报表",
                  route: "task-report"
                },
                {
                  id: "171",
                  title: "诚安梦",
                  route: "chengan-dream"
                }
              ]
            },
            {
              id: "173",
              title: "个人信息",
              route: "",
              children: [
                {
                  id: "174",
                  title: "个人工资条",
                  route: "wage-slip"
                }
              ]
            }
          ]
        },
        {
          id: "73",
          title: "诚安总部",
          route: "",
          icon: "icon-chengshi",
          children: [
            {
              id: "142",
              title: "总裁办",
              route: "/Ceo-office",
              children: []
            },
            {
              id: "4",
              title: "人力资源中心",
              route: "",
              children: [
                {
                  id: "41",
                  title: "发送邀请函",
                  route: "/Send-invitations"
                },
                {
                  id: "42",
                  title: "请假记录",
                  route: "/leave-records"
                },
                {
                  id: "45",
                  title: "职员信息",
                  route: "/staff-information"
                },
                {
                  id: "46",
                  title: "公司记录",
                  route: "/company-record"
                },
                {
                  id: "47",
                  title: "部门记录",
                  route: "/department-record"
                },
                {
                  id: "105",
                  title: "通知/公告",
                  route: "/notice-record"
                },
                {
                  id: "172",
                  title: "目标管理",
                  route: "/target-manage"
                },
                {
                  id: "48",
                  title: "中心记录",
                  route: "/center-record"
                },
                {
                  id: "124",
                  title: "打卡地址管理",
                  route: "/card-address-manage"
                }
              ]
            },
            // {
            //   id: "85",
            //   title: "监察中心",
            //   route: "",
            //   children: [
            //     {
            //       id: "74",
            //       title: "管理考评",
            //       route: "/manage-evaluate"
            //     },
            //     {
            //       id: "75",
            //       title: "绩效考评",
            //       route: "/merits-evaluate"
            //     },
            //     {
            //       id: "104",
            //       title: "劳动力供应商对比表",
            //       route: "/supplier-contrast"
            //     }
            //   ]
            // },
            {
              id: "19",
              title: "财务中心",
              route: "",
              children: [
                {
                  id: "23",
                  title: "人员成本汇总",
                  route: "/Labor-costs"
                },
                {
                  id: "39",
                  title: "建设材料结算",
                  route: "/build-Material-settlement"
                },
                {
                  id: "70",
                  title: "科技材料结算",
                  route: "/science-Material-settlement"
                },
                {
                  id: "98",
                  title: "教育材料结算",
                  route: "/education-Material-settlement"
                },
                {
                  id: "141",
                  title: "支出合同管理",
                  route: "/pay-contract-manage"
                },
                {
                  id: "87",
                  title: "合同管理",
                  route: "/contract-manage"
                },
                {
                  id: "107",
                  title: "合同审批",
                  route: "/contract-approve"
                }
              ]
            },
            {
              id: "88",
              title: "成本中心",
              route: "",
              children: [
                {
                  id: "40",
                  title: "分供方台账",
                  route: "/supplier-account"
                },
                {
                  id: "33",
                  title: "材料管理",
                  route: "/material-manage"
                },
                {
                  id: "117",
                  title: "采购明细",
                  route: "/Purchase-details"
                }
              ]
            },
            {
              id: "119",
              title: "供应商中心",
              route: "",
              children: [
                {
                  id: "122",
                  title: "材料部信息",
                  route: "/material-depa-infor"
                },
                {
                  id: "52",
                  title: "材料(调价)",
                  route: "/material-modify"
                },
                {
                  id: "121",
                  title: "技术部信息",
                  route: "/technical-depa-infor"
                },
                {
                  id: "123",
                  title: "劳动力分配",
                  route: "/labor-distribution"
                },
                {
                  id: "76",
                  title: "劳动力(投标)",
                  route: "/labor-bidding"
                }
              ]
            },
            {
              id: "125",
              title: "外联中心",
              route: "/outreach-centre",
              children: []
            }
          ]
        },
        {
          id: "89",
          title: "诚安教育",
          route: "",
          icon: "icon-tushu",
          children: [
            {
              id: "95",
              title: "运营类",
              route: "",
              children: [
                {
                  id: "178",
                  title: "项目运营(教育)",
                  route: "/project-operation-education"
                }
              ]
            },
            {
              id: "179",
              title: "汇总类",
              route: "",
              children: [
                {
                  id: "177",
                  title: "供应商劳动力汇总(教育)",
                  route: "/Supplier-labor-summary-education"
                },
                {
                  id: "176",
                  title: "劳动力费用汇总(教育)",
                  route: "/Labor-costs-summary-education"
                }
              ]
            }
          ]
        },
        {
          id: "60",
          title: "诚安科技",
          route: "",
          icon: "icon-baobiao",
          children: [
            {
              id: "162",
              title: "运营类",
              route: "",
              children: [
                {
                  id: "61",
                  title: "项目运营(科技)",
                  route: "/project-operation-science"
                }
              ]
            },
            {
              id: "163",
              title: "汇总类",
              route: "",
              children: [
                {
                  id: "180",
                  title: "供应商劳动力汇总(科技)",
                  route: "/Supplier-labor-summary-science"
                },
                {
                  id: "102",
                  title: "劳动力费用汇总(科技)",
                  route: "/Labor-costs-summary-science"
                },
                {
                  id: "118",
                  title: "科技采购明细",
                  route: "/Technical-purchase-details"
                }
              ]
            }
          ]
        },
        {
          id: "20",
          title: "诚安建设",
          route: "",
          icon: "icon-anzhuangshigong",
          children: [
            {
              id: "165",
              title: "运营类",
              route: "",
              children: [
                {
                  id: "22",
                  title: "项目运营(建设)",
                  route: "/project-operation-build"
                },
                {
                  id: "113",
                  title: "甲方材料采购",
                  route: "/Party-Material-Purchase"
                }
              ]
            },
            {
              id: "166",
              title: "汇总类",
              children: [
                {
                  id: "101",
                  title: "供应商劳动力汇总(建设)",
                  route: "/Supplier-labor-summary-build"
                },
                {
                  id: "175",
                  title: "劳动力费用汇总(建设)",
                  route: "/Labor-costs-summary-build"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  computed: {
    password() {
      return this.formInline.checkPassword;
    },
    username() {
      return this.formInline.checkUser;
    }
  },
  watch: {
    password(e) {
      if (e && this.username) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    }
  },
  methods: {
    //两菜单找重
    getNewTree(returnList, locatList) {
      var ret = [];
      locatList.forEach(itemA => {
        var r = returnList.find(itemB => itemB.id == itemA.id);
        if (r) {
          var obj = new Object({
            children: [],
            icon: r.icon ? r.icon : "",
            id: r.id,
            route: r.route ? r.route : "",
            title: itemA.text
          });
          ret.push(obj);
          if (itemA.children && r.children) {
            obj.children = this.getNewTree(r.children, itemA.children);
          }
        }
      });
      return ret;
    },
    getTree() {
      apiuserMenuTree().then(res => {
        let newTree = this.getNewTree(this.navList, res.data);
        // newTree
        newTree.splice(0, 0, {
          id: "0",
          title: "首页",
          route: "/",
          icon: "icon-home",
          children: []
        });
        localStorage.setItem("tree", JSON.stringify(newTree));
        apiUserInf().then(res2 => {
          this.$router.replace("/");
          localStorage.setItem("userid", res2.data.userid);
          localStorage.setItem("role_name", res2.data.role_name);
          localStorage.setItem("center_name", res2.data.center_name);
          localStorage.setItem("company_name", res2.data.company_name);
        });
      });
    },
    onSuccess() {
      this.msg = "验证成功,登录中...";
      setTimeout(() => {
        apiLogin({
          pcOrApp: "pc",
          username: this.username,
          password: this.password
        })
          .then(res => {
            this.getTree();
            localStorage.setItem("token", res.token);
            localStorage.setItem("username", this.username);
            this.loading = false;
            this.$message({
              message: "登录成功",
              type: "success"
            });
            this.$store.commit("clearTabs");
          })
          .catch(() => {
            this.isreload = false;
            this.$message.warning("无法登陆，请联系技术人员");
            this.$nextTick(() => {
              this.isreload = true;
              this.msg = "";
            });
            this.loading = false;
          });
      }, 500);
    },
    onFail() {
      this.msg = "";
    },
    onRefresh() {
      this.msg = "";
    },
    submitForm() {
      this.loading = true;
      if (this.msg !== "验证成功") {
        this.$message.error("图片验证失败，请重试");
        this.loading = false;
        return;
      }
      setTimeout(() => {
        apiLogin({
          pcOrApp: "pc",
          username: this.username,
          password: this.password
        })
          .then(res => {
            localStorage.setItem("token", res.token);
            localStorage.setItem("username", this.username);
            this.loading = false;
            this.$message({
              message: "登录成功",
              type: "success"
            });
            this.$store.commit("clearTabs");
            apiUserInf().then(res2 => {
              this.$router.replace("/");
              localStorage.setItem("userid", res2.data.userid);
              localStorage.setItem("role_name", res2.data.role_name);
              localStorage.setItem("center_name", res2.data.center_name);
              localStorage.setItem("company_name", res2.data.company_name);
            });
          })
          .catch(err => {
            this.loading = false;
            this.$message({
              message: err.msg,
              type: "error"
            });
          });
      }, 500);
    },
    handleEnter(e) {
      this.submitForm(e);
    }
  }
};
</script>

<style lang="scss">
.login {
  background: url(../../assets/bg.jpg);
  background-size: 100% 100%;
  width: 100%;
  height: 100vh;
  // background-color: rgb(45, 58, 75);
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-form-login {
  // min-width: 350px;
  background: rgba($color: #fff, $alpha: 0.1);
  border-radius: 3px;
  text-align: center;
  padding: 50px 100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.login-title {
  width: 100%;
  text-align: center;
  color: #fff;
}
.title {
  font-size: 22px;
  color: #383838;
  text-align: center;
  font-weight: 700;
  margin: 0px auto 40px;
}
</style>
