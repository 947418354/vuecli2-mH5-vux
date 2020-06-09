<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/**
全局样式
 */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
.page {
  padding-top: 60px;
  height: 100%;
  box-sizing: border-box;
}
.p-title {
  width: 100%;
  height: 60px;
  position: fixed;
  background: #062;
  top: 0;
  left: 0;
}

.inline-block {
  display: inline-block;
}
.img-box > img {
  width: 100%;
  height: 100%;
}
</style>
