<template>
  <div v-if="show">
    <div class="loading"></div>
  </div>
</template>

<script>
export default {
  name: "Toast",
};
</script>>

<style lang="scss" scoped>
div {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 200;
  .loading {
    position: absolute;
    width: 80px;
    height: 80px;
    top: calc(50% - 40px);
    left: calc(50% - 40px);
    background: red;
  }
}
</style>