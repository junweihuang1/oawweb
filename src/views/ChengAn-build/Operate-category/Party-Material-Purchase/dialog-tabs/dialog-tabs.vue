<template>
  <div style="border:1px solid #E4E7ED;">
    <el-tabs tab-position="top" v-model="currentActive" type="card">
      <el-tab-pane label="材料列表" name="1">
        <Party-material-list
          style="padding:10px;"
          :projectList="projectList"
          @openContract="openContract"
        ></Party-material-list>
      </el-tab-pane>
      <el-tab-pane label="型号规格" name="2" v-if="openContractwindow">
        <Contract-quantity
          @close="closeContract"
          style="padding:10px;"
          :projectList="projectList"
        ></Contract-quantity>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PartyMaterialList from "./components/Party-material-list";
import ContractQuantity from "./components/Contract-quantity";
export default {
  name: "dialogTabs",
  data() {
    return {
      currentActive: "1",
      openContractwindow: false
    };
  },
  components: {
    PartyMaterialList,
    ContractQuantity
  },
  props: {
    projectList: Object
  },
  watch: {
    projectList() {
      this.currentActive = "1";
      this.openContractwindow = false;
    }
  },
  methods: {
    openContract() {
      this.currentActive = "2";
      this.openContractwindow = true;
    },
    closeContract() {
      this.openContractwindow = false;
      this.currentActive = "1";
    }
  }
};
</script>

<style lang="scss"></style>
