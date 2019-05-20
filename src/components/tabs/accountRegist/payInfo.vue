// 거래처등록 > 요금정보
<template>
  <div>
    <div class="pt-2 background">
      <v-toolbar flat color="background">
        <v-toolbar-title class="pr-3">{{ $t('menu.' + tabInfo.item.code + ".child.pay_info") }}</v-toolbar-title>
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
          <td class="text-xs-center">{{ props.item.app_user_count }}</td>
          <td class="text-xs-center">{{ props.item.app_device_count }}</td>
          <td class="text-xs-center">{{ props.item.app_sellingtool_count }}</td>
          <td class="text-xs-center">{{ props.item.app_use_amt }}</td>
          <td class="text-xs-center">{{ props.item.app_intro_amt }}</td>
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
                      v-model="editedItem.user_cnt"
                      :label="$t('menu.' + tabInfo.item.code + '.child.user_number')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="editedItem.device_cnt"
                      :label="$t('menu.' + tabInfo.item.code + '.child.device_number')"
                      :rules="rules.require"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="editedItem.sellingtool_cnt"
                      :label="$t('menu.' + tabInfo.item.code + '.child.sellingtool_number')"
                      :rules="rules.require"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="editedItem.m_cost"
                      :label="$t('menu.' + tabInfo.item.code + '.child.monthly_fee')"
                      :rules="rules.require"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="editedItem.doip_cost"
                      :label="$t('menu.' + tabInfo.item.code + '.child.introduction_fee')"
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
          // 유저수
          {
            text: "user_number",
            value: "app_user_count"
          },
          //단말기수
          {
            text: "device_number",
            value: "app_device_count"
          },
          //셀링툴수
          {
            text: "sellingtool_number",
            value: "app_sellingtool_count"
          },
          //월이용료
          {
            text: "monthly_fee",
            value: "app_use_amt"
          },
          //도입비
          {
            text: "introduction_fee",
            value: "app_intro_amt"
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
      user_cnt: "",
      device_cnt: "",
      sellingtool_cnt: "",
      m_cost: "",
      doip_cost: "",
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
      this.editedIndex = this.option.table.list.indexOf(item);
      this.editedItem = {
        idx: this.option.table.list[this.editedIndex].idx,
        user_cnt: item.app_user_count,
        device_cnt: item.app_device_count,
        sellingtool_cnt: item.app_sellingtool_count,
        m_cost: item.app_use_amt,
        doip_cost: item.app_intro_amt,
        note: item.app_memo
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
        }
      }
    },
    makeRq() {
      var rq = {
        idx: this.editedItem.idx,
        user_cnt: this.editedItem.user_cnt,
        device_cnt: this.editedItem.device_cnt,
        sellingtool_cnt: this.editedItem.sellingtool_cnt,
        m_cost: this.editedItem.m_cost,
        doip_cost: this.editedItem.doip_cost,
        note: this.editedItem.note
      };
      return rq;
    },
    deleteItem() {
      this.delDialogYn = false;
      this.$http
        .post("/customer_api/custom_cost_del", {
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
      // 업데이트
      this.$http
        .post("/customer_api/custom_cost_add", this.makeRq())
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

