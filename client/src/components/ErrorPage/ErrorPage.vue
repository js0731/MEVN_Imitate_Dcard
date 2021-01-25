<template>
  <div>
    <Navbar />
    <p>無此頁面</p>
  </div>
</template>

<script>
import Navbar from "../../views/Navbar.vue";
export default {
  name: "ErrorPage",
  components: { Navbar },
  methods: {},
  created() {},
};
</script>

<style lang="scss" scoped>
@import "../../../src/assets/scss/all.scss";
p {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  font-size: 32px;
  color: #fff;
}
</style>
