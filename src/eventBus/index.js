import Vue from 'vue'
/**
 * eventBus使用教程
 * 事件源组件 emit
 * eventBus.$emit('ebOnClickComplete')
 * 
 * 监听订阅组件
 * created() {
    eventBus.$on('ebOnClickComplete', this.clickSave)
  },
  beforeDestroy() {
    // 切记在销毁前关闭事件订阅
    eventBus.$off('ebOnClickComplete', this.clickSave)
  },
 */
export default new Vue()
