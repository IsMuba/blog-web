<!-- 关于我 -->
<template>
  <div>
    <BaseBanner bannerCode="banner-aboutme"></BaseBanner>
    <div class="common-wrap">
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
      this.$ajax({
        methods: 'get',
        url: '/news',
        params: {
          currentPage: 1,
          pageSize: 1,
          category: 'about-me'
        }
      }).then((data) => {
        let result = data.records.map((item) => {
          return {
            ...item,
            cover: this.$baseUrl + item.cover
          }
        })
        this.detail = result[0]
      })
    }
  }
}
</script>
