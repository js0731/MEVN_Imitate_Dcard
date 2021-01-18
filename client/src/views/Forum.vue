<template>
  <div class="forum-root">
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
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "../../src/assets/scss/all.scss";
.forum-root {
  display: flex;
  justify-content: center;
  margin-top: 68px;
  @include pad {
    margin-bottom: 50px;
  }
}
</style>
