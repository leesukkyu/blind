// 거래처등록 확인 // 메인
<template>
  <div>
    <v-tabs color="background" slider-color="green">
      <v-tab
        class="pb-2"
        v-for="(item, i) in tabs"
        :key="i"
        ripple
      >{{ $t('menu.' + tabInfo.item.code + ".child." + item.text) }}</v-tab>
      <v-tab-item
        lazy
        transition="false"
        reverse-transition="false"
        v-for="(item, i) in tabs"
        :key="i"
      >
        <v-card flat>
          <primary-info
            v-if="item.component == 'primaryInfo' "
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
          ></primary-info>
          <pay-info
            v-if="item.component == 'payInfo' "
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
          ></pay-info>
          <etc-info
            v-if="item.component == 'etcInfo' "
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
          ></etc-info>
          <use-confirm
            v-if="item.component == 'useConfirm' "
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
          ></use-confirm>
          <sales-connection
            v-if="item.component == 'SalesConnection' "
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
          ></sales-connection>
          <produce-connection
            v-if="item.component == 'ProduceConnection' "
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
          ></produce-connection>
          <contract-item
            v-if="item.component == 'contractItem' "
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
          ></contract-item>
          <selling-tool-item
            v-if="item.component == 'sellingToolItem' "
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
          ></selling-tool-item>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import Vue from "vue";

import primaryInfo from "./primaryInfo";
import payInfo from "./payInfo";
import etcInfo from "./etcInfo";
import useConfirm from "./useConfirm";
import SalesConnection from "./SalesConnection";
import ProduceConnection from "./ProduceConnection";
import contractItem from "./contractItem";
import sellingToolItem from "./sellingToolItem";

export default {
  props: ["tabInfo"],
  components: {
    "primary-info": primaryInfo,
    "pay-info": payInfo,
    "etc-info": etcInfo,
    "use-confirm": useConfirm,
    "sales-connection": SalesConnection,
    "produce-connection": ProduceConnection,
    "contract-item": contractItem,
    "selling-tool-item": sellingToolItem
  },
  data() {
    return {
      tabs: [
        { name: "primaryInfo", text: "primary_info", component: "primaryInfo" },
        { name: "payInfo", text: "pay_info", component: "payInfo" },
        { name: "etcInfo", text: "etc_info", component: "etcInfo" },
        { name: "useConfirm", text: "use_confirm", component: "useConfirm" },
        {
          name: "SalesConnection",
          text: "seles_connection",
          component: "SalesConnection"
        },
        {
          name: "ProduceConnection",
          text: "produce_connection",
          component: "ProduceConnection"
        },
        {
          name: "contractItem",
          text: "contract_item",
          component: "contractItem"
        },
        {
          name: "sellingToolItem",
          text: "selling_tool_item",
          component: "sellingToolItem"
        }
      ],
      eventBus: null,
      pageStorage: {
        customList: []
      }
    };
  },
  beforeMount() {},
  created() {
    this.eventBus = new Vue();
    this.eventBus.$on("loadCustomList", this.loadCustomList);
    this.loadCustomList();
  },
  methods: {
    loadCustomList: function(cb) {
      console.log(arguments);
      let _this = this;
      _this.$http
        .post("/customer_api/custom_list", {
          app_idx: this.$store.getters.getLoginInfo.loginInfo.app_idx
        })
        .then(response => {
          let list = response.data ? response.data : [];
          // 주소 1, 2를 합쳐준다.
          for (let i in list) {
            list[i].app_address = list[i].app_addr1 + " " + list[i].app_addr2;
          }
          this.$set(this.pageStorage, "customList", list);
          this.pageStorage.customList = list;
          this.eventBus.$emit("onChangeCustomList");
          if (cb) {
            cb();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

