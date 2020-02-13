<template>
  <div class="f-1 f-col a-center j-center item" :style="{color: color}">
    <div>
      <slot name="title"></slot>
    </div>
    <div>
      <slot name="num"></slot>例
    </div>
    <div class="compare">
      较昨日:
      <slot name="compare"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cardItem',
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 颜色
    color: {
      type: String,
      default: ''
    },
    // 数据
    num: {
      type: [Number, String],
      default: 0
    },
    // 比较
    compare: {
      type: [Number, String],
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
  }
  .compare {
    font-weight: 400;
    font-size: 12px;
    color: grey;
  }
}
</style>