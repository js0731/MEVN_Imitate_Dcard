<template>
  <div class="container">
    <form @submit.prevent="submitRegisterForm">
      <label for="userName">
        <span>姓名</span>
        <input
          v-model="registerUser.name"
          @keyup="validateInput('name')"
          id="userName"
          type="text"
          required
          minlength="3"
          maxlength="50"
          ref="name"
        />
      </label>
      <label for="userEmail">
        <span>常用信箱</span>
        <input
          v-model="registerUser.email"
          @keyup="validateInput('email')"
          id="userEmail"
          type="email"
          minlength="3"
          maxlength="50"
          required
          ref="email"
        />
      </label>
      <label for="userPassword">
        <span>密碼</span>
        <input
          v-model="registerUser.password"
          @keyup="validateInput('password')"
          ref="password"
          id="userPassword"
          type="password"
          maxlength="50"
          minlength="6"
          required
        />
      </label>
      <div class="radioBox">
        <label for="male">
          <span> <Icon name="male" /></span>
          <input
            v-model="registerUser.sex"
            id="male"
            type="radio"
            name="sex"
            value="male"
            required
          />
        </label>

        <label for="female">
          <span><Icon name="female" /></span>
          <input
            v-model="registerUser.sex"
            id="female"
            type="radio"
            name="sex"
            value="female"
            required
          />
        </label>
      </div>
      <button class="btn-signup">註冊</button>
    </form>
  </div>
</template>

<script>
import SignIcon from "../SignIcon";
import Icon from "../Icon";
import validateInput from "../../utils/validateform.js";
export default {
  data() {
    return {
      registerUser: {
        name: "",
        sex: "",
        email: "",
        password: "",
      },
      validateInput: validateInput,
    };
  },
  components: {
    SignIcon,
    Icon,
  },
  methods: {
    submitRegisterForm() {
      this.$loading();
      const userDate = this.registerUser;
      this.$axios
        .post("/api/user/register", userDate) // 跨域路由加上'/api'
        .then((res) => {
          console.log(res);
          this.$toast(res.data);
          for (let key in this.registerUser) {
            this.registerUser[key] = "";
          }
          this.$loading(false);
        })
        .catch((err) => {
          console.error(err);
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
form {
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
      &:valid {
        border: 2px solid green;
      }
    }
  }
  .radioBox {
    display: flex;
    justify-content: space-around;
    input[type="radio"] {
      width: 32px;
      height: 32px;
    }
  }
  .btn-signup {
    width: 100%;
    height: 48px;
    border-radius: 10px;
    border: 1px solid #d9d9d9;
    background: rgb(51, 151, 207);
    color: #fff;
    margin-bottom: 20px;
  }
}
.invalid {
  border: 2px solid red !important;
  background: red;
}
</style>
