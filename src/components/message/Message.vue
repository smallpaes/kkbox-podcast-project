<template>
  <div class="message">
    <font-awesome-icon
      :style="iconStyle"
      class="not-found__icon"
      icon="broadcast-tower"
    />
    <h1
      :style="textStyle"
      class="message__description"
    >
      {{ customMessage }}
    </h1>
  </div>
</template>

<script>
export default {
  name: 'Message',
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
    customMessage: {
      type: String,
      default: 'Something went wrong'
    }
  },
  computed: {
    iconStyle () {
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
.message {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 50px;
  height: 100%;

  &__description {
    margin-left: 10px;
  }
}
</style>