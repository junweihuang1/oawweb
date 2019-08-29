<template>
  <div>
    <add-goods
      :active="active"
      :entryList="entryList"
      :ownHead="ownHead"
      :hisComment="hisComment"
      :openType="openType"
      @close="closewin"
    ></add-goods>
  </div>
</template>

<script>
import addGoods from "@/components/Ca-to-do/add-goods";

import { apiOwnHeadListById } from "@/request/api.js";
export default {
  name: "Goods",
  data() {
    return {
      goodsList: [],
      entryList: [],
      ownHead: {},
      hisComment: []
    };
  },
  components: { addGoods },
  props: {
    openType: String,
    active: Object,
    openGoods: Boolean
  },
  mounted() {
    this.getGoodsList();
  },
  methods: {
    closewin() {
      this.$emit("close");
    },
    getGoodsList() {
      let id = this.active.BUSINESS_KEY_
        ? this.active.BUSINESS_KEY_.split(".")[1]
        : this.active.businessId;
      apiOwnHeadListById({
        own_purchase_id: id
      }).then(res => {
        this.ownHead = res.data.ownHead;
        this.entryList = res.data.entryList;
        console.log(this.ownHead);
        // this.hisComment = res.hisComment.map(item => {
        //   item.START_TIME_ = changetime(item.START_TIME_);
        //   return item;
        // });
      });
    }
  }
};
</script>
