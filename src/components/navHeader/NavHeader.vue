<template>
  <div class="head">
    <div class="title">
      新型冠状病毒肺炎疫情
    </div>
    <div class="desc">
      实时动态
    </div>
    <img src="https://cdn.xieyezi.com/nvov.jpg" alt="">
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  .head {
    width: 100%;
    height: 150px;
    position: relative;
    color: #fff;
    img {
      width: 100%;
      height: 100%;
    }
    .title {
      width: 100%;
      text-align: center;
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 22px;
    }
    .desc {
      position: absolute;
      top: 70%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 18px;
    }
  }
</style>