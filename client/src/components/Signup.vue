<template>
  <div class="container">
    <form action="">
      <button class="facbook">
        <SignIcon name="facebook" />Facebook 註冊 / 登入
      </button>
      <button class="google">
        <SignIcon name="google" />Google 註冊 / 登入
      </button>
      <!-- <button class="apple"><SignIcon name="apple" />Apple 註冊 / 登入</button> -->
      <span class="or">或</span>
      <label for="name">姓名</label>
      <input id="name" type="email" />
      <label for="email">常用信箱</label>
      <input id="email" type="email" />
      <label for="password">密碼</label>
      <input id="password" type="password" />

      <label for="boy">男</label>
      <input id="boy" type="radio" name="sex" value="male" />
      <label for="girl">女</label>
      <input id="girl" type="radio" name="sex" value="female" />
      <button class="signup">註冊 / 登入</button>
      <span class="content">註冊/登入即代表您同意遵守 Dcard 使用協議</span>
    </form>
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
  flex-direction: column;
  justify-content: flex-start;
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
  border-radius: 5px;
  button {
    height: 48px;
    padding: 0 16px;
    font-size: 16px;
    border-radius: 10px;
    border: 1px solid #d9d9d9;
    position: relative;
    color: balck;
    margin-bottom: 20px;
    svg {
      position: absolute;
      left: 16px;
    }
  }
  .facbook {
    background: #425f9c;
    color: #fff;
  }
  .google {
    background: #fff;
    color: balck;
  }
  /* .apple {
    background: #000000;
    color: #fff;
  } */
  .or {
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
  .signup {
    color: #fff;
    background: rgb(51, 151, 207);
  }
  .content {
    text-align: center;

    color: rgba(0, 0, 0, 0.35);
  }
}
</style>
