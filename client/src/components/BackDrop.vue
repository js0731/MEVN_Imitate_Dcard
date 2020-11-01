<template>
  <div>
    <div class="background" @click="a()"></div>
    <ul class="selectboard" v-show="open">
      <p>選擇發文看板</p>

      <div class="search">
        <!-- <Icon class="dropDownIcon" name="search" /> -->
        <input type="text" placeholder="尋找看板" />
      </div>
      <li @click="setValue('前端工程師')">前端工程師</li>
      <li @click="setValue('有趣板')">有趣板</li>
      <li @click="setValue('穿搭板')">穿搭板</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["open"],
  data() {
    return {
      board: "",
    };
  },
  methods: {
    a() {
      console.log("a");
      this.$emit("setopen");
    },
    setValue(index) {
      this.board = index;
      this.$emit("board", this.board);
      this.$emit("setopen");
    },
  },
};
</script>>

<style lang="scss" scoped>
.aaa {
  position: fixed;
  z-index: 100;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.background {
  display: block;
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
.selectboard {
  position: absolute;
  z-index: 300;
  left: 0;
  right: 0;
  top: 185px;
  margin: 0 auto;
  max-width: 520px;
  padding: 40px 60px;
  border-radius: 8px;
  box-shadow: 0 0 1px black;
  display: block !important;
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
    &:hover {
      background: rgb(242, 243, 244);
      cursor: pointer;
    }
  }
  .search {
    border: 1px solid rgba(0, 0, 0, 0.15);
    max-width: 400px;
    height: 44px;
    display: flex;
    border-radius: 10px;
    margin-bottom: 12px;

    svg {
      height: 100%;
      margin: 0 10px;
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