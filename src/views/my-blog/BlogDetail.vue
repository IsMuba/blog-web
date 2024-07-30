<!-- 我的博客详情 -->
<template>
  <div>
    <BaseBanner bannerCode="banner-myblog"></BaseBanner>
    <div class="common-wrap">
      <div class="content-top">
        <div class="back-btn" @click="$router.go(-1)">
          <Icon type="ios-arrow-back" size="30" />
          返回
        </div>
        <h2 class="title">{{ detail.title }}</h2>
      </div>
      <div v-if="detail" v-html="detail.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: null
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const id = this.$route.params.id
      this.$ajax({
        methods: 'get',
        url: '/news/' + id
      }).then((data) => {
        this.detail = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.common-wrap {
  .content-top {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 30px;

    .back-btn {
      position: absolute;
      left: 0;
      display: flex;
      align-items: center;
      font-size: 18px;
      color: #333;
      cursor: pointer;

      &:hover {
        color: #000;
      }
    }

    .title {
      font-size: 36px;
      font-weight: 600;
      color: #000;
    }
  }
}
</style>
