<template>
  <div class="banner-area">
    <Carousel
      v-if="banner.album && banner.album.length > 0"
      autoplay
      loop
      :autoplay-speed="5000"
      arrow="never"
    >
      <CarouselItem v-for="(item, index) in banner.album" :key="index">
        <img :src="item" style="display: block; width: 100%" />
      </CarouselItem>
    </Carousel>
    <img v-else :src="banner.cover" />
    <div class="item-info">
      <h2 class="title">{{ banner.title }}</h2>
      <p class="info">{{ banner.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseBanner',
  props: {
    bannerCode: {
      type: String,
      default: 'banner-home'
    }
  },
  data() {
    return {
      banners: []
    }
  },
  computed: {
    banner() {
      let filteredBanner = this.banners.filter(
        (item) => item.code === this.bannerCode
      )
      if (filteredBanner.length) {
        return filteredBanner[0]
      } else {
        return {}
      }
    }
  },
  mounted() {
    let sessionBanner = sessionStorage.getItem('banners')
    if (sessionBanner) {
      this.banners = JSON.parse(sessionBanner)
    } else {
      this.$ajax({
        method: 'get',
        url: '/banner'
      }).then((data) => {
        this.banners = data.map((item) => {
          return {
            title: item.title,
            description: item.detail,
            code: item.code,
            cover: this.$baseUrl + item.cover,
            album: item.album ? item.album.map((t) => this.$baseUrl + t) : []
          }
        })
        sessionStorage.setItem('banners', JSON.stringify(this.banners))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.banner-area {
  position: relative;
  width: 100%;
  min-height: 300px;

  img {
    width: 100%;
    height: auto;
    min-height: 300px;
    max-height: 500px;
    object-fit: cover;
  }

  .item-info {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #fff;

    .title {
      margin-bottom: 10px;
      font-size: 60px;
      font-weight: 600;
      line-height: 1.2;
    }

    .info {
      max-width: 90%;
      margin: 0 auto;
      font-size: 18px;
      line-height: 1.5;
    }
  }
}

@media screen and (width <= 767px) {
  .banner-area {
    .item-info {
      .title {
        font-size: 40px;
      }

      .info {
        font-size: 15px;
      }
    }
  }
}
</style>
