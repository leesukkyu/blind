// 다국어 사용 설정

import Vue from 'vue'
import VueI18n from 'vue-i18n'

// 다국어 사용 설정
const messages = {
  // 한국어
  korean: {
    menu: {
      // 1depth
      mn1_001: {
        text: '기본메뉴',
      },
      mn2_00001: {
        text: '기본항목설정',
      },
      mn2_00002: {
        text: '상품관리설정',
      },
      mn2_00003: {
        text: '단가관리',
      },
      mn2_00004: {
        text: 'BOM등록',
      },
      mn2_00005: {
        text: '시공배송',
      },
      mn2_00006: {
        text: '판매관리',
      },
      mn2_00007: {
        text: '경리관리',
      },
      mn2_00008: {
        text: '주문관리',
      },
      mn2_00009: {
        text: '수발주관리',
      },
      mn2_00010: {
        text: '입출고',
      },
      mn2_00011: {
        text: '조립생산',
      },
      mn2_00012: {
        text: '실시간현황',
      },


      // 2depth - 기본항목설정
      mn1_002_0001: {
        text: '은행등록확인',
        child: {
          bank_info: '은행정보',
          card_info: '카드정보',
          bank_name: '은행명',
          card_name: '카드사',
          url: 'URL',
          publish_card: '발행카드',
          remark: '비고',
          recently: '최근',
          setting: '설정',
        }
      },
      mn1_002_0002: {
        text: '계정과목확인',
        child: {
          class_name_edit: '분류명편집',
          account_subject_edit: '계정과목편집',
          account_subject_explain: '계정과목설명',
          account_subject_list: '계정과목리스트',
          tag_script_hint: '편집하세요.'
        }
      },
      mn1_002_0003: {
        text: '단위변환확인',
        child: {
          area_unit: '면적단위',
          length_unit: '길이단위',
          bundle_unit: '묶음단위',
          standard_unit: '규격단위',
          setting: '설정',
          remark: '비고',
          recently: '최근',
          terms: '용어',
          conversion_unit: '변경단위',
          conversion_ratio: '변경율',
        }
      },
      mn1_002_0004: {
        text: '시스템사용사정보관리',
        child: {
          code: '코드',
          division: '구분',
          head_office_name: '본사명',
          president_name: '대표자',
          business_number: '사업자등록번호',
          post: '우편번호',
          address1: '주소',
          address2: '상세주소',
          sectors: '업종',
          business_type: '업태',
          manager_call_number: '담당자 전화번호',
          business_email: '업무 이메일',
          bill_email: '계산서 이메일',
          representation_call_number: '대표자 전화번호',
          system_start_date: '시스템 시작일'
        }
      },
      mn1_002_0005: {
        text: '사용자권한설정',
        child: {
          primary_info: '기본정보',
          use_permission: '사용권한',
          recently: '최근',
          entry_number: '사번',
          name: '이름',
          entry_date: '입사일',
          entry_position: '입사직급',
          id: '아이디',
          password: '비밀번호',
          people_number: '주민번호',
          salary_type: '급여종류',
          salary: '급여',
          salary_date: '급여일',
          post: '우편번호',
          address: '주소',
          detail_address: '상세 주소',
          remark: '비고',
          setting: '설정',
          use_menu: '사용메뉴',
          view_mode : '보기 모드',
          edit_mode : '편집 모드',
        }
      },
      mn1_002_0006: {
        text: '표준메뉴관리(본사)',
        child: {

        }
      },
      mn1_002_0007: {
        text: '업체별기본메뉴(본사)',
        child: {

        }
      },
      mn1_002_0008: {
        text: '메뉴명변경관리',
        child: {

        }
      },
      mn1_002_0009: {
        text: '언어별사용국가설정(본사)',
        child: {

        }
      },
      mn1_002_0010: {
        text: '언어별풍선도움말설정(본사)',
        child: {

        }
      },
      mn1_002_0011: {
        text: '언어별텍스트설정(본사)',
        child: {

        }
      },
      mn1_002_0012: {
        text: '테마관리',
        child: {

        }
      },
      mn1_002_0013: {
        text: '업체별사용승인(본사)',
        child: {

        }
      },
      mn1_002_0014: {
        text: '사용업체별입금내역관리(본사)',
        child: {

        }
      },
      mn1_002_0015: {
        text: '서비스등록 구분(본사)',
        child: {

        }
      },
      mn1_002_0016: {
        text: '통신설정 (N)',
        child: {

        }
      },
      mn1_002_0017: {
        text: '동의어설정(본사)',
        child: {

        }
      },
      mn1_002_0018: {
        text: '거래처등록',
        child: {
          primary_info: '기본정보',
          pay_info: '요금정보',
          etc_info: '기타정보',
          use_confirm: '사용승인',
          seles_connection: '판매연결',
          produce_connection: '제조연결',
          contract_item: '계약품목',
          selling_tool_item: '셀링툴아이콘',
          code: '코드',
          division: '구분',
          account_name: '거래처명',
          representation_name: '대표자',
          manager_call_number: '담당자전화',
          post: '우편번호',
          address: '주소',
          address1: '주소',
          address2: '상세주소',
          remark: '비고',
          recently: '최근',
          setting: '설정',
          auto_create: '자동생성',
          user_number: '유저수',
          device_number: '단말기수',
          sellingtool_number: '셀링툴수',
          monthly_fee: '월이용료',
          introduction_fee: '도입비',
          business_number: '사업자등록번호',
          business_type: '업태',
          sectors: '업종',
          bill_email: '계산서이메일',
          totalItemAmount: '총상품수',
          maximumOrderQuantity: '최대발주량'
        }
      },

      // 2depth - 상품관리설정
      mn1_004_0001: {
        text: '표준제품등록',
        child: {
          tag_script_hint: '편집하세요.',
          brand_edit: '브랜드편집',
          product_type_edit: '상품류편집',
          icon_edit: '아이콘편집',
          category_edit: '분류명편집',
          brand_list: '브랜드 리스트',
          product_list: '상품 리스트',
          icon_list: '아이콘 리스트',
          category_edit: '분류명편집',
          standard_edit: '규격품편집',
          standard_detail: '규격품상세',
          standard_subject_edit: '규격항편집',
          standard_product_detail: '제조품상세',
          fabric_name_edit: '원단명편집',
          system_edit: '시스템편집',
          actual_image_divide_edit: '실사구분편집',
          color_name_edit: '컬러명편집',
          select_fabric_property_edit: '선택원단속성편집',
          process_value_edit: '가공값편집',
          process_value_create: '가공값생성',
          dark: '암막',
          certification: '인증',
          embroidery: '자수',
          pattern: '패턴',
          appropriate_inventory: '적정재고',
          width_setting: '폭설정',
          option_name_edit: '옵션명편집',
          repair_name_edit: '수선명편집',
          system_setting: '시스템설정',
          item_name_edit: '항목명편집',
          option_value_setting: '옵션값설정',
          item_value_setting: '항목값설정',
          repair_value_setting : '수선값설정',
          actual_image_name_edit : '실사명편집',
          pattern_name_edit : '패턴명편집',
          embroidery_name_edit : '자수명편집',
          search_edit : '검색어편집',

          pre_dyeing: '선염',
          after_dyeing: '후염',
          natural: '천연',
          no: '안 됨',
          flame_retardant: '난염',
          no_require: '필무',
          semi_dark: '세미암막',

          selection: '선택',
          primary: '기본',
          option: '옵션',
          handle: '손잡이',
          exist: '있음',
          none: '없음',
          marking: '마킹',
          choice_number : '선택 수',
          choice_value : '선택 값',
          item:'항목',
          horizon_standard : '가로기준',
          horizon_absolute : '가로절대',
          horizon_none : '가로없음',
          vertical_standard : '세로기준',
          vertical_absolute : '세로절대',
          vertical_none : '세로없음',
          input_amount: '입력수량',
          input_amount_unit : '입력수량단위',
          input_value: '입력값',
          horizon_setting : '가로설정',
          vertical_setting : '세로설정',
          horizon_unit_setting : '가로단위설정',
          vertical_unit_setting : '세로단위설정',

          flame_retardation: '방염',
          dyeing: '염색',
          fabric_classification: '원단구분',
          pattern_length: '패턴길이',
          width_length: '폭길이',
          max_size: '최대사이즈',
          max_size_value: '최대사이즈값',
          max_size_unit: '최대사이즈단위',
          horizon_length: '가로길이',
          vertical_length: '세로길이',
          horizon_length_unit: '가로길이단위',
          vertical_length_unit: '세로길이단위',
          recently: '최근',
          division: '구분',
          item_name: '품명',
          code: '코드',
          detail: '상세',
          setting: '설정',
          text1: '줄 길이 기본값 세로 길이'
        }
      },
      mn1_004_0002: {
        text: '표준원단등록',
        child: {

        }
      },
      mn1_004_0003: {
        text: '컨텐츠등록',
        child: {
          product_list : '상품 리스트',
          thumbnail : '썸네일',
          detail_image : '상세이미지',
          technical_data : '테크니컬데이터',
          wash_management : '세탁 및 관리',
          light_transmission : '빛 투과율',
          text_data_edit : '텍스트 데이터 편집',
          content_data_edit : '컨텐츠 데이터 편집',
          text_data : '텍스트 데이터',
          recently : '최근',
          discription : '설명',
          standard : '표준',
          remark : '비고'
        }
      },
      mn1_004_0004: {
        text: '종합공급처별 원단관리',
        child: {

        }
      },
      mn1_004_0005: {
        text: '개별공급처별 원단관리',
        child: {

        }
      },
      mn1_004_0006: {
        text: '종합제조사 제품관리',
        child: {

        }
      },
      mn1_004_0007: {
        text: '개별제조사 제품관리',
        child: {

        }
      },
      mn1_004_0008: {
        text: '표준(시스템-원단) 설정(본사)',
        child: {

        }
      },
      mn1_004_0009: {
        text: '종합제조사(시스템-원단) 설정(본사)',
        child: {

        }
      },
      mn1_004_0010: {
        text: '개별제조사(시스템-원단) 설정',
        child: {

        }
      },

      // 2depth - 단가관리
      mn1_005_0001: {
        text: '제조원가 설정',
        child: {

        }
      },
      mn1_005_0002: {
        text: '상품원가 설정',
        child: {

        }
      },
      mn1_005_0003: {
        text: '단가종류 설정',
        child: {

        }
      },
      mn1_005_0004: {
        text: '업체별 단가종류 설정',
        child: {

        }
      },
      mn1_005_0005: {
        text: '단가및적용일 설정',
        child: {

        }
      },
      mn1_005_0006: {
        text: '네모와유통마진',
        child: {

        }
      },
      mn1_005_0007: {
        text: '거래처별카다록단가',
        child: {

        }
      },
      mn1_005_0008: {
        text: '카다록구매',
        child: {

        }
      },
      mn1_005_0009: {
        text: '셀링툴상품설정',
        child: {

        }
      },

      // 2depth - BOM등록
      mn1_006_0001: {
        text: '시스템별 부품 BOM',
        child: {

        }
      },
      mn1_006_0002: {
        text: '시스템별 원단 BOM',
        child: {

        }
      },

      // 2depth - 시공배송
      mn1_007_0001: {
        text: '실측관리',
        child: {

        }
      },
      mn1_007_0002: {
        text: '시공배송위탁및취소',
        child: {

        }
      },
      mn1_007_0003: {
        text: '시공배송수탁및처리',
        child: {

        }
      },

      // 2depth - 판매관리
      mn1_008_0001: {
        text: '셀링툴',
        child: {

        }
      },
      mn1_008_0002: {
        text: '판매현황관리',
        child: {

        }
      },
      mn1_008_0003: {
        text: '발주진행현황',
        child: {

        }
      },
      mn1_008_0004: {
        text: '포스시스템',
        child: {

        }
      },
      mn1_008_0005: {
        text: '고객관리',
        child: {

        }
      },
      mn1_008_0006: {
        text: '매입처별판매수익',
        child: {

        }
      },
      mn1_008_0007: {
        text: '거래원장',
        child: {

        }
      },

      // 2depth - 경리관리
      mn1_009_0001: {
        text: '기본설정',
        child: {

        }
      },
      mn1_009_0002: {
        text: '입금전표',
        child: {

        }
      },
      mn1_009_0003: {
        text: '출금전표',
        child: {

        }
      },
      mn1_009_0004: {
        text: '금전출납부',
        child: {

        }
      },
      mn1_009_0005: {
        text: '입출금현황',
        child: {

        }
      },
      mn1_009_0006: {
        text: '계산서발행',
        child: {

        }
      },
      mn1_009_0007: {
        text: '계산서현황',
        child: {

        }
      },
      mn1_009_0008: {
        text: '계정과목별입출금',
        child: {

        }
      },

      // 2depth - 주문관리
      mn1_010_0001: {
        text: '주문서입력(조립)',
        child: {

        }
      },
      mn1_010_0002: {
        text: '주문서입력(원단)',
        child: {

        }
      },
      mn1_010_0003: {
        text: '주문사이즈분포도',
        child: {

        }
      },

      // 2depth - 수발주관리
      mn1_011_0001: {
        text: '주문현황(접수)',
        child: {

        }
      },
      mn1_011_0002: {
        text: '생산및발주관리',
        child: {

        }
      },

      // 2depth - 입출고
      mn1_012_0001: {
        text: '창고관리',
        child: {

        }
      },
      mn1_012_0002: {
        text: '입고관리',
        child: {

        }
      },
      mn1_012_0003: {
        text: '입고리스트',
        child: {

        }
      },
      mn1_012_0004: {
        text: '출고(조립패킹)',
        child: {

        }
      },
      mn1_012_0005: {
        text: '출고(원단및재고랩핑)',
        child: {

        }
      },
      mn1_012_0006: {
        text: '출고리스트',
        child: {

        }
      },

      // 2depth - 조립생산
      mn1_013_0001: {
        text: '원단제단',
        child: {

        }
      },
      mn1_013_0002: {
        text: '시스템절단',
        child: {

        }
      },
      mn1_013_0003: {
        text: '실사작업',
        child: {

        }
      },
      mn1_013_0004: {
        text: '조립확인',
        child: {

        }
      },
    },

    // 메세지
    msg: {
      // 알림 메세지
      notice: {
        duplication: '중복된 데이터가 있습니다.',
        save: '저장되었습니다.',
        del: '삭제되었습니다.',
        edit: '수정되었습니다.',
        value_error: '올바르지 않은 값입니다.',
        no_data: '데이터가 없습니다.',
      },

      // 질문 메세지
      question: {
        delete: '정말 삭제하시겠습니까?',
      },

      guide: {
        tag_script_label: '항목을 편집하세요.',
      }
    },

    // 공통 페이지
    common: {
      header: {
        help: '풍선 도움말'
      },
      table: {
        perPage: {
          text: '페이지 당 데이터'
        }
      }
    },

    // 기능
    function: {
      regist: '등록',
      cancel: '취소',
      confirm: '확인',
      save: '저장',
      edit: '수정',
      reset: '초기화',
      file_upload: '파일 업로드',
      file_delete: '파일 삭제',
      del: '삭제'
    },

    // 풍선도움말
    help_msg: {
      t1: '풍선 도움말을 활성화 합니다.'
    },
    // 입력 오류시 텍스트
    rules: {
      require: '입력해주세요.'
    }
  },

  // 영어
  english: {
    menu: {
      // 1depth
      mn1_001: {
        text: 'basic menu',
      },
      mn2_00001: {
        text: 'Basic settings',
      },
      mn2_00002: {
        text: 'Product management settings',
      },
      mn2_00003: {
        text: 'Unit Price Management',
      },
      mn2_00004: {
        text: 'BOM registration',
      },
      mn2_00005: {
        text: 'Construction delivery',
      },
      mn2_00006: {
        text: 'Sales management',
      },
      mn2_00007: {
        text: 'Accounting management',
      },
      mn2_00008: {
        text: 'Order management',
      },
      mn2_00009: {
        text: 'obtain / place an order management',
      },
      mn2_00010: {
        text: 'stored and released',
      },
      mn2_00011: {
        text: 'Assembly production',
      },
      mn2_00012: {
        text: 'Real-time status',
      },


      // 2depth - 기본항목설정
      mn1_002_0001: {
        text: 'Confirm bank registration',
        child: {
          bank_info: 'bank Information',
          card_info: 'card information',
          bank_name: 'name of bank',
          card_name: 'card company',
          url: 'URL',
          publish_card: 'publish card',
          remark: 'remarks',
          recently: 'recently',
          setting: 'setting',
        }
      },
      mn1_002_0002: {
        text: 'Check Account Subjects',
        child: {
          class_name_edit: 'Edit category name',
          account_subject_edit: 'Edit Account Subjects',
          account_subject_explain: 'Account description',
          account_subject_list: 'List of accounts',
          tag_script_hint: 'Please edit'
        }
      },
      mn1_002_0003: {
        text: 'Unit conversion confirmation',
        child: {
          area_unit: 'Area unit',
          length_unit: 'Length unit',
          bundle_unit: 'Bundle unit',
          standard_unit: 'Standard unit',
          setting: 'setting',
          remark: 'remarks',
          recently: 'recently',
          terms: 'terms',
          conversion_unit: 'Change unit',
          conversion_ratio: 'Rate of change',
        }
      },
      mn1_002_0004: {
        text: '시스템사용사정보관리',
        child: {

        }
      },
      mn1_002_0005: {
        text: '사용자권한설정',
        child: {

        }
      },
      mn1_002_0006: {
        text: '표준메뉴관리(본사)',
        child: {

        }
      },
      mn1_002_0007: {
        text: '업체별기본메뉴(본사)',
        child: {

        }
      },
      mn1_002_0008: {
        text: '메뉴명변경관리',
        child: {

        }
      },
      mn1_002_0009: {
        text: '언어별사용국가설정(본사)',
        child: {

        }
      },
      mn1_002_0010: {
        text: '언어별풍선도움말설정(본사)',
        child: {

        }
      },
      mn1_002_0011: {
        text: '언어별텍스트설정(본사)',
        child: {

        }
      },
      mn1_002_0012: {
        text: '테마관리',
        child: {

        }
      },
      mn1_002_0013: {
        text: '업체별사용승인(본사)',
        child: {

        }
      },
      mn1_002_0014: {
        text: '사용업체별입금내역관리(본사)',
        child: {

        }
      },
      mn1_002_0015: {
        text: '서비스등록 구분(본사)',
        child: {

        }
      },
      mn1_002_0016: {
        text: '통신설정 (N)',
        child: {

        }
      },
      mn1_002_0017: {
        text: '동의어설정(본사)',
        child: {

        }
      },
      mn1_002_0018: {
        text: 'Account registration',
        child: {
          primary_info: 'Basic Information',
          pay_info: 'Price information',
          etc_info: 'Other information',
          use_confirm: 'Authorization to use',
          seles_connection: 'Sales connection',
          produce_connection: 'Manufacturing Connections',
          contract_item: 'Contract item',
          selling_tool_item: 'Selling tool icon',
          code: 'code',
          division: 'division',
          account_name: 'Account Name',
          representation_name: 'Representative',
          manager_call_number: 'Contact phone number',
          post: 'Zip code',
          address: 'address',
          address1: 'address1',
          address2: 'address2',
          remark: 'remarks',
          recently: 'recently',
          setting: 'setting',
          auto_create: 'Auto generation'
        }
      },

      // 2depth - 상품관리설정
      mn1_004_0001: {
        text: '표준제품등록',
        child: {

        }
      },
      mn1_004_0002: {
        text: '표준원단등록',
        child: {

        }
      },
      mn1_004_0003: {
        text: '컨텐츠등록',
        child: {

        }
      },
      mn1_004_0004: {
        text: '종합공급처별 원단관리',
        child: {

        }
      },
      mn1_004_0005: {
        text: '개별공급처별 원단관리',
        child: {

        }
      },
      mn1_004_0006: {
        text: '종합제조사 제품관리',
        child: {

        }
      },
      mn1_004_0007: {
        text: '개별제조사 제품관리',
        child: {

        }
      },
      mn1_004_0008: {
        text: '표준(시스템-원단) 설정(본사)',
        child: {

        }
      },
      mn1_004_0009: {
        text: '종합제조사(시스템-원단) 설정(본사)',
        child: {

        }
      },
      mn1_004_0010: {
        text: '개별제조사(시스템-원단) 설정',
        child: {

        }
      },

      // 2depth - 단가관리
      mn1_005_0001: {
        text: '제조원가 설정',
        child: {

        }
      },
      mn1_005_0002: {
        text: '상품원가 설정',
        child: {

        }
      },
      mn1_005_0003: {
        text: '단가종류 설정',
        child: {

        }
      },
      mn1_005_0004: {
        text: '업체별 단가종류 설정',
        child: {

        }
      },
      mn1_005_0005: {
        text: '단가및적용일 설정',
        child: {

        }
      },
      mn1_005_0006: {
        text: '네모와유통마진',
        child: {

        }
      },
      mn1_005_0007: {
        text: '거래처별카다록단가',
        child: {

        }
      },
      mn1_005_0008: {
        text: '카다록구매',
        child: {

        }
      },
      mn1_005_0009: {
        text: '셀링툴상품설정',
        child: {

        }
      },

      // 2depth - BOM등록
      mn1_006_0001: {
        text: '시스템별 부품 BOM',
        child: {

        }
      },
      mn1_006_0002: {
        text: '시스템별 원단 BOM',
        child: {

        }
      },

      // 2depth - 시공배송
      mn1_007_0001: {
        text: '실측관리',
        child: {

        }
      },
      mn1_007_0002: {
        text: '시공배송위탁및취소',
        child: {

        }
      },
      mn1_007_0003: {
        text: '시공배송수탁및처리',
        child: {

        }
      },

      // 2depth - 판매관리
      mn1_008_0001: {
        text: '셀링툴',
        child: {

        }
      },
      mn1_008_0002: {
        text: '판매현황관리',
        child: {

        }
      },
      mn1_008_0003: {
        text: '발주진행현황',
        child: {

        }
      },
      mn1_008_0004: {
        text: '포스시스템',
        child: {

        }
      },
      mn1_008_0005: {
        text: '고객관리',
        child: {

        }
      },
      mn1_008_0006: {
        text: '매입처별판매수익',
        child: {

        }
      },
      mn1_008_0007: {
        text: '거래원장',
        child: {

        }
      },

      // 2depth - 경리관리
      mn1_009_0001: {
        text: '기본설정',
        child: {

        }
      },
      mn1_009_0002: {
        text: '입금전표',
        child: {

        }
      },
      mn1_009_0003: {
        text: '출금전표',
        child: {

        }
      },
      mn1_009_0004: {
        text: '금전출납부',
        child: {

        }
      },
      mn1_009_0005: {
        text: '입출금현황',
        child: {

        }
      },
      mn1_009_0006: {
        text: '계산서발행',
        child: {

        }
      },
      mn1_009_0007: {
        text: '계산서현황',
        child: {

        }
      },
      mn1_009_0008: {
        text: '계정과목별입출금',
        child: {

        }
      },

      // 2depth - 주문관리
      mn1_010_0001: {
        text: '주문서입력(조립)',
        child: {

        }
      },
      mn1_010_0002: {
        text: '주문서입력(원단)',
        child: {

        }
      },
      mn1_010_0003: {
        text: '주문사이즈분포도',
        child: {

        }
      },

      // 2depth - 수발주관리
      mn1_011_0001: {
        text: '주문현황(접수)',
        child: {

        }
      },
      mn1_011_0002: {
        text: '생산및발주관리',
        child: {

        }
      },

      // 2depth - 입출고
      mn1_012_0001: {
        text: '창고관리',
        child: {

        }
      },
      mn1_012_0002: {
        text: '입고관리',
        child: {

        }
      },
      mn1_012_0003: {
        text: '입고리스트',
        child: {

        }
      },
      mn1_012_0004: {
        text: '출고(조립패킹)',
        child: {

        }
      },
      mn1_012_0005: {
        text: '출고(원단및재고랩핑)',
        child: {

        }
      },
      mn1_012_0006: {
        text: '출고리스트',
        child: {

        }
      },

      // 2depth - 조립생산
      mn1_013_0001: {
        text: '원단제단',
        child: {

        }
      },
      mn1_013_0002: {
        text: '시스템절단',
        child: {

        }
      },
      mn1_013_0003: {
        text: '실사작업',
        child: {

        }
      },
      mn1_013_0004: {
        text: 'Check assembly.',
        child: {

        }
      },
    },

    // 메세지
    msg: {
      // 알림 메세지
      notice: {
        duplication: 'There is duplicate data.',
        save: 'Saved.',
        del: 'Deleted.',
        edit: 'It is changed.',
        value_error: 'This is not a valid value.',
        no_data: 'No data.',
      },

      // 질문 메세지
      question: {
        delete: 'Are you sure you want to delete?',
      },

      guide: {
        tag_script_label: 'Please edit the item.',
      }
    },

    // 공통 페이지
    common: {
      header: {
        help: 'Balloon help'
      },
      table: {
        perPage: {
          text: 'Data per page'
        }
      }
    },

    // 기능
    function: {
      regist: 'regist',
      cancel: 'cancel',
      confirm: 'confirm',
      save: 'save',
      edit: 'edit',
      reset: 'reset'
    },

    // 풍선도움말
    help_msg: {
      t1: 'Enable balloon tips.'
    },
    // 입력 오류시 텍스트
    rules: {
      require: 'Please enter.'
    }
  },


  chinese: {

  },
  japanese: {

  },
}
Vue.use(VueI18n);
let i18n = new VueI18n({
  locale: 'korean', // set locale
  messages, // set locale messages
})
Vue.prototype.$lang = i18n;
export default i18n;