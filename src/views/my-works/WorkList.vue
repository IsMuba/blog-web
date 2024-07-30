<!-- 项目列表 -->
<template>
  <div>
    <BaseBanner bannerCode="banner-myworks"></BaseBanner>
    <div class="common-wrap tabs">
      <div
        class="tab-item"
        v-for="item in tabList"
        :key="item.label"
        :class="{ active: currentTab === item.code }"
        @click="clickTab(item)"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="common-wrap list">
      <div
        class="item"
        v-for="item in list"
        :key="item.id"
        @click="clickItem(item)"
      >
        <img :src="item.cover" />
        <div class="item-name">{{ item.title }}</div>
      </div>
      <div
        class="item"
        v-for="item in 3 - (11 % 3)"
        :key="item + 'id'"
        style="cursor: default"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTab: '2',
      tabList: [
        { label: '全部', code: '2' },
        { label: '公司项目', code: '0' },
        { label: '个人项目', code: '1' }
      ],
      list: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    clickTab(tab) {
      this.currentTab = tab.code
      this.getData()
    },
    clickItem(item) {
      this.$router.push({ path: '/my-works/detail/' + item.id })
    },
    getData() {
      this.$ajax({
        url: '/product',
        method: 'get',
        params: {
          category: this.currentTab === '2' ? '' : this.currentTab
        }
      }).then((data) => {
        this.list = data.map((t) => {
          return {
            ...t,
            cover: this.$baseUrl + t.cover,
            album: t.album.map((tt) => {
              return this.$baseUrl + tt
            })
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  margin-top: 48px;
  margin-bottom: 32px;

  .tab-item {
    padding: 10px 20px;
    margin-right: 15px;
    color: #000;
    cursor: pointer;
    border-radius: 5px;

    &.active {
      color: #fff;
      background: #1b87f3;
      transition:
        background-color 0.3s,
        color 0.2s;
    }
  }
}

.list {
  display: flex;
  flex-wrap: wrap;
  place-content: flex-start space-between;

  .item {
    width: 32%;
    margin-bottom: 24px;
    cursor: pointer;

    img {
      display: block;
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    .item-name {
      width: 100%;
      padding: 10px 15px;
      overflow: hidden;
      font-size: 16px;
      font-weight: 500;
      line-height: 1.5;
      color: #000;
      text-overflow: ellipsis;
      white-space: nowrap;
      background-color: rgb(0 0 0 / 10%);
    }

    &:hover {
      .item-name {
        color: #fff;
        background: #1b87f3;
        transition:
          background-color 0.3s,
          color 0.2s;
      }
    }
  }
}

@media screen and (width <= 767px) {
  .list {
    .item {
      width: 50%;
    }
  }
}
</style>
