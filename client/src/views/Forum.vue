<template>
  <div class="container">
    <AsideRight />
    <router-view />
    <AsideLeft />
  </div>
</template>

<script>
import AsideRight from "../components/forum/AsideRight";
import AsideLeft from "../components/forum/AsideLeft";
export default {
  components: {
    AsideRight,
    AsideLeft,
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  flex-grow: 1;
  margin-top: 68px;
}
</style>
