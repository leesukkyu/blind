// 계정 과목 확인 > 분류명편집
<template>
  <div>
    <v-card flat color="background" class="pa-2 px-1 mb-2 mt-2 subheading">
      <v-card-text class="pl-2 pb-2">{{ $t('menu.' + tabInfo.item.code + ".child.account_subject_list") }}</v-card-text>
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
        activeList : [],
        isMultiple : false,
        // 트리 클릭
        onClick: function(d) {
          this.pageStorage.treeActiveItemList = d.itemList;
          this.eventBus.$emit("onChangeTreeActiveList");
        }
      }
    }
  }),
  beforeMount: function() {
    this.self = this;
    this.loadTreeData();
  },
  created(){
    this.eventBus.$on("requestTreeLoad", this.loadTreeData);
    this.eventBus.$on('changeActiveTab', this.changeActiveItemList);
  },
  methods: {
    loadTreeData: function() {
      this.$http
        .post("/goods_api/goods_list", {
          userid: this.$store.getters.getLoginInfo.loginInfo.id
        })
        .then(rs => {
          this.option.tree.list = rs.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    changeActiveItemList : function(){
      console.log('tab change');
      this.option.tree.activeList = [];
    }
  }
};
</script>

