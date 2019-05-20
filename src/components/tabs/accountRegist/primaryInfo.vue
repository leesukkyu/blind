// 거래처등록 > 기본정보
<template>
  <div>
    <div class="pt-2 background">
      <v-toolbar flat color="background">
        <v-toolbar-title class="pr-3">{{ $t('menu.' + tabInfo.item.code + ".child.primary_info") }}</v-toolbar-title>
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

        <template slot="items" slot-scope="props">
          <td
            style="padding:0 10px"
            class="text-xs-center"
          >{{ option.table.list.indexOf(props.item) + 1 }}</td>
          <td style="padding:0 10px" class="text-xs-center">{{ props.item.app_code }}</td>
          <td class="text-xs-center">{{ props.item.app_use_model_txt}}</td>
          <td class="text-xs-center">{{ props.item.app_name }}</td>
          <td class="text-xs-center">{{ props.item.app_ceo }}</td>
          <td class="text-xs-center">{{ props.item.app_dam_tel }}</td>
          <td class="text-xs-center">{{ props.item.app_post }}</td>
          <td class="text-xs-center">{{ props.item.app_address }}</td>
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
                      disabled
                      v-model="editedItem.code"
                      :label="$t('menu.' + tabInfo.item.code + '.child.code')"
                      :placeholder="$t('menu.' + tabInfo.item.code + '.child.auto_create')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-select
                      prepend-icon="class"
                      append-outer-icon
                      v-model="editedItem.gubun"
                      :items="useModelList"
                      :label="$t('menu.' + tabInfo.item.code + '.child.division')"
                      :rules="rules.require"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="editedItem.company_name"
                      :label="$t('menu.' + tabInfo.item.code + '.child.account_name')"
                      :rules="rules.require"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="editedItem.ceo"
                      :label="$t('menu.' + tabInfo.item.code + '.child.representation_name')"
                      :rules="rules.require"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="editedItem.d_phone"
                      :label="$t('menu.' + tabInfo.item.code + '.child.manager_call_number')"
                      :rules="rules.require"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6 style="position:relative">
                    <v-text-field
                      md6
                      v-model="option.post.post"
                      :label="$t('menu.' + tabInfo.item.code + '.child.post')"
                    ></v-text-field>
                    <div style="position:absolute;top:13px;right:0px;">
                      <post :address="option.post"></post>
                    </div>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      md6
                      v-model="option.post.address1"
                      :label="$t('menu.' + tabInfo.item.code + '.child.address1')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      md6
                      v-model="option.post.address2"
                      :label="$t('menu.' + tabInfo.item.code + '.child.address2')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="editedItem.note"
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
        headerLength: 10,
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
          {
            text: "post",
            value: "app_post"
          },
          {
            text: "address",
            value: "app_address"
          },
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
      code: "",
      gubun: "",
      company_name: "",
      ceo: "",
      d_phone: "",
      add_post: "",
      add1: "",
      add2: "",
      note: ""
    },
    useModelList: [
      { text: "서비스딜러", value: 1 },
      { text: "세일즈센터", value: 2 },
      { text: "제조공급처", value: 3 },
      { text: "원단공급처", value: 4 },
      { text: "판매유통사", value: 5 }
    ]
  }),
  watch: {
    addDialogYn(val) {
      val || this.close();
    }
  },
  created() {
    this.eventBus.$on("onChangeCustomList", this.onChangeCustomList);
  },
  methods: {
    onChangeCustomList() {
      this.initialize(this.pageStorage.customList);
    },
    initialize(list) {
      this.option.table.list = list;
    },
    editItem(item) {
      this.editedIndex = this.option.table.list.indexOf(item);
      this.editedItem = {
        code: item.app_code,
        gubun: +item.app_use_model,
        company_name: item.app_company,
        ceo: item.app_ceo,
        d_phone: item.app_dam_tel,
        note: item.app_memo,
        idx: item.idx
      };
      this.option.post.post = item.app_post;
      this.option.post.address1 = item.app_addr1;
      this.option.post.address2 = item.app_addr2;
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
          for (var i in rs.data) {
            this.cardList.push(rs.data[i].name);
          }
        });
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
          this.save();
        }
      } else {
      }
    },
    makeRq() {
      var rq = {
        app_idx: this.$store.getters.getLoginInfo.loginInfo.app_idx,
        userid: this.$store.getters.getLoginInfo.loginInfo.id,
        code: this.editedItem.code,
        gubun: this.editedItem.gubun,
        company_name: this.editedItem.company_name,
        ceo: this.editedItem.ceo,
        d_phone: this.editedItem.d_phone,
        add_post: this.option.post.post,
        add1: this.option.post.address1,
        add2: this.option.post.address2,
        note: this.editedItem.note
      };
      return rq;
    },
    save() {
      this.$http
        .post("/customer_api/custom_reg", this.makeRq())
        .then(rs => {
          this.eventBus.$emit("loadCustomList", () => {
            this.close();
            this.$store.dispatch("openSnackbar", {
              text: "msg.notice.save"
            });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteItem() {
      this.delDialogYn = false;
      this.$http
        .post("/customer_api/custom_del", {
          idx: this.itemToDel.idx
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
      var rq = this.makeRq();
      rq.idx = this.editedItem.idx;
      this.$http
        .post("/customer_api/custom_edit", rq)
        .then(rs => {
          this.eventBus.$emit("loadCustomList", () => {
            this.close();
            this.$store.dispatch("openSnackbar", {
              text: "msg.notice.edit"
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

