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
        disabled: true,
        label: "",
        hint : "",
        list: [],
        // 생성
        onCreate: function(data) {
          this.$http
            .post("/basic_api/account_subject_desc_reg", {
              name: data.name,
              type_int: this.pageStorage.treeActiveItemList[0].type_int,
              p_idx: this.pageStorage.treeActiveItemList[0].idx
            })
            .then(rs => {
              this.eventBus.$emit("requestTreeLoad");
              this.option.tagScript.list.push({ name: data.name, idx: rs.idx });
            });
        },
        // 삭제
        onDelete: function(data) {
          console.log("delete...");
          this.$http
            .post("/basic_api/account_subject_desc_del", {
              idx: data.item.idx
            })
            .then(rs => {
              if ((rs.status = "Y")) {
                this.eventBus.$emit("requestTreeLoad");
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
            .post("/basic_api/account_subject_desc_edit", {
              idx: data.item.idx,
              name: data.newName
            })
            .then(rs => {
              if ((rs.status = "Y")) {
                this.eventBus.$emit("requestTreeLoad");
                for (let i in this.option.tagScript.list) {
                  if (this.option.tagScript.list[i].idx == data.item.idx) {
                    this.option.tagScript.list[i].name = data.newName;
                    this.$set(this.option.tagScript.list, i, this.option.tagScript.list[i]);
                    break;
                  }
                }
              }
            });
        }
      }
    }
  }),

  computed: {},

  watch: {},
  beforeMount: function() {
    this.self = this;
    this.option.tagScript.label = 'menu.' + this.tabInfo.item.code + '.child.account_subject_explain';
    this.option.tagScript.hint = 'menu.' + this.tabInfo.item.code + '.child.tag_script_hint';
  },

  created() {
    this.eventBus.$on("onChangeTreeActiveList", this.onChangeTreeActiveList);
  },

  methods: {
    onChangeTreeActiveList: function() {
      if(this.pageStorage.active != 2){
        return;
      }
      if (this.pageStorage.treeActiveItemList.length != 0) {
        console.log(this.pageStorage.treeActiveItemList[0].type);
        if (this.pageStorage.treeActiveItemList[0].type == "계") {
          this.option.tagScript.disabled = false;
        } else {
          this.option.tagScript.disabled = true;
        }
        this.option.tagScript.loading = true;
        this.$http
          .post("/basic_api/account_subject_desc_call", {
            idx: this.pageStorage.treeActiveItemList[0].idx
          })
          .then(rs => {
            this.option.tagScript.list = rs.data;
            this.option.tagScript.loading = false;
            console.log(rs);
          });
      } else {
        this.option.tagScript.disabled = true;
        this.option.tagScript.list = [];
      }
    }
  }
};
</script>

