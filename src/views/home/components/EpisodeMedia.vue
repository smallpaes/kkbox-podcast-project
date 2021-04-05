<template>
  <li 
    class="media"
    @click="$router.push({name: 'Episode', params: { guid: episode.guid }})"
  >
    <img 
      :src="episode.itunes.image" 
      alt="Episode Profile Image" 
      class="media__image"
    >
    <div class="media__content">
      <h5 class="media__title">
        {{ episode.title }}
      </h5>
      <p class="media__date">
        {{ episode.pubDate | formatDateTime() }}
      </p>
    </div>
  </li>
</template>

<script>
import { formatDateTime } from '@/utils/mixins'

export default {
  name: 'EpisodeMedia',
  mixins: [formatDateTime],
  props: {
    episode: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.media {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: min-content auto;
  padding: 20px;
  border-radius: $theme-border-radius-large;
  box-shadow: $theme-box-shadow-normal;
  transition: transform .5s, box-shadow .5s;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: $theme-box-shadow-large;
  }

  &:not(:last-of-type) {
    margin-bottom: 30px;
  }

  &__content {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__image {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }

  &__date {
    color: $theme-text-color-grey;
    font-size: $theme-font-size-x-small;
  }
}
</style>