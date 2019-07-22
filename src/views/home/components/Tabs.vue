<template>
  <div class="tabs-main">
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      @tab-remove="removeTab"
      @tab-click="tabClick"
    >
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="item.id"
        :label="item.title"
        :name="item.id"
        :closable="index == 0 ? false : true"
      />
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: {
    editableTabs: {
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
  },
  data() {
    return {
      editableTabsValue: this.$store.state.activeIndex
    };
  },
  watch: {
    activeIndex(e) {
      this.editableTabsValue = e;
    }
  },
  methods: {
    // 监听选项卡切换
    tabClick(e) {
      const activeIndex = this.$store.state.activeIndex;
      const openTabs = this.$store.state.openTabs;
      if (e.name !== activeIndex) {
        this.$store.commit("changeActiveIndex", e.name);
      }
      openTabs.map((item, index) => {
        if (item.id === e.name) {
          this.$router.push(item.route);
          return;
        }
      });
    },
    // 删除tab
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((item, index) => {
          if (item.id == targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1];
            activeName = nextTab.id;
            this.$store.commit("changeActiveIndex", nextTab.id);
            this.$router.push(nextTab.route);
          }
        });
      }
      this.editableTabsValue = activeName;
      this.$store.commit("delete_tabs", targetName);
    }
  }
};
</script>

<style lang="scss">
.tabs-main {
  padding: 0;
  box-shadow: 0px 4px 10px rgba(77, 77, 77, 0.05);
}

.el-tabs.el-tabs--border-card {
  box-shadow: none;
  border: none;
}

.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border-radius: 0 !important;
  border-top: none !important;
}

.el-tabs--card > .el-tabs__header .el-tabs__nav:first-child {
  border-left: none !important;
}
.el-tabs__header {
  margin: 0 0 0 !important;
}
.el-tabs__item {
  height: 36px !important;
  line-height: 36px !important;
}
</style>
