<template>
  <div
    class="boardArticle-root"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="10"
  >
    <div class="boardArticle-header">
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
            sortArticleList = 'latest';
            loadMore();
          "
        >
          最新
        </li>
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
                <span class="status-replyNum"
                  >回應 {{ art.message.length }}</span
                >
              </div>
            </div>
            <div class="block-right">
              <div class="pic">
                <img src="http://fakeimg.pl/84x84/" alt />
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
                <span class="status-replyNum"
                  >回應 {{ art.message.length }}</span
                >
              </div>
            </div>
            <div class="block-right">
              <div class="pic">
                <img src="http://fakeimg.pl/84x84/" alt />
              </div>
            </div>
          </div>
        </router-link>
      </article>
    </div>
    <div v-if="sortArticleList === 'hot' && hotArticleEmpty" class="noarticle">
      沒有更多文章了!
    </div>
    <div
      v-if="sortArticleList === 'latest' && latestArticleEmpty"
      class="noarticle"
    >
      沒有更多文章了!
    </div>
  </div>
</template>

<script>
import LoginFormVue from "../../dcard/LoginForm.vue";
import Icon from "../../Icon";
import dateFormat from "dateformat";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      articleData: [],
      latestArticleData: [],
      busy: false,
      isProcessApi: true,
      articleEmpty: false,
      sortArticleList: "hot",
      hotArticleEmpty: false,
      latestArticleEmpty: false,
    };
  },
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
          .post(
            "https://protected-garden-60426.herokuapp.com/user/cancel/tracking/board",
            // "/api/user/cancel/tracking/board",
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
            // "/api/user/tracking/board",
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
      // switch (this.sortArticleList) {
      //   case "hot":
      //     if (this.hotArticleEmpty) return (this.busy = false);
      //     await setTimeout(async () => {
      //       console.log(this.hotArticleEmpty);
      //       await this.$axios
      //         .get(
      //           // `https://protected-garden-60426.herokuapp.com/board/all/${this.articleData.length}`
      //           `/api/board/all/${this.articleData.length}`
      //         )
      //         .then((res) => {
      //           data = res.data.articleData;
      //           if (data.length === 0) {
      //             return (this.hotArticleEmpty = true);
      //           }
      //           this.articleData.push(...data);
      //         })
      //         .catch((err) => console.log(err));
      //       this.busy = false;
      //     }, 500);

      //   case "latest":
      //     if (this.latestArticleEmpty) return (this.busy = false);
      //     await setTimeout(async () => {
      //       await this.$axios
      //         .get(
      //           // `https://protected-garden-60426.herokuapp.com/board/all/latest/${this.latestArticleData.length}`
      //           `/api/board/all/latest/${this.latestArticleData.length}`
      //         )
      //         .then((res) => {
      //           data = res.data.articleData;
      //           if (data.length === 0) {
      //             this.latestArticleEmpty = true;
      //           }
      //           this.latestArticleData.push(...data);
      //         })
      //         .catch((err) => console.log(err));
      //       this.busy = false;
      //     }, 500);
      // }
      if (this.sortArticleList === "hot") {
        if (this.hotArticleEmpty) return (this.busy = false);
        await setTimeout(async () => {
          await this.$axios
            .get(
              `https://protected-garden-60426.herokuapp.com/board/all/${this.articleData.length}`
              // `/api/board/all/${this.articleData.length}`
            )
            .then((res) => {
              data = res.data.articleData;

              if (data.length === 0) {
                return (this.hotArticleEmpty = true);
              }
              this.articleData.push(...data);
            })
            .catch((err) => console.log(err));
          this.busy = false;
        }, 500);
      } else if (this.sortArticleList === "latest") {
        if (this.latestArticleEmpty) return (this.busy = false);
        await setTimeout(async () => {
          await this.$axios
            .get(
              `https://protected-garden-60426.herokuapp.com/board/all/latest/${this.latestArticleData.length}`
              // `/api/board/all/latest/${this.latestArticleData.length}`
            )
            .then((res) => {
              data = res.data.articleData;
              if (data.length === 0) this.latestArticleEmpty = true;

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
            return (x.love -= 1);
          }
        });
        this.latestArticleData.map((x) => {
          console.log(x._id, articleId);
          if (x._id === articleId) {
            return (x.love -= 1);
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
        this.latestArticleData.map((x) => {
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
      this.latestArticleData = [];
      this.articleEmpty = false;
      this.sortArticleList = "hot";
      this.busy = true;
      let data;
      console.log(this.articleData.length);
      await this.$axios
        .get(
          `https://protected-garden-60426.herokuapp.com/board/${this.$route.params.boardPath}/${this.articleData.length}`
          // `api/board/${this.$route.params.boardPath}/${this.articleData.length}`
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
.boardArticle-root {
  width: 728px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: #fff;
  margin: 0 12px;
  min-height: 0;
  min-width: 0;
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
  border-radius: 5px 5px 0 0;
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
    .topBar-followBoard {
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
      .status-replyNum {
        display: flex;
        align-items: center;
        color: rgba(0, 0, 0, 0.35);
        font-size: 14px;
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

.active {
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
}
</style>
