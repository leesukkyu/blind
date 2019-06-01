// 단위 변환 확인 > 길이단위
<template>
  <div>
    <div class="pt-2 background">
      <v-toolbar flat color="background">
        <v-toolbar-title class="pr-3">{{ $t('menu.' + tabInfo.item.code + ".child.length_unit") }}</v-toolbar-title>
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
        <v-btn
          @click="openAddAndEditDialog"
          color="primary"
          dark
          class="mb-2"
        >{{ $t('function.regist') }}</v-btn>
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
          <td class="text-xs-center">{{ props.item.unit }}</td>
          <td class="text-xs-center">{{ props.item.name_term }}</td>
          <td class="text-xs-center">{{ props.item.c_unit }}</td>
          <td class="text-xs-center">{{ props.item.ratio }}</td>
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
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="editedItem.areaUnit"
                      :label="$t('menu.' + tabInfo.item.code + '.child.area_unit')"
                      :rules="rules.require"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-combobox
                      v-model="editedItem.termsList"
                      :items="termsList"
                      multiple
                      chips
                      deletable-chips
                      prepend-icon="textsms"
                      append-outer-icon
                      :label="$t('menu.' + tabInfo.item.code + '.child.terms')"
                      :rules="rules.require2"
                      required
                    ></v-combobox>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="editedItem.conversionUnit"
                      :label="$t('menu.' + tabInfo.item.code + '.child.conversion_unit')"
                      :rules="rules.require"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="editedItem.conversionRatio"
                      :label="$t('menu.' + tabInfo.item.code + '.child.conversion_ratio')"
                      :rules="rules.require"
                      required
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
import rules from "../../util/rules";
export default {
  props: ["tabInfo"],
  data: () => ({
    search: "",
    rules,
    valid: true,
    option: {
      table: {
        pagination: {
          sortBy: "idx",
          descending: "desc",
          rowsPerPage: 10
        },
        headers: [
          // 최근
          {
            text: "recently",
            value: "idx",
            sortable: true
          },
          // 면적 단위
          {
            text: "area_unit",
            value: "unit",
            sortable: true
          },
          // 용어
          {
            text: "terms",
            value: "name_term",
            sortable: true
          },
          // 변경 단위
          {
            text: "conversion_unit",
            value: "c_unit"
          },
          // 변경율
          {
            text: "conversion_ratio",
            value: "ratio"
          },
          // 비고
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
      areaUnit: "",
      termsList: [],
      conversionUnit: "",
      conversionRatio: "",
      remark: ""
    },
    termsList: []
  }),

  computed: {
  },

  watch: {
    addDialogYn(val) {
      val || this.close();
    }
  },
  beforeMount: function() {},

  created() {
    let _this = this;
    _this.$http
      .post("/basic_api/unit_convert_list", {
        type: 2,
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
        areaUnit: item.unit,
        termsList: item.name_term ? item.name_term.trim().split(",") : [],
        conversionUnit: item.c_unit,
        conversionRatio: item.ratio,
        remark: item.memo,
        idx: item.idx
      };
      this.openAddAndEditDialog(item);
    },
    openAddAndEditDialog: function(item) {
      this.addDialogYn = true;
    },
    openDelDialog: function(item) {
      this.delDialogYn = true;
      this.itemToDel = item;
    },
    deleteItem() {
      this.delDialogYn = false;
      this.$http
        .post("basic_api/unit_convert_del", {
          type: 2,
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
        .post("/basic_api/unit_convert_add", {
          userid: this.$store.getters.getLoginInfo.loginInfo.id,
          type: 2,
          unit: this.editedItem.areaUnit,
          c_unit: this.editedItem.conversionUnit,
          name_term: this.editedItem.termsList,
          ratio: this.editedItem.conversionRatio,
          memo: this.editedItem.remark
        })
        .then(rs => {
          this.option.table.list.push({
            idx: rs.idx,
            unit: this.editedItem.areaUnit,
            c_unit: this.editedItem.conversionUnit,
            name_term: this.editedItem.termsList.join(","),
            ratio: this.editedItem.conversionRatio,
            memo: this.editedItem.remark
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
      this.$http
        .post("/basic_api/unit_convert_edit", {
          userid: this.$store.getters.getLoginInfo.loginInfo.id,
          type: 2,
          idx: this.editedItem.idx,
          unit: this.editedItem.areaUnit,
          c_unit: this.editedItem.conversionUnit,
          name_term: this.editedItem.termsList,
          ratio: this.editedItem.conversionRatio,
          memo: this.editedItem.remark
        })
        .then(rs => {
          Object.assign(this.option.table.list[this.editedIndex], {
            idx: this.editedItem.idx,
            unit: this.editedItem.areaUnit,
            c_unit: this.editedItem.conversionUnit,
            name_term: this.editedItem.termsList.join(","),
            ratio: this.editedItem.conversionRatio,
            memo: this.editedItem.remark
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

