<template>
  <div class="divider" :style="style"></div>
  <!-- <div></div> -->
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: '#fff'
    },
    height: {
      type: Number,
      default: 10
    },
    margin: {
      type: String,
      default: '0px'
    }
  },
  computed: {
    style() {
      return {
        backgroundColor: this.bgColor,
        height: this.height + 'px',
        margin: this.margin
      }
    }
  }
}
</script>

<style scoped>
.divider {
  width: 100%;
}
</style>
