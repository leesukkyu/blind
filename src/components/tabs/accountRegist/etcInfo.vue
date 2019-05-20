// 거래처등록 > 기타정보
<template>
  <div>
    <div class="pt-2 background">
      <v-toolbar flat color="background">
        <v-toolbar-title class="pr-3">{{ $t('menu.' + tabInfo.item.code + ".child.etc_info") }}</v-toolbar-title>
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
        :headers-length="option.table.headerLength"
      >
        <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>

        <!-- 테이블 헤더 -->
        <template slot="headers" slot-scope="props">
          <tr>
            <th
              v-for="header in props.headers"
              :key="header.text"
              :class="['column sortable', option.table.pagination.descending ? 'desc' : 'asc', header.value === option.table.pagination.sortBy ? 'active' : '']"
              @click="changeSort(header)"
              v-bind:style="{ padding: header.text == 'recently' || header.text == 'code' ? '0 10px' : '0 24px' }"
            >
              <v-icon v-if="header.sortable" small>arrow_upward</v-icon>
              <span>{{ $t('menu.' + tabInfo.item.code + ".child." + header.text) }}</span>
            </th>
          </tr>
        </template>

        <!-- 테이블 몸통 -->
        <template slot="items" slot-scope="props">
          <td
            style="padding:0 10px"
            class="text-xs-center"
          >{{ option.table.list.indexOf(props.item) + 1 }}</td>

          <td style="padding:0 10px" class="text-xs-center">{{ props.item.app_code }}</td>
          <td class="text-xs-center">{{ props.item.app_use_model_txt }}</td>
          <td class="text-xs-center">{{ props.item.app_name }}</td>
          <td class="text-xs-center">{{ props.item.app_ceo }}</td>
          <td class="text-xs-center">{{ props.item.app_dam_tel }}</td>
          <td class="text-xs-center">{{ props.item.app_business_number }}</td>
          <td class="text-xs-center">{{ props.item.app_uptae }}</td>
          <td class="text-xs-center">{{ props.item.app_upjong }}</td>
          <td class="text-xs-center">{{ props.item.app_taxemail }}</td>
          <td class="text-xs-center">{{ props.item.app_memo }}</td>

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
                      v-model="editedItem.business_num"
                      :label="$t('menu.' + tabInfo.item.code + '.child.business_number')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="editedItem.uptae"
                      :label="$t('menu.' + tabInfo.item.code + '.child.business_type')"
                      :rules="rules.require"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="editedItem.upjong"
                      :label="$t('menu.' + tabInfo.item.code + '.child.sectors')"
                      :rules="rules.require"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="editedItem.tax_email"
                      :label="$t('menu.' + tabInfo.item.code + '.child.bill_email')"
                      :rules="rules.require"
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
import post from "../../ui/post";
export default {
  components: {
    post: post
  },
  props: ["tabInfo", "pageStorage", "eventBus"],
  data: () => ({
    search: "",
    valid: true,
    rules,
    option: {
      table: {
        headerLength: 12,
        pagination: {
          sortBy: "idx",
          descending: "desc",
          rowsPerPage: 10
        },
        headers: [
          {
            text: "recently",
            value: "idx",
            sortable: true,
            width: "10"
          },
          {
            text: "code",
            value: "app_code",
            sortable: true
          },
          {
            text: "division",
            value: "app_use_model_txt",
            sortable: true
          },
          {
            text: "account_name",
            value: "app_name",
            sortable: true
          },
          {
            text: "representation_name",
            value: "app_ceo"
          },
          {
            text: "manager_call_number",
            value: "app_dam_tel"
          },
          // 사업자등록번호
          {
            text: "business_number",
            value: "app_business_number"
          },
          // 업태
          {
            text: "business_type",
            value: "app_uptae"
          },
          // 업종
          {
            text: "sectors",
            value: "app_upjong"
          },
          // 계산서이메일
          {
            text: "bill_email",
            value: "app_taxemail"
          },
          //비고
          {
            text: "remark",
            value: "app_memo"
          },
          {
            text: "setting"
          }
        ],
        list: []
      },
      post: {
        address1: "",
        address2: "",
        post: "",
        active: false
      }
    },
    itemToDel: null,
    addDialogYn: false,
    delDialogYn: false,
    editedIndex: -1,
    editedItem: {
      business_num: "",
      uptae: "",
      upjong: "",
      tax_email: ""
    },
    useModelList: [
      { text: "서비스딜러", value: 1 },
      { text: "세일즈센터", value: 2 },
      { text: "제조공급처", value: 3 },
      { text: "원단공급처", value: 4 },
      { text: "판매유통사", value: 5 }
    ]
  }),
  computed: {
  },
  watch: {
    addDialogYn(val) {
      val || this.close();
    }
  },
  created() {
    this.eventBus.$on("onChangeCustomList", this.onChangeCustomList);
    this.onChangeCustomList();
  },
  methods: {
    onChangeCustomList() {
      this.initialize(this.pageStorage.customList);
    },
    initialize(list) {
      this.option.table.list = list;
    },
    editItem(item) {
      console.log("xx");
      this.editedIndex = this.option.table.list.indexOf(item);
      this.editedItem = {
        idx: this.option.table.list[this.editedIndex].idx,
        business_num: item.app_business_number,
        uptae: item.app_uptae,
        upjong: item.app_upjong,
        tax_email: item.app_taxemail
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
        }
      } else {
      }
    },
    makeRq() {
      var rq = {
        idx: this.editedItem.idx,
        business_num: this.editedItem.business_num,
        uptae: this.editedItem.uptae,
        upjong: this.editedItem.upjong,
        tax_email: this.editedItem.tax_email
      };
      return rq;
    },
    deleteItem() {
      this.delDialogYn = false;
      this.$http
        .post("/customer_api/custom_etc_del", {
          idx: this.itemToDel.idx,
          userid: this.$store.getters.getLoginInfo.loginInfo.id
        })
        .then(rs => {
          this.eventBus.$emit("loadCustomList", () => {
            this.close();
            this.$store.dispatch("openSnackbar", {
              text: "msg.notice.del"
            });
          });
        });
    },
    update() {
      this.$http
        .post("/customer_api/custom_etc_add", this.makeRq())
        .then(rs => {
          this.$http
            .post("/customer_api/custom_call", {
              idx: this.editedItem.idx
            })
            .then(rs => {
              this.eventBus.$emit("loadCustomList", () => {
                this.close();
                this.$store.dispatch("openSnackbar", {
                  text: "msg.notice.edit"
                });
              });
            });
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

