<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./views/Navbar";
import jwt_decode from "jwt-decode";

export default {
  name: "App",
  components: { Navbar },
  created() {
    if (localStorage.myToken) {
      const decoded = jwt_decode(localStorage.myToken);
      // 將 token 儲存到 vuex 中
      this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
      // 把使用者基本訊息存放到localstorge
      this.$store.dispatch("storeUserData", decoded);
    }
  },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
  },
};
</script>
<style lang="scss" scoped>
</style>