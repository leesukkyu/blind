// 공통 - 포스트 스크립트
<template>
  <v-layout row align-center justify-center fill-height>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-btn slot="activator" flat icon color="green">
        <v-icon>search</v-icon>
      </v-btn>
      <v-card>
        <v-toolbar dark color="green">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>우편번호찾기</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <div>
          <div :id="id"></div>
        </div>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
var globalCount = {
  id: 0
};
export default {
  props: ["address"],
  data: () => ({
    globalCount: globalCount,
    count: 0,
    id: "",
    dialog: false
  }),
  watch: {
    dialog(val) {
      if (val) {
        this.open();
      }
    }
  },
  created() {
    let ckeditor = document.createElement("script");
    ckeditor.setAttribute(
      "src",
      "http://dmaps.daum.net/map_js_init/postcode.v2.js?autoload=false"
    );
    document.head.appendChild(ckeditor);
  },
  mounted() {
    this.count = this.globalCount.id;
    this.id = "post_wrap_" + this.count;
    this.globalCount.id++;
  },
  methods: {
    open: function() {
      // 우편번호 찾기 찾기 화면을 넣을 element
      var element_wrap = document.getElementById("post_wrap_" + this.count);
      var _this = this;
      console.log("xx");

      daum.postcode.load(function() {
        new daum.Postcode({
          oncomplete: function(data) {
            var addr = ""; // 주소 변수
            var extraAddr = ""; // 참고항목 변수
            if (data.userSelectedType === "R") {
              // 사용자가 도로명 주소를 선택했을 경우
              addr = data.roadAddress;
            } else {
              // 사용자가 지번 주소를 선택했을 경우(J)
              addr = data.jibunAddress;
            }
            if (data.userSelectedType === "R") {
              if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
                extraAddr += data.bname;
              }
              if (data.buildingName !== "" && data.apartment === "Y") {
                extraAddr +=
                  extraAddr !== ""
                    ? ", " + data.buildingName
                    : data.buildingName;
              }
              if (extraAddr !== "") {
                extraAddr = " (" + extraAddr + ")";
              }
              //document.getElementById("sample3_extraAddress").value = extraAddr;
            } else {
              //document.getElementById("sample3_extraAddress").value = '';
            }
            //document.getElementById('sample3_postcode').value = data.zonecode;
            //document.getElementById("sample3_address").value = addr;
            //document.getElementById("sample3_detailAddress").focus();
            //document.body.scrollTop = currentScroll;

            //this.$set(this.address, 'add1', 'xxxxx');
            _this.address.address1 = addr;
            _this.address.address2 = extraAddr;
            _this.address.post = data.zonecode;
            _this.dialog = false;
          },
          onresize: function(size) {
            element_wrap.style.height = size.height + "px";
          },
          width: "100%",
          height: "100%"
        }).embed(element_wrap, {
          autoClose: false
        });
      });
    }
  }
};
</script>