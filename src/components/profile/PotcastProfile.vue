<template>
  <div class="profile">
    <img 
      :alt="profileData.imageAlt" 
      :src="profileData.image" 
      :style="imageStyle"
      class="profile__image"
    >
    <div class="profile__content">
      <h1 class="profile__title">
        {{ profileData.title }}
      </h1>
      <slot name="actions" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PotcastProfile',
  props: {
    profileData: {
      type: Object,
      default: () => ({
        image: null,
        title: null
      })
    },
    customProfileStyle: {
      type: Object,
      default: () => ({
        width: '210px',
        height: '210px'
      })
    }
  },
  computed: {
    imageStyle () {
      return {
        ...this.customProfileStyle
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  display: grid;
  grid-template-columns: min-content auto;
  grid-gap: 20px;

  &__image {
    object-fit: cover;
    box-shadow: $theme-box-shadow-normal;
  }

  &__content {
    padding: 5px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  &__title {
    color: $theme-text-color-dark;
  }
}
</style>