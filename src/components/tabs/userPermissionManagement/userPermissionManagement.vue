// 사용자 권한 설정 // 메인
<template>
  <div>
    <v-tabs color="background" slider-color="green">
      <v-tab class="pb-2" v-for="(item, i) in tabs" :key="i" ripple>{{ $t('menu.' + tabInfo.item.code + ".child." + item.text) }}</v-tab>
      <v-tab-item lazy transition="false" reverse-transition="false" v-for="(item, i) in tabs" :key="i">
        <v-card flat>
          <primary-info v-if="item.component == 'primaryInfo' " :tab-info="tabInfo"></primary-info>
          <use-permission v-if="item.component == 'usePermission' " :tab-info="tabInfo"></use-permission>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import primaryInfo from "./primaryInfo";
import usePermission from "./usePermission";
export default {
  props: ["tabInfo"],
  components: {
    "primary-info": primaryInfo,
    "use-permission": usePermission
  },
  data() {
    return {
      tabs: [
        { text : 'primary_info', component: "primaryInfo" },
        { text : 'use_permission', component: "usePermission" }
      ]
    };
  }
};
</script>

