<!-- 我的博客列表 -->
<template>
  <div>
    <BaseBanner bannerCode="banner-myblog"></BaseBanner>
    <div class="common-wrap">
      <div class="search">
        <Input
          v-model.trim="searchVal"
          placeholder="请输入关键字"
          style="width: 300px; margin-right: 20px"
        />
        <Button type="primary" @click="handleSearch">搜索</Button>
        <Button type="default" style="margin-left: 10px" @click="handleClear">
          清空
        </Button>
      </div>
      <div class="list">
        <div
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="handleClick(item)"
        >
          <div
            class="item-img"
            :style="{ backgroundImage: `url(${item.cover})` }"
          >
            <img :src="item.cover" />
          </div>
          <div class="item-info">
            <h2 class="title">{{ item.title }}</h2>
            <p class="time">{{ item.publishTime }}</p>
          </div>
        </div>
      </div>
      <div class="foot-page">
        <Page
          :total="total"
          :page-size="pageSize"
          :current="currentPage"
          show-total
          show-sizer
          :simple="simpleModel"
          :page-size-opts="[5, 10, 20, 30]"
          @on-change="handleChange"
          @on-page-size-change="handlePageSizeChange"
          @on-prev="handleChange"
          @on-next="handleChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  data() {
    return {
      searchVal: '',
      currentPage: 1,
      pageSize: 5,
      total: 0,
      list: [],
      simpleModel: false,
      innerWidth: window.innerWidth
    }
  },
  mounted() {
    this.getData()
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.innerWidth = window.innerWidth
      if (this.innerWidth < 768) {
        this.simpleModel = true
      } else {
        this.simpleModel = false
      }
    },
    handleSearch() {
      this.currentPage = 1
      this.getData()
    },
    handleClear() {
      this.searchVal = ''
      this.getData()
    },
    getData() {
      this.backUp()
      this.$ajax({
        methods: 'get',
        url: '/news',
        params: {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          title: this.searchVal,
          category: 'my-blog'
        }
      }).then((data) => {
        this.list = data.records.map((item) => {
          return {
            ...item,
            cover: this.$baseUrl + item.cover,
            publishTime: dayjs(item.publishTime).format('YYYY-MM-DD')
          }
        })
        this.total = data.total
      })
    },
    handleClick(item) {
      if (item.link) {
        window.open(item.link, '_blank')
      } else {
        this.$router.push({ path: '/my-blog/detail/' + item.id })
      }
    },
    handleChange(page) {
      this.currentPage = page
      this.getData()
    },
    handlePageSizeChange(pageSize) {
      this.currentPage = 1
      this.pageSize = pageSize
      this.getData()
    },
    backUp() {
      document.documentElement.scrollTop = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.common-wrap {
  .search {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 30px;
  }

  .list {
    .item {
      position: relative;
      box-sizing: border-box;
      display: flex;
      justify-content: left;
      width: 100%;
      height: 220px;
      padding: 10px;
      margin-bottom: 30px;
      cursor: pointer;
      border: 1px solid rgb(27 135 243 / 50%);
      transition: all 0.6s;

      &:hover {
        background: rgb(27 135 243 / 20%);
        border: 1px solid rgb(27 135 243 / 100%);
      }

      .item-img {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 360px;
        height: 200px;
        overflow: hidden;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;

        img {
          display: none;
        }
      }

      .item-info {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 30px;

        .title {
          display: inline-block;
          overflow: hidden;
          font-size: 24px;
          line-height: 33px;
          color: #000;
          text-overflow: ellipsis;
          line-clamp: 2;
        }

        .time {
          font-size: 14px;
          line-height: 14px;
          color: #999;
        }
      }
    }
  }
}

@media screen and (width <= 767px) {
  .common-wrap {
    .list {
      .item {
        flex-direction: column;
        height: auto;

        .item-img {
          width: 100%;
        }

        .item-info {
          margin-top: 20px;
          margin-left: 0;

          .title {
            font-size: 18px;
            line-height: 28px;
          }

          .time {
            text-align: right;
          }
        }
      }
    }
  }
}

.foot-page {
  margin-top: 20px;
  text-align: center;
}
</style>
