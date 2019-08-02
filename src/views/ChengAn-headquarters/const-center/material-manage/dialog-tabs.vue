<template>
  <div style="border:1px solid #E4E7ED;">
    <el-tabs tab-position="top" v-model="currentActive" type="card">
      <el-tab-pane label="材料列表" name="1">
        <material-list
          style="padding:10px;"
          :seriesID="seriesID"
          @setMaterialId="getMaterialId"
        ></material-list>
      </el-tab-pane>
      <el-tab-pane label="型号规格" name="2" v-if="openTypewindow">
        <type-spec style="padding:10px;" :material_id="material_id"></type-spec>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TypeSpec from "./components/type-spec";
import materialList from "./components/material-list";
export default {
  name: "dialogTabs",
  data() {
    return {
      currentActive: "1",
      material_id: "",
      openTypewindow: false
    };
  },
  components: {
    materialList,
    TypeSpec
  },
  props: {
    seriesID: Number
  },
  watch: {
    seriesID() {
      this.currentActive = "1";
      this.openTypewindow = false;
    }
  },
  methods: {
    getMaterialId(id) {
      this.currentActive = "2";
      this.material_id = id.toString();
      this.openTypewindow = true;
    }
  }
};
</script>

<style lang="scss"></style>
