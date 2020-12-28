<template>
  <div class="container">
    <aside>
      <div class="userInfo">
        <Icon class="avatar" name="male" />
        <span class="userName">{{ getUserData.name }}</span>
        <span class="userDate">{{ getUserData.date | handleDate }}</span>
      </div>
      <ul class="menu">
        <li class="list">
          <router-link to="#"><Icon name="favorited" />我的收藏</router-link>
        </li>
        <li class="list">
          <router-link to="#"><Icon name="setting" />設定</router-link>
        </li>
      </ul>
    </aside>
    <div class="dummy">
      <div class="main">
        <div class="title">我的收藏</div>

        <article v-for="art in coollectArticle" :key="art._id">
          <router-link
            :to="`/dcard/forum/${art.boardPath}/${art._id}`"
            class="articleLink"
          >
            <div class="block-top">
              <Icon name="male" v-if="art.sex === 'male'" />
              <Icon name="female" v-else />
              <p>
                {{ art.article.selectedBoard }} ． {{ art.article.username }}
              </p>
            </div>
            <div class="block-bottom">
              <div class="block-left">
                <div class="content">
                  <h2>{{ art.article.title }}</h2>
                  <p>{{ art.article.content }}</p>
                </div>
                <div class="status">
                  <button
                    class="collect"
                    @click.prevent="collectArticle(art.article._id)"
                  >
                    <Icon
                      v-if="findCollect(art.article._id)"
                      name="favorited"
                    />
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

      <ul class="footer">
        <li><a href="#">服務條款 </a></li>
        <li><a href="#">常見問題</a></li>
        <li><a href="#">品牌識別</a></li>
        <li><a href="#">徵才</a></li>
        <li><a href="#">商業合作</a></li>
        <p>Copyright © Dcard Taiwan Ltd. 2020</p>
      </ul>
    </div>
  </div>
</template>
<script>
import Icon from "../../Icon";

export default {
  data() {
    return {
      coollectArticle: [],
    };
  },
  components: {
    Icon,
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
      console.log(this.$store.getters.collectArticle);
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
        console.log("add", this.$store.getters.collectArticle);
        console.log(articleId);
        this.$store.dispatch("collectArticle", articleId);
      }
    },
  },
  created() {
    let userId = { userId: this.$store.state.userData.id };
    this.$axios
      .post("/api/user/collect/article/data", userId)
      .then((res) => {
        console.log(res.data);
        this.coollectArticle = res.data;
      })
      .catch((err) => console.log(err));
  },
  computed: {
    getUserData() {
      return this.$store.getters.userData;
    },
    // getUserCollectArticle() {
    //   return this.$store.getters.collectArticle;
    // },
  },
  filters: {
    handleDate: function (date) {},
  },
};
</script>
<style lang="scss" scoped>
.container {
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
aside {
  min-height: calc(100vh - 68px);
  display: flex;
  position: sticky;
  flex-direction: column;
  width: 208px;
  .userInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    .avatar {
      width: 100px;
      height: 100px;
      margin-bottom: 16px;
    }
    .userName {
      margin-bottom: 10px;
    }
    span {
      font-size: 24px;
      color: #fff;
    }
    .userDate {
      font-size: 14px;
    }
  }

  .menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 1 0%;
    height: 100%;
    overflow: auto;
    .list {
      width: 100%;
      a {
        display: flex;
        align-items: center;
        height: 44px;
        font-size: 16px;
        color: rgb(255, 255, 255);
        padding: 0 16px;
        border-radius: 10px;
        font-size: 16px;
        line-height: 44px;
        &:hover {
          background-color: rgba(0, 8, 16, 0.4);
        }
        svg {
          width: 24px;
          height: 24px;
          margin-right: 12px;
        }
      }
    }
  }
}
.main {
  width: 760px;
  padding: 20px 60px;
  display: flex;
  flex-direction: column;
  background-color: rgb(242, 243, 244);
  border-radius: 12px;
  margin: 0 10px;
  .title {
    height: 60px;
    font-size: 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    line-height: 60px;
    margin-bottom: 24px;
  }
  article {
    display: flex;
    width: 100%;
    padding: 20px;
    border-bottom: 1px solid rgb(233, 233, 233);
    background-color: #fff;
  }
  .articleLink {
    width: 100%;

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
}
.footer {
  height: 68px;
  display: flex;
  align-items: center;
  li {
    a {
      color: #fff;
      font-size: 14px;
    }
  }
  p {
    color: #fff;
    font-size: 14px;
  }
}
</style>
