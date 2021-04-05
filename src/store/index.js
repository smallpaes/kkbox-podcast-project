import Vue from 'vue'
import Vuex from 'vuex'

import channel from './modules/channel'
import player from './modules/player'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    channel,
    player
  },
})
