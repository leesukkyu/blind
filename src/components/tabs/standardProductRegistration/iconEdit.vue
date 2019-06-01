// 계정 과목 확인 > 계정과목설명
<template>
  <div>
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
        disabled: false,
        label: "",
        hint: "",
        list: [],
        // 생성
        onCreate: function(data) {
          this.$http
            .post("/goods_api/goods_icon_reg", {
              userid: this.$store.getters.getLoginInfo.loginInfo.id,
              p_no: this.pageStorage.iconTreeActiveItemList[0].p_no,
              type_int: 2,
              name: data.name
            })
            .then(rs => {
              this.eventBus.$emit("requestIconTreeLoad");
              this.option.tagScript.list.push({
                text: data.name,
                name: data.name,
                idx: rs.idx,
                type: "아"
              });
            });
        },
        // 삭제
        onDelete: function(data) {
          console.log("delete...");
          this.$http
            .post("/goods_api/goods_icon_del", {
              userid: this.$store.getters.getLoginInfo.loginInfo.id,
              idx: data.item.idx
            })
            .then(rs => {
              if ((rs.status = "Y")) {
                this.eventBus.$emit("requestIconTreeLoad");
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
            .post("/goods_api/goods_icon_edit", {
              userid: this.$store.getters.getLoginInfo.loginInfo.id,
              idx: data.item.idx,
              name: data.newName
            })
            .then(rs => {
              console.log("xxxx");
              if ((rs.status = "Y")) {
                this.eventBus.$emit("requestIconTreeLoad");
                for (let i in this.option.tagScript.list) {
                  if (this.option.tagScript.list[i].idx == data.item.idx) {
                    this.option.tagScript.list[i].name = data.newName;
                    this.option.tagScript.list[i].text = data.newName;
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
      "menu." + this.tabInfo.item.code + ".child.icon_edit";
    this.option.tagScript.hint =
      "menu." + this.tabInfo.item.code + ".child.tag_script_hint";
  },
  methods: {
    init: function() {
      this.onChangeIconTreeActiveList();
    },
    onChangeIconTreeActiveList: function() {
      let item, type;
      if (this.pageStorage.iconTreeActiveItemList.length) {
        item = this.pageStorage.iconTreeActiveItemList[0];
        type = item.type;
        if (type == "인") {
          this.option.tagScript.disabled = false;
          if (this.pageStorage.iconTreeActiveItemList.length) {
            for (let i in item.child) {
              item.child[i].name = item.child[i].text;
            }
            this.option.tagScript.list = item.child;
          }
        } else if (type == "세") {
          this.option.tagScript.disabled = false;
          if (this.pageStorage.iconTreeActiveItemList.length) {
            for (let i in item.child) {
              item.child[i].name = item.child[i].text;
            }
            this.option.tagScript.list = item.child;
          }
        } else if (type == "아") {
          this.option.tagScript.disabled = true;
          this.option.tagScript.list = [];
        }
      }
    }
  }
};
</script>

