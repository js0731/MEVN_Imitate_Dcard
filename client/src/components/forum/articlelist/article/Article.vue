<template>
  <div class="container">
    <div class="topBar">
      <Icon :name="article.sex" />
      <span>{{ article.username }}</span>
    </div>
    <article class="article">
      <h1 class="title">{{ article.title }}</h1>
      <div class="info">{{ article.selectedBoard }} · {{ article.date }}</div>
      <div class="content">
        {{ article.content }}
      </div>
    </article>
    <div class="status">
      <div class="left">
        <img class="love" src="../../../../assets/img/love.jpg" alt="" />
        {{ article.love }} ・ 回應 10
      </div>
      <div class="right">
        <button class="collect" @click="collectArticle(articleId)">
          <Icon v-if="findCollect(articleId)" name="favorited" />
          <Icon v-else name="favorite" />
        </button>
        <button class="collect" @click="loveArticle(articleId)">
          <Icon v-if="findLove(articleId)" name="loved" />
          <Icon v-else name="love" />
        </button>
      </div>
    </div>
    <div class="messageBlock">
      <span class="replyNumber">共 {{ this.messages.length }} 則回應</span>

      <div class="message" v-for="msg in messages" :key="msg._id">
        <div class="messageHeader">
          <Icon class="avatar" name="female" />
          <div class="user">
            <span class="userName">{{ msg.messageName }}</span>
            <span class="userPostDate">B1・{{ msg.messageDate }}</span>
          </div>
          <div class="btnGroup">
            <button class="btn" @click="loveMessage(msg._id)">
              <Icon name="loved" v-if="findLoveMessage(msg._id)" />
              <Icon name="love" v-else />{{ msg.messageLove }}
            </button>
            <button
              class="btn"
              @click="deleteMessage(msg._id)"
              v-if="msg.messageName === getUserData.name"
            >
              <Icon name="garbage" />
            </button>
          </div>
        </div>
        <div class="messageContent">
          {{ msg.messageContent }}
        </div>
      </div>
    </div>
    <div class="post" v-if="!isOpenPostBlock">
      <button class="btn btn_reply" @click="isOpenPostBlock = true">
        <Icon class="svg svg_sex" name="female" /><span class="replyText"
          >回應...</span
        >
      </button>
      <button class="btn" @click="collectArticle(articleId)">
        <Icon class="svg" v-if="findCollect(articleId)" name="favorited" />
        <Icon class="svg" v-else name="favorite" />
      </button>
      <button class="btn" @click="loveArticle(articleId)">
        <Icon class="svg" v-if="findLove(articleId)" name="loved" />
        <Icon class="svg" v-else name="love" />
      </button>
    </div>

    <div
      class="postBlock"
      v-if="isOpenPostBlock"
      :style="{ height: isScaling ? 'calc(100vh - 48px)' : null }"
    >
      <div class="postHeader">
        <Icon class="svgSex" name="female" />
        <div class="dummy">
          <span class="userName"> {{ messageData.messageName }}</span>
          <span class="userPostDate">{{ messageData.messageDate }}</span>
        </div>
        <button class="svgScaling" @click="isScaling = !isScaling">
          <Icon name="scaling" />
        </button>
      </div>
      <textarea
        class="textarea"
        placeholder="回應前請詳閱全站站規和本板板規"
        v-model="messageData.messageContent"
      ></textarea>
      <div class="btnGroup">
        <button class="btn btn-cancel" @click="isOpenPostBlock = false">
          取消
        </button>
        <button class="btn btn-submit" @click="addMessage">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "../../../Icon";
import dateFormat from "dateformat";
import LoginFormVue from "../../../dcard/LoginForm.vue";
export default {
  data() {
    return {
      articleId: "",
      article: [],
      messages: [],
      isOpenPostBlock: false,
      isScaling: false,
      isProcessApi: true,
      messageData: {
        messageSex: this.$store.state.userData.sex,
        messageName: this.$store.state.userData.name,
        messageDate: dateFormat(new Date(), "yyyy-mm-dd HH:MM"),
        messageContent: "",
      },
      isProcessApi: true,
    };
  },
  components: {
    Icon,
  },
  methods: {
    addMessage() {
      this.$axios
        .post("/api/user/leave/message", {
          articleId: this.$route.params.id,
          messageData: this.messageData,
        })
        .then((res) => {
          this.messages = res.data;
        })
        .catch((err) => console.error(err));
      this.isOpenPostBlock = false;
    },
    deleteMessage(messageId) {
      this.$axios
        .post("/api/user/delete/message", {
          articleId: this.$route.params.id,
          messageId: messageId,
        })
        .then((res) => {
          this.messages = res.data;
        })
        .catch((err) => console.error(err));
    },
    loveMessage(messageId) {
      if (this.isProcessApi === false) return;
      this.isProcessApi = false;
      if (this.$store.state.loveMessage.map((x) => x).indexOf(messageId) < 0) {
        this.$axios
          .post("/api/user/love/message", {
            messageId: messageId,
            userId: this.$store.state.userData.id,
          })
          .then((res) => {
            this.$store.state.loveMessage.push(messageId);
            this.messages.map((x) => {
              if (x._id === messageId) {
                x.messageLove += 1;
              }
            });
            this.isProcessApi = true;
          })
          .catch((err) => console.error(err));
      } else {
        this.$axios
          .post("/api/user/cancel/love/message", {
            messageId: messageId,
            userId: this.$store.state.userData.id,
          })
          .then((res) => {
            this.$store.state.loveMessage.splice(
              this.$store.state.loveMessage.indexOf(messageId),
              1
            );
            this.messages.map((x) => {
              if (x._id === messageId) {
                x.messageLove -= 1;
              }
            });
            this.isProcessApi = true;
          })
          .catch((err) => console.error(err));
      }
    },
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
    findLoveMessage(messageId) {
      return (
        this.$store.state.loveMessage.map((x) => x).indexOf(messageId) >= 0
      );
    },
    collectArticle(articleId) {
      let collectData = this.$store.getters.collectArticle;
      if (collectData.map((x) => x.collectArticleId).indexOf(articleId) >= 0) {
        this.$store.dispatch("cancelCollect", articleId);
      } else this.$store.dispatch("collectArticle", articleId);
    },
    async loveArticle(articleId) {
      let loveArticleData = this.$store.getters.loveArticle;
      console.log(this.isProcessApi);
      if (this.isProcessApi === false) return;
      this.isProcessApi = false;

      if (loveArticleData.map((x) => x.loveArticleId).indexOf(articleId) >= 0) {
        console.log(this.isProcessApi);
        await this.$store.dispatch("cancelLove", articleId);
        this.article.love -= 1;
        this.isProcessApi = true;
      } else {
        await this.$store.dispatch("loveArticle", articleId);
        this.article.love += 1;
        this.isProcessApi = true;
      }
    },
  },
  computed: {
    getUserData() {
      return this.$store.getters.userData;
    },
  },
  created() {
    this.articleId = this.$route.params.id;
    this.$axios
      .get(
        `/api/board/${this.$route.params.boardPath}/article/${this.$route.params.id}`
      )
      .then((res) => {
        this.article = res.data;
        this.messages = this.article.message;
        // console.log(res.data, this.article);
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
  justify-content: flex-start;
  background: #fff;
  margin: 0 12px 0 12px;
  border-radius: 5px;
  min-height: calc(100vh - 68px);
}

.topBar {
  height: 90px;
  display: flex;
  align-items: center;
  padding: 0 60px;
  svg {
    padding-right: 8px;
  }
  span {
    font-size: 14px;
  }
}

article {
  width: 100%;
  padding: 0 60px 30px 60px;
  .title {
    font-size: 28px;
    margin-bottom: 12px;
    line-height: 28px;
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }
  .info {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.35);
    margin-bottom: 20px;
  }
  .content {
    font-size: 16px;
    line-height: 28px;
    color: rgba(0, 0, 0, 0.75);
    font-weight: 400;
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }
}

.status {
  padding: 0 60px 30px 60px;
  display: flex;

  justify-content: space-between;
  color: rgba(0, 0, 0, 0.5);
  font-size: 18px;
  .right {
    display: flex;
    button {
      background: none;
      padding: 0 8px;
    }
  }
  .left {
    .love {
      width: 24px;
      height: 24px;
      margin-right: 6px;
    }
    display: flex;
    align-items: center;
  }
}

.messageBlock {
  padding: 40px 60px 15px 60px;
  background: rgb(245, 245, 245);
  flex-grow: 1;
  .replyNumber {
    display: flex;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.5);

    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding-bottom: 4px;
  }
  .message {
    padding: 16px 0;
    border-bottom: 1px solid rgb(233, 233, 233);
    .messageHeader {
      display: flex;
      .avatar {
        margin-right: 8px;
      }
      .user {
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .userName {
          font-size: 14px;
        }
        .userPostDate {
          color: rgba(0, 0, 0, 0.35);
          font-size: 12px;
        }
      }
      .btnGroup {
        display: flex;
        margin-left: auto;
      }
      .btn {
        margin-right: 15px;
        margin-left: auto;
        color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        font-weight: 400;
        letter-spacing: 0.5px;
        /* &:hover {
          color: rgb(234, 92, 92);
          svg {
            fill: rgb(234, 92, 92);
          }
        } */
        svg {
          margin-right: 8px;
        }
      }
    }
    .messageContent {
      padding-top: 20px;
      line-height: 28px;
    }
  }
}

.postBlock {
  background: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  position: sticky;

  bottom: 0;
  padding: 0 60px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;

  .postHeader {
    display: flex;
    align-items: center;
    height: 68px;
    .svgSex {
      width: 32px;
      height: 32px;
      margin-right: 8px;
    }
    .svgScaling {
      margin-left: auto;
      &:hover {
        cursor: pointer;
      }
    }
    .dummy {
      height: 32px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .userName {
        font-size: 14px;
      }
      .userPostDate {
        font-size: 12px;
      }
    }
  }
  .textarea {
    flex-grow: 1;
    width: 100%;
    min-height: 110px;
    border: none;
    line-height: 1.6;
    overflow-x: hidden;
    overflow-y: scroll;
    resize: none;
    padding: 0;
    position: relative;

    &::-webkit-scrollbar {
      width: 6px;
      &:hover {
        cursor: pointer;
      }
    }
    &::-webkit-scrollbar-thumb {
      box-shadow: inset 0 0 0 30px;
      border-radius: 10px;
    }
  }
  .btnGroup {
    height: 60px;
    padding: 12px 0;
    display: flex;
    justify-content: flex-end;
    /* margin-bottom: 20px; */
    .btn {
      height: 100%;
      font-size: 15px;
    }
    .btn-cancel {
      padding: 0 8px;
      color: rgba(0, 0, 0, 0.5);
      margin-right: 16px;
      background: none;
    }
    .btn-submit {
      padding: 0 16px;
      color: #fff;
      border-radius: 10px;
      background: rgb(51, 151, 207);
    }
  }
}

.post {
  height: 48px;
  display: flex;
  background: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 60px;
  .btn {
    display: flex;
    align-items: center;
    background: none;
    height: 100%;
    .svg {
      width: 40px;
      height: 40px;
      padding: 0 8px;
    }
  }
  .btn_reply {
    background: none;
    flex-grow: 1;
    &:hover {
      cursor: text;
    }
    .svg_sex {
      width: 28px;
      height: 28px;
      margin-right: 10px;
      padding: 0;
    }
    .replyText {
      color: rgba(0, 0, 0, 0.5);
      font-size: 14px;
    }
  }
}
</style>
