import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import { v4 as uuidv4 } from 'uuid'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    iframeObjs: [],
  },

  mutations: {
    getCountdowns(state) {
      const countdownsCookie = Cookies.get('countdownsCookie')
      if (countdownsCookie) {
        state.iframeObjs = JSON.parse(countdownsCookie)
      }
    },
    postCountdown(state, iframeObj) {
      iframeObj.id = uuidv4()
      state.iframeObjs.push(iframeObj)
      Cookies.set('countdownsCookie', state.iframeObjs)
    },
    putCountdown(state, iframeObj) {
      const i = state.iframeObjs.findIndex(obj => {
        obj.id === iframeObj.id
      })
      state.iframeObjs[i] = iframeObj
      Cookies.set('countdownsCookie', state.iframeObjs)
    },
    deleteCountdown(state, id) {
      const i = state.iframeObjs.findIndex(obj => {
        obj.id === id
      })
      state.iframeObjs.splice(i, 1)
      Cookies.set('countdownsCookie', state.iframeObjs)
    },
  },

  actions: {
  },

  getters: {
  },

  modules: {
  }
})
