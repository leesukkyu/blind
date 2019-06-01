// 은행 등록 확인 > 은행정보
<template>
  <div>
    <div class="pt-2 background">
      <v-toolbar flat color="background">
        <v-toolbar-title class="pr-3">{{ $t('menu.' + tabInfo.item.code + ".child.bank_info") }}</v-toolbar-title>
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
          <td class="text-xs-center">{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.url }}</td>
          <td class="text-xs-center">{{ props.item.card_name }}</td>
          <td class="text-xs-center">{{ props.item.memo }}</td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="openDelDialog(props.item)">delete</v-icon>
          </td>
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
                    v-model="editedItem.bankName"
                    :label="$t('menu.' + tabInfo.item.code + '.child.bank_name')"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field
                    v-model="editedItem.url"
                    :label="$t('menu.' + tabInfo.item.code + '.child.url')"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-combobox
                    v-model="editedItem.cardList"
                    :items="cardList"
                    multiple
                    chips
                    deletable-chips
                    prepend-icon="credit_card"
                    append-outer-icon
                    :label="$t('menu.' + tabInfo.item.code + '.child.publish_card')"
                  ></v-combobox>
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
          <v-card-text>{{ $t('msg.question.delete') }}</v-card-text>

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
  props: ["tabInfo"],
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
            text: "bank_name",
            value: "name",
            sortable: true
          },
          {
            text: "url",
            value: "url",
            sortable: true
          },
          {
            text: "publish_card",
            value: "card_name"
          },
          {
            text: "remark",
            value: "memo"
          },
          {
            text: "setting"
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
      bankName: "",
      url: "",
      cardList: [],
      remark: ""
    },
    cardList: []
  }),

  computed: {},

  watch: {
    addDialogYn(val) {
      val || this.close();
    }
  },
  beforeMount: function() {},

  created() {
    let _this = this;
    _this.$http
      .post("/basic_api/bank_regist_bank_list", {
        userid: this.$store.getters.getLoginInfo.loginInfo.id
      })
      .then(response => {
        let list = response.data ? response.data : [];
        this.initialize(list);
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  methods: {
    initialize(list) {
      this.option.table.list = list;
    },
    editItem(item) {
      this.editedIndex = this.option.table.list.indexOf(item);
      this.editedItem = {
        bankName: item.name,
        url: item.url,
        cardList: item.card_name ? item.card_name.trim().split(" ") : [],
        remark: item.memo,
        idx: item.idx
      };
      this.openAddDialog();
    },
    openAddDialog: function(item) {
      this.$http
        .post("basic_api/bank_regist_card_list", {
          userid: this.$store.getters.getLoginInfo.loginInfo.id,
          search: ""
        })
        .then(rs => {
          this.cardList = [];
          for (let i in rs.data) {
            this.cardList.push(rs.data[i].name);
          }
        });
      this.addDialogYn = true;
    },
    openDelDialog: function(item) {
      this.delDialogYn = true;
      this.itemToDel = item;
    },
    deleteItem() {
      this.delDialogYn = false;
      this.$http
        .post("basic_api/bank_regist_bank_del", {
          idx: this.itemToDel.idx
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

    // 확인을 누른 경우
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

    // 새로운 저장
    save() {
      this.$http
        .post("/basic_api/bank_regist_bank_regist", {
          userid: this.$store.getters.getLoginInfo.loginInfo.id,
          name: this.editedItem.bankName,
          url: this.editedItem.url,
          card_name: this.editedItem.cardList,
          memo: this.editedItem.remark
        })
        .then(rs => {
          this.option.table.list.push({
            card_name: this.editedItem.cardList.join(" "),
            idx: rs.idx,
            memo: this.editedItem.remark,
            name: this.editedItem.bankName,
            url: this.editedItem.url
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

    // 업데이트
    update() {
      this.$http
        .post("/basic_api/bank_regist_bank_edit", {
          userid: this.$store.getters.getLoginInfo.loginInfo.id,
          idx: this.editedItem.idx,
          name: this.editedItem.bankName,
          url: this.editedItem.url,
          card_name: this.editedItem.cardList,
          memo: this.editedItem.remark
        })
        .then(rs => {
          Object.assign(this.option.table.list[this.editedIndex], {
            card_name: this.editedItem.cardList.join(" "),
            idx: this.editedItem.idx,
            memo: this.editedItem.remark,
            name: this.editedItem.bankName,
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
      let column;
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

