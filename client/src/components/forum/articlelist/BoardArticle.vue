<template>
  <div class="container">
    <img class="banner" src="http://fakeimg.pl/728x242/" alt="" />
    <BoardBar class="board" :boardName="'a'" />
    <article v-for="art in articleData" :key="art._id">
      <router-link
        :to="`/dcard/forum/${art.boardPath}/${art._id}`"
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
              <button class="collect" @click.prevent="collectArticle(art._id)">
                <Icon v-if="findCollect(art._id)" name="favorited" />
                <Icon v-else name="favorite" />
                <span>收藏</span>
              </button>
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
import Icon from "../../Icon";
import BoardBar from "./BoardBar";
export default {
  data() {
    return {
      articleData: [],
    };
  },
  methods: {
    findCollect(articleId) {
      return (
        this.$store.getters.collectArticle
          .map((x) => x.collectArticleId)
          .indexOf(articleId) >= 0
      );
    },
    collectArticle(articleId) {
      // console.log(this.$store.getters.collectArticle);
      let collectData = this.$store.getters.collectArticle;
      if (collectData.map((x) => x.collectArticleId).indexOf(articleId) >= 0) {
        console.log("remove");
        this.$store.dispatch("cancelCollect", articleId);
      } else {
        console.log("add", this.$store.getters.collectArticle);
        this.$store.dispatch("collectArticle", articleId);
      }
    },
  },
  components: {
    Icon,
    BoardBar,
  },
  watch: {
    $route: function () {
      this.$axios
        .get(`/api/board/${this.$route.params.boardPath}`)
        .then((res) => {
          this.articleData = res.data.articleData;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  created() {
    this.$axios
      .get(`/api/board/${this.$route.params.boardPath}`)
      .then((res) => {
        this.articleData = res.data.articleData;
      })
      .catch((err) => {
        console.error(err);
      });
    // 獲取動態訊息，如收藏文章等等
    this.$store.dispatch("storeUserDynamicData", {
      userId: this.$store.state.userData.id,
    });
  },
  computed: {
    getUserCollectArticle() {
      return this.$store.state.collectArticle;
    },
  },
};
</script>


<style lang="scss" scoped>
.container {
  max-width: 728px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  margin: 0 12px;
}
.banner {
  width: 100%;
}
.board {
  position: sticky;
  top: 48px;
}
article {
  display: flex;
  margin: 0 40px;
  padding: 20px;
  border-bottom: 1px solid rgb(233, 233, 233);
  .articleLink {
    width: 100%;
    height: 115px;
    display: flex;
    flex-direction: column;
  }
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
  flex-grow: 1;
  .block-left {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    .content {
      max-width: 504px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      margin: auto;
      justify-content: center;
      line-height: 1.4rem;
      h2 {
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
    align-self: flex-end;
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
