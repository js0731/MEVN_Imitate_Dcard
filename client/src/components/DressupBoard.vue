<template>
  <div class="container">
    <img src="http://fakeimg.pl/728x242/" alt="" />
    <div class="topBar">
      <div class="follow">
        <img src="../assets/img/dress.jpg" alt />
        <h2 class="title">穿搭</h2>
        <button>追蹤</button>
      </div>
      <ul class="sort">
        <li>熱門</li>
        <li>最新</li>
        <li>板規</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          sex: "boy",
          userName: "js002",
          board: "穿搭板",
          date: "7月22日 10:56",
          title: "指考榜首2",
          paragraph:
            "2不知道他是高興還是無感（因為臉上看不太出來表情雖然我自己有能力考上台大醫學我一定超開心（學店夢想但感覺一旁的媽媽讓我很出戲一度讓我以為她才是榜首",
          img:
            "https://img.ltn.com.tw/Upload/partner/page/2019/09/11/190911-4824-01-bIL1w.jpg",
          response: 222,
          love: 2222,
        },
      ],
    };
  },
};
</script>


<style lang="scss" scoped>
.container {
  height: 300vh;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  background: #fff;
}
.topBar {
  width: 100%;
  height: 141px;
  padding: 20px 60px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 68px;
  .follow {
    height: 60px;
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .title {
      font-size: 30px;
      flex-grow: 1;
      margin-left: 10px;
    }
    button {
      width: 56px;
      height: 36px;
      background: #3397cf;
      border: none;
      border-radius: 10px;
      font-size: 14px;
      color: #ffffff;
      &:focus {
        outline: none;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
  .sort {
    display: flex;
    li {
      height: 60px;
      line-height: 60px;
      padding: 0 16px;
      color: rgba(0, 0, 0, 0.35);
      &:hover {
        cursor: pointer;
        color: black;
        height: 61px;
        border-bottom: 2px solid rgb(51, 151, 207);
      }
    }
  }
}
</style>
