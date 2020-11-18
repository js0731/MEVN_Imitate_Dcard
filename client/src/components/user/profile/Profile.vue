<template>
  <div class="container">
    <aside>
      <div class="box">
        <Icon class="avatar" name="male" />
        <span class="userName">{{ getUserData.name }}</span>
        <span class="userDate">{{ getUserData.date | handleDate }}</span>
      </div>
      <ul>
        <li>
          <router-link to="#"><Icon name="favorited" />我的收藏</router-link>
        </li>
        <li>
          <router-link to="#"><Icon name="setting" />設定</router-link>
        </li>
      </ul>
    </aside>
    <div class="main">
      <div class="title">我的收藏</div>
      <ul>
        <li>
          <div class="userInfo"><Icon name="female" />語言 ． 1月7日 12:30</div>
          <div class="box">
            <h2>480➡️735 給多益還沒過的大四生</h2>
            <div class="content">
              普通市立高中，英文程度普 普通私立大學文組（普）
              目前只交過一個男友（普到爆）
              這篇給底子不好的人看～底子好就當笑話看看
              聽信友人說多益這種東西隨隨考隨隨過 本人抱著僥倖的心態結果480謝謝
              然後就一路廢到大三結束 覺得自己就爛考不過ㄏㄏ
              活得高亢低落～得過且過～
            </div>
          </div>

          <div class="status">123</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Icon from "../../Icon";
import moment from "moment";
export default {
  components: {
    Icon,
  },
  computed: {
    getUserData() {
      return this.$store.getters.user;
    },
  },
  filters: {
    handleDate: function (date) {
      return moment(date).format("YYYY年MM月DD");
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
}
aside {
  height: 100%;
  display: flex;

  flex-direction: column;
  width: 208px;
  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    .avatar {
      width: 100px;
      height: 100px;
      margin-bottom: 16px;
    }
    .userName {
      margin-bottom: 10px;
    }
    span {
      font-size: 24px;
      color: #fff;
    }
    .userDate {
      font-size: 14px;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 1 0%;
    height: 100%;
    overflow: auto;
    li {
      width: 100%;
      a {
        display: flex;
        align-items: center;
        height: 44px;
        font-size: 16px;
        color: rgb(255, 255, 255);
        padding: 0 16px;
        border-radius: 10px;
        font-size: 16px;
        line-height: 44px;
        &:hover {
          background-color: rgba(0, 8, 16, 0.4);
        }
        svg {
          width: 24px;
          height: 24px;
          margin-right: 12px;
        }
      }
    }
  }
}
.main {
  width: 760px;
  padding: 20px 60px;
  display: flex;
  flex-direction: column;
  background-color: rgb(242, 243, 244);
  border-radius: 12px;
  .title {
    height: 60px;
    font-size: 24px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    line-height: 60px;
    margin-bottom: 24px;
  }
  ul {
    display: flex;
    flex-direction: column;
    li {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 640px;
      height: 170px;
      background: #fff;
      border-radius: 12px;
      padding: 20px;
      .userInfo {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.35);
        svg {
          margin-right: 8px;
        }
      }
      .box {
        h2 {
          font-size: 18px;
        }
        .content {
          font-size: 14px;
        }
      }

      .status {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.75);
      }
    }
  }
}
</style>
