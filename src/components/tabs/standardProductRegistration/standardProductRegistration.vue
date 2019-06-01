// 표준 제품 등록 메인
<template>
  <div>
    <v-tabs v-model="active" @change="onChangeTab" color="background" slider-color="green">
      <v-tab
        class="pb-2"
        v-for="(item, i) in tabs"
        :key="i"
        ripple
      >{{ $t('menu.' + tabInfo.item.code + ".child." + item.text) }}</v-tab>
      <v-tabs-items>
        <v-tab-item
          v-for="(item, i) in tabs"
          :key="i"
          class="pa-1 pt-3"
          transition="false"
          reverse-transition="false"
        >
          <!-- 브랜드 편집 -->
          <brand-edit
            v-if="item.name == 'brandEdit'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="brandEdit"
          ></brand-edit>

          <!-- 상품류 편집 -->
          <product-type-edit
            v-if="item.name == 'productTypeEdit'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="productTypeEdit"
          ></product-type-edit>

          <!-- 아이콘 편집 -->
          <icon-edit
            v-if="item.name == 'iconEdit'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="iconEdit"
          ></icon-edit>

          <!-- 분류명 편집 -->
          <category-edit
            v-if="item.name == 'categoryEdit'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="categoryEdit"
          ></category-edit>

          <!-- 분류명 편집 (블라인드) -->
          <category-edit-blind
            v-if="item.name == 'categoryEditBlind'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="categoryEditBlind"
          ></category-edit-blind>

          <!-- 규격품 상세 -->
          <standard-detail
            v-if="item.name == 'standardDetail'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="standardDetail"
          ></standard-detail>

          <!-- 규격항 편집 -->
          <standard-subject-edit
            v-if="item.name == 'standardSubjectEdit'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="standardSubjectEdit"
          ></standard-subject-edit>

          <!-- 제조품상세 -->
          <standard-product-detail
            v-if="item.name == 'standardProductDetail'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="standardProductDetail"
          ></standard-product-detail>

          <!-- 원단명편집 -->
          <fabric-name-edit
            v-if="item.name == 'fabricNameEdit'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="fabricNameEdit"
          ></fabric-name-edit>

          <!-- 컬러명편집 -->
          <color-name-edit
            v-if="item.name == 'colorNameEdit'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="colorNameEdit"
          ></color-name-edit>

          <!-- 선택원단속성편집 -->
          <select-fabric-property-edit
            v-if="item.name == 'selectFabricPropertyEdit'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="selectFabricPropertyEdit"
          ></select-fabric-property-edit>

          <!-- 가공값생성 -->
          <process-value-create
            v-if="item.name == 'processValueCreate'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="processValueCreate"
          ></process-value-create>

          <!-- 가공값편집 -->
          <process-value-edit
            v-if="item.name == 'processValueEdit'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="processValueEdit"
          ></process-value-edit>

          <!-- 폭 설정 -->
          <width-setting
            v-if="item.name == 'widthSetting'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="widthSetting"
          ></width-setting>

          <!-- 시스템 편집 -->
          <system-edit
            v-if="item.name == 'systemEdit'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="systemEdit"
          ></system-edit>

          <!-- 옵션명 편집 -->
          <option-name-edit
            v-if="item.name == 'optionNameEdit'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="optionNameEdit"
          ></option-name-edit>

          <!-- 수선명 편집 -->
          <repair-name-edit
            v-if="item.name == 'repairNameEdit'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="repairNameEdit"
          ></repair-name-edit>

          <!-- 시스템 설정 -->
          <system-setting
            v-if="item.name == 'systemSetting'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="systemSetting"
          ></system-setting>

          <!-- 항목명 편집 -->
          <item-name-edit
            v-if="item.name == 'itemNameEdit'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="itemNameEdit"
          ></item-name-edit>

          <!-- 옵션값 설정 -->
          <option-value-setting
            v-if="item.name == 'optionValueSetting'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="optionValueSetting"
          ></option-value-setting>

          <!-- 항목값 설정 -->
          <item-value-setting
            v-if="item.name == 'itemValueSetting'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="itemValueSetting"
          ></item-value-setting>

          <!-- 항목명 편집 (수선) -->
          <item-name-edit-repair
            v-if="item.name == 'itemNameEditRepair'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="itemNameEditRepair"
          ></item-name-edit-repair>

          <!-- 수선값 설정 -->
          <repair-value-setting
            v-if="item.name == 'repairValueSetting'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="repairValueSetting"
          ></repair-value-setting>

          <!-- 실사구분 편집 -->
          <actual-image-divide-edit
            v-if="item.name == 'actualImageDivideEdit'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="actualImageDivideEdit"
          ></actual-image-divide-edit>

          <!-- 실사명 편집 -->
          <actual-image-name-edit
            v-if="item.name == 'actualImageNameEdit'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="actualImageNameEdit"
          ></actual-image-name-edit>

          <!-- 패턴명 편집 -->
          <pattern-name-edit
            v-if="item.name == 'patternNameEdit'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="patternNameEdit"
          ></pattern-name-edit>

          <!-- 자수명 편집 -->
          <embroidery-name-edit
            v-if="item.name == 'embroideryNameEdit'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="embroideryNameEdit"
          ></embroidery-name-edit>

          <!-- 검색어 편집 -->
          <search-edit
            v-if="item.name == 'searchEdit'"
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="searchEdit"
          ></search-edit>
          
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>

    <v-card color="background" flat>
      <!-- 규격품 편집 테이블 -->
      <standard-edit
        v-if="tabName == 'standardEdit' || tabName == 'standardDetail' || tabName == 'standardSubjectEdit' || tabName == 'standardProductDetail'"
        :tab-info="tabInfo"
        :event-bus="eventBus"
        :page-storage="pageStorage"
        ref="standardEdit"
      ></standard-edit>
    </v-card>

    <v-card color="background" flat>
      <brand-tree
        v-if="tabName == 'brandEdit'"
        :tab-info="tabInfo"
        :event-bus="eventBus"
        :page-storage="pageStorage"
        ref="brandTree"
      ></brand-tree>

      <v-card v-else-if="tabName == 'iconEdit'" color="background" flat>
        <div>
          <icon-tree
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="iconTree"
          ></icon-tree>
        </div>
        <div>
          <icon-file-edit
            :tab-info="tabInfo"
            :event-bus="eventBus"
            :page-storage="pageStorage"
            ref="iconFileEdit"
          ></icon-file-edit>
        </div>
      </v-card>

      <product-tree
        v-else
        :tab-info="tabInfo"
        :event-bus="eventBus"
        :page-storage="pageStorage"
        ref="productTree"
      ></product-tree>
    </v-card>
  </div>
</template>

<script>
import Vue from "vue";

import brandEdit from "./brandEdit";
import productTypeEdit from "./productTypeEdit";
import iconEdit from "./iconEdit";
import categoryEdit from "./categoryEdit";
import categoryEditBlind from "./categoryEditBlind";

import standardEdit from "./standardEdit";
import standardDetail from "./standardDetail";
import standardSubjectEdit from "./standardSubjectEdit";
import standardProductDetail from "./standardProductDetail";
import fabricNameEdit from "./fabricNameEdit";
import colorNameEdit from "./colorNameEdit";
import selectFabricPropertyEdit from "./selectFabricPropertyEdit";
import processValueCreate from "./processValueCreate";
import processValueEdit from "./processValueEdit";
import widthSetting from "./widthSetting";
import systemEdit from "./systemEdit";
import optionNameEdit from "./optionNameEdit";
import repairNameEdit from "./repairNameEdit";
import systemSetting from "./systemSetting";
import itemNameEdit from "./itemNameEdit";
import optionValueSetting from "./optionValueSetting";
import itemValueSetting from "./itemValueSetting";
import itemNameEditRepair from "./itemNameEditRepair";
import repairValueSetting from "./repairValueSetting";
import actualImageDivideEdit from "./actualImageDivideEdit";
import actualImageNameEdit from "./actualImageNameEdit";
import patternNameEdit from "./patternNameEdit";
import embroideryNameEdit from "./embroideryNameEdit";
import searchEdit from "./searchEdit";

import brandTree from "./brandTree";
import productTree from "./productTree";
import iconTree from "./iconTree";

import iconFileEdit from "./iconFileEdit";

export default {
  props: ["tabInfo"],
  components: {
    "brand-edit": brandEdit,
    "product-type-edit": productTypeEdit,
    "icon-edit": iconEdit,
    "category-edit": categoryEdit,
    "category-edit-blind": categoryEditBlind,
    "standard-edit": standardEdit,
    "standard-detail": standardDetail,
    "standard-subject-edit": standardSubjectEdit,
    "standard-product-detail": standardProductDetail,
    "fabric-name-edit": fabricNameEdit,
    "color-name-edit": colorNameEdit,
    "select-fabric-property-edit": selectFabricPropertyEdit,
    "process-value-create": processValueCreate,
    "process-value-edit": processValueEdit,
    "width-setting": widthSetting,
    "system-edit": systemEdit,
    "option-name-edit": optionNameEdit,
    "repair-name-edit": repairNameEdit,
    "system-setting": systemSetting,
    "item-name-edit": itemNameEdit,
    "option-value-setting": optionValueSetting,
    "item-value-setting": itemValueSetting,
    "item-name-edit-repair": itemNameEditRepair,
    "repair-value-setting": repairValueSetting,
    "actual-image-divide-edit": actualImageDivideEdit,
    "actual-image-name-edit": actualImageNameEdit,
    "pattern-name-edit": patternNameEdit,
    "embroidery-name-edit": embroideryNameEdit,
    "search-edit": searchEdit,

    "product-tree": productTree,
    "brand-tree": brandTree,

    "icon-tree": iconTree,
    "icon-file-edit": iconFileEdit
  },
  data() {
    return {
      tabName: "",
      active: null,
      tabs: [
        {
          name: "brandEdit",
          text: "brand_edit",
          component: "brandEdit"
        },
        {
          name: "productTypeEdit",
          text: "product_type_edit",
          component: "productTypeEdit"
        },
        {
          name: "iconEdit",
          text: "icon_edit",
          component: "iconEdit"
        }
      ],
      eventBus: null,
      pageStorage: {}
    };
  },
  beforeMount() {
    // 브랜드 트리에서 누른 경우 리스너
    this.eventBus.$on(
      "changeBrandTreeActiveList",
      this.onChangeBrandTreeActiveList
    );
    // 상품 트리에서 누른 경우 리스너
    this.eventBus.$on(
      "changeProductTreeActiveList",
      this.onChangeProductTreeActiveList
    );
    // 아이콘 트리에서 누른 경우 리스너
    this.eventBus.$on(
      "changeIconTreeActiveList",
      this.onChangeIconTreeActiveList
    );
    // 규격품 편집에서 누른 경우 리스너
    this.eventBus.$on("clickStandardEdit", this.onClickStandardEdit);
  },
  created() {
    this.eventBus = new Vue();
  },
  methods: {
    // 탭이 바뀐 경우
    onChangeTab: function() {
      this.pageStorage.activeTabIndex = this.active;
      this.pageStorage.tabObject = this.tabs[this.active];
      this.tabName = this.pageStorage.tabObject.name;
      this.onChangeActiveTab();
    },
    onChangeActiveTab: function() {
      this.$nextTick(function() {
        let name = this.pageStorage.tabObject.name;
        // 브랜드 편집 탭을 누른 경우
        if (name == "brandEdit") {
          this.$refs.brandEdit[0].init();
          this.$refs.brandTree.init();
        }
        // 상품류 편집 탭을 누른 경우
        else if (name == "productTypeEdit") {
          this.$refs.productTypeEdit[0].init();
          this.$refs.productTree.init();
        }
        // 아이콘 편집 탭을 누른 경우
        else if (name == "iconEdit") {
          this.$refs.iconEdit[0].init();
          this.$refs.iconTree.init();
          this.$refs.iconFileEdit.init();
        }
        // 분류명 편집 탭을 누른 경우
        else if (name == "categoryEdit") {
          this.$refs.categoryEdit[0].init();
        }
        // 분류명 편집(블라인드) 탭을 누른 경우
        else if (name == "categoryEditBlind") {
          this.$refs.categoryEditBlind[0].init();
        }
        // 규격품 편집 탭을 누른 경우
        else if (name == "standardEdit") {
          this.$refs.standardEdit.init();
        }
        // 규격품 상세 탭을 누른 경우
        else if (name == "standardDetail") {
          this.$refs.standardDetail[0].init();
        }
        // 규격항 편집 탭을 누른 경우
        else if (name == "standardSubjectEdit") {
          this.$refs.standardSubjectEdit[0].init();
        }
        // 제조품 상세 탭을 누른 경우
        else if (name == "standardProductDetail") {
          this.$refs.standardProductDetail[0].init();
        }
        // 원단명 편집 탭을 누른 경우
        else if (name == "fabricNameEdit") {
          this.$refs.fabricNameEdit[0].init();
        }
        // 컬러명 편집 탭을 누른 경우
        else if (name == "colorNameEdit") {
          this.$refs.colorNameEdit[0].init();
        }
        // 선택원단속성 편집 탭을 누른 경우
        else if (name == "selectFabricPropertyEdit") {
          this.$refs.selectFabricPropertyEdit[0].init();
        }
        // 가공값 생성 탭을 누른 경우
        else if (name == "processValueCreate") {
          this.$refs.processValueCreate[0].init();
        }
        // 가공값 편집 탭을 누른 경우
        else if (name == "processValueEdit") {
          this.$refs.processValueEdit[0].init();
        }
        // 폭 설정 탭을 누른 경우
        else if (name == "widthSetting") {
          this.$refs.widthSetting[0].init();
        }
        // 시스템 편집 탭을 누른 경우
        else if (name == "systemEdit") {
          this.$refs.systemEdit[0].init();
        }
        // 옵션명 편집 탭을 누른 경우
        else if (name == "optionNameEdit") {
          this.$refs.optionNameEdit[0].init();
        }
        // 수선명 편집 탭을 누른 경우
        else if (name == "repairNameEdit") {
          this.$refs.repairNameEdit[0].init();
        }
        // 시스템 설정 탭을 누른 경우
        else if (name == "systemSetting") {
          this.$refs.systemSetting[0].init();
        }
        // 항목명 편집 탭을 누른 경우
        else if (name == "itemNameEdit") {
          this.$refs.itemNameEdit[0].init();
        }
        // 옵션값 설정 탭을 누른 경우
        else if (name == "optionValueSetting") {
          this.$refs.optionValueSetting[0].init();
        }
        // 항목값 설정 탭을 누른 경우
        else if (name == "itemValueSetting") {
          this.$refs.itemValueSetting[0].init();
        }
        // 항목명 편집 (수선) 탭을 누른 경우
        else if (name == "itemNameEditRepair") {
          this.$refs.itemNameEditRepair[0].init();
        }
        // 수선값 설정 탭을 누른 경우
        else if (name == "repairValueSetting") {
          this.$refs.repairValueSetting[0].init();
        }
        // 실사 구분 편집 탭을 누른 경우
        else if (name == "actualImageDivideEdit") {
          this.$refs.actualImageDivideEdit[0].init();
        }
        // 실사명 편집 탭을 누른 경우
        else if (name == "actualImageNameEdit") {
          this.$refs.actualImageNameEdit[0].init();
        }
        // 패턴명 편집 탭을 누른 경우
        else if (name == "patternNameEdit") {
          this.$refs.patternNameEdit[0].init();
        }
        // 자수명 편집 탭을 누른 경우
        else if (name == "embroideryNameEdit") {
          this.$refs.embroideryNameEdit[0].init();
        }
        // 검색어 편집 탭을 누른 경우
        else if (name == "searchEdit") {
          this.$refs.searchEdit[0].init();
        }
      });
    },
    // 상품 트리에서 누른 경우
    onChangeProductTreeActiveList: function() {
      let item, type;
      if (this.pageStorage.productTreeActiveItemList.length) {
        item = this.pageStorage.productTreeActiveItemList[0];
        type = this.pageStorage.productTreeActiveItemList[0].type;
        switch (type) {
          case "브":
            this.changeTabsObjects(
              [
                {
                  name: "brandEdit",
                  text: "brand_edit",
                  component: "brandEdit"
                },
                {
                  name: "productTypeEdit",
                  text: "product_type_edit",
                  component: "productTypeEdit"
                },
                {
                  name: "iconEdit",
                  text: "icon_edit",
                  component: "iconEdit"
                }
              ],
              1
            );
            break;
          case "상":
            this.changeTabsObjects(
              [
                {
                  name: "categoryEdit",
                  text: "category_edit",
                  component: "categoryEdit"
                }
              ],
              0
            );
            break;
          case "분":
            console.log("분");
            // 규격품 밑의 분을 누른 경우
            if (item.parent.key == "F_1") {
              this.changeTabsObjects(
                [
                  {
                    name: "categoryEdit",
                    text: "category_edit",
                    component: "categoryEdit"
                  },
                  {
                    name: "standardEdit",
                    text: "standard_edit",
                    component: "standardEdit"
                  }
                ],
                1
              );
            }
            // 블라인드 밑의 분을 누른 경우
            else if (item.parent.key == "F_3") {
              this.changeTabsObjects(
                [
                  {
                    name: "categoryEditBlind",
                    text: "category_edit",
                    component: "categoryEditBlind"
                  },
                  {
                    name: "fabricNameEdit",
                    text: "fabric_name_edit",
                    component: "fabricNameEdit"
                  },
                  {
                    name: "systemEdit",
                    text: "system_edit",
                    component: "systemEdit"
                  },
                  {
                    name: "actualImageDivideEdit",
                    text: "actual_image_divide_edit",
                    component: "actualImageDivideEdit"
                  }
                ],
                1
              );
            } else {
              this.changeTabsObjects(
                [
                  {
                    name: "categoryEditBlind",
                    text: "category_edit",
                    component: "categoryEditBlind"
                  },
                  {
                    name: "fabricNameEdit",
                    text: "fabric_name_edit",
                    component: "fabricNameEdit"
                  },
                  {
                    name: "systemEdit",
                    text: "system_edit",
                    component: "systemEdit"
                  },
                  {
                    name: "actualImageDivideEdit",
                    text: "actual_image_divide_edit",
                    component: "actualImageDivideEdit"
                  }
                ],
                1
              );
            }
            break;
          case "브":
            console.log("브");
            break;
          case "원":
            console.log("원");
            this.changeTabsObjects(
              [
                {
                  name: "colorNameEdit",
                  text: "color_name_edit",
                  component: "colorNameEdit"
                },
                {
                  name: "selectFabricPropertyEdit",
                  text: "select_fabric_property_edit",
                  component: "selectFabricPropertyEdit"
                }
              ],
              0
            );
            break;
          case "칼":
            console.log("칼");
            this.changeTabsObjects(
              [
                {
                  name: "processValueCreate",
                  text: "process_value_create",
                  component: "processValueCreate"
                }
              ],
              0
            );
            break;
          case "가":
            console.log("가");
            // 부모가 상 - 원단인지 판단해서 폭 설정이 있나 없나 확인
            if (this.findParentByKey(item, "F_2")) {
              this.changeTabsObjects(
                [
                  {
                    name: "processValueEdit",
                    text: "process_value_edit",
                    component: "processValueEdit"
                  },
                  {
                    name: "widthSetting",
                    text: "width_setting",
                    component: "widthSetting"
                  }
                ],
                0
              );
            } else {
              this.changeTabsObjects(
                [
                  {
                    name: "processValueEdit",
                    text: "process_value_edit",
                    component: "processValueEdit"
                  }
                ],
                0
              );
            }
            break;
          case "시":
            console.log("시스템 : 시");
            this.changeTabsObjects(
              [
                {
                  name: "categoryEditBlind",
                  text: "category_edit",
                  component: "categoryEditBlind"
                },
                {
                  name: "fabricNameEdit",
                  text: "fabric_name_edit",
                  component: "fabricNameEdit"
                },
                {
                  name: "systemEdit",
                  text: "system_edit",
                  component: "systemEdit"
                },
                {
                  name: "actualImageDivideEdit",
                  text: "actual_image_divide_edit",
                  component: "actualImageDivideEdit"
                }
              ],
              1
            );
            break;
          case "옵":
            console.log("옵");
            this.changeTabsObjects(
              [
                {
                  name: "itemNameEdit",
                  text: "item_name_edit",
                  component: "itemNameEdit"
                },
                {
                  name: "optionValueSetting",
                  text: "option_value_setting",
                  component: "optionValueSetting"
                }
              ],
              0
            );
            break;
          case "항":
            console.log("항");
            this.changeTabsObjects(
              [
                {
                  name: "itemValueSetting",
                  text: "item_value_setting",
                  component: "itemValueSetting"
                }
              ],
              0
            );
            break;
          case "명":
            console.log("명");
            // 시스템 밑의 명의 경우
            if (this.findParent(item, "시")) {
              this.changeTabsObjects(
                [
                  {
                    name: "optionNameEdit",
                    text: "option_name_edit",
                    component: "optionNameEdit"
                  },
                  {
                    name: "repairNameEdit",
                    text: "repair_name_edit",
                    component: "repairNameEdit"
                  },
                  {
                    name: "systemSetting",
                    text: "system_setting",
                    component: "systemSetting"
                  }
                ],
                0
              );
            }
            break;
          case "수":
            console.log("수");
            this.changeTabsObjects(
              [
                {
                  name: "itemNameEditRepair",
                  text: "item_name_edit",
                  component: "itemNameEditRepair"
                },
                {
                  name: "repairValueSetting",
                  text: "repair_value_setting",
                  component: "repairValueSetting"
                }
              ],
              0
            );
            break;

          case "구":
            console.log("구");
            this.changeTabsObjects(
              [
                {
                  name: "actualImageNameEdit",
                  text: "actual_image_name_edit",
                  component: "actualImageNameEdit"
                },
                {
                  name: "patternNameEdit",
                  text: "pattern_name_edit",
                  component: "patternNameEdit"
                },
                {
                  name: "embroideryNameEdit",
                  text: "embroidery_name_edit",
                  component: "embroideryNameEdit"
                }
              ],
              0
            );
            break;

            case "실":
            console.log("실");
            this.changeTabsObjects(
              [
                {
                  name: "searchEdit",
                  text: "search_edit",
                  component: "searchEdit"
                }
              ],
              0
            );
            break;
        }
      }
    },
    // 아이콘 트리에서 누른 경우
    onChangeIconTreeActiveList: function() {
      if (this.pageStorage.iconTreeActiveItemList.length) {
        let type = this.pageStorage.iconTreeActiveItemList[0].type;
        switch (type) {
          case "인":
          case "아":
          case "세":
          case "구":
            this.$refs.iconEdit[0].init();
            this.$refs.iconFileEdit.init();
            break;
        }
      }
    },
    // 규격품 편집에서 테이블의 tr을 누른 경우
    onClickStandardEdit: function() {
      // 규격품 편집 탭에서 누른 경우
      if (this.tabName == "standardEdit") {
        this.changeTabsObjects(
          [
            {
              name: "categoryEdit",
              text: "category_edit",
              component: "categoryEdit"
            },
            {
              name: "standardEdit",
              text: "standard_edit",
              component: "standardEdit"
            },
            {
              name: "standardDetail",
              text: "standard_detail",
              component: "standardDetail"
            },
            {
              name: "standardSubjectEdit",
              text: "standard_subject_edit",
              component: "standardSubjectEdit"
            },
            {
              name: "standardProductDetail",
              text: "standard_product_detail",
              component: "standardProductDetail"
            }
          ],
          this.active,
          false
        );
      }
      // 규격품 상세 탭에서 누른 경우
      else if (this.tabName == "standardDetail") {
        this.$refs.standardDetail[0].init();
      }
      // 규격항 편집 탭에서 누른 경우
      else if (this.tabName == "standardSubjectEdit") {
        this.$refs.standardSubjectEdit[0].init();
      }
      // 제조품 상세 탭에서 누른 경우
      else if (this.tabName == "standardProductDetail") {
        this.$refs.standardProductDetail[0].init();
      }
    },
    // 브랜드 트리에서 누른 경우
    onChangeBrandTreeActiveList: function() {},
    // 탭 데이터를 아예 바꾸기
    changeTabsObjects: function(list, activeIndex, changeEvent) {
      this.tabs = list;
      this.active = activeIndex;
      if (changeEvent !== false) {
        this.onChangeTab();
      }
    },
    findParent: function(item, type) {
      while (item.parent) {
        if (item.type == type) {
          return true;
        }
        item = item.parent;
      }
      return false;
    },
    findParentByKey: function(item, key) {
      while (item.parent) {
        if (item.key == key) {
          return true;
        }
        item = item.parent;
      }
      return false;
    }
  }
};
</script>

<style>
.v-window__container--is-active {
  height: auto !important;
}
</style>

