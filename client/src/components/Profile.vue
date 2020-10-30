<template>
  <div>
    使用者id{{ getUserData.id }} 使用者名稱{{
      getUserData.name
    }}
    使用者創建日期{{ getUserData.date }}
  </div>
</template>

<script>
export default {
  computed: {
    getUserData() {
      return this.$store.getters.user;
    },
  },
};
</script>>