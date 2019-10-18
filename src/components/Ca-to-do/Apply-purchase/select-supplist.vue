<template>
  <div>
    <el-table :data="TableData">
      <el-table-column
        align="center"
        v-for="(item, index) in header"
        :key="index"
        :label="item[0]"
        :prop="item[1]"
      >
      </el-table-column>
    </el-table>
    <el-form size="mini" inline>
      <el-form-item>
        <el-select v-model="selectSupplier">
          <el-option
            v-for="(item, index) in selectList"
            :key="index"
            :label="index"
            :value="[
              index,
              item.construct_supplier_tel,
              item.construct_material_price
            ]"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { apichooseSupplier, apisaveMaterialSupplier } from "@/request/api";
export default {
  name: "selectSupplier",
  data() {
    return {
      TableData: [],
      header: [
        ["材料名称", "construct_purchase_material"],
        ["规格", "construct_purchase_model"],
        ["申请数量", "construct_purchase_applyNum"]
      ],
      maxlist: [],
      selectSupplier: "",
      selectList: [] //选择供应商的list
    };
  },
  props: {
    Ids: Array,
    entryList: Array,
    activeform: Object
  },
  created() {
    this.getSupplierList();
  },
  methods: {
    save() {
      //遍历table数组，
      console.log(this.entryList);
      this.$confirm(`确定保存吗？`)
        .then(() => {
          //遍历两个数组，把table数组中的单价赋值到entrylist
          this.TableData.forEach(item => {
            this.entryList.forEach(item2 => {
              if (
                item.construct_purchase_entryId ==
                  item2.construct_purchase_entryId &&
                item.supplier[this.selectSupplier[0]]
                  .construct_material_price != ""
              ) {
                item2.construct_purchase_purchasePrice =
                  item.supplier[
                    this.selectSupplier[0]
                  ].construct_material_price;
                item2.construct_purchase_purchaseTotal =
                  item2.construct_purchase_purchasePrice *
                  item2.construct_purchase_applyNum;
              }
            });
          });
          //遍历entryList数组，单价为0不能提交
          let i = 0,
            len = this.entryList.length;
          for (i; i < len; i++) {
            if (this.entryList[i].construct_purchase_purchasePrice == "0.0") {
              this.$message.warning("单价为零无法选择此供应商");
              return;
            }
          }
          let data = {
            construct_purchase_id: this.activeform.construct_purchase_id, //(必填)采购单id
            entry: JSON.stringify(this.entryList), //(必填)材料行对象
            construct_purchase_supplier: this.selectSupplier[0], //(必填)供应商
            construct_purchase_supplierTel: this.selectSupplier[1] //(必填)供应商联系方式
          };
          console.log(data);
          apisaveMaterialSupplier(data).then(res => {
            console.log(res);
            this.$message.success(res.msg);
            this.$emit("close", this.selectSupplier);
          });
        })
        .catch(() => {});
    },
    getSupplierList() {
      apichooseSupplier({
        entryIds: this.Ids.join(",")
      }).then(res => {
        // console.log(res);
        //遍历回调data数组中的supplier的所有key，获得最大的供应商名称数组
        res.data.forEach(item => {
          Object.keys(item.supplier).forEach(key => {
            if (!this.maxlist.includes(key, 0)) {
              this.maxlist.push(key);
              this.header.push([
                key,
                `supplier.${key}.construct_material_price`
              ]);
            }
          });
        });
        res.data.forEach(item => {
          this.maxlist.forEach(item2 => {
            if (!item.supplier[item2]) {
              item.supplier[item2] = [];
            }
            if (
              !item.supplier[item2].construct_material_price ||
              item.supplier[item2].construct_material_price == "null"
            ) {
              item.supplier[item2].construct_material_price = "0.0";
            }
          });
        });
        this.selectList = res.data[0].supplier;
        this.TableData = res.data;
        console.log(this.TableData);
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
