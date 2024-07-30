<!-- 开源项目 -->
<template>
  <div>
    <BaseBanner bannerCode="banner-opensource"></BaseBanner>
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
          pageSize: 10,
          category: 'open-source'
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
