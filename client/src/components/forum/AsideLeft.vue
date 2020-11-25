<template>
  <aside>
    <img src="http://fakeimg.pl/300x242/" alt="" />
    <img src="http://fakeimg.pl/300x542/" alt="" />
    <!-- <img src="http://fakeimg.pl/300x342/" alt="" />
    <img src="http://fakeimg.pl/300x462/" alt="" /> -->
  </aside>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  img {
    width: 100%;
    margin-bottom: 16px;
  }
}
</style>
