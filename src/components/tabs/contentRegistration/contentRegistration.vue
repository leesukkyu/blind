// 컨텐츠등록
<template>
  <div>
    <v-card color="background" flat>
      <product-tree
        :tab-info="tabInfo"
        :event-bus="eventBus"
        :page-storage="pageStorage"
        ref="productTree"
      ></product-tree>
    </v-card>
    <v-tabs v-model="active" @change="onChangeTab" color="background" slider-color="green" class="mt-3">
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
          <!-- 썸네일 -->
          <thumbnail
            v-if="item.name == 'thumbnail'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="thumbnail"
          ></thumbnail>

          <!-- 상세이미지 -->
          <detail-image
            v-if="item.name == 'detailImage'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="detailImage"
          ></detail-image>

          <!-- 테크니컬데이터 -->
          <technical-data
            v-if="item.name == 'technicalData'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="technicalData"
          ></technical-data>

          <!-- 세탁 및 관리 -->
          <wash-management
            v-if="item.name == 'washManagement'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="washManagement"
          ></wash-management>

          <!-- 빛 투과율 -->
          <light-transmission
            v-if="item.name == 'lightTransmission'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="lightTransmission"
          ></light-transmission>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>

<script>
import Vue from "vue";

import productTree from "./productTree";

import thumbnail from "./thumbnail";
import detailImage from "./detailImage";
import technicalData from "./technicalData";
import washManagement from "./washManagement";
import lightTransmission from "./lightTransmission";

export default {
  props: ["tabInfo"],
  components: {
    "product-tree": productTree,

    "thumbnail": thumbnail,
    "detail-image": detailImage,
    "technical-data": technicalData,
    "wash-management": washManagement,
    "light-transmission": lightTransmission
  },
  data() {
    return {
      tabName: "",
      active: null,
      tabs: [
        {
          name: "thumbnail",
          text: "thumbnail",
          component: "thumbnail"
        },
        {
          name: "detailImage",
          text: "detail_image",
          component: "detailImage"
        },
        {
          name: "technicalData",
          text: "technical_data",
          component: "technicalData"
        },
        {
          name: "washManagement",
          text: "wash_management",
          component: "washManagement"
        },
        {
          name: "lightTransmission",
          text: "light_transmission",
          component: "lightTransmission"
        }
      ],
      eventBus: null,
      pageStorage: {}
    };
  },
  beforeMount() {
    // 상품 트리에서 누른 경우 리스너
    this.eventBus.$on(
      "changeProductTreeActiveList",
      this.onChangeProductTreeActiveList
    );
  },
  created() {
    this.eventBus = new Vue();
    console.log('xx');
    this.$nextTick(function() {
      this.$refs.productTree.init();
    })
  },
  methods: {
    // 탭이 바뀐 경우
    onChangeTab: function() {
      this.pageStorage.activeTabIndex = this.active;
      this.pageStorage.tabObject = this.tabs[this.active];
      this.tabName = this.pageStorage.tabObject.name;
      this.onChangeActiveTab();
    },
    onChangeActiveTab: function() {
      this.$nextTick(function() {
        let name = this.pageStorage.tabObject.name;
        // 썸네일 탭을 누른 경우
        if (name == "thumbnail") {
          this.$refs.thumbnail[0].init();
        }
        // 상세이미지 탭을 누른 경우
        else if (name == "detailImage") {
          this.$refs.detailImage[0].init();
        }
        // 테크니컬데이터 탭을 누른 경우
        else if (name == "technicalData") {
          this.$refs.technicalData[0].init();
        }
        // 세탁 및 관리 탭을 누른 경우
        else if (name == "washManagement") {
          this.$refs.washManagement[0].init();
        }
        // 빛 투과율 탭을 누른 경우
        else if (name == "lightTransmission") {
          this.$refs.lightTransmission[0].init();
        }
      });
    },
    // 상품 트리에서 누른 경우
    onChangeProductTreeActiveList: function() {
      this.onChangeActiveTab();
      // let item, type;
      // if (this.pageStorage.productTreeActiveItemList.length) {
      //   item = this.pageStorage.productTreeActiveItemList[0];
      //   type = this.pageStorage.productTreeActiveItemList[0].type;
      //   switch (type) {
      //     case "브":
      //       break;
      //   }
      // }
    },
    findParent: function(item, type) {
      while (item.parent) {
        if (item.type == type) {
          return true;
        }
        item = item.parent;
      }
      return false;
    },
    findParentByKey: function(item, key) {
      while (item.parent) {
        if (item.key == key) {
          return true;
        }
        item = item.parent;
      }
      return false;
    }
  }
};
</script>

<style>
.v-window__container--is-active {
  height: auto !important;
}
</style>

