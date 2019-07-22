<template>
  <el-tooltip
    effect="dark"
    :content="isCollapse ? '展开' : '收起'"
    placement="right"
  >
    <div
      class="sidebar-logo-container"
      :class="{ collapse: isCollapse }"
      @click="changecollapse"
    >
      <transition name="sidebarLogoFade">
        <router-link
          v-if="isCollapse"
          key="collapse"
          class="sidebar-logo-link"
          to=""
        >
          <img v-if="logo" :src="logo" class="sidebar-logo" />
          <h1 v-else class="sidebar-title">{{ title }}</h1>
        </router-link>
        <router-link v-else key="expand" class="sidebar-logo-link" to="">
          <img v-if="logo" :src="logo" class="sidebar-logo" />
          <h1 class="sidebar-title">{{ title }}</h1>
        </router-link>
      </transition>
    </div>
  </el-tooltip>
</template>

<script>
export default {
  name: "SidebarLogo",
  // props: {
  //   collapse: {
  //     type: Boolean,
  //     required: true
  //   }
  // },
  data() {
    return {
      isCollapse: false,
      title: "猪猴管理系统",
      logo: require("@/assets/logo.png")
    };
  },
  methods: {
    changecollapse() {
      this.isCollapse = !this.isCollapse;
      this.$emit("collapse", this.isCollapse);
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 2s cubic-bezier(1, 0.5, 0.8, 1);
}
.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #0190a0;
  // text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
      padding-left: 20px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
