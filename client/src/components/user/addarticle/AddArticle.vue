
<template>
  <div>
    <form action="">
      <h1 class="title">發表文章</h1>
      <div class="block_top">
        <div class="box_selectBoard">
          <input
            class="selectBoard"
            type="button"
            @click="openWindow = true"
            value=""
            v-model="newArticle.selectedBoard"
          />
          <Icon class="dropDownIcon" name="dropdown" />
        </div>
        <p class="draft">
          草稿已暫存
          <span class="postRule">
            <Icon class="alertIcon" name="alert" />發文規則
          </span>
        </p>
      </div>
      <div class="block_mid">
        <Icon class="maleIcon" name="male" />
        <div class="box_userInformation">
          <p class="username">{{ newArticle.username }}</p>
          <p class="postDate">{{ newArticle.date | handleDate }}</p>
        </div>
      </div>
      <textarea
        class="inputTitle"
        placeholder="標題"
        v-model="newArticle.title"
      >
      </textarea>
      <textarea class="inputContent" v-model="newArticle.content"> </textarea>
      <div class="block_bottom">
        <button class="btnCancel">取消</button>
        <button class="btnNext" @click.prevent="submitArticle()">下一步</button>
      </div>
    </form>
    <transition name="fade">
      <div v-if="openWindow">
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
        sex: this.$store.getters.user.sex,
        username: this.$store.getters.user.name,
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
      newArticle.selectedBoard = "穿搭板";
    },
  },
  filters: {
    handleDate: function (date) {
      return moment(date).format("MM月DD M:DD");
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
form {
  display: flex;
  flex-direction: column;
  padding-top: 28px;
  max-width: 680px;
  height: 100vh;
  margin: 0 auto;
  .title {
    line-height: 60px;
    text-align: center;
    border-bottom: 1px solid;
    margin-bottom: 20px;
  }
  .inputTitle {
    border: none;
    min-height: 38px;
    font-weight: 500;
    font-size: 28px;
    margin-bottom: 20px;
    overflow: visible;
  }
  .inputContent {
    width: 100%;
    height: 100%;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    margin-bottom: 68px;
    &:focus {
      outline: none;
    }
  }
}
.block_top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  .box_selectBoard {
    display: flex;
    background: rgba(0, 16, 32, 0.06);
    font-size: 14px;
    display: flex;
    align-items: center;
    padding: 6px 4px 6px 8px;
    border-radius: 8px;
    input[type="button"] {
      border: none;
      &:hover {
        cursor: pointer;
      }
    }
    .dropDownIcon {
      width: 18px;
      height: 18px;
      fill: rgba(0, 0, 0, 0.5);
    }
  }
}
.block_mid {
  margin-bottom: 24px;
  display: flex;
  .maleIcon {
    margin-right: 8px;
  }
  .box_userInformation {
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
  position: fixed;
  background: #fff;
  left: 50%;
  right: 0;
  margin-left: -340px;
  max-width: 680px;
  height: 68px;
  bottom: 0;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  button {
    height: 44px;
    border-radius: 5px;
    padding: 0 8px;
    &:hover {
      background: rgb(90, 176, 219);
    }
  }
  .btnNext {
    margin-left: 16px;
  }
}
.window {
  position: absolute;
  z-index: 500;
  left: 0;
  right: 0;
  top: 185px;
  margin: 0 auto;
  max-width: 520px;
  padding: 40px 60px;
  border-radius: 8px;
  box-shadow: 0 0 1px black;

  background: #fff;
  p {
    font-size: 24px;
    line-height: 33px;
    font-weight: bold;
    margin-bottom: 16px;
  }
  li {
    max-width: 100%;
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
</style>

   