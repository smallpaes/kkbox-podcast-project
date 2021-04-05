<template>
  <div class="loader">
    <font-awesome-icon
      class="loader__icon"
      icon="spinner"
      :style="spinnerStyle"
    />
    <p 
      class="loader__description"
      :style="textStyle"
    >
      {{ customText }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'GeneralLoader',
  props: {
    iconSize: {
      type: Number,
      default: 20
    },
    textSize: {
      type: Number,
      default: 20
    },
    customIconStyle: {
      type: Object,
      default: () => {}
    },
    customTextStyle: {
      type: Object,
      default: () => {}
    },
    customText: {
      type: String,
      default: 'Loading'
    }
  },
  computed: {
    spinnerStyle () {
      return {
        'font-size': this.iconSize + 'px',
        ...this.customIconStyle
      }
    },
    textStyle () {
      return {
        'font-size': this.textSize + 'px',
        ...this.customTextStyle
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 50px;
  height: 100%;

  &__icon {
    animation: fa-spin 1s steps(8) infinite;
  }

  &__description {
    margin-left: 10px;
  }
}
</style>