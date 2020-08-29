<template>
  <!-- eslint-disable -->
  <div class="p-layout">
    <div>
      <div class="flex-between">
        <div>姓名</div>
        <div></div>
      </div>
      <button @click="isInsert = !isInsert">isInsert</button>
      <collapse title="aaa">
        <div>
          <div>aaaaaa</div>
          <div v-show="isInsert">bbbbbbbbbb</div>
        </div>
      </collapse>
      <div class="flex-between">
        <div>姓名</div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import collapse from '@/components/collapse/collapse'

export default {
  data() {
    return {
      isInsert: false,
    }
  },
  components: {
    collapse
  }
}
</script>

<style lang="less">
.p-layout {
  .flex-between {
    display: flex;
    justify-content: space-between;
  }
}
</style>
