<template>
  <div class="container home">
    <general-loader v-if="isLoading" />
    <template v-else>
      <potcast-profile 
        :profile-data="{
          image: channelInfo.image.url,
          imageAlt: channelInfo.image.title || 'Channel Profile Picture',
          title: channelInfo.title
        }"
      />
      <episode-list :list="displayedEpisodes" />
      <observer 
        :options="configObserverOptions()" 
        @intersect="getNewEpisodes"
      />
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import PotcastProfile from '@/components/profile/PotcastProfile'
import EpisodeList from './components/EpisodeList'
import Observer from '@/components/observer/Observer'

const RSS_FEED_URL = 'https://yuanfuluo.github.io/RSS-Sample.github.io/sounds.rss'

export default {
  name: 'Home',
  components: {
    PotcastProfile,
    EpisodeList,
    Observer
  },
  data () {
    return {
      isLoading: false,
      lazyLoadInfo: {
        rootMargin: '150px',
        columnPerScroll: 5
      },
      episodeListOffset: 0,
      displayedEpisodes: []
    }
  },
  computed: {
    ...mapState('channel', ['channelInfo', 'episodes']),
  },
  created () {
    this.configChannel()
  },
  methods: {
    ...mapActions('channel', ['configChannelInfo']),
    async configChannel () {
      this.isLoading = true
      await this.configChannelInfo(RSS_FEED_URL)
      this.getNewEpisodes()
      this.isLoading = false
    },
    configObserverOptions () {
      return {
        rootClassName: null,
        rootMargin: this.lazyLoadInfo.rootMargin,
        threshold: 0,
      }
    },
    getNewEpisodes () {
      if (this.episodes.length <= this.episodeListOffset) return
      this.displayedEpisodes.push(...this.episodes.slice(this.episodeListOffset, this.episodeListOffset + this.lazyLoadInfo.columnPerScroll))
      this.episodeListOffset += this.lazyLoadInfo.columnPerScroll
    }
  }
}
</script>