// 계정 과목 확인 메인
<template>
  <div>
    <v-tabs v-model="active" color="background" slider-color="green">
      <v-tab class="pb-2" v-for="(item, i) in tabs" :key="i" ripple>{{ $t('menu.' + tabInfo.item.code + ".child." + item.text) }}</v-tab>
      <v-tabs-items>
        <v-tab-item
          lazy
          v-for="(item, i) in tabs"
          :key="i"
          class="pa-1 pt-3"
          transition="false"
          reverse-transition="false"
        >
          <!-- 은행 등록 확인 -->
          <class-name-edit
            v-if="item.name == 'classNameEdit'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
          ></class-name-edit>
          <!-- 계정 과목 확인 -->
          <account-subject-edit
            v-if="item.name == 'accountSubjectEdit'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
          ></account-subject-edit>
          <!-- 계정 과목 확인 -->
          <account-subject-explain
            v-if="item.name == 'accountSubjectExplain'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
          ></account-subject-explain>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>

    <v-card color="background" flat>
      <account-subject-check-tree
        :tab-info="tabInfo"
        :event-bus="eventBus"
        :page-storage="pageStorage"
      ></account-subject-check-tree>
    </v-card>
  </div>
</template>

<script>
import Vue from "vue";

import classNameEdit from "./classNameEdit";
import accountSubjectEdit from "./accountSubjectEdit";
import accountSubjectExplain from "./accountSubjectExplain";

import accountSubjectCheckTree from "./accountSubjectCheckTree";

export default {
  props: ["tabInfo"],
  components: {
    "class-name-edit": classNameEdit,
    "account-subject-edit": accountSubjectEdit,
    "account-subject-explain": accountSubjectExplain,
    "account-subject-check-tree": accountSubjectCheckTree
  },
  data() {
    return {
      active: null,
      tabs: [
        {
          name: "classNameEdit",
          text: "class_name_edit",
          component: "classNameEdit"
        },
        {
          name: "accountSubjectEdit",
          text: "account_subject_edit",
          component: "accountSubjectEdit"
        },
        {
          name: "accountSubjectExplain",
          text: "account_subject_explain",
          component: "accountSubjectExplain"
        }
      ],
      eventBus: null,
      pageStorage: {}
    };
  },
  watch: {
    active: function(data, oldData) {
      this.pageStorage.active = data;
      if (oldData != null) {
        this.eventBus.$emit("onChangeTreeActiveList");
      }
    }
  },
  beforeMount() {
    this.eventBus = new Vue();
  }
};
</script>

<style>
.v-window__container--is-active {
  height: auto !important;
}
</style>

