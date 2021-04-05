import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    channelInfo: null,
    episodes: []
  },
  actions,
  mutations
}