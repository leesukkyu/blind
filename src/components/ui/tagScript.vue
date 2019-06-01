// 공통 - 태그스크립트
<template>
  <div>
    <v-combobox
      v-model="model"
      :items="nameList"
      :search-input.sync="search"
      :disabled="disabled"
      :loading="loading"
      :hint="$t(hint)"
      :label="$t(label)"
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
          <!-- 글 내용 -->
          <div
            class="tagScriptTextBox"
            :class="{active : index == editIndex, last : index == model.length - 1}"
          >
            <span class="tagScriptTextView">{{ model[index] }}</span>
            <v-text-field
              class="tagScriptTextEdit"
              v-model="model[index]"
              @focus="focus(item, $event, index)"
              @blur="blur(item, $event, index)"
              @keyup.enter="enter(item, $event, index)"
            ></v-text-field>
          </div>
          <!-- 삭제 버튼 -->
          <div @click.stop="onClickDeleteBtn(item)" v-if="isDel(item)" class="v-chip__close">
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
    "deletableChips"
  ],
  data: function() {
    return {
      search: null,
      model: [],
      nameMap: {},
      nameList: [],
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
            // 중복된 데이터가 있는 경우
            if (oldData.indexOf(value) != -1) {
              this.$nextTick(function() {
                this.model = oldData;
              });
              this.$store.dispatch("openSnackbar", {
                text: "msg.notice.duplication",
                color: "error"
              });
            } else {
              console.log("create...");
              this.requestCreate(value);
              this.$nextTick(function() {
                this.model.pop();
              });
            }
          }
          // 삭제한 경우
          else if (newData.length < oldData.length) {
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
    }
  },

  // 리스트에 연결된 맵과 리스트 업데이트
  beforeMount() {
    this.setAllData();
  },
  computed: {},
  methods: {
    isDel: function(item) {
      if (this.nameMap[item]) {
        return this.deletableChips && !this.nameMap[item].disabled;
      } else {
        return this.deletableChips;
      }
    },
    // 유저가 사용한 경우 체크
    change: function(list) {
      this.user = true;
    },
    input: function() {},

    // 리스트에 연결된 맵과 리스트 생성
    setAllData: function() {
      this.nameList = [];
      this.nameMap = {};
      this.model = [];
      for (let i in this.list) {
        this.nameList.push(this.list[i].name);
        this.nameMap[this.list[i].name] = this.list[i];
        this.model.push(this.list[i].name);
      }
    },

    // 칩을 클릭한 경우
    onClickChip: function(item, event, index) {
      if (this.nameMap[item].disabled) {
        event.stopPropagation();
        return;
      }
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
      console.log("blur");
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
      console.log("enter");
      let newValue = $event.target.value;
      this.editIndex = -1;
      if (this.oldValue == newValue) {
        return;
      }
      // if (!this.checkError(item, $event, index)) {
      //   //this.model[this.model.indexOf(this.oldValue)] = newValue;
      //   this.requestUpdate(newValue, this.oldValue);
      // }
    },

    // 포커스 이벤트 리스너
    focus: function(item, $event, index) {
      this.oldValue = $event.target.value;
    },

    // 블러나 엔터시 중복값이 있나 확인.
    checkError: function(item, $event, index) {
      let result = true;
      let newValue = $event.target.value;
      // 중복된 값이 있는 경우
      if (
        // this.model.indexOf(newValue) != -1 &&
        // this.model.indexOf(newValue) != index
        this.model.indexOf(newValue) != this.model.lastIndexOf(newValue)
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
      }
      // 중복된 값이 없는 올바른 경우
      else {
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
    onClickDeleteBtn: function(name) {
      this.requestDelete(name);
    },

    // 삭제 요청
    requestDelete: function(name) {
      this.onDelete.call(this.parentThis, {
        name: name,
        item: this.nameMap[name]
      });
    },

    // 생성 요청
    requestCreate: function(name) {
      this.onCreate.call(this.parentThis, {
        name: name
      });
    },

    // 업데이트 요청
    requestUpdate: function(newName, oldName) {
      this.onUpdate.call(this.parentThis, {
        name: oldName,
        newName: newName,
        item: this.nameMap[oldName]
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
</style>