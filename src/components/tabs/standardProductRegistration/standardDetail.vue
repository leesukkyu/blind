// 표준제품등록 > 규격품상세
<template>
  <div>
    <v-card flat color="background">
      <v-container v-if="list && list.length" pa-0 fluid>
        <v-layout wrap>
          <v-flex v-for="(item, i) in list" :key="i" xs12 sm4 md3>
            <v-combobox
              :class="{'ml-4' : i != 0}"
              chips
              deletable-chips
              prepend-icon="create"
              append-outer-icon
              :label="item.title"
              v-model="item.val"
              @change="change(item)"
              :items="autoList"
            ></v-combobox>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["tabInfo", "eventBus", "pageStorage"],
  data: () => ({
    self: null,
    list: [],
    autoList: []
  }),
  beforeMount: function() {
    this.self = this;
  },
  methods: {
    init: function() {
      this.autoList = [];
      this.loadStandardItemList();
    },
    loadStandardItemList: function() {
      this.$http
        .post("/goods_api/goods_standard_item_list", {
          userid: this.$store.getters.getLoginInfo.loginInfo.id,
          idx: this.pageStorage.selectItemList[0].idx
        })
        .then(rs => {
          if (rs.status == "Y") {
            console.log(rs)
            this.list = rs.data;
            for(let i in rs.data){
              if(rs.data[i].val){
                this.autoList.push(rs.data[i].val)
              }
            }
          } else {
            this.list = [];
          }
        });
    },
    change: function(item) {
      if (item.val) {
        this.$http
          .post("/goods_api/goods_standard_item_val_reg", {
            userid: this.$store.getters.getLoginInfo.loginInfo.id,
            idx: item.idx,
            val: item.val
          })
          .then(rs => {
            if (rs.status == "Y") {
              this.$store.dispatch("openSnackbar", {
                text: "msg.notice.edit"
              });
              this.getAutoList();
            }
          });
      } else {
        this.$http
          .post("/goods_api/goods_standard_item_val_del", {
            userid: this.$store.getters.getLoginInfo.loginInfo.id,
            idx: item.idx
          })
          .then(rs => {
            if (rs.status == "Y") {
              this.$store.dispatch("openSnackbar", {
                text: "msg.notice.del"
              });
            }
          });
      }
    },
    getAutoList: function() {
      this.$http
        .post("/goods_api/goods_standard_item_list", {
          userid: this.$store.getters.getLoginInfo.loginInfo.id,
          idx: this.pageStorage.selectItemList[0].idx
        })
        .then(rs => {
          this.autoList = [];
          if (rs.status == "Y") {
            for(let i in rs.data){
              this.autoList.push(rs.data[i].val)
            }
          }
        });
    }
  }
};
</script>

