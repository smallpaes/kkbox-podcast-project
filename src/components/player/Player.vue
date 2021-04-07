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
        @input="seek"
        @mousedown="isDragging = true"
        @mouseup="handleSeekFinished"
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
    // 統一監聽全域播放狀態來控制播放器
    isPlaying: {
      handler (isPlaying) {
        isPlaying ? this.checkForSongUpdate() : this.pauseSong()
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
    this.player.removeEventListener('canplay', this.playSong)
  },
  methods: {
    ...mapMutations('player', ['toggleIsDisplayed', 'setCurrentSongInfo', 'setPlayList', 'toggleIsPlaying']),
    configListener () {
      this.player.addEventListener('ended', this.playNextSong)
      this.player.addEventListener('timeupdate', this.updateProgress)
      
      // 用來確保音樂已經能播放，避免使用者在播放前執行其他操作導致 Chrome 下的錯誤
      this.player.addEventListener('canplay', this.playSong)
    },
    resetPlayer () {
      this.progress = 0
      this.currentTime = '00:00:00'
    },
    configPlayerForNewSong () {
      this.isLoading = true
      this.resetPlayer()
      this.player.src = this.currentEpisodeInfo.url
    },
    playSong () {
      // 如果當前是暫停播放狀態，則不播放
      if (!this.isPlaying) return
      this.player.play()
      this.isLoading = false
    },
    continuePlaySong () {
      this.player.play()
    },
    pauseSong () {
      this.player.pause()
    },
    async playNextSong () {
      this.toggleIsPlaying(false)

      // 清單中已無最新集數則停止播放
      if (this.playList.length === 0) return

      // 確保狀態以正確變更
      await this.$nextTick()
      
      // 更新播放清單及當前播放資訊
      const latestPlayList = [...this.playList]
      const newCurrentSong = latestPlayList.pop()
      this.setCurrentSongInfo({ 
        title: newCurrentSong.title,
        ...newCurrentSong.enclosure
      })
      this.setPlayList(latestPlayList)
      this.toggleIsPlaying(true)
    },
    checkForSongUpdate () {
      // 用來比對 audio 來源是否已經變更：如果是新的音訊或是音訊有變更，則更新播放資訊
      if (
        !this.cachedCurrentPlayingSong 
        || this.cachedCurrentPlayingSong.guid !== this.currentEpisodeInfo.guid
      ) {
        this.cachedCurrentPlayingSong = JSON.parse(JSON.stringify(this.currentEpisodeInfo))
        this.configPlayerForNewSong()
        return
      }

      // 如果來源相同，則繼續播放當前 audio
      this.continuePlaySong()
    },
    updateProgress (event, customTimeInSecond) {
      // Seeking 中來自 timeupdate 事件的觸發，不更新到頁面上，以 Seeking 資訊為主
      if (this.isDragging && !customTimeInSecond) return

      const currentTimeInSecond = customTimeInSecond || this.player.currentTime
      
      const hour = Math.floor(currentTimeInSecond / 3600).toString().padStart(2, '0')
      const minute = Math.floor((currentTimeInSecond % 3600) / 60).toString().padStart(2, '0')
      const second = Math.floor(currentTimeInSecond % 60).toString().padStart(2, '0')
      this.currentTime = `${hour}:${minute}:${second}`
      this.progress = (Math.ceil((currentTimeInSecond / this.player.duration) * 1000) / 1000) * 100 || 0
    },
    seek ({ target: { value: percentage } }) {
      const preSetTimeInSecond = (percentage / 100) * this.player.duration
      this.preSetTimeInSecond = preSetTimeInSecond
      this.updateProgress(null, preSetTimeInSecond)
    },
    handleSeekFinished () {
      this.player.currentTime = this.preSetTimeInSecond
      this.isDragging = false
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