// 가공값편집
<template>
  <div>
    <v-card class="px-2" flat color="background">
      <v-container pa-0 fluid grid-list-md>
        <v-layout wrap>
          <v-flex xs12 mt-2>
            <!-- 염색 -->
            <span class="px-4 body-2">{{ $t('menu.' + tabInfo.item.code + '.child.dyeing') }}</span>
            <v-btn-toggle :mandatory="true" v-model="editedItem.val1">
              <v-btn
                value="선염"
                color="green"
              >{{ $t('menu.' + tabInfo.item.code + '.child.pre_dyeing') }}</v-btn>
              <v-btn
                value="후염"
                color="green"
              >{{ $t('menu.' + tabInfo.item.code + '.child.after_dyeing') }}</v-btn>
              <v-btn
                value="천연"
                color="green"
              >{{ $t('menu.' + tabInfo.item.code + '.child.natural') }}</v-btn>
            </v-btn-toggle>

            <!-- 방염 -->
            <span
              class="px-4 body-2"
            >{{ $t('menu.' + tabInfo.item.code + '.child.flame_retardation') }}</span>
            <v-btn-toggle :mandatory="true" v-model="editedItem.val2">
              <v-btn value="안 됨" color="green">{{ $t('menu.' + tabInfo.item.code + '.child.no') }}</v-btn>
              <v-btn value="OK" color="green">OK</v-btn>
              <v-btn
                value="난연"
                color="green"
              >{{ $t('menu.' + tabInfo.item.code + '.child.flame_retardant') }}</v-btn>
              <v-btn
                value="필무"
                color="green"
              >{{ $t('menu.' + tabInfo.item.code + '.child.no_require') }}</v-btn>
            </v-btn-toggle>
          </v-flex>

          <v-flex xs12 mt-3>
            <!-- 암막 -->
            <span class="px-4 body-2">{{ $t('menu.' + tabInfo.item.code + '.child.dark') }}</span>
            <v-btn-toggle :mandatory="true" v-model="editedItem.val3">
              <v-btn value="안 됨" color="green">{{ $t('menu.' + tabInfo.item.code + '.child.no') }}</v-btn>
              <v-btn value="OK" color="green">OK</v-btn>
              <v-btn
                value="세미암막"
                color="green"
              >{{ $t('menu.' + tabInfo.item.code + '.child.semi_dark') }}</v-btn>
              <v-btn value="DimOut" color="green">
                DimOut
                <v-text-field
                  v-model="editedItem.val3_di"
                  height="14"
                  :hide-details="true"
                  class="pa-0 pl-2"
                ></v-text-field>
              </v-btn>
              <v-btn value="BlackOut" color="green">
                BlackOut
                <v-text-field
                  v-model="editedItem.val3_bl"
                  height="14"
                  :hide-details="true"
                  class="pa-0 pl-2"
                ></v-text-field>
              </v-btn>
            </v-btn-toggle>
          </v-flex>
          <v-flex xs12 sm3 mt-1 pl-3>
            <!-- 적정재고 -->
            <v-text-field
              v-model="editedItem.val7"
              class="pa-0"
              :placeholder="$t('menu.' + tabInfo.item.code + '.child.appropriate_inventory')"
              v-comma
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-layout wrap>
              <v-flex xs12 sm4 pl-3>
                <!-- 인증 -->
                <v-autocomplete
                  item-text="name"
                  item-value="name"
                  class="pa-0"
                  v-model="editedItem.val4"
                  :hint="$t('menu.' + tabInfo.item.code + '.child.certification')"
                  :items="option.certification.list"
                  :label="$t('menu.' + tabInfo.item.code + '.child.certification')"
                  persistent-hint
                  multiple
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12 sm4 pl-3>
                <!-- 자수 -->
                <v-autocomplete
                  item-text="name"
                  item-value="name"
                  class="pa-0"
                  v-model="editedItem.val5"
                  :hint="$t('menu.' + tabInfo.item.code + '.child.embroidery')"
                  :items="option.embroidery.list"
                  :label="$t('menu.' + tabInfo.item.code + '.child.embroidery')"
                  persistent-hint
                ></v-autocomplete>
              </v-flex>
              <v-flex xs12 sm4 pl-3>
                <!-- 패턴 -->
                <v-autocomplete
                  item-text="name"
                  item-value="name"
                  class="pa-0"
                  v-model="editedItem.val6"
                  :hint="$t('menu.' + tabInfo.item.code + '.child.pattern')"
                  :items="option.pattern.list"
                  :label="$t('menu.' + tabInfo.item.code + '.child.pattern')"
                  persistent-hint
                ></v-autocomplete>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 sm12 mt-1 pl-3>
            <v-btn @click="save" small depressed color="primary">{{ $t('function.edit') }}</v-btn>
            <v-btn @click="remove" small depressed color="error">{{ $t('function.del') }}</v-btn>
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
    editedItem: {
      val1: "",
      val2: "",
      val3: "",
      val3_di: "",
      val3_bl: "",
      val4: [],
      val5: "",
      val6: "",
      val7: ""
    },
    option: {
      certification: {
        list: []
      },
      embroidery: {
        list: []
      },
      pattern: {
        list: []
      }
    }
  }),
  beforeMount: function() {
    this.self = this;
  },
  methods: {
    init: function() {
      this.setDropdownList();
      this.loadProcessValue();
    },
    setDropdownList: function() {
      this.$http
        .post("/goods_api/auto_cp_certify_list", {
          userid: this.$store.getters.getLoginInfo.loginInfo.id
        })
        .then(rs => {
          this.option.certification.list = rs.data;
        });
      this.$http
        .post("/goods_api/auto_cp_jasu_list", {
          userid: this.$store.getters.getLoginInfo.loginInfo.id
        })
        .then(rs => {
          this.option.embroidery.list = rs.data;
        });
      this.$http
        .post("/goods_api/auto_cp_pattern_list", {
          userid: this.$store.getters.getLoginInfo.loginInfo.id
        })
        .then(rs => {
          this.option.pattern.list = rs.data;
        });
    },
    save: function() {
      let rq;
      rq = this.editedItem;
      rq.userid = this.$store.getters.getLoginInfo.loginInfo.id;
      rq.idx = this.pageStorage.productTreeActiveItemList[0].idx;
      rq.val7 = this.$util.getNumber(rq.val7);
      this.$http.post("/goods_api/goods_processval_edit", rq).then(rs => {
        console.log(rs);
        this.eventBus.$emit("requestProductTreeLoad");
        this.$store.dispatch("openSnackbar", {
          text: "msg.notice.edit"
        });
      });
    },
    remove: function() {
      let rq = {};
      rq.userid = this.$store.getters.getLoginInfo.loginInfo.id;
      rq.idx = this.pageStorage.productTreeActiveItemList[0].idx;
      this.$http.post("/goods_api/goods_processval_del", rq).then(rs => {
        this.eventBus.$emit("requestProductTreeLoad");
        this.$store.dispatch("openSnackbar", {
          text: "msg.notice.del"
        });
      });
    },
    loadProcessValue: function() {
      this.$http
        .post("/goods_api/goods_processval_call", {
          userid: this.$store.getters.getLoginInfo.loginInfo.id,
          idx: this.pageStorage.productTreeActiveItemList[0].idx
        })
        .then(rs => {
          console.log(rs);
          this.editedItem.idx = rs.data[0].gc_idx;
          this.editedItem.val1 = rs.data[0].type1;
          this.editedItem.val2 = rs.data[0].type2;
          this.editedItem.val3 = rs.data[0].type3;
          this.editedItem.val4 = rs.data[0].type4.split(",");
          this.editedItem.val5 = rs.data[0].type5;
          this.editedItem.val6 = rs.data[0].type6;
          this.editedItem.val7 = this.$util.setComma(rs.data[0].type7);
        });
    }
  }
};
</script>

