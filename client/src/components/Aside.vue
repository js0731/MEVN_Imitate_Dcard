<template>
  <aside class="right-sideBar">
    <ul class="menu">
      <li class="item">
        <router-link class="link" to="/dcard">
          <AsideIcon name="allBoard" />所有看板
        </router-link>
      </li>
      <li class="item">
        <router-link class="link" to="/dcard">
          <AsideIcon name="hotBoard" />即時熱門看板
        </router-link>
      </li>
      <li class="item">
        <router-link class="link" to="/dcard">
          <AsideIcon name="store" />好物研究室
        </router-link>
      </li>
      <li class="item">
        <router-link class="link" to="/dcard">
          <AsideIcon name="gameBoard" />遊戲專區
        </router-link>
      </li>
    </ul>
    <div class="scrollBlock">
      <ul class="menu">
        <p class="title">追蹤的看板</p>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../assets/img/frontend.jpg" alt="" />
            前端工程師
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard/dressup">
            <img src="../assets/img/dress.jpg" alt="" />
            穿搭
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../assets/img/funny.jpg" alt="" />
            有趣版
          </router-link>
        </li>
        <p class="title">Dcard 精選看板</p>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../assets/img/frontend.jpg" alt="" />
            前端工程師
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard/dressup">
            <img src="../assets/img/dress.jpg" alt="" />
            穿搭
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../assets/img/funny.jpg" alt="" />
            有趣版
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../assets/img/frontend.jpg" alt="" />
            前端工程師
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard/dressup">
            <img src="../assets/img/dress.jpg" alt="" />
            穿搭
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../assets/img/funny.jpg" alt="" />
            有趣版
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../assets/img/frontend.jpg" alt="" />
            前端工程師
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard/dressup">
            <img src="../assets/img/dress.jpg" alt="" />
            穿搭
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../assets/img/funny.jpg" alt="" />
            有趣版
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../assets/img/frontend.jpg" alt="" />
            前端工程師
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard/dressup">
            <img src="../assets/img/dress.jpg" alt="" />
            穿搭
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../assets/img/funny.jpg" alt="" />
            有趣版
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../assets/img/frontend.jpg" alt="" />
            前端工程師
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard/dressup">
            <img src="../assets/img/dress.jpg" alt="" />
            穿搭
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../assets/img/funny.jpg" alt="" />
            有趣版
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../assets/img/frontend.jpg" alt="" />
            前端工程師
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard/dressup">
            <img src="../assets/img/dress.jpg" alt="" />
            穿搭
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../assets/img/funny.jpg" alt="" />
            有趣版
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../assets/img/frontend.jpg" alt="" />
            前端工程師
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard/dressup">
            <img src="../assets/img/dress.jpg" alt="" />
            穿搭
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../assets/img/funny.jpg" alt="" />
            有趣版
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import AsideIcon from "../components/AsideIcon";
export default {
  name: "sidebar",
  components: {
    AsideIcon,
  },
};
</script>

<style lang="scss" scoped>
.right-sideBar {
  width: 208px;
  height: calc(100vh - 108px);
  display: flex;
  flex-direction: column;
  background: #00324e;
  position: sticky;
  top: 68px;
  z-index: 1000;
}
.menu {
  .title {
    height: 44px;
    color: rgba(255, 255, 255, 0.35);
    font-size: 14px;
    line-height: 44px;
    padding-left: 20px;
  }
  .item {
    .link {
      display: flex;
      align-items: center;
      padding-left: 20px;
      height: 44px;
      color: #fff;
      font-size: 16px;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 8px;
      }
      &:hover {
        background-color: rgba(0, 0, 0, 0.2);
      }
      &:active {
        background-color: rgba(255, 255, 255, 0.3);
      }
      svg {
        margin-right: 10px;
      }
    }
  }
}
.scrollBlock {
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;
  transition: all 0.3s;
  color: transparent;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 0 3px;
    border-radius: 10px;
  }
  &:hover {
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>
