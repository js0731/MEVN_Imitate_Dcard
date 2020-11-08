<template>
  <div class="container">
    <div class="main">
      <AsideBoard />
      <router-view />
      <AsideAdvertise />
    </div>
  </div>
</template>

<script>
import AsideBoard from "../components/forum/AsideBoard";
import AsideAdvertise from "../components/forum/AsideAdvertise";
export default {
  components: {
    AsideBoard,
    AsideAdvertise,
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
}
.main {
  width: 1280px;
  display: flex;
  margin: 0 auto;
  margin-top: 48px;
  padding-top: 20px;
  position: relative;
}
</style>
