// 거래처등록 > 셀링툴아이콘
<template>
  <div class="pt-2 background">
    <v-toolbar flat color="background">
      <v-toolbar-title
        class="pr-3"
      >{{ $t('menu.' + tabInfo.item.code + ".child.selling_tool_item") }}</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
    </v-toolbar>
    <!-- 선택된 아이템 테이블 -->
    <v-flex pb-3>
      <v-data-table :items="selectItemList" :headers-length="parseInt(7)" hide-actions>
        <!-- 테이블 헤더 -->
        <template slot="headers" slot-scope="props">
          <tr>
            <th>{{ $t('menu.' + tabInfo.item.code + ".child.code") }}</th>
            <th>{{ $t('menu.' + tabInfo.item.code + ".child.division") }}</th>
            <th>{{ $t('menu.' + tabInfo.item.code + ".child.account_name") }}</th>
            <th>{{ $t('menu.' + tabInfo.item.code + ".child.representation_name") }}</th>
            <th>{{ $t('menu.' + tabInfo.item.code + ".child.manager_call_number") }}</th>
            <th>{{ $t('menu.' + tabInfo.item.code + ".child.address") }}</th>
            <th>{{ $t('menu.' + tabInfo.item.code + ".child.remark") }}</th>
          </tr>
        </template>

        <!-- 테이블 몸통 -->
        <template slot="items" slot-scope="props">
          <tr>
            <td style="padding:0 10px" class="text-xs-center">{{ props.item.app_code }}</td>
            <td class="text-xs-center">{{ props.item.app_use_model_txt}}</td>
            <td class="text-xs-center">{{ props.item.app_name }}</td>
            <td class="text-xs-center">{{ props.item.app_ceo }}</td>
            <td class="text-xs-center">{{ props.item.app_dam_tel }}</td>
            <td class="text-xs-center">{{ props.item.app_address }}</td>
            <td class="text-xs-center">{{ props.item.app_memo }}</td>
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
        <v-flex pl-2 xs6 sm6 md6 pt-3>
          <v-card flat color="background" style="height:calc(100% - 5px)" class="pa-2">
            <v-container fluid fill-height>
              <v-layout fill-height column wrap>
                <v-flex xs9>
                  <v-card style="height:calc(100% - 5px)" fill-height class="pa-3">
                    <v-layout
                      style="overflow:hidden;"
                      align-center
                      justify-center
                      column
                      fill-height
                    >
                      <img :src="imgObj.img_path">
                    </v-layout>
                  </v-card>
                </v-flex>
                <v-flex xs3>
                  <v-card-actions>
                    <v-form ref="form">
                      <input
                        @change="onChangeFile"
                        type="file"
                        style="display: none"
                        ref="image"
                        accept="image/*"
                      >
                      <v-btn
                        @click="onClickAddFileBtn"
                        :title="$t('function.file_upload')"
                        flat
                        icon
                        color="green"
                      >
                        <v-icon>add_to_photos</v-icon>
                      </v-btn>
                      <v-btn
                        @click="reset"
                        :title="$t('function.file_delete')"
                        flat
                        icon
                        color="pink"
                      >
                        <v-icon>delete_forever</v-icon>
                      </v-btn>
                    </v-form>
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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
          <v-btn color="green darken-1" flat="flat" @click="deleteImg">{{ $t('function.confirm') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import rules from "../../util/rules";
import post from "../../ui/post";
import treeScript from "../../ui/treeScript";
import jquery from "jquery";

import "./vanilla";

export default {
  components: {
    post: post,
    "tree-script": treeScript
  },
  props: ["tabInfo", "pageStorage", "eventBus"],
  data: () => ({
    self: null,
    search: "",
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
      }
    },
    selectItemList: [],
    delDialogYn: false,
    imgObj: {
      img_path: ""
    },
    file: null
  }),
  beforeMount: function() {
    this.self = this;
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
      this.$refs.image.value = "";
      this.imgObj = {};
      if(props.expanded){
        this.selectItemList.push(this.$util.copy(props.item));
        this.$http
          .post("/customer_api/custom_sell_icon", {
            idx: this.selectItemList[0].idx,
            app_code: this.selectItemList[0].app_code
          })
          .then(rs => {
            this.imgObj = rs.data[rs.data.length - 1];
            this.file = null;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    onClickAddFileBtn() {
      this.$refs.image.click();
    },
    onChangeFile() {
      if(this.selectItemList.length == 0){
        this.$refs.image.value = "";
        return;
      }
      let data = new FormData();
      data.append("idx", this.selectItemList[0].idx);
      data.append("app_code", this.selectItemList[0].app_code);
      data.append("file", event.target.files[0]);

      this.$http
        .post("/customer_api/custom_sell_icon_reg", data)
        .then(rs => {
          if (rs.status == "Y") {
            this.imgObj.img_path = rs.img_path;
            this.imgObj.img_file_name = rs.img_file_name;
            this.$store.dispatch("openSnackbar", {
              text: "msg.notice.edit"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    reset() {
      this.delDialogYn = true;
    },
    deleteImg() {
      this.$http
        .post("/customer_api/custom_sell_icon_del", {
          idx: this.selectItemList[0].idx,
          app_code: this.selectItemList[0].app_code
        })
        .then(rs => {
          if (rs.status == "Y") {
            console.log(rs)
            this.imgObj.img_path = rs.img_path;
            this.$store.dispatch("openSnackbar", {
              text: "msg.notice.del"
            });
            this.delDialogYn = false;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

