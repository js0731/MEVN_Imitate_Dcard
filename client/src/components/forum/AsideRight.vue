<template>
  <aside class="asideRight-root">
    <ul class="root-menuFixed menu">
      <li class="menuFixed-item item">
        <router-link class="item-link link" to="/dcard/forum/all">
          <Icon name="allBoard" />
          <p class="link-text boardName">所有文章</p>
        </router-link>
      </li>
    </ul>
    <div class="root-scrollBlock">
      <ul class="scrollBlock-menu menu">
        <li class="menu-item item hidden">
          <router-link class="item-link link" to="/dcard/forum/all">
            <Icon name="allBoard" />
            <p class="link-text boardName">所有文章</p>
          </router-link>
        </li>

        <span class="menu-text text" v-if="getTrackingBoard.length">
          我的最愛
        </span>
        <li
          class="menu-item item"
          v-for="(boardName, index) in getTrackingBoard"
          :key="index"
        >
          <a class="item-link link" src="#" @click="toBoard(boardName)">
            <img
              v-if="boardName === '前端工程師'"
              src="https://js0731.github.io/MEVN_Imitate_Dcard/img/frontend.jpg"
              alt=""
            />
            <img
              v-if="boardName === '穿搭板'"
              src="https://js0731.github.io/MEVN_Imitate_Dcard/img/dressup.jpg"
              alt=""
            />
            <img
              v-if="boardName === '有趣板'"
              src="https://js0731.github.io/MEVN_Imitate_Dcard/img/funny.jpg"
              alt=""
            />
            <p class="link-text boardName">{{ boardName }}</p>

            <button
              class="link-btn tracking"
              @click.prevent="cancelTrackingBoard(boardName)"
            >
              <Icon name="trackingStar" />
            </button>
          </a>
        </li>

        <span class="menu-text text">Dcard 精選看板</span>
        <li class="menu-item item">
          <router-link class="item-link link" to="/dcard/forum/frontend">
            <!-- <img src="../.././assets/img/frontend.jpg" alt="" /> -->
            <img
              src="https://js0731.github.io/MEVN_Imitate_Dcard/img/frontend.jpg"
              alt=""
            />
            <p class="link-text boardName">前端工程師</p>

            <button
              class="link-btn tracking"
              @click.prevent="trackingBoard('前端工程師')"
            >
              <Icon name="star" />
            </button>
          </router-link>
        </li>
        <li class="menu-item item">
          <router-link class="item-link link" to="/dcard/forum/dressup">
            <!-- <img src="../.././assets/img/dressup.jpg" alt="" /> -->
            <img
              src="https://js0731.github.io/MEVN_Imitate_Dcard/img/dressup.jpg"
              alt=""
            />
            <p class="link-text boardName">穿搭板</p>

            <button
              class="link-btn tracking"
              @click.prevent="trackingBoard('穿搭板')"
            >
              <Icon name="star" />
            </button>
          </router-link>
        </li>
        <li class="menu-item item">
          <router-link class="item-link link" to="/dcard/forum/funny">
            <!-- <img src="../.././assets/img/funny.jpg" alt="" /> -->
            <img
              src="https://js0731.github.io/MEVN_Imitate_Dcard/img/funny.jpg"
              alt=""
            />
            <p class="link-text boardName">有趣版</p>

            <button
              class="link-btn tracking"
              @click.prevent="trackingBoard('有趣板')"
            >
              <Icon name="star" />
            </button>
          </router-link>
        </li>
        <li class="menu-item item">
          <router-link class="item-link link" to="#">
            <img src="http://fakeimg.pl/30x30/" alt="" />
            <p class="link-text boardName">尚未增加</p>
          </router-link>
        </li>
        <li class="menu-item item">
          <router-link class="item-link link" to="#">
            <img src="http://fakeimg.pl/30x30/" alt="" />
            <p class="link-text boardName">尚未增加</p>
          </router-link>
        </li>
        <li class="menu-item item">
          <router-link class="item-link link" to="#">
            <img src="http://fakeimg.pl/30x30/" alt="" />
            <p class="link-text boardName">尚未增加</p>
          </router-link>
        </li>
        <li class="menu-item item">
          <router-link class="item-link link" to="#">
            <img src="http://fakeimg.pl/30x30/" alt="" />
            <p class="link-text boardName">尚未增加</p>
          </router-link>
        </li>
        <li class="menu-item item">
          <router-link class="item-link link" to="#">
            <img src="http://fakeimg.pl/30x30/" alt="" />
            <p class="link-text boardName">尚未增加</p>
          </router-link>
        </li>
        <li class="menu-item item">
          <router-link class="item-link link" to="#">
            <img src="http://fakeimg.pl/30x30/" alt="" />
            <p class="link-text boardName">尚未增加</p>
          </router-link>
        </li>
        <li class="menu-item item">
          <router-link class="item-link link" to="#">
            <img src="http://fakeimg.pl/30x30/" alt="" />
            <p class="link-text boardName">尚未增加</p>
          </router-link>
        </li>
        <li class="menu-item item">
          <router-link class="item-link link" to="#">
            <img src="http://fakeimg.pl/30x30/" alt="" />
            <p class="link-text boardName">尚未增加</p>
          </router-link>
        </li>
        <li class="menu-item item">
          <router-link class="item-link link" to="#">
            <img src="http://fakeimg.pl/30x30/" alt="" />
            <p class="link-text boardName">尚未增加</p>
          </router-link>
        </li>
        <li class="menu-item item">
          <router-link class="item-link link" to="#">
            <img src="http://fakeimg.pl/30x30/" alt="" />
            <p class="link-text boardName">尚未增加</p>
          </router-link>
        </li>
        <li class="menu-item item">
          <router-link class="item-link link" to="#">
            <img src="http://fakeimg.pl/30x30/" alt="" />
            <p class="link-text boardName">尚未增加</p>
          </router-link>
        </li>
        <li class="menu-item item">
          <router-link class="item-link link" to="#">
            <img src="http://fakeimg.pl/30x30/" alt="" />
            <p class="link-text boardName">尚未增加</p>
          </router-link>
        </li>
        <li class="menu-item item">
          <router-link class="item-link link" to="#">
            <img src="http://fakeimg.pl/30x30/" alt="" />
            <p class="link-text boardName">尚未增加</p>
          </router-link>
        </li>
        <li class="menu-item item">
          <router-link class="item-link link" to="#">
            <img src="http://fakeimg.pl/30x30/" alt="" />
            <p class="link-text boardName">尚未增加</p>
          </router-link>
        </li>
        <li class="menu-item item">
          <router-link class="item-link link" to="#">
            <img src="http://fakeimg.pl/30x30/" alt="" />
            <p class="link-text boardName">尚未增加</p>
          </router-link>
        </li>
        <li class="menu-item item">
          <router-link class="item-link link" to="#">
            <img src="http://fakeimg.pl/30x30/" alt="" />
            <p class="link-text boardName">尚未增加</p>
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
  data() {
    return {
      isProcessApi: true,
    };
  },
  methods: {
    toBoard(boardName) {
      if (boardName === "前端工程師") {
        if (this.$route.params.boardPath === "frontend") return;
        this.$router.push("/dcard/forum/frontend");
      } else if (boardName === "穿搭板") {
        if (this.$route.params.boardPath === "dressup") return;
        this.$router.push("/dcard/forum/dressup");
      } else if (boardName === "有趣板") {
        if (this.$route.params.boardPath === "funny") return;
        this.$router.push("/dcard/forum/funny");
      }
      console.log(boardName);
    },
    cancelTrackingBoard(boardName) {
      if (this.isProcessApi === false) return;
      this.isProcessApi = false;
      let data = {
        boardName: boardName,
        userId: this.$store.state.userData.id,
      };

      this.$axios
        .post(`${process.env.VUE_APP_API}/user/cancel/tracking/board`, data)
        .then((res) => {
          this.$store.state.trackingBoard = res.data;
          this.isProcessApi = true;
        })
        .catch((err) => console.log(err));
    },
    trackingBoard(boardName) {
      if (this.isProcessApi === false) return;
      this.isProcessApi = false;
      let data = {
        boardName: boardName,
        userId: this.$store.state.userData.id,
      };
      if (!this.$store.getters.trackingBoard.includes(boardName)) {
        this.$axios
          .post(`${process.env.VUE_APP_API}/user/tracking/board`, data)
          .then((res) => {
            this.$store.state.trackingBoard = res.data;
            this.isProcessApi = true;
          })
          .catch((err) => console.log(err));
      }
    },
  },
  computed: {
    getTrackingBoard() {
      return this.$store.getters.trackingBoard;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../src/assets/scss/all.scss";
.asideRight-root {
  height: calc(100vh - 108px);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  max-width: 208px;
  flex-grow: 1;
  background: #00324e;
  position: sticky;
  top: 68px;
  z-index: 100;

  @media (max-width: 768px) {
    max-width: 768px;
    left: 0;
    right: 0;
    top: calc(100vh - 60px);
    position: fixed;
    height: 60px;
    flex-direction: row;
    overflow-x: auto;
    margin: 0 12px;
  }
}
.menuFixed-item {
  display: block;

  @media (max-width: 768px) {
    display: none;
  }
}
.menu {
  /* padding: 10px; */
  @media (max-width: 768px) {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .text {
    height: 44px;
    color: rgba(255, 255, 255, 0.35);
    font-size: 14px;
    line-height: 44px;
    padding: 0 10px;
    /* padding-left: 20px; */
    @media (max-width: 768px) {
      padding: 0 10px;
      white-space: nowrap;
    }
  }
  .item {
    .link {
      display: flex;
      align-items: center;
      padding: 0 10px;
      .boardName {
        display: flex;
        flex-grow: 1;
        align-items: center;
        height: 44px;
        color: #fff;
        font-size: 16px;
        margin: 0 10px;
        @media (max-width: 768px) {
          white-space: nowrap;
        }
      }
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      &:hover {
        background-color: rgba(0, 0, 0, 0.2);
      }
      &:active {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
  }
}
.root-scrollBlock {
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
  font-size: 16px;
  @media (max-width: 768px) {
    overflow-x: auto;
    overflow-y: hidden;
    &::-webkit-scrollbar {
      height: 6px;
    }
  }
}
.hidden {
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
}
</style>
