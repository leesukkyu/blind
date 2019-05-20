// 선택원단속성편집
<template>
  <div>
    <v-card class="px-2" flat color="background">
      <v-container pa-0 fluid grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm3>
            <!-- 원단구분 -->
            <v-select
              :items="list"
              :label="$t('menu.' + tabInfo.item.code + '.child.fabric_classification')"
              v-model="editedItem.wondan_gubun"
              @change="change"
            ></v-select>
          </v-flex>
          <v-flex v-show="showType=='1'" xs12 sm3>
            <!-- 폭길이 -->
            <v-text-field
              hide-details
              v-model="editedItem.wondan_width_length"
              :placeholder="$t('menu.' + tabInfo.item.code + '.child.width_length')"
              @input="input"
            ></v-text-field>
          </v-flex>
          <v-flex v-show="showType=='2'" xs12 sm3>
            <!-- 패턴길이 -->
            <v-text-field
              hide-details
              v-model="editedItem.wondan_pattern_cm"
              :placeholder="$t('menu.' + tabInfo.item.code + '.child.pattern_length')"
              @input="input"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <div>
              <h5 class="body-2 mb-0">{{ $t('menu.' + tabInfo.item.code + '.child.max_size') }}</h5>
            </div>
            <v-container pa-0 fluid grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm3>
                  <!-- 최대사이즈 - 가로길이 -->
                  <v-text-field
                    type="number"
                    hide-details
                    v-model="editedItem.wondan_size_w"
                    :placeholder="$t('menu.' + tabInfo.item.code + '.child.horizon_length')"
                    @input="input"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm3>
                  <!-- 최대사이즈 - 가로길이단위 -->
                  <v-select
                    :items="unitList"
                    :label="$t('menu.' + tabInfo.item.code + '.child.horizon_length_unit')"
                    v-model="editedItem.wondan_size_w_s"
                    @change="change"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm3>
                  <!-- 최대사이즈 - 세로길이 -->
                  <v-text-field
                    type="number"
                    hide-details
                    v-model="editedItem.wondan_size_h"
                    :placeholder="$t('menu.' + tabInfo.item.code + '.child.vertical_length')"
                    @input="input"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm3>
                  <!-- 최대사이즈 - 세로길이단위 -->
                  <v-select
                    :items="unitList"
                    :label="$t('menu.' + tabInfo.item.code + '.child.vertical_length_unit')"
                    v-model="editedItem.wondan_size_h_s"
                    @change="change"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
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
    showType: 0,
    self: null,
    list: [],
    unitList: ["cm", "mm"],
    editedItem: {
      wondan_gubun: "",
      wondan_pattern_cm: "",
      wondan_width_length: "",
      wondan_size_w: "",
      wondan_size_h: "",
      wondan_size_w_s: "",
      wondan_size_h_s: ""
    }
  }),
  beforeMount: function() {
    this.self = this;
  },
  methods: {
    init: function() {
      this.setDropdownList();
      this.loadSelectFabricPropertyEdit();
    },
    setDropdownList: function() {
      this.list.push({
        text : "Roll",
        value : "Roll"
      });
      this.list.push({
        text : "슬랫",
        value : "슬랫"
      });
      this.list.push({
        text : "버티컬",
        value : "버티컬"
      });
      this.list.push({
        text : "트리플",
        value : "트리플"
      });
      this.list.push({
        text : "Combi",
        value : "Combi"
      });
      this.list.push({
        text : "로만",
        value : "로만"
      });
      this.list.push({
        text : "어닝",
        value : "어닝"
      });
      this.list.push({
        text : "허니콤",
        value : "허니콤"
      });
      this.list.push({
        text : "플리티드",
        value : "플리티드"
      });
    },
    change: function() {
      this.setShowType();
      this.save();
    },
    input: function() {
      this.save();
    },
    setShowType: function() {
      switch (this.editedItem.wondan_gubun) {
        case "Roll":
        case "로만":
        case "어닝":
          this.showType = 0;
          break;
        case "슬랫":
        case "버티컬":
        case "허니콤":
        case "플리티드":
          this.showType = 1;
          break;
        case "트리플":
        case "Combi":
          this.showType = 2;
          break;
      }
    },
    save: function() {
      this.$http
        .post("/goods_api/goods_wondan_option_edit_reg", {
          ajaxAnimation : false,
          userid: this.$store.getters.getLoginInfo.loginInfo.id,
          idx: this.pageStorage.productTreeActiveItemList[0].idx,
          gubun: this.editedItem.wondan_gubun,
          p_length: this.editedItem.wondan_pattern_cm,
          w_length: this.editedItem.wondan_width_length,
          w_size: this.editedItem.wondan_size_w,
          h_size: this.editedItem.wondan_size_h,
          w_size_k: this.editedItem.wondan_size_w_s,
          h_size_k: this.editedItem.wondan_size_h_s
        })
        .then(rs => {
          this.$store.dispatch("openSnackbar", {
            text: "msg.notice.save"
          });
        });
    },
    loadSelectFabricPropertyEdit: function() {
      this.$http
        .post("/goods_api/goods_wondan_option_edit", {
          userid: this.$store.getters.getLoginInfo.loginInfo.id,
          idx: this.pageStorage.productTreeActiveItemList[0].idx
        })
        .then(rs => {
          console.log(rs);
          this.editedItem = rs;
        });
    }
  }
};
</script>

