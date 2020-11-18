<template>
  <div>
    <img src="http://fakeimg.pl/728x242/" alt="" />
    <div class="topBar">
      <div class="follow">
        <img
          :src="
            require(`../../../assets/img/${this.$route.params.boardPath}.jpg`)
          "
          alt
        />
        <h2 class="title">xxxxx</h2>
        <button>追蹤</button>
      </div>
      <ul class="sort">
        <li>熱門</li>
        <li>最新</li>
        <li>板規</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Icon from "../../Icon";
export default {
  watch: {
    $route: function () {
      // console.log(this.$route.name);
    },
  },
  created() {
    // console.log(this.$route.name);
  },
};
</script>


<style lang="scss" scoped>
.topBar {
  width: 100%;
  padding: 20px 60px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 48px;
  background: #fff;
  .follow {
    height: 60px;
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .title {
      font-size: 30px;
      flex-grow: 1;
      margin-left: 10px;
    }
    button {
      width: 56px;
      height: 36px;
      background: #3397cf;
      border: none;
      border-radius: 10px;
      font-size: 14px;
      color: #ffffff;
      &:focus {
        outline: none;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
  .sort {
    display: flex;
    li {
      height: 60px;
      line-height: 60px;
      padding: 0 16px;
      color: rgba(0, 0, 0, 0.35);
      &:hover {
        cursor: pointer;
        color: black;
        height: 61px;
        border-bottom: 2px solid rgb(51, 151, 207);
      }
    }
  }
}
</style>
