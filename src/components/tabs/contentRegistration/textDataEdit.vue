// 텍스트 데이터
<template>
  <div>
    <div class="pt-2 background">
      <v-toolbar flat color="background">
        <v-toolbar-title class="pr-3">{{ $t('menu.' + tabInfo.item.code + ".child.text_data") }}</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-flex xs4 sm4 md2>
          <v-text-field
            class="pt-0 pr-2"
            v-model="search"
            append-icon="search"
            single-line
            hide-details
          ></v-text-field>
        </v-flex>
        <v-btn @click="openAddDialog" color="primary" dark class="mb-2">{{ $t('function.regist') }}</v-btn>
      </v-toolbar>

      <!-- 테이블 시작 -->
      <v-data-table
        :headers="option.table.headers"
        :items="option.table.list"
        :pagination.sync="option.table.pagination"
        :rows-per-page-text="$t('common.table.perPage.text')"
        :search="search"
      >
        <template slot="headers" slot-scope="props">
          <tr>
            <th
              v-for="header in props.headers"
              :key="header.text"
              :class="['column sortable', option.table.pagination.descending ? 'desc' : 'asc', header.value === option.table.pagination.sortBy ? 'active' : '']"
              @click="changeSort(header)"
            >
              <v-icon v-if="header.sortable" small>arrow_upward</v-icon>
              <span>{{ $t('menu.' + tabInfo.item.code + ".child." + header.text) }}</span>
            </th>
          </tr>
        </template>

        <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ option.table.list.indexOf(props.item) + 1 }}</td>
          <td class="text-xs-center">{{ props.item.description }}</td>
          <td class="text-xs-center">{{ props.item.standard }}</td>
          <td class="text-xs-center">{{ props.item.remark }}</td>
        </template>

        <template slot="no-data">
          <v-alert :value="true" color="error" icon="warning">{{ $t("msg.notice.no_data") }}</v-alert>
        </template>>
      </v-data-table>

      <!-- 테이블 끝 -->
    </div>

    <div>
      <!-- 생성 다이얼로그 -->
      <v-dialog v-model="addDialogYn" max-width="500px">
        <v-card>
          <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-title>
            <span class="headline">{{ $t('function.regist') }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field
                    v-model="editedItem.desc"
                    :label="$t('menu.' + tabInfo.item.code + '.child.discription')"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field
                    v-model="editedItem.standard"
                    :label="$t('menu.' + tabInfo.item.code + '.child.standard')"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="editedItem.remark"
                    :label="$t('menu.' + tabInfo.item.code + '.child.remark')"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">{{ $t('function.cancel') }}</v-btn>
            <v-btn color="blue darken-1" flat @click="confirm">{{ $t('function.save') }}</v-btn>
          </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>

      <!-- 삭제 다이얼로그-->
      <v-dialog v-model="delDialogYn" max-width="290">
        <v-card>
          <v-card-text>정말 삭제하시겠습니까?</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              flat="flat"
              @click="delDialogYn = false"
            >{{ $t('function.cancel') }}</v-btn>
            <v-btn
              color="green darken-1"
              flat="flat"
              @click="deleteItem"
            >{{ $t('function.confirm') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  props: ["tabInfo", "eventBus", "pageStorage"],
  data: () => ({
    valid: true,
    search: "",
    option: {
      table: {
        pagination: {
          sortBy: "idx",
          descending: "desc",
          rowsPerPage: 10
        },
        headers: [
          {
            text: "recently",
            value: "idx",
            sortable: true
          },
          {
            text: "discription",
            value: "name",
            sortable: true
          },
          {
            text: "standard",
            value: "url",
            sortable: true
          },
          {
            text: "remark",
            value: "memo"
          }
        ],
        list: []
      }
    },
    itemToDel: null,
    addDialogYn: false,
    delDialogYn: false,
    editedIndex: -1,
    editedItem: {
      desc: "",
      standard: "",
      remark: ""
    }
  }),

  computed: {},

  watch: {
    addDialogYn(val) {
      val || this.close();
    }
  },
  beforeMount: function() {},

  created() {},

  methods: {
    init() {
      var _this = this;
      console.log("textDataEditInit");
      if (this.pageStorage.productTreeActiveItemList.length) {
        _this.$http
          .post("/contents_api/goods_technical_data_list", {
            userid: this.$store.getters.getLoginInfo.loginInfo.id,
            p_idx: this.pageStorage.productTreeActiveItemList[0].idx,
            t_type: 3,
            type: this.pageStorage.productTreeActiveItemList[0].type
          })
          .then(response => {
            console.log(response);
            var list = response.data ? response.data : [];
            this.initialize(list);
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
      }
    },
    initialize(list) {
      this.option.table.list = list;
    },
    editItem(item) {
      this.editedIndex = this.option.table.list.indexOf(item);
      this.editedItem = {
        cardName: item.name,
        url: item.url,
        remark: item.memo,
        idx: item.idx
      };
      this.openAddDialog();
    },
    openAddDialog: function(item) {
      this.addDialogYn = true;
    },
    openDelDialog: function(item) {
      this.delDialogYn = true;
      this.itemToDel = item;
    },
    deleteItem() {
      this.delDialogYn = false;
      this.$http
        .post("/contents_api/goods_technical_data_del", {
          idx: this.itemToDel.idx,
          p_idx : this.pageStorage.productTreeActiveItemList[0].idx,
          userid: this.$store.getters.getLoginInfo.loginInfo.id
        })
        .then(rs => {
          const index = this.option.table.list.indexOf(this.itemToDel);
          this.option.table.list.splice(index, 1);
          this.$store.dispatch("openSnackbar", {
            text: "msg.notice.del"
          });
        });
    },
    close() {
      this.addDialogYn = false;
      setTimeout(() => {
        this.editedIndex = -1;
        this.$refs.form.reset();
      }, 300);
    },
    confirm() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          this.update();
        } else {
          this.save();
        }
      } else {
      }
    },
    save() {
      // 새로운 저장
      this.$http
        .post("/contents_api/goods_technical_data_reg", {
          p_idx : this.pageStorage.productTreeActiveItemList[0].idx,
          type : this.pageStorage.productTreeActiveItemList[0].type,
          userid: this.$store.getters.getLoginInfo.loginInfo.id,
          desc: this.editedItem.desc,
          standard: this.editedItem.standard,
          remark: this.editedItem.remark
        })
        .then(rs => {
          console.log(rs);
          this.option.table.list.push({
            idx: rs.idx,
            p_idx: this.pageStorage.productTreeActiveItemList[0].idx,
            description: this.editedItem.desc,
            standard: this.editedItem.standard,
            remark : this.editedItem.remark
          });
          this.$store.dispatch("openSnackbar", {
            text: "msg.notice.save"
          });
          this.close();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    update() {
      // 업데이트
      this.$http
        .post("/contents_api/goods_technical_data_edit", {
          idx: this.editedItem.idx,
          p_idx: this.pageStorage.productTreeActiveItemList[0].idx,
          userid: this.$store.getters.getLoginInfo.loginInfo.id,
          desc: this.editedItem.desc,
          standard: this.editedItem.standard,
          remark: this.editedItem.remark
        })
        .then(rs => {
          Object.assign(this.option.table.list[this.editedIndex], {
            idx: this.editedItem.idx,
            memo: this.editedItem.remark,
            name: this.editedItem.cardName,
            url: this.editedItem.url
          });
          this.$store.dispatch("openSnackbar", {
            text: "msg.notice.edit"
          });
          this.close();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    changeSort(header) {
      var column;
      if (header.sortable) {
        column = header.value;
        if (this.option.table.pagination.sortBy === column) {
          this.option.table.pagination.descending = !this.option.table
            .pagination.descending;
        } else {
          this.option.table.pagination.sortBy = column;
          this.option.table.pagination.descending = false;
        }
      }
    }
  }
};
</script>

