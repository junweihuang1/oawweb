<template>
  <div class="has-logo">
    <Logo @collapse="changecollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        class="el-menu-vertical"
        :collapse="isCollapse"
        :default-active="activeIndex"
        @select="handleSelect"
        text-color="#FFF"
        :active-text-color="this.$store.state.fontColor"
        :background-color="this.$store.state.theme"
        unique-opened
      >
        <template v-for="item in navList">
          <template v-if="item.children.length > 0">
            <el-submenu :index="item.id" :key="item.id">
              <template slot="title">
                <i class="iconfont" :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
              </template>

              <template v-for="child in item.children">
                <template v-if="child.children.length > 0">
                  <el-submenu :index="child.id" :key="child.id">
                    <template slot="title">{{ child.title }}</template>
                    <el-menu-item
                      v-for="(child2, index) in child.children"
                      :key="index"
                      :index="child2.id"
                    >
                      {{ child2.title }}
                    </el-menu-item>
                  </el-submenu>
                </template>
                <template v-else>
                  <el-menu-item :index="child.id" :key="child.id">
                    {{ child.title }}
                  </el-menu-item>
                </template>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.id" :key="item.id">
              <i class="iconfont" :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from "./Logo";

export default {
  name: "Nav",
  data() {
    return {
      isCollapse: false
    };
  },
  components: { Logo },
  props: {
    navList: {
      type: Array,
      default() {
        return [];
      }
    },
    activeIndex: {
      type: String,
      default() {
        return "1";
      }
    }
    //isCollapse: Boolean
  },
  methods: {
    changecollapse(e) {
      this.isCollapse = e;
      // this.$emit("collapse", this.isCollapse);
    },
    handleSelect(key, keyPath) {
      let tabs;
      let flag = false;
      // 检测openTabs是否存在当前路由
      const openTabs = this.$store.state.openTabs;
      openTabs.map((item, index) => {
        for (name in item) {
          if (item.id === key) {
            flag = true;
            break;
          }
        }
      });
      this.$store.commit("changeActiveIndex", key);
      this.navList.map(item => {
        if (item.id === key) {
          tabs = item;
        } else if (item.children.length > 0) {
          item.children.map(item2 => {
            if (item2.id === key) {
              tabs = item2;
            } else if (item2.children.length > 0) {
              item2.children.map(item3 => {
                if (item3.id === key) {
                  tabs = item3;
                }
              });
            }
          });
        }
      });
      if (flag) {
        this.$store.commit("changeActiveIndex", key);
      } else {
        this.$store.commit("addTabs", tabs);
      }
      this.$router.push(tabs.route);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 250px;
  height: 100%;
  min-height: calc(100vh - 50px);
}
.el-menu--collapse {
  height: 100%;
  min-height: calc(100vh - 50px);
}
.el-icon-menu {
  color: #fff;
}
.iconfont {
  color: #fff;
}
</style>
