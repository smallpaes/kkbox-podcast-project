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
      <episode-list :list="episodes" />
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import PotcastProfile from '@/components/profile/PotcastProfile'
import EpisodeList from './components/EpisodeList'

const RSS_FEED_URL = 'https://yuanfuluo.github.io/RSS-Sample.github.io/sounds.rss'

export default {
  name: 'Home',
  components: {
    PotcastProfile,
    EpisodeList,
  },
  data () {
    return {
      isLoading: false    
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
      this.isLoading = false
    }
  }
}
</script>