<template>
  <div>
    <add-goods
      v-if="isopen"
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
import { changetime } from "@/components/global-fn/global-fn";
import { apiOwnHeadListById } from "@/request/api.js";
export default {
  name: "Goods",
  data() {
    return {
      goodsList: [],
      entryList: [],
      ownHead: {},
      hisComment: [],
      openType: "",
      isopen: false
    };
  },
  components: { addGoods },
  props: {
    active: Object,
    openGoods: Boolean
  },
  watch: {
    openGoods(val) {
      this.isopen = val;
    }
  },
  mounted() {
    this.getGoodsList();
  },
  methods: {
    closewin() {
      this.isopen = false;
      this.$emit("close");
    },
    getGoodsList() {
      apiOwnHeadListById({
        own_purchase_id: this.active.BUSINESS_KEY_.split(".")[1]
      }).then(res => {
        console.log(res);
        this.ownHead = res.data.ownHead;
        this.entryList = res.data.entryList;
        this.hisComment = res.hisComment.map(item => {
          item.START_TIME_ = changetime(item.START_TIME_);
          return item;
        });
        this.isopen = true;
        this.openType = "headle";
      });
    }
  }
};
</script>
