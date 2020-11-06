<template>
  <div v-show="openWindow">
    <BackDrop v-on:click.native="closeWindow()" />
    <ul class="window">
      <p>選擇發文看板</p>
      <div class="searchBox">
        <Icon class="dropDownIcon" name="search" />
        <input type="text" placeholder="尋找看板" />
      </div>
      <li @click="setBoard('前端工程師')">前端工程師</li>
      <li @click="setBoard('有趣板')">有趣板</li>
      <li @click="setBoard('穿搭板')">穿搭板</li>
    </ul>
  </div>
</template>

<script>
import BackDrop from "./BackDrop";
import Icon from "./Icon";
export default {
  props: {
    openWindow: Boolean,
  },
  data() {
    return {
      board: "",
    };
  },
  methods: {
    closeWindow() {
      this.$emit("closeWindow", false);
    },
    setBoard(board) {
      this.borad = board;
      this.$emit("setBoard", board);
      this.$emit("closeWindow", false);
    },
  },
  components: {
    BackDrop,
    Icon,
  },
};
</script>>

<style lang="scss" scoped>
.window {
  position: absolute;
  z-index: 500;
  left: 0;
  right: 0;
  top: 185px;
  margin: 0 auto;
  max-width: 520px;
  padding: 40px 60px;
  border-radius: 8px;
  box-shadow: 0 0 1px black;

  background: #fff;
  p {
    font-size: 24px;
    line-height: 33px;
    font-weight: bold;
    margin-bottom: 16px;
  }
  li {
    max-width: 100%;
    height: 44px;
    line-height: 44px;
    padding: 0 14px;
    &:hover {
      background: rgb(242, 243, 244);
      cursor: pointer;
    }
  }
  .searchBox {
    border: 1px solid rgba(0, 0, 0, 0.15);
    max-width: 400px;
    height: 44px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    margin-bottom: 12px;

    .dropDownIcon {
      margin: 0 10px;
      height: 100%;
    }
    input {
      width: 100%;
      border: none;
      border-radius: 0px 10px 10px 0px;
      padding-right: 10px;
      font-weight: 400;
      font-size: 16px;
      &::placeholder {
        color: rgba(0, 0, 0, 0.35);
      }
    }
  }
}
</style>