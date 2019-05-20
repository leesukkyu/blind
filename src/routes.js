import LoginPage from './components/LoginPage'
import MainPage from './components/MainPage'
import store from './vuex/store'

// 로그인 여부를 체크한다.
const requireAuth = function (from, to, next) {
  if (store.getters.getLoginInfo.loginInfo.id) {
    return next();
  } else {
    return next('/');
  }
}

export default [
  {
    path: '/',
    name: 'login-page',
    component: LoginPage
  },
  {
    path: '/mainPage',
    name: 'main-page',
    component: MainPage,
    beforeEnter: requireAuth
  },
  {
    path: '*',
    redirect: '/'
  }
]




