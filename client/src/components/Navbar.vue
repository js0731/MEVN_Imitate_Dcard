<template>
  <header class="navbar">
    <div class="container">
      <div class="block-left">
        <h1 class="title">
          <router-link class="logoLink" to="/dcard/forum">
            <Icon name="logo" />
          </router-link>
        </h1>
        <div class="searchBar">
          <input type="search" placeholder />
          <button>龍</button>
        </div>
      </div>
      <ul class="block-right">
        <li class="menuItem">
          <router-link class="navLink" to="/dcard/addarticle">
            <Icon name="pen" />
          </router-link>
        </li>
        <li class="menuItem">
          <router-link class="navLink" to="/dcard/edit">
            <Icon name="bell" />
          </router-link>
        </li>
        <li class="menuItem">
          <router-link class="navLink" to="/dcard/user">
            <Icon name="email" />
          </router-link>
        </li>
        <li class="menuItem">
          <router-link class="navLink" to="/dcard/profile">
            <Icon name="user" />
          </router-link>
        </li>
        <li class="menuItem">
          <a class="navLink" @click="open = !open">
            <Icon name="dropdown" />
          </a>
          <ul class="legal" v-show="open">
            <div class="diamond"></div>
            <li>
              <a href="">服務條款</a>
            </li>
            <li>
              <a href="">常見問題</a>
            </li>
            <li>
              <a href="">回報問題</a>
            </li>
            <li>
              <a href="">品牌識別</a>
            </li>
            <li>
              <a href="">徵才</a>
            </li>
            <li>
              <a href="">商業合作</a>
            </li>
            <li>
              <a href="">免費下載App</a>
            </li>
            <li>
              <a href="">登出</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import Icon from "./Icon";
export default {
  name: "Navbar",
  components: {
    Icon,
  },
  data() {
    return {
      open: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 48px;
  background: #006aa6;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 100;
}
.container {
  display: flex;
  width: 1280px;
  margin: 0 auto;
  padding: 0px 20px;
}
.block-left {
  display: flex;
  flex-grow: 1;
  align-items: center;
  .title {
    .logoLink {
      display: block;
      width: 74px;
      height: 28px;
    }
  }
  .searchBar {
    max-width: 666px;
    height: 30px;
    display: flex;
    flex-grow: 1;
    padding: 0 32px;
    input[type="search"] {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 4px;
      background: #00588a;
      font-size: 14px;
      padding-left: 10px;
      color: white;
    }
    button {
      width: 40px;
      height: 100%;
      border-radius: 0px 4px 4px 0;
      border: 1px solid #00588a;
      background: #006aa6;
      color: white;
    }
  }
}
.block-right {
  display: flex;
  justify-content: flex-end;
  .menuItem {
    &:last-child {
      position: relative;
      .navLink {
        padding: 10px 2px;
      }
      .legal {
        position: absolute;
        background: #fff;
        width: 160px;
        filter: drop-shadow(rgba(0, 0, 0, 0.1) 0px 3px 12px);
        left: calc((160px / -2) + 14px);
        right: 0;
        border-radius: 10px;
        padding: 6px 0;
        .diamond {
          background: #fff;
          position: absolute;
          left: 0;
          right: 0;
          margin: 0 auto;
          top: -10px;
          width: 20px;
          height: 20px;
          transform: rotate(45deg);
        }
        li {
          height: 40px;
          a {
            display: block;
            color: rgba(0, 0, 0, 0.75);
            font-size: 14px;
            line-height: 40px;
            padding-left: 12px;
            &:hover {
              background-color: rgb(242, 243, 244);
              color: rgb(51, 151, 207);
            }
          }
        }
      }
    }
    .navLink {
      display: block;
      text-align: center;
      padding: 10px 18px;
      color: black;
      &:focus {
        background: #00588a;
      }
    }
  }
}
</style>
