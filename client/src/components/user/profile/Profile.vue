<template>
  <div class="profile-root">
    <aside class="profile-aside">
      <div class="aside-userInfo">
        <Icon class="userInfo-avatar" name="male" />
        <span class="userInfo userInfo-userName">{{ getUserData.name }}</span>
        <span class="userInfo userInfo-userDate">{{
          getUserData.date | handleDate
        }}</span>
      </div>
      <ul class="aside-menu">
        <li class="menu-list">
          <router-link to="#"><Icon name="favorited" />我的收藏</router-link>
        </li>
        <li class="menu-lis">
          <router-link to="#"><Icon name="setting" />設定</router-link>
        </li>
      </ul>
    </aside>
    <div class="dummy-main">
      <div class="main-main">
        <div class="main-title">我的收藏</div>

        <article
          class="main-article"
          v-for="art in coollectArticle"
          :key="art._id"
        >
          <router-link
            :to="`/dcard/forum/${art.article.boardPath}/article/${art.article._id}`"
            class="article-articleLink"
          >
            <div class="articleLink-top">
              <Icon name="male" v-if="art.sex === 'male'" />
              <Icon name="female" v-else />
              <p>
                {{ art.article.selectedBoard }} ． {{ art.article.username }}
              </p>
            </div>
            <div class="articleLink-bottom">
              <div class="bottom-left">
                <div class="left-content">
                  <h2 class="content-title">{{ art.article.title }}</h2>
                  <p class="content-content">{{ art.article.content }}</p>
                </div>
                <div class="left-status">
                  <button
                    class="status-collect"
                    @click.prevent="collectArticle(art.article._id)"
                  >
                    <Icon
                      v-if="findCollect(art.article._id)"
                      name="favorited"
                    />
                    <Icon v-else name="favorite" />
                    <span>收藏</span>
                  </button>

                  <span class="status-reply"
                    >回應 {{ art.article.message.length }}</span
                  >
                </div>
              </div>
              <div class="bottom-right">
                <div class="right-pic">
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
        console.log(res.data.message);
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
.profile-root {
  padding-top: 20px;
  display: flex;
  justify-content: center;
}
.profile-aside {
  min-height: calc(100vh - 68px);
  display: flex;
  position: sticky;
  flex-direction: column;
  width: 208px;
  .aside-userInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    .userInfo {
      font-size: 24px;
      color: #fff;
    }
    .userInfo-avatar {
      width: 100px;
      height: 100px;
      margin-bottom: 16px;
    }
    .userInfo-userName {
      margin-bottom: 10px;
    }
    .userInfo-userDate {
      font-size: 14px;
    }
  }

  .aside-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 1 0%;
    height: 100%;
    overflow: auto;
    .menu-list {
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
.main-main {
  width: 760px;
  padding: 20px 60px;
  display: flex;
  flex-direction: column;
  background-color: rgb(242, 243, 244);
  border-radius: 12px;
  margin: 0 10px;
  .main-title {
    height: 60px;
    font-size: 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    line-height: 60px;
    margin-bottom: 24px;
  }
  .main-article {
    display: flex;
    width: 100%;
    padding: 20px;
    background-color: #fff;
    position: relative;
    &:after {
      content: "";
      width: 90%;
      height: 1px;
      background: rgba(0, 0, 0, 0.1);
      position: absolute;
      z-index: 0;
      bottom: 0px;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
  }
  .article-articleLink {
    width: 100%;
    height: 115px;
    display: flex;
    flex-direction: column;
  }
  .articleLink-top {
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

  .articleLink-bottom {
    display: flex;
    justify-content: space-between;
    height: 100%;
    .bottom-left {
      max-width: 504px;
      display: flex;
      flex-direction: column;
      min-height: 0;
      min-width: 0;
      .left-content {
        min-height: 0;
        min-width: 0;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: center;
        line-height: 1.5rem;
        .content-title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 18px;
        }
        .content-content {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 14px;
        }
      }
      .left-status {
        display: flex;
        align-items: center;
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
        .status-reply {
          color: rgba(0, 0, 0, 0.35);
          font-size: 14px;
        }
      }
    }
    .bottom-right {
      align-self: flex-start;
      .right-pic {
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
