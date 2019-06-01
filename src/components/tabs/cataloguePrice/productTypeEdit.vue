// 계정 과목 확인 > 계정과목편집
<template>
  <div>
    <v-card class="px-2" flat color="background">
      <tag-script-code v-bind="option.tagScriptCode" :parent-this="self"></tag-script-code>
    </v-card>
  </div>
</template>

<script>
import tagScriptCode from "../../ui/tagScriptCode";

export default {
  components: {
    "tag-script-code": tagScriptCode
  },
  props: ["tabInfo", "eventBus", "pageStorage"],
  data: () => ({
    self: null,

    // 태그스크립트, 트리 옵션
    option: {
      // 태그 스크립트 옵션
      tagScriptCode: {
        deletableChips: true,
        loading: false,
        disabled: true,
        label: "",
        hint : "",
        list: [],
        // 생성
        onCreate: function(data) {
          console.log("생성");
          this.$http
            .post("basic_api/account_subject_code", {
              code: data.code
            })
            .then(rs => {
              if (rs.status == "N") {
                this.$http
                  .post("/basic_api/account_subject_reg", {
                    name: data.name,
                    code: data.code,
                    type_int: this.pageStorage.treeActiveItemList[0].type_int,
                    p_idx: this.pageStorage.treeActiveItemList[0].idx
                  })
                  .then(rs => {
                    this.eventBus.$emit("requestTreeLoad");
                    this.option.tagScriptCode.list.push({
                      name: data.name,
                      code: data.code,
                      fullName: data.code + "-" + data.name,
                      idx: rs.idx
                    });
                  });
              } else {
                this.$store.dispatch("openSnackbar", {
                  text: 'msg.notice.duplication',
                  color: "error"
                });
              }
            });
        },
        // 삭제
        onDelete: function(data) {
          console.log("delete...");
          this.$http
            .post("/basic_api/account_subject_del", {
              idx: data.item.idx
            })
            .then(rs => {
              if ((rs.status = "Y")) {
                this.eventBus.$emit("requestTreeLoad");
                for (let i in this.option.tagScriptCode.list) {
                  if (this.option.tagScriptCode.list[i].idx == data.item.idx) {
                    this.option.tagScriptCode.list.splice(i, 1);
                    break;
                  }
                }
              }
            });
        },
        // 업데이트 리스너
        onUpdate: function(data) {
          // 코드가 바뀐 경우 중복 체크
          if (data.newCode != data.oldCode) {
            this.$http
              .post("basic_api/account_subject_code", {
                code: data.newCode
              })
              .then(rs => {
                // 중복인 경우 데이터 원상 복구
                if (rs.status == "Y") {
                  for (let i in this.option.tagScriptCode.list) {
                    if (
                      this.option.tagScriptCode.list[i].idx == data.item.idx
                    ) {
                      this.option.tagScriptCode.list[i].name = data.oldName;
                      this.option.tagScriptCode.list[i].code = data.oldCode;
                      this.option.tagScriptCode.list[i].fullName =
                        data.oldCode + "-" + data.oldName;
                      this.$set(
                        this.option.tagScriptCode.list,
                        i,
                        this.option.tagScriptCode.list[i]
                      );
                      break;
                    }
                  }
                  this.$store.dispatch("openSnackbar", {
                    text: 'msg.notice.duplication',
                    color: "error"
                  });
                } else if (rs.status == "N") {
                  this.option.tagScriptCode.update(data);
                }
              });
          } else {
            this.option.tagScriptCode.update.call(this, data);
          }
        },
        // 실제 업데이트
        update: function(data) {
          this.$http
            .post("/basic_api/account_subject_edit", {
              idx: data.item.idx,
              name: data.newName,
              code: data.newCode
            })
            .then(rs => {
              if ((rs.status = "Y")) {
                this.eventBus.$emit("requestTreeLoad");
                for (let i in this.option.tagScriptCode.list) {
                  if (this.option.tagScriptCode.list[i].idx == data.item.idx) {
                    this.option.tagScriptCode.list[i].name = data.newName;
                    this.option.tagScriptCode.list[i].code = data.newCode;
                    this.option.tagScriptCode.list[i].fullName =
                      data.newCode + "-" + data.newName;
                    this.$set(
                      this.option.tagScriptCode.list,
                      i,
                      this.option.tagScriptCode.list[i]
                    );
                    break;
                  }
                }
                this.$store.dispatch("openSnackbar", {
                  text: 'msg.notice.edit'
                });
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
    this.option.tagScriptCode.label = 'menu.' + this.tabInfo.item.code + '.child.account_subject_edit';
    this.option.tagScriptCode.hint = 'menu.' + this.tabInfo.item.code + '.child.tag_script_hint';
  },

  created() {
    this.eventBus.$on("onChangeTreeActiveList", this.onChangeTreeActiveList);
  },

  methods: {
    onChangeTreeActiveList: function() {
      if (this.pageStorage.active != 1) {
        return;
      }
      if (this.pageStorage.treeActiveItemList.length != 0) {
        console.log(this.pageStorage.treeActiveItemList[0].type);
        this.option.tagScriptCode.disabled = false;
        if (this.pageStorage.treeActiveItemList[0].type == "종") {
          this.option.tagScriptCode.disabled = true;
        } else if (this.pageStorage.treeActiveItemList[0].type == "분") {
          this.option.tagScriptCode.disabled = false;
        } else if (this.pageStorage.treeActiveItemList[0].type == "계") {
          this.option.tagScriptCode.disabled = true;
        } else if (this.pageStorage.treeActiveItemList[0].type == "설") {
          this.option.tagScriptCode.disabled = true;
        }
        this.option.tagScriptCode.loading = true;
        this.$http
          .post("/basic_api/account_subject_call", {
            idx: this.pageStorage.treeActiveItemList[0].idx
          })
          .then(rs => {
            for (let i in rs.data) {
              rs.data[i]["fullName"] = rs.data[i].code + "-" + rs.data[i].name;
            }
            this.option.tagScriptCode.list = rs.data;
            this.option.tagScriptCode.loading = false;
            console.log(rs);
          });
      } else {
        this.option.tagScriptCode.disabled = true;
        this.option.tagScriptCode.list = [];
      }
    }
  }
};
</script>

