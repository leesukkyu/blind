// 옵션값설정
<template>
  <div>
    <v-card class="px-2" flat color="background">
      <v-container pa-0 fluid grid-list-md>
        <v-layout wrap>
          <v-flex xs12 mt-2>
            <!-- 선택 -->
            <span class="px-4 body-2">{{ $t('menu.' + tabInfo.item.code + '.child.selection') }}</span>
            <v-btn-toggle :mandatory="true" small v-model="editedItem.choice">
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
            <!-- 선택 수 -->
            <span class="px-4 body-2">{{ $t('menu.' + tabInfo.item.code + '.child.choice_number') }}</span>
            <v-text-field
              style="display:inline-block;"
              v-model="editedItem.choice_cnt"
              :hide-details="true"
              class="pa-0 pl-2"
            ></v-text-field>
          </v-flex>

          <v-flex xs12 mt-3>
            <!-- 선택 값 -->
            <span class="px-4 body-2">{{ $t('menu.' + tabInfo.item.code + '.child.choice_value') }}</span>
          </v-flex>

          <v-container pa-0 pl-4 fluid grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm1>
                <!-- 입력수량 -->
                <v-text-field
                  type="number"
                  hide-details
                  v-model="editedItem.input_val"
                  :label="$t('menu.' + tabInfo.item.code + '.child.input_amount')"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm1 mr-4>
                <!-- 입력수량 - 설정 -->
                <v-select
                  :items="unitList"
                  :label="$t('menu.' + tabInfo.item.code + '.child.input_amount_unit')"
                  v-model="editedItem.input_k"
                ></v-select>
              </v-flex>

              <v-flex xs12 sm1>
                <!-- 가로 기준 설정 -->
                <v-select
                  :items="horizonList"
                  :label="$t('menu.' + tabInfo.item.code + '.child.horizon_setting')"
                  v-model="editedItem.width_k1"
                ></v-select>
              </v-flex>

              <v-flex xs12 sm1>
                <!-- 가로 기준 설정 값 -->
                <v-text-field
                  type="number"
                  hide-details
                  v-model="editedItem.width_val"
                  :label="$t('menu.' + tabInfo.item.code + '.child.input_value')"
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm1 mr-4>
                <!-- 가로 기준 설정 -->
                <v-select
                  :items="unitList"
                  :label="$t('menu.' + tabInfo.item.code + '.child.horizon_unit_setting')"
                  v-model="editedItem.width_k2"
                ></v-select>
              </v-flex>

              <v-flex xs12 sm1>
                <!-- 세로 기준 설정 -->
                <v-select
                  :items="verticalList"
                  :label="$t('menu.' + tabInfo.item.code + '.child.vertical_setting')"
                  v-model="editedItem.height_k1"
                ></v-select>
              </v-flex>

              <v-flex xs12 sm1>
                <!-- 세로 기준 설정 값 -->
                <v-text-field
                  type="number"
                  hide-details
                  v-model="editedItem.height_val"
                  :label="$t('menu.' + tabInfo.item.code + '.child.input_value')"
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm1>
                <!-- 세로 기준 설정 - 단위 -->
                <v-select
                  :items="unitList"
                  :label="$t('menu.' + tabInfo.item.code + '.child.vertical_unit_setting')"
                  v-model="editedItem.height_k2"
                ></v-select>
              </v-flex>


            </v-layout>
          </v-container>
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
    unitList : ['cm','mm'],
    horizonList : [],
    verticalList : [],
    editedItem: {
      choice: "",
      choice_cnt: "",
      input_val: "",
      input_k: "",
      width_k1: "",
      width_val: "",
      width_k2: "",
      height_k1: "",
      height_val: "",
      height_k2: ""
    }
  }),
  beforeMount: function() {
    this.self = this;
  },
  methods: {
    init: function() {
      this.horizonList.push('가로기준');
      this.horizonList.push('가로절대');
      this.horizonList.push('가로없음');
      
      this.verticalList.push('세로기준');
      this.verticalList.push('세로절대');
      this.verticalList.push('세로없음');

      // horizon_standard : '가로기준',
      //     horizon_absolute : '가로절대',
      //     horizon_none : '가로없음',
      //     vertical_standard : '세로기준',
      //     vertical_absolute : '세로절대',
      //     vertical_none : '세로없음',
      this.loadSystemSetting();
    },
    loadSystemSetting: function() {
      this.$http
        .post("/goods_api/goods_blind_system_option_config_call", {
          userid: this.$store.getters.getLoginInfo.loginInfo.id,
          idx: this.pageStorage.productTreeActiveItemList[0].idx
        })
        .then(rs => {
          console.log("--------");
          console.log(rs);
          rs.data[0].choice_cnt = rs.data[0].choice_count;
          this.editedItem = rs.data[0];
        });
    },
    save: function() {
      var rq;
      rq = this.editedItem;
      rq.userid = this.$store.getters.getLoginInfo.loginInfo.id;
      rq.idx = this.pageStorage.productTreeActiveItemList[0].idx;
      this.$http
        .post("/goods_api/goods_blind_system_option_config_add", rq)
        .then(rs => {
          console.log(rs);
          this.$store.dispatch("openSnackbar", {
            text: "msg.notice.save"
          });
        });
    }
  }
};
</script>

