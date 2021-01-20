<template>
  <div class="login-root">
    <form class="login-form">
      <label for="email">
        <span>常用信箱</span>
        <input
          v-model="loginUser.email"
          @keyup="validateInput('email')"
          id="email"
          type="email"
          minlength="3"
          maxlength="50"
          ref="email"
          required
        />
      </label>

      <label for="password">
        <span>密碼</span>
        <input
          v-model="loginUser.password"
          @keyup="validateInput('password')"
          name="password"
          id="password"
          type="password"
          minlength="3"
          maxlength="50"
          required
          ref="password"
        />
      </label>
      <button class="btn-login" @click.prevent="submitLoginForm()">登入</button>
    </form>
  </div>
</template>

<script>
import Icon from "../Icon";
import jwt_decode from "jwt-decode";
import validateInput from "../../utils/validateform.js";
export default {
  data() {
    return {
      loginUser: {
        email: "",
        password: "",
      },
      validateInput: validateInput,
    };
  },
  components: {
    Icon,
  },
  methods: {
    submitLoginForm() {
      const loginUserData = this.loginUser;
      this.$axios
        .post(
          "https://protected-garden-60426.herokuapp.com/user/login",
          loginUserData
        )

        .then((res) => {
          // 取出token
          const { token } = res.data;
          // 存儲到 localStorage
          localStorage.setItem("myToken", token);
          const decoded = jwt_decode(token); // 解析token
          // 空值就回傳false
          this.$store.dispatch("setAuthenticated", !this.isEmpty(decoded));
          this.$store.dispatch("storeUserData", decoded);
          this.$router.push("/dcard/forum/all");
          // this.$toast("0....0");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    isEmpty(value) {
      // 空值為true 有值為false
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.login-root {
  label {
    font-size: 14px;
    margin-bottom: 16px;
    span {
      display: inline-block;
      margin-bottom: 10px;
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
      &:valid {
        border: 2px solid green;
      }
    }
  }
  .btn-login {
    width: 100%;
    height: 48px;
    border-radius: 10px;
    border: 1px solid #d9d9d9;
    color: #fff;
    margin-bottom: 20px;
    background: rgb(51, 151, 207);
  }
}
</style>
