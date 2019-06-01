<template>
  <div style="position:relative">
    <div style="position:absolute;z-index:2;width:100%">
      <v-tabs
        v-model="tabIndex"
        color="background"
        :hide-slider="!isShowDepth2Wrap"
        show-arrows
        centered
        relative
      >
        <v-tabs-slider color="green"></v-tabs-slider>

        <v-tab
          v-for="(item, i) in menuList"
          :key="i"
          @click="clickDepth1Tab(item)"
        >{{ $t("menu." + item.depth.code + ".text") }}</v-tab>
      </v-tabs>

      <!-- 2depth 팝업 메뉴 -->
      <div class="depth2Wrap" v-if="isShowDepth2Wrap">
        <div class="pa-1">
          <v-card class="elevation-3 ma-1">
            <v-flex pa-2 text-xs-left pr-5>
              <v-btn
                class="ma-0"
                left
                v-for="(item, i) in selectedFirstItem.child"
                :key="i"
                flat
                color="green"
                @click="clickDepth2Tab(item)"
              >{{ $t("menu." + item.code + ".text") }}</v-btn>
            </v-flex>
          </v-card>
        </div>
        <v-btn
          class="pa-0 ma-0"
          style="min-width:36px;right:16px;top:67px;"
          absolute
          v-if="isShowDepth2Wrap"
          @click="closeDepth2"
          flat
          icon
          color="pink"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      tabIndex: 0,
      menuList: [],
      selectedFirstItem: null,
      isShowDepth2Wrap: false
    };
  },
  beforeMount: function() {
    let _this = this;
    _this.$http
      .post("/menu_api/user_menu_list", {
        userid: this.$store.getters.getLoginInfo.loginInfo.id
      })
      .then(function(response) {
        let list = [];
        if (response.status == "Y") {
          for (let i in response.list) {
            list.push(response.list[i]);
          }
          _this.menuList = list;
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    clickDepth1Tab: function(item) {
      this.selectedFirstItem = item;
      this.isShowDepth2Wrap = true;
    },
    clickDepth2Tab: function(item) {
      this.openUserTab(item);
    },
    closeDepth2: function() {
      this.isShowDepth2Wrap = false;
    },
    openUserTab(item) {
      this.$store.dispatch("addUserTab", {
        item: item
      });
    }
  },
  computed: {}
};
</script>