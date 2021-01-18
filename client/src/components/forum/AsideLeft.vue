<template>
  <aside>
    <img src="http://fakeimg.pl/300x242/" alt="" />
    <img src="http://fakeimg.pl/300x542/" alt="" />
  </aside>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../../../src/assets/scss/all.scss";
aside {
  display: flex;
  flex-shrink: 5;
  flex-direction: column;
  max-width: 300px;
  min-width: 100px;
  height: 700px;

  @include pad {
    display: none !important;
  }
  img {
    width: 100%;
    margin-bottom: 16px;
  }
}
</style>
