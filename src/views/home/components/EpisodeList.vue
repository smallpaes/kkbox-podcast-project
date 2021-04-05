<template>
  <ul class="media-list">
    <episode-media 
      v-for="episode in list"
      :key="episode.guid"
      :episode="episode" 
    />
  </ul>
</template>

<script>
import EpisodeMedia from './EpisodeMedia'

export default {
  name: 'EpisodeList',
  components: {
    EpisodeMedia
  },
  props: {
    list: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style lang="scss" scoped>
.media-list {
  margin-top: 25px;
}
</style>