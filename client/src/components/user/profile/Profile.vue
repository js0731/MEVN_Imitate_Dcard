<template>
  <div class="container">
    <div class="info"></div>
    <div class="collection">
      使用者id{{ getUserData.id }} 使用者名稱{{
        getUserData.name
      }}
      使用者創建日期{{ getUserData.date }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  height: 200px;
  .collection {
    width: 720px;
    height: 100px;
    background: red;
  }
  .info {
    width: 208px;
    height: 100px;
    background: yellow;
  }
}
</style>
<script>
export default {
  computed: {
    getUserData() {
      return this.$store.getters.user;
    },
  },
};
</script>>