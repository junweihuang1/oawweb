<template>
  <div>
    <go-out-table
      :openType="openType"
      @setclose="getclose"
      :active="active"
      :hisComment="hisComment"
      :activeform="activeform"
    ></go-out-table>
  </div>
</template>

<script>
import GoOutTable from "@/components/Ca-to-do/go-out-table";
import { apigetField } from "@/request/api.js";
import { changetime } from "@/components/global-fn/global-fn";
export default {
  name: "headleGoOut",
  data() {
    return {
      isopen: false,
      activeform: {},
      hisComment: []
    };
  },
  components: {
    GoOutTable
  },
  props: {
    active: Object,
    openType: String
  },
  created() {
    this.getGoOut();
  },
  methods: {
    getclose() {
      this.$emit("close");
    },
    getGoOut() {
      let id = this.active.BUSINESS_KEY_
        ? this.active.BUSINESS_KEY_.split(".")[1]
        : this.active.businessId;
      apigetField({
        id: id
      }).then(res => {
        this.hisComment = res.hisComment
          ? res.hisComment.map(item => {
              item.END_TIME_ = item.END_TIME_ ? changetime(item.END_TIME_) : "";
              return item;
            })
          : [];
        this.activeform = res.data;
        console.log(res);
      });
    }
  }
};
</script>
