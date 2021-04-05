import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    isDisplayed: false,
    currentEpisodeInfo: {
      title: null,
      length: null,
      type: null,
      url: null,
      guid: null
    },
    playList: [],
    isPlaying: false
  },
  actions,
  mutations
}