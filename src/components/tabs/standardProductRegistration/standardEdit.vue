// 규격품편집
<template>
  <div>
    <div class="pt-2 background">
      <v-toolbar flat color="background">
        <v-toolbar-title class="pr-3">{{ $t('menu.' + tabInfo.item.code + ".child.standard_edit") }}</v-toolbar-title>
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
        :expand="option.table.expand"
        :value="option.table.value"
        item-key="idx"
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

        <!-- 테이블 몸통 -->
        <template slot="items" slot-scope="props">
          <tr
            style="cursor:pointer;"
            v-bind:class="{ 'activeColor': props.expanded }"
            @click="setExpand(props)"
          >
            <td
              class="text-xs-center"
            >{{props.expanded}} {{ option.table.list.indexOf(props.item) + 1 }}</td>
            <td class="text-xs-center">{{ props.item.type }}</td>
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.code }}</td>
            <td class="text-xs-center">{{ props.item.detail }}</td>

            <td class="justify-center layout px-0">
              <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
              <v-icon small @click="openDelDialog(props.item)">delete</v-icon>
            </td>
          </tr>
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
                    <v-select
                      :items="divisionList"
                      v-model="editedItem.type"
                      :label="$t('menu.' + tabInfo.item.code + '.child.division')"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="editedItem.code"
                      :label="$t('menu.' + tabInfo.item.code + '.child.code')"
                      :disabled="this.editedIndex > -1"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-combobox
                      v-model="editedItem.name"
                      :items="nameList"
                      chips
                      deletable-chips
                      prepend-icon="toc"
                      append-outer-icon
                      :label="$t('menu.' + tabInfo.item.code + '.child.item_name')"
                    ></v-combobox>
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
  props: ["tabInfo", "eventBus", "pageStorage"],
  data: () => ({
    valid: true,
    search: "",
    option: {
      table: {
        value: [],
        expand: false,
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
            text: "division",
            value: "type",
            sortable: true
          },
          {
            text: "item_name",
            value: "name",
            sortable: true
          },
          {
            text: "code",
            value: "code",
            sortable: true
          },
          {
            text: "detail",
            value: "detail",
            sortable: true
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
      type: "",
      name: "",
      code: ""
    },
    nameList: [],
    divisionList: ["부품", "소품"],
    expandedItem: null
  }),

  computed: {},

  watch: {
    addDialogYn(val) {
      val || this.close();
    }
  },
  methods: {
    init: function() {
      let _this = this;
      _this.$http
        .post("/goods_api/goods_standard_list", {
          userid: this.$store.getters.getLoginInfo.loginInfo.id,
          gc_idx: this.pageStorage.productTreeActiveItemList[0].idx
        })
        .then(response => {
          let list = response.data ? response.data : [];
          this.initialize(list);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    initialize(list) {
      console.log(list);
      this.option.table.list = list;
      if (this.expandedItem) {
        this.expandedItem.expanded = false;
      }
    },
    editItem(item) {
      this.editedIndex = this.option.table.list.indexOf(item);
      this.editedItem = {
        idx: item.idx,
        type: item.type,
        code: item.code,
        name: item.name
      };
      this.openAddDialog();
    },
    openAddDialog: function(item) {
      this.nameList = [];
      for (let i in this.option.table.list) {
        this.nameList.push(this.option.table.list[i].name);
      }
      this.addDialogYn = true;
    },
    openDelDialog: function(item) {
      this.delDialogYn = true;
      this.itemToDel = item;
    },
    deleteItem() {
      this.delDialogYn = false;
      this.$http
        .post("goods_api/goods_standard_del", {
          userid: this.$store.getters.getLoginInfo.loginInfo.id,
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
        .post("goods_api/standard_code", {
          code: this.editedItem.code
        })
        .then(rs => {
          if (rs.status == "N") {
            this.$http
              .post("/goods_api/goods_standard_reg", {
                userid: this.$store.getters.getLoginInfo.loginInfo.id,
                gc_idx: this.pageStorage.productTreeActiveItemList[0].idx,
                gubun: this.editedItem.type,
                gd_name: this.editedItem.name,
                code: this.editedItem.code
              })
              .then(rs => {
                this.option.table.list.push({
                  idx: rs.idx,
                  type: this.editedItem.type,
                  name: this.editedItem.name,
                  code: this.editedItem.code
                });
                this.$store.dispatch("openSnackbar", {
                  text: "msg.notice.save"
                });
                this.close();
              });
          } else {
            this.$store.dispatch("openSnackbar", {
              text: "msg.notice.duplication",
              color: "error"
            });
          }
        });
    },
    // 업데이트
    update() {
      this.$http
        .post("/goods_api/goods_standard_edit", {
          userid: this.$store.getters.getLoginInfo.loginInfo.id,
          idx: this.editedItem.idx,
          gubun: this.editedItem.type,
          gd_name: this.editedItem.name
        })
        .then(rs => {
          Object.assign(this.option.table.list[this.editedIndex], {
            idx: rs.idx,
            type: this.editedItem.type,
            name: this.editedItem.name,
            code: this.editedItem.code
          });
          this.$store.dispatch("openSnackbar", {
            text: "msg.notice.edit"
          });
          this.close();
        });
    },
    setExpand(props) {
      this.$set(props, "expanded", !props.expanded);
      this.selectItemList = [];
      if (props.expanded) {
        this.expandedItem = props;
        this.selectItemList.push(this.$util.copy(props.item));
      } else {
        this.expandedItem = null;
      }
      this.pageStorage.selectItemList = this.selectItemList;
      this.eventBus.$emit("clickStandardEdit");
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

