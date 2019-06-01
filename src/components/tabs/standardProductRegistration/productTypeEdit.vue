// 표준 제품 등록 > 상품류편집
<template>
  <div>
    <v-card class="px-2" flat color="background">
      <tag-script-code v-bind="option.tagScript" :parent-this="self"></tag-script-code>
    </v-card>
  </div>
</template>

<script>
import tagScript from "../../ui/tagScript";

export default {
  components: {
    "tag-script-code": tagScript
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
            .post("/goods_api/goods_category_add", {
              gc_name: data.name,
              p_no: this.pageStorage.productTreeActiveItemList[0].p_no,
              type_int: 1
            })
            .then(rs => {
              this.eventBus.$emit("requestProductTreeLoad");
              this.option.tagScript.list.push({
                name: data.name,
                code: data.code,
                fullName: data.code + "-" + data.name,
                idx: rs.idx
              });
            });
        },
        // 삭제
        onDelete: function(data) {
          this.$http
            .post("/goods_api/goods_category_del", {
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
        // 실제 업데이트
        onUpdate: function(data) {
          this.$http
            .post("/goods_api/goods_category_edit", {
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
                this.$store.dispatch("openSnackbar", {
                  text: "msg.notice.edit"
                });
              }
            });
        }
      }
    }
  }),
  beforeMount: function() {
    this.self = this;
    this.option.tagScript.label =
      "menu." + this.tabInfo.item.code + ".child.product_type_edit";
    this.option.tagScript.hint =
      "menu." + this.tabInfo.item.code + ".child.tag_script_hint";
  },

  methods: {
    init : function(){
      this.onChangeProductTreeActiveList();
    },
    onChangeProductTreeActiveList: function() {
      if (this.pageStorage.productTreeActiveItemList && this.pageStorage.productTreeActiveItemList.length) {
        this.option.tagScript.disabled = false;
        let list = this.pageStorage.productTreeActiveItemList[0].child;
        if (list) {
          for (let i in list) {
            list[i].name = list[i].text;
          }
          this.option.tagScript.list = list;
        }
      }else{
        this.option.tagScript.list = [];
        this.option.tagScript.disabled = true;
      }
    }
  }
};
</script>


