<template>
  <div class="mainWrap" :class="{help : helpSettingValue}">
    <v-app>
      <main-header-wrap></main-header-wrap>
      <main-tabs-wrap></main-tabs-wrap>
      <main-snackbar-wrap></main-snackbar-wrap>
      <main-ajax-animation-wrap></main-ajax-animation-wrap>
    </v-app>
  </div>
</template>

<script>

import mainPageHeader from "./common/mainPageHeader";
import mainPageTabs from "./common/mainPageTabs";
import mainPageSnackbar from "./common/mainPageSnackbar";
import mainAjaxAnimationWrap from "./common/mainAjaxAnimationWrap";


export default {
  name: 'MainPage',
  components: {
    'main-header-wrap': mainPageHeader,
    'main-tabs-wrap': mainPageTabs,
    'main-snackbar-wrap': mainPageSnackbar,
    'main-ajax-animation-wrap' : mainAjaxAnimationWrap
  },
  computed : {
    helpSettingValue : function(){
      return this.$store.getters.getIni.help;
    }
  }
};
</script>

