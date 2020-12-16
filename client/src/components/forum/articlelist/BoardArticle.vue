<template>
  <div
    class="container"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="busy"
    infinite-scroll-distance="10"
  >
    <img class="banner" src="http://fakeimg.pl/728x242/" alt="" />
    <BoardBar class="board" :boardName="'a'" />
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

export default {
  components: {
    Icon,
    BoardBar,
  },
  data() {
    return {
      articleData: [],
      busy: false,
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
    loadMore: async function () {
      this.busy = true;
      console.log("1", this.articleData.length);
      let data;
      await setTimeout(async () => {
        await this.$axios
          .get(
            `/api/board/${this.$route.params.boardPath}/${this.articleData.length}`
          )
          .then((res) => {
            data = res.data.articleData;
            console.log("2", data);
            this.articleData.push(...data);
          })
          .catch((err) => console.log(err));
        this.busy = false;
      }, 1500);
    },

    collectArticle(articleId) {
      let collectData = this.$store.getters.collectArticle;
      if (collectData.map((x) => x.collectArticleId).indexOf(articleId) >= 0) {
        this.$store.dispatch("cancelCollect", articleId);
      } else this.$store.dispatch("collectArticle", articleId);
    },
  },

  watch: {
    $route: async function () {
      this.articleData = [];
      this.busy = true;
      console.log("1", this.articleData.length);
      let data;

      await this.$axios
        .get(
          `/api/board/${this.$route.params.boardPath}/${this.articleData.length}`
        )
        .then((res) => {
          data = res.data.articleData;
          console.log("2", data);
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
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 728px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 20px;
  background: #fff;
  margin: 0 12px;
  min-height: 0;
  min-width: 0;
}
.banner {
}
.board {
}

.board {
  position: sticky;
  top: 48px;
}
article {
  display: flex;
  width: 100%;
  padding: 20px;
  border-bottom: 1px solid rgb(233, 233, 233);
}
.articleLink {
  width: 100%;
  padding: 0 40px;
  height: 115px;
  display: flex;
  flex-direction: column;
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
</style>
