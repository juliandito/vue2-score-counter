<template>
  <div id="app">
    <BadmintonCounter />
  </div>
</template>

<script>
import BadmintonCounter from './views/BadmintonCounter.vue'

export default {
  name: 'App',
  components: {
    BadmintonCounter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  touch-action: manipulation;
}
</style>
