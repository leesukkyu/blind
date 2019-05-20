// 표준 제품 등록 // 아이콘 트리
<template>
  <div>
    <v-card flat color="background" class="pa-2 px-1 mb-2 mt-2 subheading">
      <v-card-text class="pl-2 pb-2">{{ $t('menu.' + tabInfo.item.code + ".child.icon_list") }}</v-card-text>
      <v-card flat color="green" class="mt-0" height="2"></v-card>
    </v-card>
    <tree-script v-bind="option.tree" :parent-this="self"></tree-script>
  </div>
</template>

<script>
import treeScript from "../../ui/treeScript";

export default {
  components: {
    "tree-script": treeScript
  },
  props: ["tabInfo", "eventBus", "pageStorage"],
  data: () => ({
    self: null,
    //  트리 옵션
    option: {
      tree: {
        // 트리 리스트
        list: [],
        activeList: [],
        isMultiple: false,
        isActivatable: true,
        // 트리 클릭
        onClick: function(d) {
          this.pageStorage.iconTreeActiveItemList = d.itemList;
          this.eventBus.$emit("changeIconTreeActiveList");
        }
      }
    }
  }),
  created() {
    this.self = this;
    this.eventBus._events.requestIconTreeLoad = [];
    this.eventBus.$on("requestIconTreeLoad", this.loadIconTreeData);
  },
  methods: {
    init: function() {
      this.loadIconTreeData();
    },
    loadIconTreeData: function() {
      this.$http
        .post("/goods_api/goods_icon_list", {
          userid: this.$store.getters.getLoginInfo.loginInfo.id
        })
        .then(rs => {
          console.log(rs);
          this.option.tree.list = rs.goodsIconList;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

