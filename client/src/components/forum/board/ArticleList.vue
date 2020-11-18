<template>
  <div class="container">
    <BoardBar />
    <!-- {{ getUserData.collectArticle[0].collectArticleId[0] }} -->
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
              <Icon
                name="favorited"
                v-if="'5fa2619cb3e02b4b28ec757f' === '5fb3d5006780d944088ad99f'"
              />
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
      fav: false,
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
    collectArticle(id) {
      this.$store.dispatch("collectArticle", id);
    },
  },
  components: {
    Icon,
    BoardBar,
  },
  watch: {
    $route: function () {
      // console.log(this.$route.params.boardPath);
      this.$axios
        .get(`/api/board/${this.$route.params.boardPath}`)
        .then((res) => {
          this.articleData = res.data.articleData;
          console.log(this.articleData[0].boardPath);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  created() {
    // console.log(this.$route.params.boardPath);
    let userId = this.$store.getters.user.id;
    this.$axios
      .post(`/api/board/${this.$route.params.boardPath}`, { userId: userId })
      .then((res) => {
        this.articleData = res.data.articleData;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  computed: {
    // getUserData() {
    //   return this.$store.getters.user;
    // },
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
