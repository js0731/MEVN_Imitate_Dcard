<template>
  <div class="container">
    <BoardBar />

    <article>
      <div class="article" v-for="art in articleData" :key="art._id">
        <router-link
          :to="`/dcard/forum/${art.boardPath}/${art._id}`"
          class="ctn"
        >
          <div class="user">
            <Icon name="male" v-if="art.sex === 'male'" />
            <Icon name="female" v-if="art.sex === 'female'" />
            <p>{{ art.selectedBoard }} ． {{ art.username }}</p>
          </div>
          <div class="content">
            <h2>{{ art.title }}</h2>
            <p>{{ art.content }}</p>
          </div>
          <div class="status">
            <!-- <button @click.prevent="a">
              <Icon name="love" />
            </button>
            <button @click.prevent="b">
              <span>回應 141</span>
            </button> -->

            <button @click.prevent="collectArticle(art._id)">
              <Icon v-if="findCollect(art._id)" name="favorited" />
              <Icon v-else name="favorite" />
              <span>收藏</span>
            </button>
          </div>
        </router-link>
        <div class="pic">
          <img :src="art.img" alt />
        </div>
      </div>
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
    getId(a) {
      console.log(a);
    },
    a(e) {
      console.log("a", e);
      e.stopPropagation();
    },
    b(e) {
      console.log("b", e);
      e.stopPropagation();
    },
    findCollect(articleId) {
      return (
        this.$store.getters.collectArticle
          .map((x) => x.collectArticleId)
          .indexOf(articleId) >= 0
      );
    },
    collectArticle(articleId) {
      if (
        this.$store.getters.collectArticle
          .map((x) => x.collectArticleId)
          .indexOf(articleId) >= 0
      ) {
        console.log("remove");
        this.$store.dispatch("cancelCollect", articleId);
      } else if (
        this.$store.getters.collectArticle
          .map((x) => x.collectArticleId)
          .indexOf(articleId) < 0
      ) {
        console.log("add");
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
    // test
    // let arr = this.$store.getters.collectArticle
    // console.log(arr,this.$store.getters.collectArticle);
    // console.log(arr.map((x) => x.collectArticleId).indexOf("5fa2624bb3e02b4b28ec7580"));
  },
  computed: {
    getUserData() {
      return this.$store.getters.userData;
    },
    getUserCollectArticle() {
      return this.$store.state.collectArticle;
    },
  },
};
</script>


<style lang="scss" scoped>
.container {
  width: 728px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  background: #fff;
  margin: 0 12px;
}

.article {
  width: 648px;
  padding: 20px;
  margin: 0 auto;
  border-bottom: 1px solid rgb(233, 233, 233);
  display: flex;
  &:hover {
    cursor: pointer;
    color: red;
  }
  a {
    width: 504px;
    height: 116px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .user {
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
    .content {
      h2 {
        font-size: 18px;
        margin-bottom: 12px;
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
      align-items: center;
      button {
        display: flex;
        align-items: center;
        margin-right: 16px;
        background: none;
        &:hover {
          background: red;
        }
        svg {
        }
        span {
          color: rgba(0, 0, 0, 0.35);

          font-size: 14px;
        }
      }
    }
  }
}

.pic {
  align-self: flex-end;
  img {
    width: 84px;
    height: 84px;
  }
}
</style>
