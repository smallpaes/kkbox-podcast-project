<template>
  <section class="home-layout">
    <transition
      name="fade" 
      mode="out-in"
    >
      <router-view />
    </transition>
    <player v-if="isDisplayed" />
  </section>
</template>

<script>
import Player from '../player/Player'
import { mapState } from 'vuex'

export default {
  name: 'HomeLayout',
  components: {
    Player
  },
  computed: {
    ...mapState('player', ['isDisplayed'])
  },
}
</script>
