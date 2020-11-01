<template>
  <div class="container">
    <form action="">
      <h1 class="title">發表文章</h1>
      <div class="top">
        <div class="a">
          <input
            class="btn-selectBoard"
            type="button"
            @click="setopen()"
            value="選擇看板"
            v-model="selectvalue"
          />
          <Icon class="dropDownIcon" name="dropdown" />
        </div>

        <p class="draft">
          草稿已暫存
          <span class="postRule"
            ><Icon class="dropDownIcon" name="alert" />發文規則</span
          >
        </p>
      </div>
      <div class="mid">
        <Icon class="dropDownIcon" name="male" />
        <div class="box">
          <p class="username">{{ getUserData.name }}</p>
          <p class="date">10月31日 11:49</p>
        </div>
      </div>

      <input id="title" type="text" placeholder="標題" />
      <div class="textarea" contenteditable="true"></div>
      <div class="bottom">
        <button class="btn-cancel">取消</button>
        <button class="btn-next">下一步</button>
      </div>
    </form>
    <BackDrop v-on:setopen="setopen" v-on:board="board" v-show="open" />
  </div>
</template>

<script>
import Icon from "./Icon";
import BackDrop from "./BackDrop";
export default {
  name: "edit",
  components: {
    Icon,
    BackDrop,
  },
  data() {
    return {
      open: false,
      selectvalue: "請選則看板",
    };
  },
  methods: {
    setopen() {
      this.open = !this.open;
      this.$emit("setopen");
    },
    board(board) {
      this.selectvalue = board;
    },
  },
  computed: {
    getUserData() {
      return this.$store.getters.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.a {
  display: flex;
  svg {
    background: black;
  }
}
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-color: #fff;
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
  input[type="text"] {
    border: none;
    font-weight: 500;
    font-size: 28px;
    margin-bottom: 20px;
  }
  .textarea {
    width: 100%;
    height: 100%;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    &:focus {
      outline: none;
    }
  }
}

.btn-selectBoard {
  background: rgba(0, 16, 32, 0.06);
  font-size: 14px;
  display: flex;
  align-items: center;
  padding: 6px 4px 6px 8px;
  border-radius: 8px;
  .dropDownIcon {
    width: 18px;
    height: 18px;
    fill: rgba(0, 0, 0, 0.5);
  }
}
.mid {
  margin-bottom: 24px;
  display: flex;
  svg {
    margin-right: 8px;
  }
  .box {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .username {
      font-size: 14px;
    }
    .date {
      font-size: 12px;
    }
  }
}
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.bottom {
  position: absolute;
  left: 0;
  right: 0;
  max-width: 680px;
  height: 68px;
  bottom: 0;
  margin: 0 auto;
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
  .btn-next {
    margin-left: 16px;
  }
}
</style>

     