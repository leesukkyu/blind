// 단위 변환 확인 // 메인
<template>
  <div>
    <v-tabs color="background" slider-color="green">
      <v-tab class="pb-2" v-for="(item, i) in tabs" :key="i" ripple>{{ $t('menu.' + tabInfo.item.code + ".child." + item.text) }}</v-tab>
      <v-tab-item lazy transition="false" reverse-transition="false" v-for="(item, i) in tabs" :key="i">
        <v-card flat>
          <area-unit v-if="item.component == 'areaUnit' " :tab-info="tabInfo"></area-unit>
          <length-unit v-if="item.component == 'lengthUnit' " :tab-info="tabInfo"></length-unit>
          <bundle-unit v-if="item.component == 'bundleUnit' " :tab-info="tabInfo"></bundle-unit>
          <standard-unit v-if="item.component == 'standardUnit' " :tab-info="tabInfo"></standard-unit>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import areaUnit from "./areaUnit";
import lengthUnit from "./lengthUnit";
import bundleUnit from "./bundleUnit";
import standardUnit from "./standardUnit";

export default {
  props: ["tabInfo"],
  components: {
    "area-unit": areaUnit,
    "length-unit": lengthUnit,
    "bundle-unit": bundleUnit,
    "standard-unit": standardUnit
  },
  data() {
    return {
      tabs: [
        { name: "areaUnit", text: "area_unit", component: "areaUnit" },
        { name: "lengthUnit", text: "length_unit", component: "lengthUnit" },
        { name: "bundleUnit", text: "bundle_unit", component: "bundleUnit" },
        {
          name: "standardUnit",
          text: "standard_unit",
          component: "standardUnit"
        }
      ]
    };
  }
};
</script>

