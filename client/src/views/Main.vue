<template>
  <div class="container">
    <div class="main">
      <Aside />
      <router-view />
      <Advertise />
    </div>
  </div>
</template>

<script>
import Aside from "../components/Aside";
import Advertise from "../components/Advertise";
export default {
  components: {
    Aside,
    Advertise,
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  background: #00324e;
}
.main {
  width: 1280px;
  display: flex;
  margin: 0 auto;
  margin-top: 48px;
}
</style>
