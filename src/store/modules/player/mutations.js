export default {
  toggleIsDisplayed(state, data) {
    state.isDisplayed = data
  },
  setCurrentSongInfo(state, data) {
    state.currentEpisodeInfo = data
  },
  setPlayList(state, data) {
    state.playList = data
  },
  toggleIsPlaying(state, data) {
    state.isPlaying = data
  }
}