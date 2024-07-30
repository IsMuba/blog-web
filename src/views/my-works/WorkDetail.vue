<!-- 项目详情 -->
<template>
  <div>
    <BaseBanner bannerCode="banner-myworks"></BaseBanner>
    <div class="common-wrap about-work">
      <div class="top-title">
        <div class="back-btn" @click="$router.go(-1)">
          <Icon type="ios-arrow-back" size="30" />
          返回
        </div>
        <h2 class="title">关于项目</h2>
      </div>

      <div class="work-info">
        <div class="work-item">
          <div class="label">项目名称：</div>
          <div class="value">{{ detail.title || '--' }}</div>
        </div>
        <div class="work-item">
          <div class="label">项目描述：</div>
          <div class="value">{{ detail.detail || '--' }}</div>
        </div>
      </div>
    </div>
    <div class="common-wrap work-show">
      <h2 class="title">项目展示</h2>
      <Carousel
        loop
        :autoplay-speed="5000"
        arrow="never"
        :autoplay="swiperList.length > 1"
        :dots="swiperList.length > 1 ? 'inside' : 'none'"
      >
        <CarouselItem v-for="(item, index) in swiperList" :key="index">
          <img :src="item" style="display: block; width: 100%" />
        </CarouselItem>
      </Carousel>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {}
    }
  },
  computed: {
    swiperList() {
      return this.detail.album || []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      document.documentElement.scrollTop = 0
      let id = this.$route.params.id
      this.$ajax('/product/' + id).then((data) => {
        this.detail = {
          ...data,
          cover: this.$baseUrl + data.cover,
          album: data.album
            ? data.album.map((tt) => {
                return this.$baseUrl + tt
              })
            : []
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.about-work {
  .top-title {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 84px;
    margin-bottom: 72px;

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
  }

  .title {
    position: relative;
    display: flex;
    justify-content: center;
    font-size: 32px;
    color: #131422;
    text-align: center;

    &::after {
      position: absolute;
      bottom: -10px;
      left: 50%;
      width: 32px;
      height: 4px;
      content: '';
      background: #1b87f3;
      border-radius: 2px;
      transform: translateX(-50%);
    }
  }
}

.work-info {
  .work-item {
    margin-bottom: 40px;

    &:last-child {
      margin-bottom: 0;
    }

    .label {
      width: 100px;
      margin-bottom: 5px;
      font-size: 20px;
      font-weight: bold;
      color: #333;
    }

    .value {
      flex: 1;
      font-size: 16px;
      color: #333;
      text-indent: 40px;
    }
  }
}

.work-show {
  .title {
    position: relative;
    display: flex;
    justify-content: center;
    margin-top: 84px;
    margin-bottom: 72px;
    font-size: 32px;
    color: #131422;
    text-align: center;

    &::after {
      position: absolute;
      bottom: -10px;
      left: 50%;
      width: 32px;
      height: 4px;
      content: '';
      background: #1b87f3;
      border-radius: 2px;
      transform: translateX(-50%);
    }
  }
}
</style>
