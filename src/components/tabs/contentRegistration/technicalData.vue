// 테크니컬데이터
<template>
  <div>
    <v-tabs v-model="active" @change="onChangeTab" color="background" slider-color="green">
      <v-tab
        class="pb-2"
        v-for="(item, i) in tabs"
        :key="i"
        ripple
      >{{ $t('menu.' + tabInfo.item.code + ".child." + item.text) }}</v-tab>
      <v-tabs-items>
        <v-tab-item
          v-for="(item, i) in tabs"
          :key="i"
          class="pa-1 pt-3"
          transition="false"
          reverse-transition="false"
        >
          <!-- 텍스트 데이터 편집 -->
          <text-data-edit
            v-if="item.name == 'textDataEdit'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="textDataEdit"
          ></text-data-edit>

          <!-- 컨텐츠 데이터 편집 -->
          <content-data-edit
            v-if="item.name == 'contentDataEdit'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="contentDataEdit"
          ></content-data-edit>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>

<script>
import Vue from "vue";

import textDataEdit from "./textDataEdit";
import contentDataEdit from "./contentDataEdit";

export default {
  props: ["tabInfo", "eventBus", "pageStorage"],
  components: {
    "text-data-edit": textDataEdit,
    "content-data-edit": contentDataEdit
  },
  data: () => ({
    tabName: "",
    active: null,
    tabs: [
      {
        name: "textDataEdit",
        text: "text_data_edit",
        component: "textDataEdit"
      },
      {
        name: "contentDataEdit",
        text: "content_data_edit",
        component: "contentDataEdit"
      }
    ]
  }),
  methods: {
    created() {
      this.eventBus = new Vue();
      console.log("테크니컬데이터");
    },
    init: function() {
      console.log("테크니컬데이터");
      this.$refs.textDataEdit[0].init();
      this.$refs.contentDataEdit[0].init();
    },
    onChangeTab: function() {}
  }
};
</script>

