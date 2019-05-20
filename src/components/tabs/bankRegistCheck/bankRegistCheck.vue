// 은행 등록 확인 메인
<template>
  <div>
    <v-tabs color="background" slider-color="green">
      <v-tab class="pb-2" v-for="(item, i) in tabs" :key="i" ripple>{{ $t('menu.' + tabInfo.item.code + ".child." + item.text) }}</v-tab>
      <v-tab-item lazy transition="false" reverse-transition="false" v-for="(item, i) in tabs" :key="i">
        <v-card flat>
          <bank-info v-if="item.component == 'bankInfo' " :tab-info="tabInfo"></bank-info>
          <card-info v-if="item.component == 'cardInfo' " :tab-info="tabInfo"></card-info>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import bankInfo from "./bankInfo";
import cardInfo from "./cardInfo";
export default {
  props: ["tabInfo"],
  components: {
    "bank-info": bankInfo,
    "card-info": cardInfo
  },
  data() {
    return {
      tabs: [
        { name: "bankInfo", text : 'bank_info', component: "bankInfo" },
        { name: "cardInfo", text : 'card_info', component: "cardInfo" }
      ]
    };
  }
};
</script>

