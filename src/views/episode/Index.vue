<template>
  <section class="container episode">
    <potcast-profile 
      :profile-data="{
        image: episodeData.itunes.image,
        imageAlt: 'Episode Profile Picture',
        title: episodeData.title
      }"
    >
      <template #actions>
        <button
          type="button"
          role="button"
          class="profile__play-button btn--primary btn--large"
          @click="playEpisode"
        >
          Play
        </button>
      </template>
    </potcast-profile>
    <div class="description">
      <h1 class="description__title">
        Episode Description
      </h1>
      <p class="description__content">
        {{ episodeData.content }}
      </p>
    </div>
  </section>
</template>

<script>
import PotcastProfile from '@/components/profile/PotcastProfile'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Episode',
  components: {
    PotcastProfile
  },
  data () {
    return {
      
    }
  },
  computed: {
    ...mapState('channel', ['episodes']),
    ...mapState('player', ['isDisplayed']),
    episodeData () {
      return this.episodes.find(episode => episode.guid === this.$route.params.guid)
    }
  },
  created () {
    
  },
  methods: {
    ...mapMutations('player', ['toggleIsDisplayed', 'setCurrentSongInfo', 'setPlayList', 'toggleIsPlaying']),
    async playEpisode () {
      this.toggleIsPlaying(false)

      // 確保狀態以正確變更
      await this.$nextTick()

      // 更新當前資訊
      this.setCurrentSongInfo({ 
        title: this.episodeData.title,
        guid: this.episodeData.guid,
        ...this.episodeData.enclosure
      })

      // 更新播放清單
      const currentSongIndex = this.episodes.findIndex(episode => episode.guid === this.episodeData.guid)
      const remainingPlayList = this.episodes.slice(0, currentSongIndex)
      this.setPlayList(remainingPlayList)

      // 如果 player 尚未打開，則需要先開啟
      if (!this.isDisplayed) this.toggleIsDisplayed(true)
      this.toggleIsPlaying(true)
    }
  }
}
</script>

<style lang="scss" scoped>
.description {
  margin-top: 25px;
  
  &__content {
    margin-top: 14px;
    white-space: pre-wrap;
  }
}
</style>
