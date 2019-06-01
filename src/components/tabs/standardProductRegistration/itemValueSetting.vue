// 항목값설정
<template>
  <div>
    항목값설정
    <v-card class="px-2" flat color="background">
      <v-container pa-0 fluid grid-list-md>
        <v-layout wrap>
          <v-flex xs12 mt-2>
            <!-- 선택 -->
            <span class="px-4 body-2">{{ $t('menu.' + tabInfo.item.code + '.child.selection') }}</span>
            <v-btn-toggle :mandatory="true" v-model="editedItem.gubun">
              <v-btn color="green" @click="save" value="기본">{{ $t('menu.' + tabInfo.item.code + '.child.primary') }}</v-btn>
              <v-btn color="green" @click="save" value="옵션">{{ $t('menu.' + tabInfo.item.code + '.child.option') }}</v-btn>
            </v-btn-toggle>
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
      gubun: "",
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
        .post("/goods_api/goods_blind_system_option_item_val_call", {
          userid: this.$store.getters.getLoginInfo.loginInfo.id,
          idx: this.pageStorage.productTreeActiveItemList[0].idx
        })
        .then(rs => {
          console.log(rs);
          this.editedItem = rs.data[0];
          this.editedItem.gubun = rs.data[0].choice;
        });
    },
    save: function() {
      let rq;
      rq = this.editedItem;
      rq.userid = this.$store.getters.getLoginInfo.loginInfo.id;
      rq.idx = this.pageStorage.productTreeActiveItemList[0].idx;
      this.$http
        .post("/goods_api/goods_blind_system_option_item_val_reg", rq)
        .then(rs => {
          console.log(rs);
          this.eventBus.$emit("requestProductTreeLoad");
          this.$store.dispatch("openSnackbar", {
            text: "msg.notice.save"
          });
        });
    }
  }
};
</script>

