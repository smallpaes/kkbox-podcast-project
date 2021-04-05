<template>
  <section class="home-layout">
    <transition
      name="fade" 
      mode="out-in"
    >
      <router-view />
    </transition>
  </section>
</template>

<script>

export default {
  name: 'HomeLayout'
}
</script>
