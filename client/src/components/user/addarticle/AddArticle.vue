
<template>
  <div class="newArticle-root">
    <h1 class="newArticle-title">發表文章</h1>
    <form class="newArticle-form" action="">
      <div class="form-top">
        <label class="top-label" @click="openWindow = true">
          <input
            class="top-input-selectBoard"
            type="button"
            value=""
            v-model="newArticle.selectedBoard"
          />
          <Icon class="top-dropDownIcon" name="dropdown" />
        </label>
        <span class="top-span">
          <Icon class="top-alertIcon" name="alert" />
          <span class="top-txt">發文規則</span>
        </span>
      </div>
      <div class="form-mid">
        <Icon
          class="mid-sexIcon"
          name="male"
          v-if="newArticle.sex === 'male'"
        />
        <Icon class="mid-sexIcon" name="female" v-else />
        <div class="mid-info">
          <p class="info-username">{{ newArticle.username }}</p>
          <p class="info-postDate">{{ newArticle.date }}</p>
        </div>
      </div>

      <div class="form-bottom">
        <!-- <textarea
          class="botton-txtAreaTitle"
          placeholder="標題"
          v-model="newArticle.title"
        >
        </textarea> -->

        <div class="bottom-titleWrap">
          <div class="titleWrap-displayTxt">{{ newArticle.title }}</div>
          <textarea
            class="botton-txtAreaTitle"
            placeholder="標題"
            v-model="newArticle.title"
          >
          </textarea>
        </div>

        <div class="bottom-contentWrap">
          <div class="contentWrap-displayTxt">{{ newArticle.content }}</div>
          <textarea
            class="contentWrap-txtAreaContent"
            v-model="newArticle.content"
            placeholder="內容..."
          >
          </textarea>
        </div>
      </div>

      <div class="newArticle-fixBottom">
        <button
          class="fixBottom-btn fixBottom-btnCancel"
          @click.prevent="cancel()"
        >
          取消
        </button>
        <button
          class="fixBottom-btn fixBottom-btnNext"
          @click.prevent="submitArticle()"
        >
          下一步
        </button>
      </div>
    </form>

    <transition name="newArticle-popWindow">
      <div v-if="openWindow" class="popWindow">
        <BackDrop @click.native="openWindow = false" />
        <ul class="window">
          <p>選擇發文看板</p>
          <div class="searchBox">
            <Icon class="dropDownIcon" name="search" />
            <input type="text" placeholder="尋找看板" />
          </div>
          <li @click="setBoard('前端工程師', 'frontend')">前端工程師</li>
          <li @click="setBoard('有趣板', 'funny')">有趣板</li>
          <li @click="setBoard('穿搭板', 'dressup')">穿搭板</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import Icon from "../../Icon";
import dateFormat from "dateformat";
import BackDrop from "../../common/BackDrop";
export default {
  name: "AddArticle",
  components: {
    Icon,
    BackDrop,
  },
  data() {
    return {
      openWindow: false,
      newArticle: {
        sex: this.$store.state.userData.sex,
        username: this.$store.state.userData.name,
        date: dateFormat(new Date(), "yyyy-mm-dd H:M"),
        selectedBoard: "請選擇看板",
        boardPath: "",
        title: "",
        content: "",
      },
    };
  },
  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#fff;");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
  methods: {
    setBoard(selectedBoard, boardPath) {
      this.newArticle.selectedBoard = selectedBoard;
      this.newArticle.boardPath = boardPath;
      this.openWindow = false;
    },
    submitArticle() {
      const newArticle = this.newArticle;
      if (newArticle.selectedBoard === "請選擇看板") {
        alert("請選擇看板!");
        return;
      }
      this.$axios
        .post("/api/user/addarticle", newArticle)
        .then((res) => this.$toast("新增文章成功"))
        .catch((err) => console.error(err));
      newArticle.title = "";
      newArticle.content = "";
      newArticle.selectedBoard = "請選擇看板";
      this.$router.push("/dcard/forum/all");
    },
    cancel() {
      this.$router.push("/dcard/forum/all");
    },
  },

  computed: {
    userData() {
      return this.$store.state.userData;
    },
  },
};
</script>

<style lang="scss" scoped>
.newArticle-root {
  max-width: 700px;
  min-height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 20px 10px 0 10px;
  padding-top: 20px;
}
.newArticle-title {
  width: 100%;
  height: 60px;
  margin-bottom: 20px;
  line-height: 60px;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
}
.newArticle-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
  margin: 0 auto;
}
.form-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  .top-label {
    height: 32px;
    display: flex;
    align-items: center;
    padding: 0 8px;
    border: none;
    border-radius: 8px;
    background-color: rgba(0, 16, 32, 0.06);

    &:hover {
      cursor: pointer;
    }
    .top-input-selectBoard {
      border: none;
      padding: 0;
      &:hover {
        cursor: pointer;
      }
    }
    .top-dropDownIcon {
      width: 18px;
      height: 18px;
      left: 6px;
      fill: rgba(0, 0, 0, 0.5);
    }
  }
  .top-span {
    display: flex;
    align-items: center;
    .top-txt {
      color: rgba(0, 0, 0, 0.25);
      font-size: 14px;
      padding: 0 8px;
    }
  }
}
.form-mid {
  display: flex;
  margin-bottom: 24px;
  .mid-sexIcon {
    margin-right: 8px;
  }
  .mid-info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .info-username {
      font-size: 14px;
    }
    .info-postDate {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.35);
    }
  }
}
.form-bottom {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  .bottom-titleWrap {
    min-height: 40px;
    position: relative;
    font: 28px monospace;
    font-weight: 500;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    margin-bottom: 20px;
    .titleWrap-displayTxt {
      visibility: hidden;
      white-space: pre-wrap; // 連續的空白字元都會被保留。換行會在換行字元、有<br>元素以及被文字空間限制時發生。
      overflow-wrap: break-word; // 表示如果行內沒有多餘的地方容納該單詞到結尾，則那些正常的不能被分割的單詞會被強制分割換行。
    }
    .botton-txtAreaTitle {
      width: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      resize: none;
      border: none;
      /* border: 5px solid black; */
      overflow-y: hidden;
      font: inherit;
      &:focus {
        outline: none;
      }
    }
  }

  .bottom-contentWrap {
    height: 100%;
    flex-grow: 1;
    position: relative;
    font: 14px monospace;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    .contentWrap-displayTxt {
      visibility: hidden;
      white-space: pre-wrap; // 連續的空白字元都會被保留。換行會在換行字元、有<br>元素以及被文字空間限制時發生。
      overflow-wrap: break-word; // 表示如果行內沒有多餘的地方容納該單詞到結尾，則那些正常的不能被分割的單詞會被強制分割換行。
    }
    .contentWrap-txtAreaContent {
      width: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      resize: none;
      border: none;
      /* border: 5px solid black; */
      overflow-y: hidden;
      font: inherit;
      &:focus {
        outline: none;
      }
    }
  }
}
.newArticle-fixBottom {
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: sticky;
  right: 0;
  left: 0;
  bottom: 0;

  .fixBottom-btn {
    height: 44px;
    padding: 0 8px;
    border-radius: 5px;
  }
  .fixBottom-btnNext {
    margin-left: 16px;
    padding: 0 16px;
    background: rgb(90, 176, 219);
    color: #fff;
  }
}
/*popWindow*/
.newArticle-popWindow-enter,
.newArticle-popWindow-leave-to {
  opacity: 0;
  transition: 0.2s;
}
.newArticle-popWindow-enter-active,
.newArticle-popWindow-leave-active {
  transition: 0.2s;
}
.newArticle-popWindow-dropDownIcon {
  width: 18px;
  height: 18px;
  left: 6px;
  fill: rgba(0, 0, 0, 0.5);
}
.popWindow {
  .window {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 900;
    width: 520px;
    display: block;
    padding: 40px 60px;
    border-radius: 8px;
    background: #fff;
    @media (max-width: 768px) {
    }
    @media (max-width: 767px) {
      padding: 30px 40px;
      width: 380px;
    }
    @media (max-width: 414px) {
      padding: 15px 20px;
      width: 300px;
    }
    p {
      font-size: 24px;
      line-height: 33px;
      font-weight: bold;
      margin-bottom: 16px;
    }
    li {
      width: 100%;
      height: 44px;
      line-height: 44px;
      padding: 0 14px;
      &:hover {
        background: rgb(242, 243, 244);
        cursor: pointer;
      }
    }
    .searchBox {
      border: 1px solid rgba(0, 0, 0, 0.15);
      max-width: 400px;
      height: 44px;
      display: flex;
      align-items: center;
      border-radius: 10px;
      margin-bottom: 12px;

      .newArticle-dropDownIcon {
        margin: 0 10px;
        height: 100%;
      }
      input {
        width: 100%;
        border: none;
        border-radius: 0px 10px 10px 0px;
        padding-right: 10px;
        font-weight: 400;
        font-size: 16px;
        &::placeholder {
          color: rgba(0, 0, 0, 0.35);
        }
      }
    }
  }
}
</style>

   