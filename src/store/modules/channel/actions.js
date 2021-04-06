import RSSParser from 'rss-parser'

export default {
  configChannelInfo ({ commit }, url) {
    return fetch(url)
      .then(res => {
        if (res.ok) return res.text()
        throw new Error('Request Failed')
      })
      .then(XMLData => {
        const parser = new RSSParser()
        return parser.parseString(XMLData)
      })
      .then(({ items: episodes, ...basicInfo }) => {
        commit('setChannelInfo', basicInfo)
        commit('setChannelEpisodes', episodes)
      })
  }
}