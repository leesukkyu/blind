// 공통 - 트리스크립트
<template>
  <div>
    <v-treeview
      v-model="tree"
      :items="list"
      :open.sync="open"
      :active.sync="activeItemList"
      :multiple-active="isMultiple"
      :activatable="activatable"
      :item-key="_treeKey"
      item-text="text"
      :selectable="selectable"
      :return-object="returnObject"
      item-children="child"
      active-class="active activeColor"
      expand-icon="expand_more"
      selected-color = "orange"
      @input="input"
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
    "onInput",
    "activeList",
    "isMultiple",
    "isActivatable",
    "treeKey",
    "isSelectable",
    "selectedList",
    "isReturnObject"
  ],
  data: () => ({
    open: [],
    activeItemList: [],
    tree: [],
    activatable: true,
    _treeKey: "idx",
    returnObject: false
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
      }
    },
    open: function(newData, oldData) {},
    activeList: function() {
      this.activeItemList = this.activeList;
    },
    selectedList : function(newData, oldData){
      console.log('변했다');
      this.tree = newData;
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

    if (this.isSelectable) {
      this.selectable = this.isSelectable;
    } else {
      this.selectable = false;
    }

    if (this.selectedList) {
      this.tree = this.selectedList;
    }

    if (this.isReturnObject) {
      this.returnObject = true;
    } else {
      this.returnObject = false;
    }
  },
  created() {},
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
    })(),
    input: function() {
      console.log(this.tree);
      if (this.parentThis && this.onInput) {
        this.onInput.call(this.parentThis, { itemList: this.tree });
      }
    }
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