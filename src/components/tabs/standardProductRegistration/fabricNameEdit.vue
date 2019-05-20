// 원단명편집
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
        label: "",
        hint: "",
        list: [],
        codeLength: 4,
        // 생성
        onCreate: function(data) {
          console.log("생성");
          this.$http
            .post("/goods_api/wondan_code", {
              userid: this.$store.getters.getLoginInfo.loginInfo.id,
              code: data.code
            })
            .then(rs => {
              if (rs.status == "N") {
                this.$http
                  .post("/goods_api/goods_wondan_reg", {
                    userid: this.$store.getters.getLoginInfo.loginInfo.id,
                    idx: this.pageStorage.productTreeActiveItemList[0].idx,
                    code: data.code,
                    name: data.name
                  })
                  .then(rs => {
                    console.log('xxxxx');
                    this.eventBus.$emit("requestProductTreeLoad");
                    this.option.tagScriptCode.list.push({
                      name: data.name,
                      code: data.code,
                      fullName: data.code + "-" + data.name,
                      idx: rs.idx
                    });
                  });
              } else {
                this.$store.dispatch("openSnackbar", {
                  text: "msg.notice.duplication",
                  color: "error"
                });
              }
            });
        },
        // 삭제
        onDelete: function(data) {
          console.log("delete...");
          this.$http
            .post("/goods_api/goods_wondan_del", {
              userid: this.$store.getters.getLoginInfo.loginInfo.id,
              idx: data.item.idx
            })
            .then(rs => {
              if ((rs.status = "Y")) {
                this.eventBus.$emit("requestProductTreeLoad");
                for (var i in this.option.tagScriptCode.list) {
                  if (this.option.tagScriptCode.list[i].idx == data.item.idx) {
                    this.option.tagScriptCode.list.splice(i, 1);
                    break;
                  }
                }
                this.$store.dispatch("openSnackbar", {
                  text: "msg.notice.del",
                  color: "error"
                });
              }
            });
        },
        // 업데이트 리스너
        onUpdate: function(data) {
          // 코드가 바뀐 경우 중복 체크
          if (data.newCode != data.oldCode) {
            this.$http
              .post("/goods_api/wondan_code", {
                userid: this.$store.getters.getLoginInfo.loginInfo.id,
                code: data.newCode
              })
              .then(rs => {
                // 중복인 경우 데이터 원상 복구
                if (rs.status == "Y") {
                  for (var i in this.option.tagScriptCode.list) {
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
                    text: "msg.notice.duplication",
                    color: "error"
                  });
                } else {
                  this.option.tagScriptCode.update.call(this, data);
                }
              });
          } else {
            this.option.tagScriptCode.update.call(this, data);
          }
        },
        // 실제 업데이트
        update: function(data) {
          console.log(this.$http);
          this.$http
            .post("/goods_api/goods_wondan_edit", {
              userid: this.$store.getters.getLoginInfo.loginInfo.id,
              idx: data.item.idx,
              name: data.newName,
              code: data.newCode
            })
            .then(rs => {
              if ((rs.status = "Y")) {
                this.eventBus.$emit("requestProductTreeLoad");
                for (var i in this.option.tagScriptCode.list) {
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
    this.option.tagScriptCode.label =
      "menu." + this.tabInfo.item.code + ".child.fabric_name_edit";
    this.option.tagScriptCode.hint =
      "menu." + this.tabInfo.item.code + ".child.tag_script_hint";
  },
  methods: {
    init: function() {
      console.log("init");
      this.loadFabricNameList();
    },
    loadFabricNameList: function() {
      this.$http
        .post("/goods_api/goods_wondan_list", {
          userid: this.$store.getters.getLoginInfo.loginInfo.id,
          idx: this.pageStorage.productTreeActiveItemList[0].idx
        })
        .then(rs => {
          console.log(rs);
          if (rs.status == "Y") {
            for (var i in rs.data) {
              rs.data[i]["fullName"] = rs.data[i].code + "-" + rs.data[i].name;
            }
            this.option.tagScriptCode.list = rs.data;
            console.log(rs);
          } else {
            this.option.tagScriptCode.list = [];
          }
          // rs.data[0].disabled = true;
          // this.option.tagScriptCode.list = rs.data;
          //
          // console.log(rs);
          this.option.tagScriptCode.loading = false;
        });
    }
  }
};
</script>

