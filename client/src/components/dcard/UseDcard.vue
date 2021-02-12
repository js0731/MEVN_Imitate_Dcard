<template>
  <div class="usedcard-root">
    <button
      class="usedcard-btn"
      @click="toggle = true"
      :class="{ btnActive: toggle }"
    >
      註冊
    </button>
    <button
      class="usedcard-btn"
      @click="toggle = false"
      :class="{ btnActive: !toggle }"
    >
      登入
    </button>
    <keep-alive>
      <RegisterForm v-if="toggle" v-on:toggleLogin="toggleLogin" />
      <LoginForm v-else />
    </keep-alive>

    <div class="usedcard-protocol">
      <span>本網站用於練習排版 Dcard，</span>
      <span> 非商業用途。</span>
    </div>
  </div>
</template>

<script>
import Icon from "../Icon";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default {
  data() {
    return {
      toggle: false,
    };
  },
  methods: {
    toggleLogin() {
      this.toggle = false;
    },
  },
  components: {
    Icon,
    LoginForm,
    RegisterForm,
  },
};
</script>

<style lang="scss" scoped>
.usedcard-root {
  width: 450px;
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  justify-content: space-between;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  padding: 25px 50px;
  border-radius: 5px;

  @media (max-width: 768px) {
    width: 400px;
    padding: 20px 40px;
  }
  @media (max-width: 767px) {
    width: 350px;
    padding: 20px 30px;
    margin-top: 25px;
  }
  @media (max-width: 414px) {
    width: 300px;
    padding: 20px 30px;
  }
  .usedcard-btn {
    width: 45%;
    height: 48px;
    margin-bottom: 20px;
    position: relative;
    background-color: #4bcffa;
    color: rgba(255, 255, 255, 1);
    padding: 4px;
    border-radius: 8px;
    box-shadow: 0 9px 0 #0fbcf9, 0px 9px 25px rgba(0, 0, 0, 0.2);
  }
  .btnActive {
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3) inset;
    top: 6px;
  }
  .btn-thirdParty {
    width: 100%;
    height: 48px;
    padding: 0 16px;
    font-size: 16px;
    border-radius: 10px;
    border: 1px solid #d9d9d9;
    position: relative;
    color: black;
    margin-bottom: 20px;
    svg {
      position: absolute;
      left: 16px;
    }
  }
  .btn-facebook {
    background: #425f9c;
    color: #fff;
  }
  .btn-google {
    background: #fff;
    color: balck;
  }
  .text-or {
    width: 100%;
    text-align: center;
    position: relative;
    color: rgba(0, 0, 0, 0.35);
    margin-bottom: 16px;
    &::after {
      content: "";
      position: absolute;
      right: 0;
      width: 150px;
      height: 1px;
      top: calc(50% - 0.5px);
      background: rgba(0, 0, 0, 0.35);
      right: 0px;
    }
    &::before {
      content: "";
      position: absolute;
      left: 0;
      width: 150px;
      height: 1px;
      top: calc(50% - 0.5px);
      background: rgba(0, 0, 0, 0.35);
      right: 0px;
    }
  }
  label {
    font-size: 14px;
    padding-bottom: 10px;
  }
  input[type="email"],
  [type="password"],
  [type="text"] {
    width: 100%;
    height: 44px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    margin-bottom: 16px;
    background-color: rgb(232, 240, 254);
    text-indent: 16px;
    font-size: 16px;
  }
  .signup {
    color: #fff;
    background: rgb(51, 151, 207);
  }
  .usedcard-protocol {
    display: flex;
    color: rgba(0, 0, 0, 0.35);
    margin: 0 auto;
    span {
      text-align: center;
      padding: 2px 0;
    }
    @media (max-width: 767px) {
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>
