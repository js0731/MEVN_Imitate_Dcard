<template>
  <div class="container" v-if="show">{{ text }}</div>
</template>

<script>
export default {
  name: "Toast",
};
</script>>

<style lang="scss" scoped>
.container {
  /* position: absolute; */
  position: fixed;

  height: 48px;
  line-height: 48px;
  background: #58c476;
  top: 68px;
  right: 50px;
  text-align: center;
  color: #fff;
  text-align: left;
  padding: 0 10px;

  border-radius: 10px;
}
</style>