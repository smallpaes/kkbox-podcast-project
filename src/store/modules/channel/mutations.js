export default {
  setChannelInfo(state, data) {
    state.channelInfo = data
  },
  setChannelEpisodes(state, data) {
    state.episodes = data
  },
  resetChannel(state) {
    state.channelInfo = null
    state.episodes = []
  }
}