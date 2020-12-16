<template>
  <div class="container">
    <div class="topBar">
      <ul class="sort">
        <li @click="selectedAll()">全部</li>
        <li>熱門</li>
        <li>最新</li>
      </ul>
    </div>
    <article v-for="art in allarticle" :key="art._id">
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
export default {
  data() {
    return {
      allarticle: [],
    };
  },
  components: {
    Icon,
  },
  methods: {
    selectedAll() {
      this.allarticle.sort((a, b) => {
        console.log(a.date, b.date);
      });
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
  created() {
    this.$axios
      .get("/api/user/allarticle")
      .then((res) => {
        this.allarticle = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
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
  min-height: 0;
  min-width: 0;
}
.topBar {
  width: 100%;
  padding: 20px 60px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 48px;
  background: #fff;
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
      width: 56px;
      height: 36px;
      background: #3397cf;
      border: none;
      border-radius: 10px;
      font-size: 14px;
      color: #ffffff;
      &:focus {
        outline: none;
      }
      &:hover {
        cursor: pointer;
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
        color: black;
        height: 61px;
        border-bottom: 2px solid rgb(51, 151, 207);
      }
    }
  }
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
