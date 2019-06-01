// 실사구분편집
<template>
  <div>
    실사구분편집
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
            .post("/goods_api/goods_silsa_gubun_add", {
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
            .post("/goods_api/goods_silsa_gubun_del", {
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
            .post("/goods_api/goods_silsa_gubun_edit", {
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
      "menu." + this.tabInfo.item.code + ".child.actual_image_divide_edit";
    this.option.tagScript.hint =
      "menu." + this.tabInfo.item.code + ".child.tag_script_hint";
  },

  methods: {
    init: function() {
      this.loadActualImageDivideList();
    },
    loadActualImageDivideList: function() {
      this.option.tagScript.loading = true;
      this.$http
        .post("/goods_api/goods_silsa_gubun_list", {
          userid: this.$store.getters.getLoginInfo.loginInfo.id,
          idx: this.pageStorage.productTreeActiveItemList[0].idx
        })
        .then(rs => {
          console.log('옵션명편집');
          this.option.tagScript.list = rs.data;
          this.option.tagScript.loading = false;
        });
    }
  }
};
</script>

