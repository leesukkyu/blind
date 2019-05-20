// 세탁 및 관리
<template>
  <div>
    세탁 및 관리
    <v-card flat color="background" class="pa-2 px-1 mb-2 mt-2 subheading">
      <v-card-text class="pl-2 pb-2">{{ $t('menu.' + tabInfo.item.code + ".child.wash_management") }}</v-card-text>
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
        // 트리 클릭
        onClick: function(d) {
          this.pageStorage.productTreeActiveItemList = d.itemList;
          this.eventBus.$emit("changeProductTreeActiveList");
        }
      }
    }
  }),
  created() {
    this.self = this;
    this.eventBus._events.requestProductTreeLoad = [];
    this.eventBus.$on("requestProductTreeLoad", this.loadProductTreeData);
  },
  methods: {
    init: function() {
      this.loadProductTreeData();
    },
    loadProductTreeData: function() {
      console.log('loadProductTree');
      this.$http
        .post("/goods_api/goods_list", {
          userid: this.$store.getters.getLoginInfo.loginInfo.id
        })
        .then(rs => {
          console.log('dd');
          this.createParentData(rs.goodsList);
          this.$set(this.option.tree, 'list',  rs.goodsList.slice());
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    createParentData : (function(){
      var loop = function(list, parent){
        for(var i in list){
          list[i].parent = parent;
          if(list[i].child){
            loop(list[i].child, list[i])
          }
        }
      }
      return function(list){
        for(var i in list){
          if(list[i].child){
            loop(list[i].child, list[i]);
          }
        }
      }
    })()
  }
};
</script>

