// 항목명편집
<template>
  <div>
    항목명편집
    <v-card class="px-2" flat color="background">
      <tag-script v-bind="option.tagScript" :parent-this="self"></tag-script>
    </v-card>
  </div>
</template>

<script>
import tagScript from "../../ui/tagScript";

export default {
  components: {
    "tag-script": tagScript
  },
  props: ["tabInfo", "eventBus", "pageStorage"],
  data: () => ({
    self: null,
    // 태그스크립트, 트리 옵션
    option: {
      // 태그 스크립트 옵션
      tagScript: {
        deletableChips: true,
        loading: false,
        label: "",
        hint: "",
        list: [],
        // 생성
        onCreate: function(data) {
          this.$http
            .post("/goods_api/goods_blind_system_option_item_add", {
              userid: this.$store.getters.getLoginInfo.loginInfo.id,
              p_no: this.pageStorage.productTreeActiveItemList[0].idx,
              name: data.name
            })
            .then(rs => {
              this.eventBus.$emit("requestProductTreeLoad");
              if(!this.option.tagScript.list){
                this.option.tagScript.list = [];
              }
              this.option.tagScript.list.push({ name: data.name, idx: rs.idx });
            });
        },
        // 삭제
        onDelete: function(data) {
          console.log("delete...");
          this.$http
            .post("/goods_api/goods_blind_system_option_item_del", {
              userid: this.$store.getters.getLoginInfo.loginInfo.id,
              idx: data.item.idx
            })
            .then(rs => {
              if ((rs.status = "Y")) {
                this.eventBus.$emit("requestProductTreeLoad");
                for (let i in this.option.tagScript.list) {
                  if (this.option.tagScript.list[i].idx == data.item.idx) {
                    this.option.tagScript.list.splice(i, 1);
                    break;
                  }
                }
              }
            });
        },
        // 업데이트
        onUpdate: function(data) {
          this.$http
            .post("/goods_api/goods_blind_system_option_item_edit", {
              userid: this.$store.getters.getLoginInfo.loginInfo.id,
              idx: data.item.idx,
              name: data.newName
            })
            .then(rs => {
              if ((rs.status = "Y")) {
                this.eventBus.$emit("requestProductTreeLoad");
                for (let i in this.option.tagScript.list) {
                  if (this.option.tagScript.list[i].idx == data.item.idx) {
                    this.option.tagScript.list[i].name = data.newName;
                    this.$set(
                      this.option.tagScript.list,
                      i,
                      this.option.tagScript.list[i]
                    );
                    break;
                  }
                }
              }
            });
        }
      }
    }
  }),
  beforeMount: function() {
    this.self = this;
    this.option.tagScript.label =
      "menu." + this.tabInfo.item.code + ".child.repair_name_edit";
    this.option.tagScript.hint =
      "menu." + this.tabInfo.item.code + ".child.tag_script_hint";
  },

  methods: {
    init: function() {
      this.loadItemEditList();
    },
    loadItemEditList: function() {
      console.log("xx");
      this.option.tagScript.loading = true;
      this.$http
        .post("/goods_api/goods_blind_system_option_item_list", {
          userid: this.$store.getters.getLoginInfo.loginInfo.id,
          idx: this.pageStorage.productTreeActiveItemList[0].idx
        })
        .then(rs => {
          console.log('시스템편집');
          this.option.tagScript.list = rs.data;
          this.option.tagScript.loading = false;
        });
    }
  }
};
</script>

