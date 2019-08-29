<template>
  <div>
    <go-out-table
      :openType="openType"
      @setclose="getclose"
      :active="active"
      :activeform="activeform"
    ></go-out-table>
  </div>
</template>

<script>
import GoOutTable from "@/components/Ca-to-do/go-out-table";
import { apigetField } from "@/request/api.js";
export default {
  name: "headleGoOut",
  data() {
    return {
      isopen: false,
      activeform: {}
    };
  },
  components: {
    GoOutTable
  },
  props: {
    active: Object,
    openType: String
  },
  mounted() {
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
        this.activeform = res.data;
        console.log(res);
      });
    }
  }
};
</script>
