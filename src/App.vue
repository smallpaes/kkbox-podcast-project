<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

body, html {
  margin: 0;
}

.app {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>