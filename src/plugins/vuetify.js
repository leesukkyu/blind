import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  dataTable: {
    rowsPerPageText: 'page'
  },
  iconfont: 'md',
  theme: {
    // 테마 컬러 역할 정의
    primary : '#009192',
    secondary: '#00BCD4',
    tertiary: '#10a7bc',
    accent: '#82B1FF',
    error: '#ef5350',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    white: '#FFFFFF',
    background: '#fafafa',

    // 새로운 컬러 정의
    teal: '#009688',
    yellow: '#ffce39',
    gray: '#6a6b6c',
    green: '#009192',
  }
})
