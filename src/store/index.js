import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // userInfo: '' || localStorage.userInfo,
    userRegisterInfo: '' || localStorage.userRegisterInfo,
    shopping: '' || localStorage.shopping,

    //  shopping
    // flag: false,
    loginlist: false
  },
  getters: {

  },
  mutations: {
    getUserInfo(state) {
      // state.userInfo = user.name
      localStorage.setItem('userInfo', state.userInfo)
      // state.userRegisterInfo = user.name
      localStorage.setItem('userRegisterInfo', state.userRegisterInfo)
      localStorage.setItem('shopping', state.shopping)



    },
    // // 删除
    // removeFormCar(state, id) {
    //   state.cat_data((item) => {
    //     item.id = id



    //   })
    //   localStorage.setItem('cat_data', JSON.stringify(state.cat_data))
    // },

    setLogin(state) {
      state.loginlist = true;
    },
    // HIDDEN_MENU(state) {
    //   state.flag = true
    // }

  },
  actions: {},
  modules: {
    plugins: [createPersistedState({
      storage: window.sessionStorage
    })]
  }
})