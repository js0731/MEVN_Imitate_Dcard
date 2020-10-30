<template>
  <div class="containerrr">
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
    <article v-for="(art, index) in data" :key="index">
      <div class="container">
        <div class="user">
          <svg
            v-if="art.sex == 'girl'"
            width="20"
            height="20"
            viewBox="0 0 40 40"
          >
            <path fill="#F48FB1" d="M40 20a20 20 0 11-40 0 20 20 0 0140 0" />
            <path
              fill="#CB3A6B"
              d="M28.7 17.5a9.6 9.6 0 00-1.4-4.4l.9-.6S25.5 6 17.9 7.3c-5.5 1-7.7 5.4-7.4 9C10.8 19.8 8.3 31 8.3 31l6.7 1.7a4.6 4.6 0 00-.7 1.1v.1a4.2 4.2 0 00-.4.8l-1.3 3.8a20 20 0 0010.6 1.1L23 37c.4-2-.4-4-2-5 0-1.1 0-3 .5-3.1 3-.6 5.1-2.5 6.2-5.3.3.2.6.2 1 .2a1.5 1.5 0 00-.2-3c.1-1 .2-2.2 0-3.3z"
            />
            <path />
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 40 40">
            <path fill="#81D4FA" d="M40 20a20 20 0 11-40 0 20 20 0 0140 0" />
            <path
              fill="#2490BF"
              d="M16 7.9C12.4 7.4 9.3 6 9.3 6s5.5 4.3 5 5.3c-.4 1-4.2 0-4.2 0l4 2a9.7 9.7 0 00-1.5 4.6l.1 3.4a1.5 1.5 0 10.8 2.9 8.3 8.3 0 006.2 5.3c.6 0 .6 2 .6 3.2-1.6 1-2.5 3-2 5v2.2a20.2 20.2 0 009.9-1.6l-.7-2.7v-.4l-.2-.4-.2-.4-.2-.3-.2-.3c-.7-1-1.7-1.6-2.9-1.8l.6-2.3s1.4-1 3-2.6l.4 1.3 1.4-2.5.9-1.8s3.8-10.3.8-13.9c-2.6-3-11-1.9-14.7-2.3"
            />
          </svg>
          {{ art.userName }}
          {{ art.date }}
        </div>
        <div class="content">
          <h2>{{ art.title }}</h2>
          <p>{{ art.paragraph }}</p>
        </div>
        <div class="status">
          <div>
            <img
              width="16"
              height="16"
              src="../assets/img/love.jpg"
              alt="愛心"
            />
            <span>{{ art.response }}</span>
          </div>
          <div>
            <img
              width="16"
              height="16"
              src="../assets/img/response1.png"
              alt="愛心"
            />
            <span>{{ art.love }}</span>
          </div>
          <div>
            <img
              width="16"
              height="16"
              src="../assets/img/folder.png"
              alt="愛心"
            />
            <span>收藏</span>
          </div>
        </div>
      </div>
      <div class="pic">
        <img :src="art.img" alt />
      </div>
    </article>
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
.containerrr {
  width: 728px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  background: #fff;
  margin: 0 12px;
}
.topBar {
  width: 100%;
  height: 141px;
  padding: 20px 60px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  position: sticky;
  top: 48px;
  background: #fff;
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
article {
  width: 648px;
  padding: 20px;
  margin: 0 auto;
  border-bottom: 1px solid rgb(233, 233, 233);
  display: flex;
}
.container {
  width: 504px;
  height: 116px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .user {
  }
  .content {
    h2 {
      font-size: 18px;
      margin-bottom: 12px;
    }
    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .status {
    display: flex;
    img {
      margin-right: 5px;
    }
    span {
      margin-right: 10px;
    }
  }
}
.pic {
  align-self: flex-end;
  img {
    width: 84px;
    height: 84px;
  }
}
</style>
