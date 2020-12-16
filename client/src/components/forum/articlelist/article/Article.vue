<template>
  <div class="container">
    <div class="topBar">
      <Icon name="female" />
      <span>{{ article.username }}</span>
    </div>
    <article class="article">
      <h1 class="title">{{ article.title }}</h1>
      <div class="info">
        {{ article.selectedBoard }} · {{ article.date | handleDate }}
      </div>
      <div class="content">
        {{ article.content }}
      </div>
    </article>
    <div class="status">
      <div class="left">
        <img class="love" src="../../../../assets/img/love.jpg" alt="" /> 2 ・
        回應 10
      </div>
      <div class="right">
        <button>
          <Icon name="love" />
        </button>
        <button>
          <Icon name="favorite" />
        </button>
      </div>
    </div>
    <div class="messageBlock">
      <span class="replyNumber">共 8 則回應</span>
      <div class="message">
        <div class="messageHeader">
          <Icon class="avatar" name="female" />
          <div class="messageUser">
            <span class="userName">莊家臻</span>
            <span class="userPostDate">B1・12月9日 12:31</span>
          </div>
        </div>
        <div class="messageContent">
          我能向你應徵抓猴大隊嗎 <br />
          我有一串香蕉🍌
        </div>
      </div>
      <div class="message">
        <div class="messageHeader">
          <Icon class="avatar" name="female" />
          <div class="messageUser">
            <span class="userName">莊家臻</span>
            <span class="userPostDate">B1・12月9日 12:31</span>
          </div>
        </div>
        <div class="messageContent">
          我能向你應徵抓猴大隊嗎 <br />
          我有一串香蕉🍌
        </div>
      </div>
      <div class="message">
        <div class="messageHeader">
          <Icon class="avatar" name="female" />
          <div class="messageUser">
            <span class="userName">莊家臻</span>
            <span class="userPostDate">B1・12月9日 12:31</span>
          </div>
        </div>
        <div class="messageContent">
          我能向你應徵抓猴大隊嗎 <br />
          我有一串香蕉🍌
        </div>
      </div>
      <div class="message">
        <div class="messageHeader">
          <Icon class="avatar" name="female" />
          <div class="messageUser">
            <span class="userName">莊家臻</span>
            <span class="userPostDate">B1・12月9日 12:31</span>
          </div>
        </div>
        <div class="messageContent">
          我能向你應徵抓猴大隊嗎 <br />
          我有兩串香蕉🍌
        </div>
      </div>
    </div>
    <div class="post" v-if="!isOpenPostBlock">
      <button class="btn btn_reply" @click="isOpenPostBlock = true">
        <Icon class="svg svg_sex" name="female" /><span class="replyText"
          >回應...</span
        >
      </button>
      <button class="btn"><Icon class="svg" name="love" /></button>
      <button class="btn"><Icon class="svg" name="favorite" /></button>
    </div>

    <div
      class="postBlock"
      v-if="isOpenPostBlock"
      :style="{ height: isScaling ? 'calc(100vh - 48px)' : null }"
    >
      <!-- :style="{ height: isScaling ? 'red' : '100%' }" -->
      <div class="postHeader">
        <Icon class="svgSex" name="female" />
        <div class="dummy">
          <span class="userName">莊家臻</span>
          <span class="userPostDate">B6 | 12月11日 14:40</span>
        </div>
        <button class="svgScaling" @click="isScaling = !isScaling">
          <Icon name="scaling" />
        </button>
      </div>
      <textarea
        class="textarea"
        name=""
        placeholder="回應前請詳閱全站站規和本板板規"
      ></textarea>
      <div class="btnGroup">
        <button class="btn btn-cancel" @click="isOpenPostBlock = false">
          取消
        </button>
        <button class="btn btn-submit">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "../../../Icon";
import moment from "moment";
export default {
  data() {
    return {
      article: [],
      isOpenPostBlock: false,
      isScaling: false,
    };
  },
  components: {
    Icon,
  },
  methods: {
    openPostBlock() {},
  },
  created() {
    this.$axios
      .get(
        `/api/board/${this.$route.params.boardPath}/article/${this.$route.params.id}`
      )
      .then((res) => {
        this.article = res.data;
        // console.log(res.data, this.article);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  filters: {
    handleDate: function (date) {
      return moment(date).format("MM月DD M:DD");
    },
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
  margin: 20px 12px 0 12px;
  border-radius: 5px;
  position: relative;
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
      .messageUser {
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
