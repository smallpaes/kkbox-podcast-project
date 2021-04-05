<template>
  <section 
    v-if="isDisplayed"
    :class="{ 'player--disabled': isLoading }"
    class="player"
  >
    <div class="player__progress-bar-container">
      <input 
        id="progress"
        type="range"
        name="progress"
        min="0"
        max="100"
        step="0.1"
        :style="{ '--val': progress }"
        class="player__progress-bar-input"
        :value="progress"
        :disabled="isLoading"
        @input="preSetProgress"
        @mousedown="isDragging = true"
        @mouseup="setPlayerTime"
      >
      <label
        class="player__progress-bar-label"
        for="progress"
        :style="{ 'left': progress + '%' }"
      >
        {{ currentTime }}
      </label>
    </div>
    <div class="player__panel">
      <a 
        class="player__play-button"
        @click.prevent="isLoading ? null : toggleIsPlaying(!isPlaying)"
      >
        <font-awesome-icon
          :icon="isPlaying ? 'pause' : 'play'"
        />
      </a>
      <h6 class="player__title">
        {{ currentEpisodeInfo.title }}
      </h6>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Player',
  data () {
    return {
      player: new Audio(),
      cachedCurrentPlayingSong: null,
      progress: 0,
      currentTime: '00:00:00',
      preSetTimeInSecond: null,
      isDragging: false,
      isLoading: false
    }
  },
  computed: {
    ...mapState('player', ['isDisplayed', 'currentEpisodeInfo', 'isPlaying', 'playList'])
  },
  watch: {
    isPlaying: {
      handler (isPlaying) {
        isPlaying ? this.updateCachedCurrentPlayingSong() : this.pauseSong()
      },
      immediate: true
    }
  },
  created () {
    this.configListener()
  },
  destroyed () {
    this.player.removeEventListener('ended', this.playNextSong)
    this.player.removeEventListener('timeupdate', this.updateProgress)
    this.player.removeEventListener('canplay', this.handleCanPlay)
  },
  methods: {
    ...mapMutations('player', ['toggleIsDisplayed', 'setCurrentSongInfo', 'setPlayList', 'toggleIsPlaying']),
    configListener () {
      this.player.addEventListener('ended', this.playNextSong)
      this.player.addEventListener('timeupdate', this.updateProgress)
      
      // 用來確保音樂已經能播放，避免使用者在播放前執行其他操作導致 Chrome 下的錯誤
      this.player.addEventListener('canplay', this.handleCanPlay)
    },
    playSong () {
      this.isLoading = true
      this.progress = 0
      this.currentTime = '00:00:00'
      this.player.src = this.currentEpisodeInfo.url
    },
    continuePlaySong () {
      this.player.play()
    },
    pauseSong () {
      this.player.pause()
    },
    async playNextSong () {
      this.toggleIsPlaying(false)
      if (this.playList.length === 0) return

      // 確保狀態以正確變更
      await this.$nextTick()
      
      // pop 出最後一筆播放
      const latestPlayList = [...this.playList]
      const newCurrentSong = latestPlayList.pop()
      this.setCurrentSongInfo({ 
        title: newCurrentSong.title,
        ...newCurrentSong.enclosure
      })
      this.setPlayList(latestPlayList)
      this.toggleIsPlaying(true)
    },
    updateCachedCurrentPlayingSong () {
      // 用來比對 audio 來源是否已經變更
      if (!this.cachedCurrentPlayingSong || this.cachedCurrentPlayingSong.guid !== this.currentEpisodeInfo.guid) {
        this.cachedCurrentPlayingSong = JSON.parse(JSON.stringify(this.currentEpisodeInfo))
        this.playSong()
        return
      }

      // 如果來源為更新，則繼續播放當前 audio
      this.continuePlaySong()
    },
    updateProgress (event, customTimeInSecond) {
      // 拖曳中則不更新來自 audio 的最新播放時間資訊
      if (this.isDragging && !customTimeInSecond) return

      let currentTimeInSecond = customTimeInSecond || this.player.currentTime
      
      const hour = Math.floor(currentTimeInSecond / 3600).toString().padStart(2, '0')
      const minute = Math.floor((currentTimeInSecond % 3600) / 60).toString().padStart(2, '0')
      const second = Math.floor(currentTimeInSecond % 60).toString().padStart(2, '0')

      this.currentTime = `${hour}:${minute}:${second}` || '--:--:--'
      this.progress = (Math.ceil((currentTimeInSecond / this.player.duration) * 1000) / 1000) * 100 || 0
    },
    preSetProgress ({ target: { value: percentage } }) {
      let preSetTimeInSecond = (percentage / 100) * this.player.duration
      this.preSetTimeInSecond = preSetTimeInSecond
      this.updateProgress(null, preSetTimeInSecond)
    },
    setPlayerTime () {
      this.player.currentTime = this.preSetTimeInSecond
      this.isDragging = false
    },
    handleCanPlay () {
      // 如果當前是暫停播放狀態，則不播放
      if (!this.isPlaying) return
      this.player.play()
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.player {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: $theme-color-secondary;
  padding: 0 40px;
  box-shadow: $theme-box-shadow-normal;

  &--disabled {
    opacity: .6;
  }

  &__panel {
    display: flex;
    align-items: center;
  }

  &__title {
    line-height: 50px;
    user-select: none;
  }

  &__play-button {
    width: 17px;
    height: 17px;
    position: relative;
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer;
  }

  &__progress-bar-container {
    position: absolute;
    bottom: 100%;
    left: 0;
    right: 0;
    height: 3px;
    background-color: lighten($theme-color-secondary, 10%);
  }

  &__progress-bar {
    background-color: $theme-color-primary;
    height: 100%;
  }

  &__progress-bar-label {
    position: absolute;
    bottom: 400%;
    transform: translateX(-35%);
    font-size: $theme-font-size-x-small;
    color: $theme-text-color-grey;
  }

  &__progress-bar-input {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  
}
</style>