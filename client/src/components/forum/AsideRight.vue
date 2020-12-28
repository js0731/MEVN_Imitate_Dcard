<template>
  <aside class="aside-right">
    <ul class="menu">
      <li class="item">
        <router-link class="link" to="/dcard/forum/all">
          <Icon name="allBoard" />所有看板
        </router-link>
      </li>
      <li class="item">
        <router-link class="link" to="/dcard">
          <Icon name="hotBoard" />即時熱門看板
        </router-link>
      </li>
    </ul>
    <div class="scrollBlock">
      <ul class="menu">
        <span class="text">追蹤的看板</span>
        <li class="item">
          <router-link class="link" to="/dcard/forum/frontend">
            <img src="../.././assets/img/frontend.jpg" alt="" />
            前端工程師
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard/forum/dressup">
            <img src="../.././assets/img/dressup.jpg" alt="" />
            穿搭
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard/forum/funny">
            <img src="../.././assets/img/funny.jpg" alt="" />
            有趣版
          </router-link>
        </li>
        <span class="text">Dcard 精選看板</span>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../.././assets/img/frontend.jpg" alt="" />
            前端工程師
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard/forum/dressup">
            <img src="../.././assets/img/dressup.jpg" alt="" />
            穿搭
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../.././assets/img/funny.jpg" alt="" />
            有趣版
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../.././assets/img/frontend.jpg" alt="" />
            前端工程師
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard/forum/dressup">
            <img src="../.././assets/img/dressup.jpg" alt="" />
            穿搭
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../.././assets/img/funny.jpg" alt="" />
            有趣版
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../.././assets/img/frontend.jpg" alt="" />
            前端工程師
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard/forum/dressup">
            <img src="../.././assets/img/dressup.jpg" alt="" />
            穿搭
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../.././assets/img/funny.jpg" alt="" />
            有趣版
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../.././assets/img/frontend.jpg" alt="" />
            前端工程師
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard/forum/dressup">
            <img src="../.././assets/img/dressup.jpg" alt="" />
            穿搭
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../.././assets/img/funny.jpg" alt="" />
            有趣版
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../.././assets/img/frontend.jpg" alt="" />
            前端工程師
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard/forum/dressup">
            <img src="../.././assets/img/dressup.jpg" alt="" />
            穿搭
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../.././assets/img/funny.jpg" alt="" />
            有趣版
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../.././assets/img/frontend.jpg" alt="" />
            前端工程師
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard/forum/dressup">
            <img src="../.././assets/img/dressup.jpg" alt="" />
            穿搭
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../.././assets/img/funny.jpg" alt="" />
            有趣版
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../.././assets/img/frontend.jpg" alt="" />
            前端工程師
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard/forum/dressup">
            <img src="../.././assets/img/dressup.jpg" alt="" />
            穿搭
          </router-link>
        </li>
        <li class="item">
          <router-link class="link" to="/dcard">
            <img src="../.././assets/img/funny.jpg" alt="" />
            有趣版
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import Icon from "../../components/Icon";
export default {
  name: "AsideRight",
  components: {
    Icon,
  },
};
</script>

<style lang="scss" scoped>
.aside-right {
  height: calc(100vh - 108px);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: 208px;
  background: #00324e;
  position: sticky;
  top: 68px;
  z-index: 100;
}
.menu {
  .text {
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
