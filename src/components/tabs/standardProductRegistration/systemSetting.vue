// 시스템설정
<template>
  <div>
    <v-card class="px-2" flat color="background">
      <v-container pa-0 fluid grid-list-md>
        <v-layout wrap>
          <v-flex xs12 mt-2>
            <!-- 선택 -->
            <span class="px-4 body-2">{{ $t('menu.' + tabInfo.item.code + '.child.selection') }}</span>
            <v-btn-toggle :mandatory="true" v-model="editedItem.choice">
              <v-btn
                value="기본"
                color="green"
              >{{ $t('menu.' + tabInfo.item.code + '.child.primary') }}</v-btn>
              <v-btn
                value="옵션"
                color="green"
              >{{ $t('menu.' + tabInfo.item.code + '.child.option') }}</v-btn>
            </v-btn-toggle>
          </v-flex>

          <v-flex xs12 mt-3>
            <!-- 손잡이 -->
            <span class="px-4 body-2">{{ $t('menu.' + tabInfo.item.code + '.child.handle') }}</span>
            <v-btn-toggle :mandatory="true" class="mr-3" v-model="editedItem.handle">
              <v-btn value="Y" color="green">{{ $t('menu.' + tabInfo.item.code + '.child.exist') }}</v-btn>
              <v-btn value="N" color="green">{{ $t('menu.' + tabInfo.item.code + '.child.none') }}</v-btn>
            </v-btn-toggle>
            <v-text-field
              :label="$t('menu.' + tabInfo.item.code + '.child.text1')"
              v-if="editedItem.handle == 'Y'"
              style="display:inline-block;width:180px;"
              v-model="editedItem.handle_val"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 mt-3>
            <!-- 마킹 -->
            <span class="px-4 body-2">{{ $t('menu.' + tabInfo.item.code + '.child.marking') }}</span>
            <v-btn-toggle :mandatory="true" v-model="editedItem.marking">
              <v-btn value="Y" color="green">OK</v-btn>
              <v-btn value="N" color="green">NO</v-btn>
            </v-btn-toggle>
          </v-flex>

          <v-flex xs12 mt-3>
            <!-- 최대사이즈 -->
            <v-container pa-0 fluid>
              <v-layout wrap>
                <v-flex xs12 sm12 mt-3>
                  <span
                    class="px-4 body-2"
                  >{{ $t('menu.' + tabInfo.item.code + '.child.max_size') }}</span>
                  <v-btn-toggle class="mr-3" v-model="editedItem.max_size">
                    <v-btn
                      value="N"
                      color="green"
                    >{{ $t('menu.' + tabInfo.item.code + '.child.exist') }}</v-btn>
                    <v-btn
                      value="Y"
                      color="green"
                    >{{ $t('menu.' + tabInfo.item.code + '.child.none') }}</v-btn>
                  </v-btn-toggle>
                  <v-text-field
                    v-if="editedItem.max_size == 'N'"
                    style="display:inline-block;width:100px;"
                    v-model="editedItem.max_size_value"
                    :label="$t('menu.' + tabInfo.item.code + '.child.max_size_value')"
                  ></v-text-field>
                  <v-select
                    v-if="editedItem.max_size == 'N'"
                    style="display:inline-block;width:100px;"
                    :label="$t('menu.' + tabInfo.item.code + '.child.max_size_unit')"
                    v-model="editedItem.max_size_cm"
                    :items="['cm','mm']"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
          <v-flex xs12 sm12 mt-1 pl-3>
            <v-btn @click="save" small depressed color="primary">{{ $t('function.regist') }}</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import i18n from "../../../plugins/i18n";

export default {
  props: ["tabInfo", "eventBus", "pageStorage"],
  data: () => ({
    self: null,
    editedItem: {
      choice: "",
      handle: "",
      handle_val: "",
      marking: "",
      max_size: "",
      max_size_cm: "",
      max_size_value: ""
    }
  }),
  beforeMount: function() {
    this.self = this;
  },
  methods: {
    init: function() {
      this.loadSystemSetting();
    },
    loadSystemSetting: function() {
      this.$http
        .post("/goods_api/goods_blind_system_config_call", {
          userid: this.$store.getters.getLoginInfo.loginInfo.id,
          idx: this.pageStorage.productTreeActiveItemList[0].idx
        })
        .then(rs => {
          console.log(rs);
          if (rs.max_size != "Y") {
            rs.max_size_value = rs.max_size;
            rs.max_size = "N";
          }
          this.editedItem = rs;
        });
    },
    save: function() {
      let _editedItem;
      let rq;
      _editedItem = this.$util.copy(this.editedItem);
      rq = this.editedItem;
      rq.userid = this.$store.getters.getLoginInfo.loginInfo.id;
      rq.idx = this.pageStorage.productTreeActiveItemList[0].idx;
      if (rq.max_size == "N") {
        rq.max_size = rq.max_size_value;
      }
      this.$http
        .post("/goods_api/goods_blind_system_config_add", rq)
        .then(rs => {
          console.log(rs);
          this.editedItem = _editedItem;
          this.eventBus.$emit("requestProductTreeLoad");
          this.$store.dispatch("openSnackbar", {
            text: "msg.notice.save"
          });
        });
    }
  }
};
</script>

