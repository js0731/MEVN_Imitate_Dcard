<template>
  <div
    class="container"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="10"
  >
    <img class="banner" src="http://fakeimg.pl/728x242/" v-if="isBoard" />
    <div class="topBar">
      <div class="follow" v-if="isBoard">
        <img
          :src="
            require(`../../../assets/img/${this.$route.params.boardPath}.jpg`)
          "
          alt
        />
        <h2 class="title" v-if="articleData">
          {{ boardName }}
        </h2>
        <button
          class="btnNoTracking"
          v-if="getTrackingBoard.includes(boardName)"
          @click="trackingBoard"
        >
          <Icon class="svgBell" name="bell" />
          追蹤中
        </button>
        <button class="btnTracking" v-else @click="trackingBoard">追蹤</button>
        <!-- {{ getTrackingBoard }}getTrackingBoard -->
      </div>
      <ul class="sort">
        <li
          :class="{ active: sortArticleList === 'hot' }"
          @click="sortArticleList = 'hot'"
        >
          熱門
        </li>
        <li
          :class="{ active: sortArticleList === 'latest' }"
          @click="sortArticleList = 'latest'"
        >
          最新
        </li>
        <li>板規</li>
      </ul>
    </div>
    <article v-for="art in articleData" :key="art._id">
      <router-link
        :to="`/dcard/forum/${art.boardPath}/article/${art._id}`"
        class="articleLink"
      >
        <div class="block-top">
          <Icon name="male" v-if="art.sex === 'male'" />
          <Icon name="female" v-else />
          <p>{{ art.selectedBoard }} ． {{ art.username }}</p>
        </div>
        <div class="block-bottom">
          <div class="block-left">
            <div class="content">
              <h2>{{ art.title }}</h2>
              <p>{{ art.content }}</p>
            </div>
            <div class="status">
              <button class="collect" @click.prevent="collectArticle(art._id)">
                <Icon v-if="findCollect(art._id)" name="favorited" />
                <Icon v-else name="favorite" />
                <span>收藏</span>
              </button>
              <button class="collect" @click.prevent="loveArticle(art._id)">
                <Icon v-if="findLove(art._id)" name="loved" />
                <Icon v-else name="love" />
                <span>{{ art.love }}</span>
              </button>
            </div>
          </div>
          <div class="block-right">
            <div class="pic">
              <img :src="art.img" alt />
            </div>
          </div>
        </div>
      </router-link>
    </article>
  </div>
</template>

<script>
import LoginFormVue from "../../dcard/LoginForm.vue";
import Icon from "../../Icon";
import BoardBar from "./BoardBar";
import dateFormat from "dateformat";
export default {
  components: {
    Icon,
    BoardBar,
  },
  data() {
    return {
      articleData: [],
      boardName: "",
      isBoard: true,
      busy: false,
      isProcessApi: true,
      sortArticleList: "hot",
    };
  },
  // directives: {
  //   scroll: {
  //     bind: function (el, binding) {
  //       let top =
  //         document.documentElement.scrollTop ||
  //         document.body.scrollTop ||
  //         window.pageYOffset;
  //       window.addEventListener("scroll", () => {
  //         console.log(
  //           top,
  //           window.innerHeight,
  //           el.clientHeight,
  //           top + window.innerHeight >= el.clientHeight
  //         );
  //         if (top + window.innerHeight >= el.clientHeight) {
  //           // console.log(top + window.innerHeight >= el.clientHeight);
  //           let fnc = binding.value;
  //           fnc();
  //         }
  //       });
  //     },
  //   },
  // },
  methods: {
    trackingBoard() {},
    findCollect(articleId) {
      return (
        this.$store.getters.collectArticle
          .map((x) => x.collectArticleId)
          .indexOf(articleId) >= 0
      );
    },
    findLove(articleId) {
      return (
        this.$store.getters.loveArticle
          .map((x) => x.loveArticleId)
          .indexOf(articleId) >= 0
      );
    },
    trackingBoard() {
      let data = {
        boardName: this.boardName,
        userId: this.$store.state.userData.id,
      };
      if (this.$store.getters.trackingBoard.includes(this.boardName)) {
        this.$axios
          .post("/api/user/cancel/tracking/board", data)
          .then((res) => {
            console.log(this.$store.state.trackingBoard);
            this.$store.state.trackingBoard = res.data;
            console.log(this.$store.state.trackingBoard);
          })
          .catch((err) => console.log(err));
      } else {
        this.$axios
          .post("/api/user/tracking/board", data)
          .then((res) => {
            console.log(this.$store.state.trackingBoard);
            this.$store.state.trackingBoard = res.data;
            console.log(this.$store.state.trackingBoard);
          })
          .catch((err) => console.log(err));
      }
    },
    loadMore: async function () {
      this.busy = true;
      let data;
      // if()
      await setTimeout(async () => {
        await this.$axios
          .get(
            `/api/board/${this.$route.params.boardPath}/${this.articleData.length}`
          )
          .then((res) => {
            data = res.data.articleData;
            this.articleData.push(...data);
          })
          .catch((err) => console.log(err));
        this.busy = false;
      }, 500);
    },

    collectArticle(articleId) {
      let collectData = this.$store.getters.collectArticle;
      if (collectData.map((x) => x.collectArticleId).indexOf(articleId) >= 0) {
        this.$store.dispatch("cancelCollect", articleId);
      } else this.$store.dispatch("collectArticle", articleId);
    },
    async loveArticle(articleId) {
      let loveData = this.$store.getters.loveArticle;
      if (this.isProcessApi === false) return;
      this.isProcessApi = false;
      if (loveData.map((x) => x.loveArticleId).indexOf(articleId) >= 0) {
        await this.$store.dispatch("cancelLove", articleId);

        this.articleData.map((x) => {
          console.log(x._id, articleId);
          if (x._id === articleId) {
            x.love -= 1;
          }
        });

        this.isProcessApi = true;
      } else {
        await this.$store.dispatch("loveArticle", articleId);
        this.articleData.map((x) => {
          console.log(x._id, articleId);
          if (x._id === articleId) {
            x.love += 1;
          }
        });
        this.isProcessApi = true;
      }
    },
  },

  watch: {
    $route: async function () {
      this.articleData = [];
      this.busy = true;
      let data;
      console.log(this.articleData.length);
      await this.$axios
        .get(
          `/api/board/${this.$route.params.boardPath}/${this.articleData.length}`
        )
        .then((res) => {
          data = res.data.articleData;
          this.boardName = data[0].selectedBoard;
          this.articleData.push(...data);
          this.isBoard = this.$route.path === "/dcard/forum/all" ? false : true;
        })
        .catch((err) => console.log(err));
      this.busy = false;
    },
  },
  created() {
    // let data;
    // this.$axios
    //   .get(`/api/board/${this.$route.params.boardPath}/0`)
    //   .then((res) => {
    //     data = res.data.articleData;
    //     this.boardName = data[0].selectedBoard;
    //     this.isBoard = this.$route.path === "/dcard/forum/all" ? false : true;
    //     this.articleData.push(...data);
    //   })
    //   .catch((err) => console.log(err));
  },
  computed: {
    getUserCollectArticle() {
      return this.$store.getters.collectArticle;
    },
    getTrackingBoard() {
      return this.$store.getters.trackingBoard;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 728px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: #fff;
  margin: 0 12px;
  min-height: 0;
  min-width: 0;
}

.board {
  position: sticky;
  top: 48px;
}
article {
  display: flex;
  width: 100%;
  padding: 0 40px;
}
.articleLink {
  width: 100%;
  padding: 20px;
  height: 155px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgb(233, 233, 233);
}
.block-top {
  display: flex;
  align-items: center;
  svg {
    width: 16px;
    height: 16px;
  }
  p {
    margin-left: 8px;
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
  }
}

.block-bottom {
  display: flex;
  justify-content: space-between;
  height: 100%;
  .block-left {
    max-width: 504px;
    display: flex;
    flex-direction: column;
    min-height: 0;
    min-width: 0;
    .content {
      min-height: 0;
      min-width: 0;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      justify-content: center;
      line-height: 1.5rem;
      h2 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 18px;
      }
      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
      }
    }
    .status {
      display: flex;

      button {
        display: flex;
        align-items: center;
        margin-right: 16px;
        background: none;
        padding: 0;
        &:hover {
          background: red;
        }
        span {
          color: rgba(0, 0, 0, 0.35);
          font-size: 14px;
        }
      }
    }
  }
  .block-right {
    align-self: flex-start;
    .pic {
      margin-left: 20px;
      img {
        width: 84px;
        height: 84px;
      }
    }
  }
}

.topBar {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 60px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  background: #fff;
  position: sticky;
  top: 48px;
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
      height: 36px;
      border: none;
      border-radius: 10px;
      font-size: 14px;
      padding: 0 14px;
      &:focus {
        outline: none;
      }
      &:hover {
        cursor: pointer;
      }
    }
    .btnTracking {
      color: #ffffff;
      background: #3397cf;
    }
    .btnNoTracking {
      color: rgba(0, 0, 0, 0.75);
      position: relative;
      background: rgba(0, 16, 32, 0.06);
      .svgBell {
        position: absolute;
        left: -30px;
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
      }
    }
  }
}
.active {
  color: black;
  border-bottom: 2px solid rgb(51, 151, 207);
}
</style>
