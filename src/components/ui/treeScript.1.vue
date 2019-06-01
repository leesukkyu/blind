// 공통 - 트리스크립트
<template>
  <div>
    <v-treeview
      v-model="tree"
      :open.sync="open"
      :items="list"
      :active.sync="activeItemList"
      :multiple-active="isMultiple"
      :activatable="activatable"
      :item-key="_treeKey"
      item-text="text"
      item-children="child"
      active-class="active activeColor"
      expand-icon="expand_more"
    >
      <template slot="prepend" slot-scope="{  item, /*open,  leaf*/  }">
        <div class="treeTypeBox green white--text">{{ item.type }}</div>
      </template>
    </v-treeview>
  </div>
</template>

<script>
export default {
  props: [
    "list",
    "parentThis",
    "onCreate",
    "onDelete",
    "onUpdate",
    "onClick",
    "activeList",
    "isMultiple",
    "isActivatable",
    "treeKey"
  ],
  data: () => ({
    open: [],
    activeItemList: ["mn2_00001"],
    tree: ["mn2_00001"],
    activatable: true,
    _treeKey: "key",
    value : ["mn2_00001"]
  }),
  watch: {
    activeItemList: {
      immediate: false,
      handler: function(newData, oldData) {
        let itemList = [];
        // 부모 this로 바인딩
        if (this.parentThis) {
          for (let i in newData) {
            itemList.push(this.searchItem(newData[i]));
          }
          this.onClick.call(this.parentThis, { itemList: itemList });
        }
        console.log("xx");
        console.log(this.tree);
      }
    },
    open: function(newData, oldData) {},
    activeList: function() {
      this.activeItemList = this.activeList;
    }
  },
  beforeMount() {
    if (this.isActivatable === false) {
      this.activatable = false;
    }
    if (this.treeKey) {
      this._treeKey = this.treeKey;
    } else {
      this._treeKey = "key";
    }
  },
  created() {
    // let _this = this;
    // setTimeout(function() {
    //   _this.activeItemList.push("mn2_00001");
    //   console.log(this.activeItemList);
    // }, 1000);
  },
  methods: {
    searchItem: (function() {
      let _key, result;
      let search = function(list) {
        if (result != null) {
          return;
        }
        for (let i in list) {
          if (list[i].key == _key) {
            result = list[i];
            return list[i];
          }
          if (list[i].child) {
            search(list[i].child);
          }
        }
      };

      return function(key) {
        result = null;
        _key = key;
        search(this.list);
        return result;
      };
    })()
  }
};
</script>
<style slot-scope>
.treeTypeBox {
  width: 30px;
  height: 30px;
  line-height: 28px;
  text-align: center;
  vertical-align: middle;
  margin: 0 5px;
}
.v-treeview-node {
  margin-top: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.v-treeview-node__root {
  height: auto;
}
.v-treeview-node__content * {
  cursor: pointer;
}
</style>