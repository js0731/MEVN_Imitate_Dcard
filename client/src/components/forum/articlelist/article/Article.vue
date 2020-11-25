<template>
  <div class="container">
    <div class="topBar">
      <Icon name="female" />
      <span>匿名</span>
    </div>
    <article>
      <h1 class="title">{{ article[0].title }}</h1>
      <div class="info">
        {{ article[0].selectedBoard }} · {{ article[0].date | handleDate }}
      </div>
      <div class="content">
        {{ article[0].content }}
      </div>
    </article>
  </div>
</template>

<script>
import Icon from "../../../Icon";
import moment from "moment";
export default {
  data() {
    return {
      article: Array,
    };
  },
  components: {
    Icon,
  },
  created() {
    this.$axios
      .get(
        `/api/board/${this.$route.params.boardPath}/${this.$route.params.id}`
      )
      .then((res) => {
        this.article = res.data.article;
        console.log(this.article);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  filters: {
    handleDate: function (date) {
      return moment(date).format("MM月DD M:DD");
    },
  },
};
</script>


<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 728px;
  padding: 0 60px;
  background: #fff;
  margin: 0 12px 20px 12px;
  padding-bottom: 16px;
  border-radius: 5px;
  .topBar {
    width: 100%;
    height: 90px;
    padding: 40px 0 22px 0;
    display: flex;
    align-items: center;

    svg {
      padding-right: 8px;
    }
    span {
      font-size: 14px;
    }
  }
  article {
    width: 640px;
    height: 155px;
    .title {
      font-size: 28px;
      margin-bottom: 12px;
    }
    .info {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.35);
      margin-bottom: 20px;
    }
    .content {
      font-size: 16px;
      line-height: 28px;
      color: rgba(0, 0, 0, 0.75);
      font-weight: 400;
    }
  }
}
</style>
