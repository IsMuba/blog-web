<template>
  <div class="header-wrapper" :class="{ dark: isDark }">
    <div class="header-container">
      <div class="logo-area" @click="goHome">
        <img src="@/assets/logo.jpg" class="logo" />
        <span class="my-name">沐爸</span>
      </div>

      <div class="right" style="display: flex">
        <div
          class="drawer-btn"
          :class="{ active: showDrawerModel }"
          v-if="showDrawerBtn"
          @click="showDrawerModel = !showDrawerModel"
        >
          <Icon type="md-reorder" size="40" color="#fff" />
        </div>
        <div class="nav-list" v-else>
          <div
            class="nav-item"
            :class="{ active: fullPath.includes(item.path) }"
            v-for="item in list"
            :key="item.name"
            @click="handleClick(item)"
          >
            {{ item.name }}
            <div class="nav-children" v-if="item.children">
              <div
                class="item-child"
                v-for="tt in item.children"
                :key="tt.name"
                @click="handleClick(tt)"
                :class="{ active: tt.path === fullPath }"
              >
                {{ tt.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Drawer :closable="false" v-model="showDrawerModel">
      <div class="drawer-nav-list">
        <div
          class="drawer-nav-item"
          :class="{ active: fullPath.includes(item.path) }"
          v-for="item in list"
          :key="item.name"
          @click="handleClick(item)"
        >
          {{ item.name }}
          <div class="drawer-nav-children" v-if="item.children">
            <div
              class="drawer-item-child"
              v-for="tt in item.children"
              :key="tt.path"
              @click="handleClick(tt)"
              :class="{ active: tt.path === fullPath }"
            >
              {{ tt.name }}
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: '首页',
          path: '/home'
        },
        {
          name: '项目经历',
          path: '/my-works'
        },
        {
          name: '我的博客',
          path: '/my-blog'
        },
        {
          name: '开源项目',
          path: '/open-source'
        },
        {
          name: '关于我',
          path: '/about-me'
        }
        // { // 子菜单示例
        //   name: '资讯动态',
        //   path: '/dynamic',
        //   children: [
        //     {
        //       name: '景区新闻',
        //       path: '/dynamic/news'
        //     },
        //     {
        //       name: '通知公告',
        //       path: '/dynamic/notice'
        //     }
        //   ]
        // }
      ],
      isDark: false,
      showDrawerModel: false,
      showDrawerBtn: false,
      innerWidth: window.innerWidth
    }
  },
  computed: {
    fullPath() {
      return this.$route.fullPath
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      let scrollTop = document.documentElement.scrollTop
      this.isDark = scrollTop >= 130
    })
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
        this.showDrawerBtn = true
      } else {
        this.showDrawerBtn = false
      }
    },
    handleClick(item) {
      this.showDrawerModel = false

      // 如果没有子菜单
      if (!item.children) {
        if (item.path) {
          this.$router.push({
            path: item.path
          })
          return
        }
        if (item.link) {
          window.open(item.link)
        }
      }
    },
    goHome() {
      if (this.$route.path !== '/home') {
        this.$router.push('/home')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 64px;
  padding: 0 15px;
  background-color: transparent;
  background-color: rgb(0 0 0 / 60%);
  transition: background-color 0.5s ease;

  &.dark {
    background-color: rgb(0 0 0 / 85%);
  }

  .header-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1440px;
    height: 100%;

    .logo-area {
      display: flex;
      align-items: center;
      margin-right: 10px;
      cursor: pointer;

      .logo {
        width: auto;
        height: 50px;
        border-radius: 50%;
      }

      .my-name {
        margin-left: 5px;
        font-size: 16px;
        color: #fff;
      }
    }

    .nav-list {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: #fff;

      .nav-item {
        position: relative;
        height: 100%;
        margin: 0 20px;
        font-size: 15px;
        font-weight: 600;
        line-height: 64px;
        letter-spacing: 1px;
        white-space: nowrap;
        cursor: pointer;

        &.active {
          color: #1b87f3;
        }

        &:first-child {
          margin-left: 0;
        }

        &:last-child {
          margin-right: 0;
        }

        .nav-children {
          position: absolute;
          top: 63px;
          left: 50%;
          display: none;
          width: auto;
          padding: 10px 18px;
          font-weight: normal;
          color: #fff;
          cursor: pointer;
          background: rgb(0 0 0 / 61%);
          border-top: 2px solid #1b87f3;
          border-bottom-right-radius: 8px;
          border-bottom-left-radius: 8px;
          transform: translateX(-50%);

          .item-child {
            line-height: 36px;

            &:hover {
              color: #1b87f3;
            }

            &.active {
              color: #1b87f3;
            }
          }
        }

        &:hover {
          .nav-children {
            display: block;
          }
        }
      }
    }

    .drawer-btn {
      transition: all 0.5s ease;

      &.active {
        transform: rotate(90deg);
      }
    }
  }
}

/* stylelint-disable-next-line */
::v-deep .ivu-drawer-content {
  .ivu-drawer-header {
    display: none;
  }

  .ivu-drawer-body {
    height: 100%;
  }
}

.drawer-nav-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: #000;

  .drawer-nav-item {
    position: relative;
    overflow: hidden;
    font-size: 15px;
    font-weight: 600;
    line-height: 64px;
    letter-spacing: 1px;
    white-space: nowrap;
    cursor: pointer;

    &.active {
      color: #1b87f3;
      border-bottom: 2px solid #1b87f3;
    }

    .drawer-nav-children {
      width: auto;
      padding: 10px 18px;
      font-weight: normal;
      color: #000;
      cursor: pointer;

      .drawer-item-child {
        line-height: 36px;

        &:hover {
          color: #1b87f3;
        }

        &.active {
          color: #1b87f3;
        }
      }
    }

    &:hover {
      .drawer-nav-children {
        display: block;
      }
    }
  }
}
</style>
