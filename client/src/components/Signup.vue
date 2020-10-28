<template>
  <div class="container">
    <form action="">
      <button class="facbook">
        <SignIcon name="facebook" />Facebook 註冊 / 登入
      </button>
      <button class="google">
        <SignIcon name="google" />Google 註冊 / 登入
      </button>
      <button class="apple"><SignIcon name="apple" />Apple 註冊 / 登入</button>
      <span>或</span>
      <label for="email">常用信箱</label>
      <input type="email" id="email" />
      <label for="password">密碼</label>
      <input id="password" type="password" />
      <input type="checkbox" />
      <button class="btn">註冊 / 登入</button>
    </form>
    <footer></footer>
  </div>
</template>

<script>
import SignIcon from "./SignIcon";
export default {
  components: {
    SignIcon,
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #00324e;
  margin-top: 48px;
}
form {
  margin: 50px 0;
  width: 460px;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 30px 50px;
  button {
    height: 48px;
    padding: 0 16px;
    font-size: 16px;
    border-radius: 10px;
    border: 1px solid #d9d9d9;
    position: relative;
    svg {
      position: absolute;
      left: 16px;
    }
  }
  .facbook {
    background: #425f9c;
    color: #fff;
    margin-bottom: 20px;
  }
  .google {
    background: #fff;
    color: balck;
    margin-bottom: 20px;
  }
  .apple {
    background: #000000;
    color: #fff;
  }
  span {
    text-align: center;
    position: relative;
    color: rgba(0, 0, 0, 0.35);
    padding: 16px 0;
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
  [type="password"] {
    width: 100%;
    height: 44px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    margin-bottom: 16px;
    background-color: rgb(232, 240, 254);
    text-indent: 16px;
    font-size: 16px;
  }
  .btn {
    color: #fff;
    background: rgb(51, 151, 207);
  }
}
</style>
