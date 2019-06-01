// 거래처등록 > 계약품목
<template>
  <div>
    <div class="pt-2 background">
      <v-toolbar flat color="background">
        <v-toolbar-title class="pr-3">{{ $t('menu.' + tabInfo.item.code + ".child.contract_item") }}</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
      </v-toolbar>
      <!-- 선택된 아이템 테이블 -->
      <v-flex pb-3>
        <v-data-table :items="selectItemList" :headers-length="parseInt(9)" hide-actions>
          <!-- 테이블 헤더 -->
          <template slot="headers" slot-scope="props">
            <tr>
              <th>{{ $t('menu.' + tabInfo.item.code + ".child.code") }}</th>
              <th>{{ $t('menu.' + tabInfo.item.code + ".child.division") }}</th>
              <th>{{ $t('menu.' + tabInfo.item.code + ".child.account_name") }}</th>
              <th>{{ $t('menu.' + tabInfo.item.code + ".child.representation_name") }}</th>
              <th>{{ $t('menu.' + tabInfo.item.code + ".child.manager_call_number") }}</th>
              <th>{{ $t('menu.' + tabInfo.item.code + ".child.totalItemAmount") }}</th>
              <th>{{ $t('menu.' + tabInfo.item.code + ".child.maximumOrderQuantity") }}</th>
              <th>{{ $t('menu.' + tabInfo.item.code + ".child.remark") }}</th>
              <th>{{ $t('menu.' + tabInfo.item.code + ".child.setting") }}</th>
            </tr>
          </template>

          <!-- 테이블 몸통 -->
          <template slot="items" slot-scope="props">
            <tr>
              <td class="text-xs-center">{{ props.item.app_code }}</td>
              <td class="text-xs-center">{{ props.item.app_use_model_txt }}</td>
              <td class="text-xs-center">{{ props.item.app_name }}</td>
              <td class="text-xs-center">{{ props.item.app_ceo }}</td>
              <td class="text-xs-center">{{ props.item.app_dam_tel }}</td>
              <td class="text-xs-center">총 상품수</td>
              <td class="text-xs-center">
                <v-text-field
                  class="pa-0"
                  hide-details
                  :placeholder="$t('menu.' + tabInfo.item.code + '.child.maximumOrderQuantity')"
                ></v-text-field>
              </td>
              <td class="text-xs-center">
                <v-text-field
                  class="pa-0"
                  hide-details
                  :placeholder="$t('menu.' + tabInfo.item.code + '.child.remark')"
                ></v-text-field>
              </td>
              <td style="text-align:center;">
                <v-btn @click="save" :title="$t('function.save')" flat icon color="green">
                  <v-icon>save</v-icon>
                </v-btn>
                <v-btn @click="reset" :title="$t('function.reset')" flat icon color="pink">
                  <v-icon>refresh</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>

          <template slot="no-data">
            <v-alert :value="true" color="error" icon="warning">{{ $t("msg.notice.no_data") }}</v-alert>
          </template>>
        </v-data-table>
        <v-divider></v-divider>
      </v-flex>

      <v-container pa-0 fluid>
        <v-layout wrap>
          <v-flex pr-2 pt-2 xs6 sm6 md6>
            <v-flex xs5 sm5 md5 offset-xs7>
              <v-text-field
                class="pt-0 pr-2"
                v-model="search"
                append-icon="search"
                single-line
                hide-details
              ></v-text-field>
            </v-flex>
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
                <tr v-bind:class="{ 'activeColor': props.expanded }" @click="setExpand(props)">
                  <td
                    style="padding:0 10px"
                    class="text-xs-center"
                  >{{ option.table.list.indexOf(props.item) + 1 }}</td>

                  <td style="padding:0 10px" class="text-xs-center">{{ props.item.app_code }}</td>
                  <td class="text-xs-center">{{ props.item.app_use_model_txt }}</td>
                  <td class="text-xs-center">{{ props.item.app_name }}</td>
                  <td class="text-xs-center">{{ props.item.app_ceo }}</td>
                  <td class="text-xs-center">{{ props.item.app_dam_tel }}</td>
                </tr>
              </template>

              <template slot="no-data">
                <v-alert :value="true" color="error" icon="warning">{{ $t("msg.notice.no_data") }}</v-alert>
              </template>>
            </v-data-table>
            <!-- 테이블 끝 -->
          </v-flex>
          <v-flex pl-0 xs6 sm6 md6 pt-3>
            <tree-script v-bind="option.tree" :parent-this="self"></tree-script>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>
<script>
import rules from "../../util/rules";
import treeScript from "../../ui/treeScript";

import "./vanilla";

export default {
  components: {
    "tree-script": treeScript
  },
  props: ["tabInfo", "pageStorage", "eventBus"],
  data: () => ({
    self: null,
    search: "",
    valid: true,
    rules,
    option: {
      table: {
        expand: false,
        headerLength: 6,
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
          }
        ],
        list: []
      },
      tree: {
        // 트리 리스트
        list: [],
        activeList: [],
        isMultiple: true,
        // 트리 클릭
        onClick: function(d) {
          this.pageStorage.treeActiveItemList = d.itemList;
          this.eventBus.$emit("onChangeTreeActiveList");
        }
      }
    },
    selectItemList: []
  }),
  beforeMount: function() {
    this.self = this;
    this.loadTreeData();
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
    },
    setExpand(props) {
      props.expanded = !props.expanded;
      this.selectItemList = [];
      this.selectItemList.push(this.$util.copy(props.item));
    },
    save() {},
    reset() {},
    loadTreeData: function() {
      this.$http
        .post("/customer_api/custom_goods_sale_area", {
          userid: this.$store.getters.getLoginInfo.loginInfo.id
        })
        .then(rs => {
          this.option.tree.list = rs.areaList;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

