// 거래처등록 > 사용승인
<template>
  <div>
    <div class="pt-2 background">
      <v-toolbar flat color="background">
        <v-toolbar-title class="pr-3">{{ $t('menu.' + tabInfo.item.code + ".child.use_confirm") }}</v-toolbar-title>
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
      </v-toolbar>

      <!-- 테이블 시작 -->
      <v-data-table
        :headers="option.table.headers"
        :items="option.table.list"
        :pagination.sync="option.table.pagination"
        :rows-per-page-text="$t('common.table.perPage.text')"
        :search="search"
        :headers-length="option.table.headerLength"
        :expand="option.table.expand"
        item-key="idx"
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
          <tr @click="setExpand(props)">
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
          </tr>
        </template>

        <!-- 눌렀을때 -->
        <template slot="expand" slot-scope="props">
          <v-card flat>
            <v-container px-2 py-1 fluid>
              <v-layout pa-0 wrap align-center>
                <v-flex xs1 class="text-xs-center pr-3">
                  <div
                    class="body-2 font-weight-regular"
                  >{{ $t('menu.' + tabInfo.item.code + ".child.use_confirm") }}</div>
                  <v-btn
                    @click="save(props.item, true)"
                    :outline="editedItem.app_status == '1'"
                    flat
                    icon
                    color="green"
                  >
                    <v-icon>check</v-icon>
                  </v-btn>
                  <v-btn
                    @click="save(props.item, false)"
                    :outline="editedItem.app_status == '0'"
                    flat
                    icon
                    color="pink"
                  >
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex pa-0 xs11>
                  <v-textarea
                    color="green"
                    prepend-icon="event_note"
                    :label="$t('menu.' + tabInfo.item.code + '.child.remark')"
                    v-model="editedItem.app_status_memo"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </template>

        <template slot="no-data">
          <v-alert :value="true" color="error" icon="warning">{{ $t("msg.notice.no_data") }}</v-alert>
        </template>>
      </v-data-table>
      <!-- 테이블 끝 -->
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
        expand: false,
        headerLength: 11,
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
    editedItem: {
      idx: -1,
      app_status: "0",
      app_status_memo: ""
    },
    remark: "",
  }),
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
    },
    setExpand(props) {
      console.log(props.item);
      props.expanded = !props.expanded;
      this.editedIndex = this.option.table.list.indexOf(props.item);
      this.editedItem = {
        idx: props.item.idx,
        app_status: props.item.app_status,
        app_status_memo: props.item.app_status_memo
      };
    },
    makeRq(isConfirm) {
      console.log(this.editedItem.app_status_memo);
      var rq = {
        idx: this.editedItem.idx,
        status_yn: isConfirm ? 1 : 0,
        status_text: this.editedItem.app_status_memo
      };
      return rq;
    },
    save(item, isConfirm) {
      var api = "";
      if (isConfirm) {
        api = "/customer_api/custom_status_y";
      } else {
        api = "/customer_api/custom_status_n";
      }
      this.$http
        .post(api, this.makeRq(isConfirm))
        .then(rs => {
          this.eventBus.$emit("loadCustomList", () => {
            this.editedItem.app_status = isConfirm ? 1 : 0;
            this.$store.dispatch("openSnackbar", {
              text: "msg.notice.save"
            });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

