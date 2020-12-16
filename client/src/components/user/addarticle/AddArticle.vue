
<template>
  <div class="container">
    <h1 class="title">發表文章</h1>
    <form action="">
      <div class="block_top">
        <label @click="openWindow = true">
          <input
            class="selectBoard"
            type="button"
            value=""
            v-model="newArticle.selectedBoard"
          />
          <Icon class="dropDownIcon" name="dropdown" />
        </label>
        <span class="postRule">
          <Icon class="alertIcon" name="alert" />發文規則
        </span>
      </div>
      <div class="block_mid">
        <Icon class="maleIcon" name="male" v-if="(newArticle.sex = 'male')" />
        <Icon class="maleIcon" name="female" v-else />
        <div class="info">
          <p class="username">{{ newArticle.username }}</p>
          <p class="postDate">{{ newArticle.date | handleDate }}</p>
        </div>
      </div>
      <div class="block_bottom">
        <textarea
          class="inputTitle"
          placeholder="標題"
          v-model="newArticle.title"
        >
        </textarea>
        <div class="boxContent">
          <div class="dummy">{{ newArticle.content }}</div>
          <textarea class="inputContent" v-model="newArticle.content">
          </textarea>
        </div>
      </div>

      <div class="footer">
        <button class="btnCancel">取消</button>
        <button class="btnNext" @click.prevent="submitArticle()">下一步</button>
      </div>
    </form>
    <transition name="fade">
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
import moment from "moment";
import BackDrop from "../../common/BackDrop";
export default {
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
        date: new Date().getTime(),
        selectedBoard: "請選擇看板",
        boardPath: "",
        title: "",
        content: "",
      },
    };
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
        alert("選看板拉87");
        return;
      }
      this.$axios
        .post("/api/user/addarticle", newArticle)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
      newArticle.title = "";
      newArticle.content = "";
      newArticle.selectedBoard = "請選擇看板";
    },
  },
  filters: {
    handleDate: function (date) {
      return moment(date).format("MM月DD M:DD");
    },
  },
  computed: {
    userData() {
      return this.$store.state.userData;
    },
  },

  beforeCreate() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#fff;");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
};
</script>

<style lang="scss" scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transition: 0.2s;
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.2s;
}
.container {
  max-width: 768px;
  min-height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0 50px;
}
.title {
  width: 100%;
  height: 60px;
  margin-bottom: 20px;
  line-height: 60px;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
}
form {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
  padding-top: 28px;
  margin: 0 auto;
}
.block_top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  label {
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
    input[type="button"] {
      border: none;
      padding: 0;
      &:hover {
        cursor: pointer;
      }
    }
    .dropDownIcon {
      width: 18px;
      height: 18px;
      left: 6px;
      fill: rgba(0, 0, 0, 0.5);
    }
  }
}
.block_mid {
  display: flex;
  margin-bottom: 24px;
  .maleIcon {
    margin-right: 8px;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .username {
      font-size: 14px;
    }
    .postDate {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.35);
    }
  }
}
.block_bottom {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  .inputTitle {
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
    font-size: 28px;
    font-weight: 500;
    border: none;
    resize: none;
  }
  .boxContent {
    height: 100%;
    flex-grow: 1;
    position: relative;
    font: 14px monospace;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    .dummy {
      visibility: hidden;
      white-space: pre-wrap; // 連續的空白字元都會被保留。換行會在換行字元、有<br>元素以及被文字空間限制時發生。
      overflow-wrap: break-word; // 表示如果行內沒有多餘的地方容納該單詞到結尾，則那些正常的不能被分割的單詞會被強制分割換行。
    }
    .inputContent {
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
.footer {
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: sticky;
  right: 0;
  left: 0;
  bottom: 0;
  border: 1px solid black;
  button {
    height: 44px;
    padding: 0 8px;
    border-radius: 5px;
    &:hover {
      background: rgb(90, 176, 219);
    }
  }
  .btnNext {
    margin-left: 16px;
  }
}
/* ---------------未處理-------------------------------------------- */
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

      .dropDownIcon {
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

   