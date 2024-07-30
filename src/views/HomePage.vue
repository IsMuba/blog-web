<!-- 首页 -->
<template>
  <div>
    <BaseBanner bannerCode="banner-home"></BaseBanner>
    <div class="common-wrap">
      <div class="hello">你好同学，我是沐爸，很高兴认识你！</div>

      <div class="recent-blogs">
        <h2 class="title">
          最近博客
          <router-link to="/my-blog/list" v-if="blogTotal > 5" class="more">
            更多 >
          </router-link>
        </h2>
        <div class="blog-list">
          <div
            class="blog-item"
            v-for="(item, index) in blogList"
            :key="index"
            @click="handleClickBlog(item)"
          >
            <div class="blog-title">{{ item.title }}</div>
            <div class="blog-time">{{ item.updateTime }}</div>
          </div>
        </div>
      </div>

      <div class="recent-work">
        <h2 class="title">典型项目</h2>
        <div class="work-list">
          <div
            class="work-item"
            v-for="item in workList"
            :key="item.id"
            @click="handleClickWork(item)"
          >
            <img :src="item.cover" alt="" class="work-cover" />
            <div class="work-title">{{ item.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  data() {
    return {
      blogList: [],
      blogTotal: 0,
      workList: []
    }
  },
  mounted() {
    this.getBlogList()
    this.getWorkList()
  },
  methods: {
    getBlogList() {
      this.$ajax({
        methods: 'get',
        url: '/news',
        params: {
          currentPage: 1,
          pageSize: 5,
          category: 'my-blog'
        }
      }).then((data) => {
        this.blogList = data.records.map((t) => {
          return {
            ...t,
            updateTime: dayjs(t.updateTime).format('YYYY-MM-DD')
          }
        })
        this.blogTotal = data.total
      })
    },
    handleClickBlog(item) {
      if (item.link) {
        window.open(item.link, '_blank')
      } else {
        this.$router.push({ path: '/my-blog/detail/' + item.id })
      }
    },
    getWorkList() {
      this.$ajax({
        url: '/product',
        method: 'get'
      }).then((data) => {
        this.workList = data.map((t) => {
          return {
            ...t,
            cover: this.$baseUrl + t.cover
          }
        })
      })
    },
    handleClickWork(item) {
      this.$router.push({ path: '/my-works/detail/' + item.id })
    }
  }
}
</script>

<style lang="scss" scoped>
.common-wrap {
  .hello {
    margin-top: 30px;
  }

  .recent-blogs {
    margin-top: 30px;

    .title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      font-size: 20px;

      .more {
        position: relative;
        z-index: 2;
        font-size: 14px;
        color: #1b87f3;
        cursor: pointer;
      }
    }

    .blog-list {
      .blog-item {
        display: flex;
        margin-bottom: 8px;
        cursor: pointer;

        &:hover {
          color: #1b87f3;
          text-decoration: underline;
        }

        .blog-title {
          flex: 1;
        }

        .blog-time {
          width: 80px;
          text-align: right;
        }
      }
    }
  }

  .recent-work {
    margin-top: 30px;

    .title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      font-size: 20px;
    }

    .work-list {
      display: flex;
      flex-wrap: wrap;

      .work-item {
        position: relative;
        display: flex;
        width: 25%;
        overflow: hidden;
        cursor: pointer;

        .work-cover {
          width: 100%;
          height: 170px;
          object-fit: cover;
          transition: transform 0.3s ease-in-out;
        }

        .work-title {
          position: absolute;
          bottom: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          padding: 0 15px;
          font-size: 18px;
          font-weight: 600;
          color: #fff;
          background-color: rgb(0 0 0 / 75%);
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }

        &:hover {
          .work-cover {
            transform: scale(1.2);
          }

          .work-title {
            opacity: 1;
          }
        }
      }
    }
  }
}

@media screen and (width <= 767px) {
  .common-wrap {
    .recent-work {
      .work-list {
        .work-item {
          width: 50%;
        }
      }
    }
  }
}
</style>
