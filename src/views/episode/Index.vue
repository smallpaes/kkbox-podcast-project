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
import { mapState } from 'vuex'

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
    episodeData () {
      return this.episodes.find(episode => episode.guid === this.$route.params.guid)
    }
  },
  created () {
    
  },
  methods: {
    async playEpisode () {
      
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
