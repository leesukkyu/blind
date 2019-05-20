// 사용자권한설정 - 사용권한
<template>
  <div>
    <div class="pt-2 background">
      <v-toolbar flat color="background">
        <v-toolbar-title
          class="pr-3"
        >{{ $t('menu.' + tabInfo.item.code + ".child.use_permission") }}</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
      </v-toolbar>
      <v-radio-group v-model="type">
        <v-radio
          v-for="(item, i) in typeList"
          :key="i"
          :label="$t('menu.' + tabInfo.item.code + '.child.' + item.text)"
          :value="item.value"
          @change="changeMode()"
          color="green"
        ></v-radio>
      </v-radio-group>
      <v-btn v-if="type== 'edit_mode'" @click="save" color="green" small dark>
        <v-icon>save</v-icon>
      </v-btn>
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
              v-model="option.table.selectedList"
              select-all
            >
              <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>

              <!-- 테이블 헤더 -->
              <template slot="headers" slot-scope="props">
                <tr>
                  <th v-if="type == 'edit_mode'"></th>
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
                  <td v-if="type == 'edit_mode'">
                    <v-checkbox v-model="props.selected" primary hide-details color="orange"></v-checkbox>
                  </td>
                  <td
                    style="padding:0 10px"
                    class="text-xs-center"
                  >{{ option.table.list.indexOf(props.item) + 1 }}</td>

                  <td style="padding:0 10px" class="text-xs-center">{{ props.item.company_num }}</td>
                  <td class="text-xs-center">{{ props.item.name }}</td>
                  <td class="text-xs-center">{{ props.item.join_date }}</td>
                  <td class="text-xs-center">{{ props.item.position }}</td>
                  <td class="text-xs-center">{{ props.item.userid }}</td>
                  <td class="text-xs-center">{{ props.item.userpw }}</td>
                  <!-- <td class="text-xs-center">{{ props.item.auth }}</td> -->
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

export default {
  components: {
    "tree-script": treeScript
  },
  props: ["tabInfo", "pageStorage", "eventBus"],
  data: () => ({
    menuCodeMap: {},
    self: null,
    search: "",
    valid: true,
    rules,
    type: "view_mode",
    typeList: [
      {
        text: "view_mode",
        value: "view_mode"
      },
      {
        text: "edit_mode",
        value: "edit_mode"
      }
    ],
    option: {
      table: {
        activePropsMap: {},
        selectedList: [],
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
            text: "entry_number",
            value: "company_num",
            sortable: true
          },
          {
            text: "name",
            value: "name",
            sortable: true
          },
          {
            text: "entry_date",
            value: "join_date",
            sortable: true
          },
          {
            text: "entry_position",
            value: "position"
          },
          {
            text: "id",
            value: "userid"
          },
          {
            text: "password",
            value: "userpw"
          }
          // {
          //   text: "use_menu",
          //   value: "userid"
          // }
        ],
        list: []
      },
      tree: {
        // 트리 리스트
        list: [],
        selectedList: [],
        treeKey: "code",
        isSelectable: true,
        isActivatable: false,
        isReturnObject: true,
        onInput: function(d) {
          this.option.tree.selectedList = d.itemList;
        },
        onClick: function(d) {
          console.log(d);
        }
      }
    }
  }),
  beforeMount: function() {
    this.self = this;
    this.loadTreeData();
  },
  created() {
    this.loadListData();
  },
  watch: {
    type: function() {
      this.option.table.selectedList = [];
      this.option.tree.selectedList = [];
      for (var i in this.option.table.activePropsMap) {
        console.log((this.option.table.activePropsMap[i].expanded = false));
      }
    }
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
      props.expanded = !props.expanded;
      this.option.table.activeItemList = [];
      this.option.table.activeItemList.push(this.$util.copy(props.item));
      this.option.table.activePropsMap[props.index] = props;
      console.log(this);
      if (this.option.table.activeItemList.length) {
        this.$http
          .post("/basic_api/basic_info_member_menu_list", {
            au_idx: this.option.table.activeItemList[0].idx
          })
          .then(rs => {
            var list = [];
            for (var i in rs.data) {
              list.push(rs.data[i].menu_code);
            }
            this.$set(this.option.tree, "selectedList", list);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    save() {
      var menuIdxList = [];
      for (var i in this.option.tree.selectedList) {
        menuIdxList[i] = this.menuCodeMap[this.option.tree.selectedList[i]];
      }
      this.$http
        .post("/basic_api/basic_info_auth_add", {
          um_idx: menuIdxList,
          code: this.option.tree.selectedList,
          au_idx : this.option.table.selectedList
        })
        .then(rs => {
          console.log(rs);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    reset() {},
    loadListData: function() {
      this.$http
        .post("/basic_api/basic_info_member_list", {
          app_idx: this.$store.getters.getLoginInfo.loginInfo.app_idx,
          app_mode: this.$store.getters.getLoginInfo.loginInfo.app_mode
        })
        .then(rs => {
          this.option.table.list = rs.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    loadTreeData: function() {
      this.$http
        .post("/basic_api/basic_info_auth", {
          userid: this.$store.getters.getLoginInfo.loginInfo.id,
          app_idx: this.$store.getters.getLoginInfo.loginInfo.app_idx
        })
        .then(rs => {
          rs.list.splice(0, 1);
          this.option.tree.list = rs.list;
          this.createMenuCodeMap(rs.list);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    changeMode: function() {
      console.log(this.type);
    },
    createMenuCodeMap: (function() {
      var menuCodeMap = {};
      var loop = function(list, parent) {
        for (var i in list) {
          menuCodeMap[list[i].code] = list[i].idx;
          if (list[i].child) {
            loop(list[i].child, list[i]);
          }
        }
      };
      return function(list) {
        menuCodeMap = {};
        for (var i in list) {
          menuCodeMap[list[i].code] = list[i].idx;
          if (list[i].child) {
            loop(list[i].child, list[i]);
          }
        }
        this.menuCodeMap = menuCodeMap;
      };
    })()
  }
};
</script>

