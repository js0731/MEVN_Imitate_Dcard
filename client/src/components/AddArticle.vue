<template>
  <div class="container">
    <form action="">
      <p class="title">發表文章</p>
      <select name="board" id="">
        <option value="前端工程師">前端工程師</option>
        <option value="有趣板">有趣板</option>
        <option value="穿搭板">穿搭板</option>
      </select>
      <label for="title">標題</label>
      <input id="title" type="text" />
      <label for="content">內容</label>
      <input id="content" type="text" />
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
form {
  padding: 68px 80px 0;
  width: 840px;
  height: 100vh;
  .title {
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-bottom: 1px solid;
  }
}
</style>
