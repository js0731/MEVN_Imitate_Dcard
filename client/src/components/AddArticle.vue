
<template>
  <div>
    <form action="">
      <h1 class="title">發表文章</h1>
      <div class="block_top">
        <div class="box_selectBoard">
          <input
            class="selectBoard"
            type="button"
            @click="openWindow = !openWindow"
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
      <SelectBoard
        :openWindow="openWindow"
        @closeWindow="openWindow = !openWindow"
        @setBoard="setBoard"
        v-if="openWindow"
      />
    </transition>
  </div>
</template>

<script>
import Icon from "./Icon";
import SelectBoard from "./SelectBoard";
import moment from "moment";

export default {
  components: {
    Icon,
    SelectBoard,
  },
  data() {
    return {
      openWindow: false,
      newArticle: {
        sex: this.$store.getters.user.sex,
        username: this.$store.getters.user.name,
        date: new Date().getTime(),
        selectedBoard: "穿搭板",
        title: "",
        content: "",
      },
    };
  },
  methods: {
    setBoard(selectBoard) {
      this.newArticle.selectedBoard = selectBoard;
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
  padding-top: 68px;
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
</style>

   