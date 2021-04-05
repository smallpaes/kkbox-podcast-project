import RSSParser from 'rss-parser'

export default {
  async configChannelInfo({ commit }, url) {
    const parser = new RSSParser()
    const { items: episodes, ...basicInfo } = await parser.parseURL(url)
    commit('setChannelInfo', basicInfo)
    commit('setChannelEpisodes', episodes)
  }
}