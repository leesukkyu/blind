// 시스템 사용사 정보 관리 // 메인
<template>
  <div>
    <v-toolbar flat color="background">
      <v-toolbar-title class="pr-3">{{ $t('menu.' + tabInfo.item.code + ".text") }}</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid>
      <v-layout>
        <v-flex xs4 style="overflow:auto">
          <v-card color="background" ref="form">
            <v-card-title primary-title>본사 기본 정보</v-card-title>
            <v-card-text>
              <v-text-field box :label="$t('menu.' + tabInfo.item.code + '.child.code')" v-model="data.app_code" disabled></v-text-field>
              <v-text-field box :label="$t('menu.' + tabInfo.item.code + '.child.division')" :value="useModelTextMap[data.app_use_model]" disabled></v-text-field>              
              <v-text-field box :label="$t('menu.' + tabInfo.item.code + '.child.head_office_name')" v-model="data.app_company" ></v-text-field>
              <v-text-field box :label="$t('menu.' + tabInfo.item.code + '.child.president_name')" v-model="data.app_ceo" ></v-text-field>
              <v-text-field box :label="$t('menu.' + tabInfo.item.code + '.child.business_number')" v-model="data.app_business_number" ></v-text-field>
              <v-container pa-0 fluid>
                <v-layout row wrap>
                  <v-flex xs4><v-text-field box :label="$t('menu.' + tabInfo.item.code + '.child.post')" v-model="data.app_post"></v-text-field></v-flex>
                  <v-flex xs12><v-text-field box :label="$t('menu.' + tabInfo.item.code + '.child.address1')" v-model="data.app_addr1" disabled></v-text-field></v-flex>
                  <v-flex xs12><v-text-field box :label="$t('menu.' + tabInfo.item.code + '.child.address2')" v-model="data.app_addr2"></v-text-field></v-flex>
                </v-layout>
              </v-container>
              <v-text-field box :label="$t('menu.' + tabInfo.item.code + '.child.sectors')" v-model="data.app_upjong"></v-text-field>
              <v-text-field box :label="$t('menu.' + tabInfo.item.code + '.child.business_type')" v-model="data.app_uptae"></v-text-field>
              <v-text-field box :label="$t('menu.' + tabInfo.item.code + '.child.manager_call_number')" v-model="data.app_dam_tel"></v-text-field>
              <v-text-field box :label="$t('menu.' + tabInfo.item.code + '.child.business_email')" v-model="data.app_email"></v-text-field>
              <v-text-field box :label="$t('menu.' + tabInfo.item.code + '.child.bill_email')" v-model="data.app_taxemail"></v-text-field>
              <v-text-field box :label="$t('menu.' + tabInfo.item.code + '.child.representation_call_number')" v-model="data.app_hptel"></v-text-field>
              <v-text-field box :label="$t('menu.' + tabInfo.item.code + '.child.system_start_date')" v-model="data.app_status_y_datetime"></v-text-field>
              
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs8>y</v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  props: ["tabInfo"],
  data() {
    return {
      data: {},
      useModelTextMap: {
        1: "서비스딜러",
        2: "세일즈센터",
        3: "제조공급처",
        4: "원단공급처",
        5: "판매유통사"
      }
    };
  },
  beforeMount() {
    this.$http
      .post("basic_api/service_use_company_info", {
        app_code: this.$store.getters.getLoginInfo.loginInfo.app_code
      })
      .then(rs => {
        this.data = rs.data[0];
      });
  },
  created() {},
  methods: {}
};
</script>

