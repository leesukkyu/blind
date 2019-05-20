<template>
  <div>
    <v-tabs color="background" show-arrows>
      <v-tabs-slider v-show="_tabList.length != 0" color="green"></v-tabs-slider>
      <v-tab v-for="(item, index) in _tabList" :href="'#tab-' + index" :key="index">
        {{ $t("menu." + item.item.code + ".text") }}
        <v-btn @click.stop="closeTab(item)" class="ma-0 ml-1" small flat icon color="red">
          <v-icon>close</v-icon>
        </v-btn>
      </v-tab>
      <v-tabs-items class="userTabs">
        <v-tab-item
          v-for="(item, i) in _tabList"
          :value="'tab-' + i"
          :key="i"
          transition="tab"
          reverse-transition="tab"
          class="pa-1 pt-3"
        >
          <!-- 은행 등록 확인 -->
          <bank-regist-check :tab-info="item" v-if="item.item.code == 'mn1_002_0001'"></bank-regist-check>

          <!-- 계정 과목 확인 -->
          <account-subject-check :tab-info="item" v-if="item.item.code == 'mn1_002_0002'"></account-subject-check>

          <!-- 단위 변환 확인 -->
          <unit-conversion-check :tab-info="item" v-if="item.item.code == 'mn1_002_0003'"></unit-conversion-check>

          <!-- 거래처 등록 -->
          <account-regist :tab-info="item" v-if="item.item.code == 'mn1_002_0018'"></account-regist>

          <!-- 시스템 사용사 정보 관리 -->
          <system-user-info-management :tab-info="item" v-if="item.item.code == 'mn1_002_0004'"></system-user-info-management>

          <!-- 사용자 권한 설정 -->
          <user-permission-management :tab-info="item" v-if="item.item.code == 'mn1_002_0005'"></user-permission-management>
        
          <!-- 표준 제품 등록 -->
          <standard-product-registration :tab-info="item" v-if="item.item.code == 'mn1_004_0001'"></standard-product-registration>

          <!-- 컨텐츠 등록 -->
          <content-registration :tab-info="item" v-if="item.item.code == 'mn1_004_0003'"></content-registration>

          <!-- 거래처별 카다록 단가 -->
          <catalogue-price :tab-info="item" v-if="item.item.code == 'mn1_005_0007'"></catalogue-price>
        
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>

<script>
export default {
  components: {
    "bank-regist-check": bankRegistCheck,                                       // 은행 등록 확인
    "account-subject-check": accountSubjectCheck,                               // 계정 과목 확인
    "unit-conversion-check": unitConversionCheck,                               // 단위 변환 확인
    "account-regist": accountRegist,                                            // 거래처 등록
    "system-user-info-management": systemUserInfoManagement,                    // 시스템 사용사 정보 관리
    "user-permission-management": userPermissionManagement,                     // 사용자 권한 설정
    "standard-product-registration" : standardProductRegistration,              // 표준 제품 등록
    "content-registration" : contentRegistration,                               // 표준 제품 등록
    "catalogue-price" : cataloguePrice,                                         // 거래처별 카다록 단가
  },
  data: function() {
    return {
      id: null,
      password: null,
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  computed: {
    _tabList: function() {
      return this.$store.getters.getUserTabs.userTabs;
    }
  },
  methods: {
    closeTab: function(item) {
      console.log("close");
      this.$store.dispatch("delUserTab", { item: item });
    }
  }
};

var tabCodeMap = {
  // 은행 등록 확인
  mn1_002_0001: "xxx"
};

import bankRegistCheck from "../tabs/bankRegistCheck/bankRegistCheck";
import accountSubjectCheck from "../tabs/accountSubjectCheck/accountSubjectCheck";
import unitConversionCheck from "../tabs/unitConversionCheck/unitConversionCheck";
import accountRegist from "../tabs/accountRegist/accountRegist";
import systemUserInfoManagement from "../tabs/systemUserInfoManagement/systemUserInfoManagement";
import userPermissionManagement from "../tabs/userPermissionManagement/userPermissionManagement";
import standardProductRegistration from "../tabs/standardProductRegistration/standardProductRegistration";
import contentRegistration from "../tabs/contentRegistration/contentRegistration";
import cataloguePrice from "../tabs/cataloguePrice/cataloguePrice";

</script>

<style>
.userTabs > .v-window__container {
  height: 100% !important;
}
</style>