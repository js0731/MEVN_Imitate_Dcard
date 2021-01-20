<template>
  <div
    class="boardArticle-root"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="10"
  >
    <img class="boardArticle-banner" src="http://fakeimg.pl/728x242/" />
    <div class="boardArticle-header">
      <div class="header-topBar">
        <!-- <img
          :src="
            require(`https://js0731.github.io/MEVN_Imitate_Dcard/client/dist/img/${this.$route.params.boardPath}.jpg`)
          "
          alt
        /> -->
        <img
          :src="
            require(`../../../assets/img/${this.$route.params.boardPath}.jpg`)
          "
          alt
        />
        <h2 class="topBar-boardName" v-if="articleData">
          {{ boardName }}
        </h2>
        <button
          class="topBar-followBoard"
          v-if="getTrackingBoard.includes(boardName)"
          @click="trackingBoard"
          :class="{
            'topBar-cancelFollowBoard': getTrackingBoard.includes(boardName),
          }"
        >
          <Icon class="topBar-bellIcon" name="bell" />
          追蹤中
        </button>
        <button class="topBar-followBoard" v-else @click="trackingBoard">
          追蹤
        </button>
      </div>
      <ul class="header-list">
        <li
          :class="{ active: sortArticleList === 'hot' }"
          @click="sortArticleList = 'hot'"
        >
          熱門
        </li>
        <li
          :class="{ active: sortArticleList === 'latest' }"
          @click="
            loadMore();
            sortArticleList = 'latest';
            articleEmpty = false;
          "
        >
          最新
        </li>
        <li>板規</li>
      </ul>
    </div>
    <div class="boardArticle-article" v-if="sortArticleList === 'hot'">
      <article
        class="article article-hot"
        v-for="art in articleData"
        :key="art._id"
      >
        <router-link
          :to="`/dcard/forum/${art.boardPath}/article/${art._id}`"
          class="article-articleLink"
        >
          <div class="articleLink-head">
            <Icon name="male" v-if="art.sex === 'male'" />
            <Icon name="female" v-else />
            <p>{{ art.selectedBoard }} ． {{ art.username }}</p>
          </div>
          <div class="articleLink-main">
            <div class="main-left">
              <div class="left-content">
                <h2>{{ art.title }}</h2>
                <p>{{ art.content }}</p>
              </div>
              <div class="left-status">
                <button
                  class="status-collect"
                  @click.prevent="collectArticle(art._id)"
                >
                  <Icon v-if="findCollect(art._id)" name="favorited" />
                  <Icon v-else name="favorite" />
                  <span>收藏</span>
                </button>
                <button
                  class="status-love"
                  @click.prevent="loveArticle(art._id)"
                >
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

    <div class="boardArticle-article" v-if="sortArticleList === 'latest'">
      <article
        class="article article-latest"
        v-for="art in latestArticleData"
        :key="art._id"
      >
        <router-link
          :to="`/dcard/forum/${art.boardPath}/article/${art._id}`"
          class="article-articleLink"
        >
          <div class="articleLink-head">
            <Icon name="male" v-if="art.sex === 'male'" />
            <Icon name="female" v-else />
            <p>{{ art.selectedBoard }} ． {{ art.username }}</p>
          </div>
          <div class="articleLink-main">
            <div class="main-left">
              <div class="left-content">
                <h2>{{ art.title }}</h2>
                <p>{{ art.content }}</p>
              </div>
              <div class="left-status">
                <button
                  class="status-collect"
                  @click.prevent="collectArticle(art._id)"
                >
                  <Icon v-if="findCollect(art._id)" name="favorited" />
                  <Icon v-else name="favorite" />
                  <span>收藏</span>
                </button>
                <button
                  class="status-love"
                  @click.prevent="loveArticle(art._id)"
                >
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
    <div v-if="articleEmpty === true" class="noarticle">沒有更多文章了!</div>
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
      latestArticleData: [],
      boardName: "",
      busy: false,

      isProcessApi: true,
      articleEmpty: false,
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
          .post(
            "https://protected-garden-60426.herokuapp.com/user/cancel/tracking/board",
            data
          )
          .then((res) => {
            console.log(this.$store.state.trackingBoard);
            this.$store.state.trackingBoard = res.data;
            console.log(this.$store.state.trackingBoard);
          })
          .catch((err) => console.log(err));
      } else {
        this.$axios
          .post(
            "https://protected-garden-60426.herokuapp.com/user/tracking/board",
            data
          )
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
      if (this.sortArticleList === "hot") {
        await setTimeout(async () => {
          await this.$axios
            .get(
              `https://protected-garden-60426.herokuapp.com/board/${this.$route.params.boardPath}/${this.latestArticleData.length}`
              // `/api/board/${this.$route.params.boardPath}/${this.articleData.length}`
            )
            .then((res) => {
              data = res.data.articleData;
              if (data.length === 0) this.articleEmpty = true;

              this.articleData.push(...data);
              this.boardName = this.articleData[0].selectedBoard;
              console.log(this.boardName);
              console.log(this.articleData[0].selectedBoard);
            })
            .catch((err) => console.log(err));
          this.busy = false;
        }, 500);
      } else if (this.sortArticleList === "latest") {
        await setTimeout(async () => {
          await this.$axios
            .get(
              `https://protected-garden-60426.herokuapp.com/board/${this.$route.params.boardPath}/latest/${this.latestArticleData.length}`
            )
            .then((res) => {
              data = res.data.articleData;
              if (data.length === 0) this.articleEmpty = true;
              this.latestArticleData.push(...data);
            })
            .catch((err) => console.log(err));
          this.busy = false;
        }, 500);
      }
    },

    collectArticle(articleId) {
      let collectData = this.$store.getters.collectArticle;
      if (collectData.map((x) => x.collectArticleId).indexOf(articleId) >= 0) {
        this.$store.dispatch("cancelCollect", articleId);
        this.$toast("收藏成功 !");
      } else {
        this.$toast("取消收藏成功 !");
        this.$store.dispatch("collectArticle", articleId);
      }
    },
    async loveArticle(articleId) {
      let loveData = this.$store.getters.loveArticle;
      if (this.isProcessApi === false) return;
      this.isProcessApi = false;
      if (loveData.map((x) => x.loveArticleId).indexOf(articleId) >= 0) {
        await this.$store.dispatch("cancelLove", articleId);

        this.articleData.map((x) => {
          if (x._id === articleId) {
            x.love -= 1;
          }
        });

        this.latestArticleData.map((x) => {
          if (x._id === articleId) {
            x.love -= 1;
          }
        });

        this.isProcessApi = true;
      } else {
        await this.$store.dispatch("loveArticle", articleId);
        this.latestArticleData.map((x) => {
          if (x._id === articleId) {
            x.love += 1;
          }
        });
        this.articleData.map((x) => {
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
      this.latestArticleData = [];
      this.articleEmpty = false;
      this.sortArticleList = "hot";
      this.busy = true;
      let data;
      console.log(this.articleData.length);
      await this.$axios
        .get(
          `https://protected-garden-60426.herokuapp.com/board/${this.$route.params.boardPath}/${this.articleData.length}`
        )
        .then((res) => {
          data = res.data.articleData;
          this.boardName = data[0].selectedBoard;
          this.articleData.push(...data);
        })
        .catch((err) => console.log(err));
      this.busy = false;
    },
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
@import "../../../../src/assets/scss/all.scss";
.boardArticle-root {
  max-width: 728px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: #fff;
  margin: 0 12px;
  min-height: 0;
  min-width: 0;
  border-radius: 5px 5px 0 0;
}
.boardArticle-banner {
  border-radius: 5px 5px 0 0;
}
.boardArticle-header {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 60px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  background: #fff;
  position: sticky;
  top: 48px;
  @media (max-width: 768px) {
    padding: 20px 40px 0px;
  }
  @media (max-width: 767px) {
    padding: 20px 30px 0px;
  }
  @media (max-width: 414px) {
    padding: 20px 15px 0px;
  }
  .header-topBar {
    height: 60px;
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .topBar-boardName {
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
    .topBar-followBoard {
      color: #ffffff;
      background: #3397cf;
    }
    .topBar-cancelFollowBoard {
      color: rgba(0, 0, 0, 0.75);
      position: relative;
      background: rgba(0, 16, 32, 0.06);
      .topBar-bellIcon {
        position: absolute;
        left: -30px;
      }
    }
  }
  .header-list {
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
.boardArticle-article {
  .article {
    display: flex;
    width: 100%;
    padding: 0 40px;
    @media (max-width: 768px) {
      padding: 0 20px;
    }
    @media (max-width: 767px) {
      padding: 0 10px;
    }
    @media (max-width: 414px) {
      padding: 0px;
    }
    .article-articleLink {
      width: 100%;
      padding: 20px;
      height: 155px;
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid rgb(233, 233, 233);
      min-width: 0;
      .articleLink-head {
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
    }
  }
}

.articleLink-main {
  display: flex;
  justify-content: space-between;
  height: 100%;
  .main-left {
    max-width: 504px;
    display: flex;
    flex-direction: column;
    min-width: 0;
    .left-content {
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
    .left-status {
      display: flex;

      button {
        display: flex;
        align-items: center;
        margin-right: 16px;
        background: none;
        padding: 0;
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

/* .active {
  color: black;
  border-bottom: 2px solid rgb(51, 151, 207);
}
.noarticle {
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.35);
  font-size: 14px;
} */
</style>
