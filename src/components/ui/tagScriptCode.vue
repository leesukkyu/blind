// 공통 - 태그스크립트 - 코드형식
<template>
  <div>
    <v-combobox
      v-model="model"
      :items="fullNameList"
      :search-input.sync="search"
      :disabled="disabled"
      :loading="loading"
      :label="$t(label)"
      :hint="$t(hint)"
      @input="input"
      @change="change"
      hide-selected
      multiple
      persistent-hint
      small-chips
      color="background"
    >
      <template slot="selection" slot-scope="{ item, parent, selected, index }">
        <v-chip :color="checkColor(index)" @click="onClickChip(item, $event, index)">
          <!-- 내용 -->
          <div
            class="tagScriptTextBox"
            :class="{active : index == editIndex, last : index == model.length - 1}"
          >
            <!-- 코드 -->
            <v-avatar class="codeBox teal white--text">{{ model[index].split('-')[0] }}</v-avatar>
            <span class="tagScriptTextView">{{ model[index].split('-')[1] }}</span>
            <v-text-field
              class="tagScriptTextEdit"
              v-model="model[index]"
              @focus="focus(item, $event, index)"
              @blur="blur(item, $event, index)"
              @keyup.enter="enter(item, $event, index)"
            ></v-text-field>
          </div>
          <!-- 삭제 버튼 -->
          <div @click.stop="onClickDeleteBtn(item)" v-if="deletableChips" class="v-chip__close">
            <i aria-hidden="true" class="v-icon material-icons theme--light">cancel</i>
          </div>
        </v-chip>
      </template>

      <template slot="no-data">
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>

      <template slot="progress">
        <v-progress-linear :indeterminate="true" color="green"></v-progress-linear>
      </template>
    </v-combobox>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  props: [
    "list",
    "disabled",
    "parentThis",
    "onCreate",
    "onDelete",
    "onUpdate",
    "test",
    "label",
    "hint",
    "loading",
    "deletableChips",
    "codeLength"
  ],
  data: function() {
    return {
      search: null,
      model: [],
      fullNameMap: {},
      fullNameList: [],
      editIndex: -1,
      oldValue: "",
      errorMap: [],
      user: false
    };
  },
  watch: {
    model: {
      immediate: false,
      handler: function(newData, oldData) {
        let temp, value;
        // 유저가 행동한 경우 체크
        if (this.user) {
          value = newData[newData.length - 1];
          // 새로운 데이터가 들어온 경우
          if (newData.length > oldData.length) {
            console.log("create...");
            // 문제가 있는 경우 체크 // 값이 '-' 로 2분할 되어야 함.
            if (value.split("-").length != 2) {
              this.$store.dispatch("openSnackbar", {
                text: "msg.notice.value_error",
                color: "error"
              });
            } else {
              this.requestCreate(value);
            }
            this.$nextTick(function() {
              this.model.pop();
            });
          }
          // 중복된 값이 있는 경우
          else if (oldData.indexOf(value) != -1) {
            this.$nextTick(function() {
              this.model = oldData;
            });
            this.$store.dispatch("openSnackbar", {
              text: "msg.notice.duplication",
              color: "error"
            });
          }
          // 마지막 데이터가 지워진 경우
          else {
            console.log("delete...");
            temp = oldData.pop();
            this.model.push(temp);
            this.requestDelete(temp);
          }
        }
        this.user = false;
      }
    },
    // 리스트가 변하면 그에 연결된 맵과 리스트 업데이트
    list: function() {
      console.log("리스트가 변했다.");
      this.setAllData();
    },
    search: function(d) {
      if (!d) {
        return;
      }
      if (d.length == this.codeLength) {
        d = d + "-";
        this.search = d;
        console.log(this.search);
      } else if (d.length == this.codeLength + 1 && d.indexOf("-") == -1) {
        d =
          d.substring(0, this.codeLength) +
          "-" +
          d.substring(this.codeLength, this.codeLength + 1);
        this.search = d;
      }
    }
  },

  // 리스트에 연결된 맵과 리스트 업데이트
  beforeMount() {
    this.setAllData();
  },
  computed: {},
  methods: {
    // 유저가 사용한 경우 체크
    change: function(list) {
      this.user = true;
    },
    input: function() {},

    // 리스트에 연결된 맵과 리스트 생성
    setAllData: function() {
      this.fullNameList = [];
      this.fullNameMap = {};
      this.model = [];
      for (let i in this.list) {
        this.fullNameList.push(this.list[i].fullName);
        this.fullNameMap[this.list[i].fullName] = this.list[i];
        this.model.push(this.list[i].fullName);
      }
    },

    // 칩을 클릭한 경우
    onClickChip: function(item, event, index) {
      let _this = this;
      let _event = event;
      this.editIndex = index;
      setTimeout(function() {
        _event.target.parentElement.querySelector("input").focus();
      }, 100);
    },
    // 해당 아이템의 인덱스 알아내기
    getIndex: function(item) {
      return this.model.indexOf(item);
    },

    // 블러 이벤트 리스너
    blur: function(item, $event, index) {
      let newValue = $event.target.value;
      this.editIndex = -1;
      if (this.oldValue == newValue) {
        return;
      }
      if (!this.checkError(item, $event, index)) {
        //this.model[this.model.indexOf(this.oldValue)] = newValue;
        this.requestUpdate(newValue, this.oldValue);
      }
    },

    // 엔터 이벤트 리스너
    enter: function(item, $event, index) {
      let newValue = $event.target.value;
      if (this.oldValue == newValue) {
        return;
      }
      if (!this.checkError(item, $event, index)) {
        //this.model[this.model.indexOf(this.oldValue)] = newValue;
        this.requestUpdate(newValue, this.oldValue);
      }
    },

    // 포커스 이벤트 리스너
    focus: function(item, $event, index) {
      this.oldValue = $event.target.value;
    },

    // 블러나 엔터시 중복값이 있나 확인.
    checkError: function(item, $event, index) {
      let result = true;
      let newValue = $event.target.value;
      // 문제가 있는 경우 체크
      if (
        // 1. 중복된 값이 있는 경우
        this.model.indexOf(newValue) != this.model.lastIndexOf(newValue) ||
        // 2. 값이 '-' 로 2분할 되어야 함.
        item.split("-").length != 2
        // 3. 코드 중복은 백엔드 처리.
      ) {
        console.log("error");
        this.model[index] = this.oldValue;
        this.$set(this.errorMap, index, true);
        setTimeout(
          index => {
            this.$set(this.errorMap, index, false);
          },
          3000,
          index
        );
        this.$nextTick(() => {
          setTimeout(() => {
            this.errorMap[3] = false;
          });
        });
        result = true;
      } else {
        // 값이 올바른 경우
        console.log("no error");
        result = false;
      }
      return result;
    },

    // 에러 감지시 색상 표시
    checkColor: function(index) {
      if (this.errorMap[index] === true) {
        return "red";
      } else {
        return "";
      }
    },

    // 삭제 버튼을 누른 경우
    onClickDeleteBtn: function(fullName) {
      this.requestDelete(fullName);
    },

    // 삭제 요청
    requestDelete: function(fullName) {
      this.onDelete.call(this.parentThis, {
        fullName: fullName,
        item: this.fullNameMap[fullName]
      });
    },

    // 생성 요청
    requestCreate: function(fullName) {
      this.onCreate.call(this.parentThis, {
        code: fullName.split("-")[0],
        name: fullName.split("-")[1]
      });
    },

    // 업데이트 요청
    requestUpdate: function(newFullName, oldfullName) {
      this.onUpdate.call(this.parentThis, {
        newCode: newFullName.split("-")[0],
        newName: newFullName.split("-")[1],
        oldCode: oldfullName.split("-")[0],
        oldName: oldfullName.split("-")[1],
        item: this.fullNameMap[oldfullName]
      });
    }
  },
  computed: {}
};
</script>

<style slot-scope>
.tagScriptTextBox .tagScriptTextView {
  display: inline-block;
  vertical-align: middle;
}
.tagScriptTextBox.last .tagScriptTextView {
  min-width: 80px;
}
.tagScriptTextBox.last input {
  width: 80px;
}
.tagScriptTextBox .tagScriptTextEdit {
  display: none;
}

.tagScriptTextBox.active .tagScriptTextEdit {
  display: block;
}

.tagScriptTextBox.active .tagScriptTextView {
  display: none;
}
.tagScriptTextBox.active .codeBox {
  display: none;
}
</style>