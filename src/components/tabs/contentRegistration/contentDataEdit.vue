// 컨텐츠 데이터 편집
<template>
  <div>
    <v-divider class="mt-4"></v-divider>
    <v-card class="px-2 mt-4" flat color="background">
      <v-layout row wrap align-center>
        <v-flex xs12 sm12 text-xs-left>
          <div>
            <v-form ref="form">
              <!-- 등록 -->
              <v-btn @click="regist" color="orange" small dark>
                <v-icon>check_circle_outline</v-icon>
              </v-btn>
              <!-- 업로드 -->
              <input
                @change="onChangeFile"
                type="file"
                style="display: none"
                ref="image"
                accept="image/*"
              >
              <v-btn @click="onClickAddFileBtn" color="green" small dark>
                <v-icon>add_to_photos</v-icon>
              </v-btn>
              <!-- 삭제 -->
              <v-btn @click="del" color="pink" small dark>
                <v-icon>delete_forever</v-icon>
              </v-btn>
            </v-form>
          </div>
        </v-flex>
        <v-flex mt-2 xs12 sm12 text-xs-left>
          <!-- 이미지 리스트 -->
          <v-item-group v-model="value">
            <div style="overflow:auto;">
              <div style="white-space: nowrap;">
                <div style="display:inline-block;" v-for="(item, i) in list" :key="i">
                  <v-item>
                    <v-card
                      slot-scope="{ active, toggle }"
                      :color="active ? 'primary' : ''"
                      dark
                      height="200"
                      width="200"
                      @click="toggle"
                      class="mr-2"
                    >
                      <v-img :src="item.img_path" aspect-ratio="1" class="grey lighten-2"/>
                      <div v-if="active" class="only-border green"></div>
                    </v-card>
                  </v-item>
                </div>
              </div>
            </div>
          </v-item-group>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["tabInfo", "eventBus", "pageStorage"],
  data: () => ({
    value: null,
    list: []
  }),
  methods: {
    init: function() {
      this.onChangeIconTreeActiveList();
    },
    regist: function() {
      if (this.pageStorage.productTreeActiveItemList.length) {
        this.$http
          .post("/contents_api/goods_contents_check", {
            idx: this.list[this.value].idx,
            p_idx: this.pageStorage.productTreeActiveItemList[0].idx,
            t_type : 3,
            type : this.pageStorage.productTreeActiveItemList[0].type,
            userid: this.$store.getters.getLoginInfo.loginInfo.id,
          })
          .then(rs => {
            console.log(rs);
            if ((rs.status = "Y")) {
              this.$store.dispatch("openSnackbar", {
                text: "msg.notice.edit"
              });
            }
          });
      }
    },
    onClickAddFileBtn: function() {
      this.$refs.image.click();
    },
    onChangeFile: function() {
      if (this.pageStorage.productTreeActiveItemList.length == 0) {
        this.$refs.image.value = "";
        return;
      } else {
        this.upload(event.target);
      }
    },
    upload: function($input) {
      var data = new FormData();
      var _this = this;
      data.append("idx", this.pageStorage.productTreeActiveItemList[0].idx);
      data.append("type", this.pageStorage.productTreeActiveItemList[0].type);
      data.append("userid", this.$store.getters.getLoginInfo.loginInfo.id);
      data.append("t_type", 3);
      data.append("file", $input.files[0]);
      console.log(data);
      this.$http
        .post("/contents_api/goods_contents_upload", data)
        .then(rs => {
          if (rs.status == "Y") {
            _this.list.push(rs);
            _this.$store.dispatch("openSnackbar", {
              text: "msg.notice.save"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    del: function() {
      if (this.pageStorage.productTreeActiveItemList.length) {
        this.$http
          .post("/contents_api/goods_contents_del", {
            idx: this.list[this.value].idx,
            t_type : 3,
            type : this.pageStorage.productTreeActiveItemList[0].type,
            userid: this.$store.getters.getLoginInfo.loginInfo.id,
          })
          .then(rs => {
            console.log(rs);
            if ((rs.status = "Y")) {
              this.list.splice(this.value, 1);
              this.$store.dispatch("openSnackbar", {
                text: "msg.notice.del"
              });
            }
          });
      }
    },
    onChangeIconTreeActiveList: function() {
      var type;
      console.log("xxx");
      if (this.pageStorage.productTreeActiveItemList.length) {
        type = this.pageStorage.productTreeActiveItemList[0].type;
        this.$http
          .post("/contents_api/goods_contents_list", {
            p_idx: this.pageStorage.productTreeActiveItemList[0].idx,
            t_type: 3,
            type: this.pageStorage.productTreeActiveItemList[0].type,
            userid: this.$store.getters.getLoginInfo.loginInfo.id,
          })
          .then(rs => {
            if ((rs.status = "Y")) {
              this.list = rs.data;
              if (this.list && this.list.length) {
                for (var i in this.list) {
                  if (this.list[i].chk_icon == "Y") {
                    this.value = +i;
                  }
                }
              }
            }
          });
      } else {
        this.list = [];
      }
    }
  }
};
</script>

