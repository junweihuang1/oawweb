<template>
  <div id="home" v-loading="loading" element-loading-text="页面初始化...">
    <el-container>
      <el-aside style="width:auto;">
        <Nav :nav-list="navList" :active-index="activeIndex" />
      </el-aside>
      <el-container>
        <el-header
          height="50px"
          :style="{ background: this.$store.state.theme }"
        >
          <el-radio-group size="mini" :fill="this.$store.state.theme">
            <!-- <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button> -->
          </el-radio-group>
          <header-r />
        </el-header>
        <Tabs :editable-tabs="editableTabs" :active-index="activeIndex" />
        <el-main>
          <transition name="fade-transform" mode="out-in">
            <keep-alive>
              <router-view />
            </keep-alive>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Nav from "./components/Nav";
import Tabs from "./components/Tabs";
import HeaderR from "./components/HeaderR";

export default {
  name: "Home",
  components: { Nav, Tabs, HeaderR },
  data() {
    return {
      winHeight: "100%",
      //isCollapse: true,
      loading: true,
      navList: [
        {
          id: "1",
          title: "首页",
          route: "/",
          icon: "icon-home",
          children: []
        },
        {
          id: "2",
          title: "系统设置",
          route: "",
          icon: "icon-shezhi1",
          children: [
            {
              id: "2-1",
              title: "用户管理",
              route: "/User-manage",
              children: []
            },
            {
              id: "2-2",
              title: "职位管理",
              route: "/Position-manage",
              children: []
            }
          ]
        },
        {
          id: "3",
          title: "诚安人中心",
          route: "",
          icon: "icon-earth",
          children: [
            {
              id: "3-1",
              title: "行政类",
              route: "",
              children: [
                {
                  id: "3-1-1",
                  title: "诚安标准",
                  route: "/chengAn-standard"
                },
                {
                  id: "3-1-2",
                  title: "通讯录",
                  route: "/Mail-list"
                },
                {
                  id: "3-1-3",
                  title: "外勤申请",
                  route: "/Go-out"
                },
                {
                  id: "3-1-4",
                  title: "请假条",
                  route: "/leave-list"
                }
              ]
            },
            {
              id: "3-2",
              title: "费用类",
              route: "",
              children: [
                {
                  id: "3-2-1",
                  title: "盖章申请",
                  route: "Seal-application"
                }
              ]
            },
            {
              id: "3-3",
              title: "任务类",
              route: "",
              children: [
                {
                  id: "3-3-1",
                  title: "待办事项",
                  route: "to-do"
                },
                {
                  id: "3-3-2",
                  title: "任务管理",
                  route: "task-manage"
                },
                {
                  id: "3-3-3",
                  title: "任务报表",
                  route: "task-report"
                },
                {
                  id: "3-3-4",
                  title: "诚安梦",
                  route: "chengan-dream"
                }
              ]
            },
            {
              id: "3-4",
              title: "个人信息",
              route: "",
              children: [
                {
                  id: "3-4-1",
                  title: "个人工资条",
                  route: "wage-slip"
                }
              ]
            }
          ]
        },
        {
          id: "4",
          title: "诚安总部",
          route: "",
          icon: "icon-chengshi",
          children: [
            {
              id: "4-1",
              title: "总裁办",
              route: "/Ceo-office",
              children: []
            },
            {
              id: "4-2",
              title: "人力资源中心",
              route: "",
              children: [
                {
                  id: "4-2-1",
                  title: "发送邀请函",
                  route: "/Send-invitations"
                },
                {
                  id: "4-2-2",
                  title: "请假记录",
                  route: "/leave-records"
                },
                {
                  id: "4-2-3",
                  title: "职员信息",
                  route: "/staff-information"
                },
                {
                  id: "4-2-4",
                  title: "公司记录",
                  route: "/company-record"
                },
                {
                  id: "4-2-5",
                  title: "部门记录",
                  route: "/department-record"
                },
                {
                  id: "4-2-6",
                  title: "通知/公告",
                  route: "/notice-record"
                },
                {
                  id: "4-2-7",
                  title: "目标管理",
                  route: "/target-manage"
                },
                {
                  id: "4-2-8",
                  title: "中心记录",
                  route: "/center-record"
                },
                {
                  id: "4-2-9",
                  title: "打卡地址管理",
                  route: "/card-address-manage"
                }
              ]
            },
            {
              id: "4-3",
              title: "监察中心",
              route: "",
              children: [
                {
                  id: "4-3-1",
                  title: "管理考评",
                  route: "/manage-evaluate"
                },
                {
                  id: "4-3-2",
                  title: "绩效考评",
                  route: "/merits-evaluate"
                },
                {
                  id: "4-3-3",
                  title: "劳动力供应商对比表",
                  route: "/supplier-contrast"
                }
              ]
            },
            {
              id: "4-4",
              title: "财务中心",
              route: "",
              children: [
                {
                  id: "4-4-1",
                  title: "人员成本汇总",
                  route: "/Labor-costs"
                },
                {
                  id: "4-4-2",
                  title: "建设材料结算",
                  route: "/build-Material-settlement"
                },
                {
                  id: "4-4-3",
                  title: "科技材料结算",
                  route: "/science-Material-settlement"
                },
                {
                  id: "4-4-4",
                  title: "教育材料结算",
                  route: "/education-Material-settlement"
                },
                {
                  id: "4-4-5",
                  title: "支出合同管理",
                  route: "/pay-contract-manage"
                },
                {
                  id: "4-4-6",
                  title: "合同管理",
                  route: "/contract-manage"
                },
                {
                  id: "4-4-7",
                  title: "合同审批",
                  route: "/contract-approve"
                }
              ]
            },
            {
              id: "4-5",
              title: "成本中心",
              route: "",
              children: [
                {
                  id: "4-5-1",
                  title: "分供方台账",
                  route: "/supplier-account"
                },
                {
                  id: "4-5-2",
                  title: "材料管理",
                  route: "/material-manage"
                },
                {
                  id: "4-5-3",
                  title: "采购明细",
                  route: "/Purchase-details"
                }
              ]
            },
            {
              id: "4-6",
              title: "供应商中心",
              route: "",
              children: [
                {
                  id: "4-6-1",
                  title: "材料部信息",
                  route: "/material-depa-infor"
                },
                {
                  id: "4-6-2",
                  title: "材料(调价)",
                  route: "/material-modify"
                },
                {
                  id: "4-6-3",
                  title: "技术部信息",
                  route: "/technical-depa-infor"
                },
                {
                  id: "4-6-4",
                  title: "劳动力分配",
                  route: "/labor-distribution"
                },
                {
                  id: "4-6-5",
                  title: "劳动力(投标)",
                  route: "/labor-bidding"
                }
              ]
            },
            {
              id: "4-7",
              title: "外联中心",
              route: "/outreach-centre",
              children: []
            }
          ]
        },
        {
          id: "5",
          title: "诚安教育",
          route: "",
          icon: "icon-tushu",
          children: [
            {
              id: "5-2",
              title: "运营类",
              route: "",
              children: [
                {
                  id: "5-2-1",
                  title: "项目运营(教育)",
                  route: "/project-operation-education"
                }
              ]
            },
            {
              id: "5-3",
              title: "汇总类",
              route: "",
              children: [
                {
                  id: "5-3-1",
                  title: "供应商劳动力汇总(教育)",
                  route: "/Supplier-labor-summary-education"
                },
                {
                  id: "5-3-2",
                  title: "劳动力费用汇总(教育)",
                  route: "/Labor-costs-summary-education"
                }
              ]
            }
          ]
        },
        {
          id: "6",
          title: "诚安科技",
          route: "",
          icon: "icon-baobiao",
          children: [
            {
              id: "6-2",
              title: "运营类",
              route: "",
              children: [
                {
                  id: "6-2-1",
                  title: "项目运营(科技)",
                  route: "/project-operation-science"
                }
              ]
            },
            {
              id: "6-3",
              title: "汇总类",
              route: "",
              children: [
                {
                  id: "6-3-1",
                  title: "供应商劳动力汇总(科技)",
                  route: "/Supplier-labor-summary-science"
                },
                {
                  id: "6-3-2",
                  title: "劳动力费用汇总(科技)",
                  route: "/Labor-costs-summary-science"
                },
                {
                  id: "6-3-3",
                  title: "科技采购明细",
                  route: "/Technical-purchase-details"
                }
              ]
            }
          ]
        },
        {
          id: "7",
          title: "诚安建设",
          route: "",
          icon: "icon-anzhuangshigong",
          children: [
            {
              id: "7-2",
              title: "运营类",
              route: "",
              children: [
                {
                  id: "7-2-1",
                  title: "项目运营(建设)",
                  route: "/project-operation-build"
                },
                {
                  id: "7-2-2",
                  title: "甲方材料采购",
                  route: "/Party-Material-Purchase"
                }
              ]
            },
            {
              id: "7-3",
              title: "汇总类",
              route: "",
              children: [
                {
                  id: "7-3-1",
                  title: "供应商劳动力汇总(建设)",
                  route: "/Supplier-labor-summary-build"
                },
                {
                  id: "7-3-2",
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
  methods: {
    // collapse(e) {
    //   this.isCollapse = e;
    // }
  },
  computed: {
    activeIndex() {
      return this.$store.state.activeIndex;
    },
    editableTabs() {
      return this.$store.state.openTabs;
    }
  },
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  mounted() {
    // 刷新时以当前路由做为tab加入tabs
    // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
    // 当当前路由是首页时，添加首页到store，并设置激活状态
    const currentRoute = this.$route.path;
    const openTabs = this.$store.state.openTabs;
    let flag = true;
    if (openTabs.length === 0) {
      this.$store.commit("addTabs", {
        route: "/main",
        title: "首页",
        id: "1"
      });
      this.$router.push({
        path: "/main"
      });
    }

    openTabs.map((item, index) => {
      if (item.route === currentRoute) {
        this.$store.commit("changeActiveIndex", item.id);
        flag = false;
      }
    });

    if (!flag) return;
    if (this.$route.path !== "/" && this.$route.path !== "/main") {
      const navList = this.navList;
      navList.map((item, index) => {
        if (item.route === currentRoute) {
          this.$store.commit("addTabs", {
            route: item.route,
            title: item.title,
            id: item.id
          });
          this.$store.commit("changeActiveIndex", item.id);
        } else if (item.children.length > 0) {
          item.children.map(item2 => {
            if (item2.route === currentRoute) {
              this.$store.commit("addTabs", {
                route: item2.route,
                title: item2.title,
                id: item2.id
              });
              this.$store.commit("changeActiveIndex", item2.id);
            } else if (item2.children.length > 0) {
              item2.children.map(item3 => {
                if (item3.route === currentRoute) {
                  this.$store.commit("addTabs", {
                    route: item3.route,
                    title: item3.title,
                    id: item3.id
                  });
                  this.$store.commit("changeActiveIndex", item3.id);
                }
              });
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/transition.scss";

.el-header {
  color: #333;
  line-height: 50px;
  padding: 0 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-left {
    width: auto;
  }
}
.el-header::after {
  content: "";
  position: absolute;
  left: 0px;
  bottom: 0px;
  right: 0px;
  border-top: 1px solid #eee;
  box-shadow: 0px 4px 4px #eee;
}
.el-main {
  height: calc(100vh - 101px);
  overflow: auto;
  //background-color:rgb(248, 248, 248);
}
</style>
