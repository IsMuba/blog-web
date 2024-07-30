<template>
  <div class="footer-wrapper">
    <div class="common-wrap">
      <div class="out-links">
        <div class="link-title">友情链接：</div>
        <div class="link-list">
          <div class="link-item" v-for="item in links" :key="item.name">
            <img :src="item.icon" class="link-icon" />
            <a :href="item.url" target="_blank" class="link-name">
              {{ item.name }}
            </a>
          </div>
          <div
            class="link-item empty"
            v-for="item in 5 - (links.length % 5)"
            :key="item"
          ></div>
        </div>
      </div>
      <div class="my-info">
        <Icon type="ios-pin" />
        <span class="location">中国.杭州</span>
        <span class="phone-num">联系电话:13003657317</span>
        <a @click="toggleModal">免责申明</a>
      </div>
    </div>

    <Modal v-model="modal" width="500">
      <template v-slot:header>
        <p style="text-align: center">
          <span>免责声明</span>
        </p>
      </template>
      <div v-html="decorationContent"></div>
      <template v-slot:footer>
        <div>
          <Button type="primary" size="large" long @click="toggleModal">
            确定
          </Button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'MyFooter',
  data() {
    return {
      links: [],
      modal: false,
      decorationContent: ''
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      let storeLinks = sessionStorage.getItem('links')
      if (storeLinks) {
        this.links = JSON.parse(storeLinks)
        if (this.links.length > 0) {
          return
        }
      }

      this.$ajax.get('/links?pageSize=100').then((data) => {
        this.links = data.records.map((item) => {
          return {
            name: item.title,
            icon: this.$baseUrl + item.cover,
            url: item.link
          }
        })
        sessionStorage.setItem('links', JSON.stringify(this.links))
      })
    },
    toggleModal() {
      this.modal = !this.modal
      if (this.modal) {
        this.$ajax({
          methods: 'get',
          url: '/news',
          params: {
            currentPage: 1,
            pageSize: 1,
            category: 'my-declaration'
          }
        }).then((data) => {
          let result = data.records.map((item) => {
            return {
              ...item,
              cover: this.$baseUrl + item.cover
            }
          })
          if (result[0]) {
            this.decorationContent = result[0].content
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-wrapper {
  width: 100%;
  margin-top: 50px;
  background-color: #000;

  .common-wrap {
    .out-links {
      padding: 24px 0;
      color: #fff;

      .link-title {
        margin-bottom: 20px;
        font-size: 20px;
        font-weight: bold;
      }

      .link-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .link-item {
          display: flex;
          align-items: center;
          width: 20%;
          margin-bottom: 10px;
          cursor: pointer;

          &.empty {
            width: 20%;
            cursor: default;
          }

          .link-icon {
            width: 20px;
          }

          .link-name {
            margin-left: 5px;
          }
        }
      }
    }

    .my-info {
      padding: 24px 0;
      margin-top: 10px;
      font-size: 15px;
      color: #fff;
      text-align: center;

      .phone-num {
        margin: 0 15px;
      }
    }
  }
}

@media screen and (width <= 767px) {
  .footer-wrapper {
    .common-wrap {
      .out-links {
        .link-list {
          .link-item {
            width: 33.3%;

            &.empty {
              width: 33.3%;
            }
          }
        }
      }
    }
  }
}
</style>
