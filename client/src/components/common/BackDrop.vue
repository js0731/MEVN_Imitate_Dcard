<template>
  <div>
    <div class="background"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>>

<style lang="scss" scoped>
.background {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  filter: alpha(opacity=40);
  background: while;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  background-color: #666666;
}
</style>