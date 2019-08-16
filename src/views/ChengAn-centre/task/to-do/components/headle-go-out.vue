<template>
  <div>
    <go-out-table
      :openType="openType"
      @setclose="getclose"
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
      openType: "edit",
      activeform: {}
    };
  },
  components: {
    GoOutTable
  },
  props: {
    id: String,
    taskid: String,
    openGoOut: Boolean
  },
  watch: {
    openGoods(val) {
      this.isopen = val;
    }
  },
  mounted() {
    this.getGoOut();
  },
  methods: {
    getclose() {},
    getGoOut() {
      apigetField({
        id: this.id
      }).then(res => {
        this.activeform = res.data;
        console.log(this.activeform);
      });
    }
  }
};
</script>
