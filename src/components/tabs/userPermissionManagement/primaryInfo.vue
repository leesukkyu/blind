// 사용자 권한 설정 // 기본 정보
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
        <v-btn
          :loading="loading.regist"
          @click="openAddDialog"
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
              style="padding:0 3px;"
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
          <td
            style="padding:0 3px;"
            class="text-xs-center"
          >{{ option.table.list.indexOf(props.item) + 1 }}</td>
          <td style="padding:0 3px;" class="text-xs-center">{{ props.item.company_num }}</td>
          <td class="text-xs-center">{{ props.item.name }}</td>
          <td style="width:120px;" class="text-xs-center">{{ props.item.join_date }}</td>
          <td class="text-xs-center">{{ props.item.position }}</td>
          <td class="text-xs-center">{{ props.item.userid }}</td>
          <td class="text-xs-center">{{ props.item.userpw }}</td>
          <td class="text-xs-center">{{ props.item.regist_num }}</td>
          <td class="text-xs-center">{{ props.item.salary_status }}</td>
          <td class="text-xs-center">{{ props.item.salary }}</td>
          <td class="text-xs-center">{{ props.item.salary_date }}</td>
          <td class="text-xs-center">{{ props.item.zipcode }}</td>
          <td class="text-xs-center">{{ props.item.addr1 }}</td>
          <td class="text-xs-center">{{ props.item.addr2 }}</td>
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
                      v-model="editedItem.company_num"
                      :label="$t('menu.' + tabInfo.item.code + '.child.entry_number')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="editedItem.name"
                      :label="$t('menu.' + tabInfo.item.code + '.child.name')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="editedItem.join_date"
                      :label="$t('menu.' + tabInfo.item.code + '.child.entry_date')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="editedItem.position"
                      :label="$t('menu.' + tabInfo.item.code + '.child.entry_position')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="editedItem.userid"
                      :label="$t('menu.' + tabInfo.item.code + '.child.id')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="editedItem.userpw"
                      :label="$t('menu.' + tabInfo.item.code + '.child.password')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="editedItem.regist_num"
                      :label="$t('menu.' + tabInfo.item.code + '.child.people_number')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="editedItem.salary_status"
                      :label="$t('menu.' + tabInfo.item.code + '.child.salary_type')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="editedItem.salary"
                      :label="$t('menu.' + tabInfo.item.code + '.child.salary')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <!-- editedItem.salary_date -->
                    <date-picker :value="editedItem.salary_date" :obj="editedItem" :obj-key="'salary_date'" :label="$t('menu.' + tabInfo.item.code + '.child.salary_date')">
                    </date-picker>
                  </v-flex>
                  <v-flex xs12 sm6 md6 style="position:relative">
                    <v-text-field
                      v-model="option.post.post"
                      :label="$t('menu.' + tabInfo.item.code + '.child.post')"
                    ></v-text-field>
                    <div style="position:absolute;top:13px;right:0px;">
                      <post :address="option.post"></post>
                    </div>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="option.post.address1"
                      :label="$t('menu.' + tabInfo.item.code + '.child.address')"
                      disabled
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="option.post.address2"
                      :label="$t('menu.' + tabInfo.item.code + '.child.detail_address')"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="editedItem.memo"
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
import post from "../../ui/post";
import datePicker from "../../ui/datePicker";

export default {
  components: {
    post: post,
    datePicker : datePicker
  },
  props: ["tabInfo"],
  data: () => ({
    search: "",
    valid: true,
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
            value: "join_date"
          },
          {
            text: "entry_position",
            value: "position"
          },
          {
            text: "id",
            value: "userid",
            sortable: true
          },
          {
            text: "password",
            value: "userpw"
          },
          {
            text: "people_number",
            value: "regist_num"
          },
          {
            text: "salary_type",
            value: "salary_status"
          },
          {
            text: "salary",
            value: "salary"
          },
          {
            text: "salary_date",
            value: "salary_date"
          },
          {
            text: "post",
            value: "zipcode"
          },
          {
            text: "address",
            value: "addr1"
          },
          {
            text: "detail_address",
            value: "addr2"
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
      company_num: "",
      name: "",
      join_date: "",
      position: "",
      userid: "",
      userpw: "",
      regist_num: "",
      salary_status: "",
      salary: "",
      salary_date: "",
      memo: "",
      regdate: ""
    },
    loading: {
      regist: false
    }
  }),

  computed: {},

  watch: {
    addDialogYn(val) {
      val || this.close();
    }
  },
  beforeMount: function() {},

  created() {
    var _this = this;
    _this.$http
      .post("/basic_api/basic_info_member_list", {
        app_idx: this.$store.getters.getLoginInfo.loginInfo.app_idx,
        app_mode: this.$store.getters.getLoginInfo.loginInfo.app_mode
      })
      .then(response => {
        console.log(response);
        var list = response.data ? response.data : [];
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
    // 수정 버튼을 누른 경우
    editItem(item) {
      this.editedIndex = this.option.table.list.indexOf(item);
      this.editedItem = this.$util.copy(item);
      this.editedItem.company_num = this.editedItem.company_num;
      this.option.post.post = item.zipcode;
      this.option.post.address1 = item.addr1;
      this.option.post.address2 = item.addr2;
      this.openAddDialog();
    },

    // 추가 버튼을 누른 경우
    openAddDialog: function(item) {
      this.addDialogYn = true;
    },

    // 삭제 버튼을 누른 경우
    openDelDialog: function(item) {
      this.delDialogYn = true;
      this.itemToDel = item;
    },

    // 팝업을 닫기
    close() {
      this.addDialogYn = false;
      setTimeout(() => {
        this.$refs.form.reset();
        this.editedIndex = -1;
      }, 300);
    },

    // 삭제
    deleteItem() {
      this.delDialogYn = false;
      this.$http
        .post("basic_api/basic_info_member_del", {
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

    // 저장할 데이터 만들기
    makeRq() {
      var rq = {
        app_idx: this.$store.getters.getLoginInfo.loginInfo.app_idx,
        company_num: this.editedItem.company_num,
        name: this.editedItem.name,
        join_date: this.editedItem.join_date,
        position: this.editedItem.position,
        userid: this.editedItem.userid,
        userpw: this.editedItem.userpw,
        regist_num: this.editedItem.regist_num,
        salary_status: this.editedItem.salary_status,
        salary: this.editedItem.salary,
        salary_date: this.editedItem.salary_date,
        zipcode: this.option.post.post,
        addr1: this.option.post.address1,
        addr2: this.option.post.address2,
        memo: this.editedItem.memo
      };
      return rq;
    },

    // 저장
    save() {
      this.loading.regist = true;
      this.$http
        .post("/basic_api/basic_info_member_add", this.makeRq())
        .then(rs => {
          if (rs.status == "Y") {
            this.$http
              .post("/basic_api/basic_info_member_call", {
                idx: rs.idx
              })
              .then(rs => {
                this.option.table.list.push(rs.data[0]);
                this.$store.dispatch("openSnackbar", {
                  text: "msg.notice.save"
                });
                this.loading.regist = false;
              });
            this.close();
          } else if (rs.status == "S") {
            this.$store.dispatch("openSnackbar", {
              text: "msg.notice.duplication",
              color: "error"
            });
            this.loading.regist = false;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    // 업데이트
    update() {
      var rq = this.makeRq();
      rq.idx = this.editedItem.idx;
      this.loading.regist = true;
      this.$http
        .post("/basic_api/basic_info_member_edit", rq)
        .then(rs => {
          if (rs.status == "Y") {
            this.$http
              .post("/basic_api/basic_info_member_call", {
                idx: rq.idx
              })
              .then(rs => {
                Object.assign(
                  this.option.table.list[this.editedIndex],
                  rs.data[0]
                );
                this.$store.dispatch("openSnackbar", {
                  text: "msg.notice.edit"
                });
                this.loading.regist = false;
              });
            this.close();
          } else if (rs.status == "S") {
            this.$store.dispatch("openSnackbar", {
              text: "msg.notice.duplication",
              color: "error"
            });
            this.loading.regist = false;
          }
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

