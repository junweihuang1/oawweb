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
      loading: true,
      navList: JSON.parse(localStorage.getItem("tree"))
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
    console.log(this.navList);
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
      var starttime = new Date();
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
      console.log(new Date() - starttime);
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
