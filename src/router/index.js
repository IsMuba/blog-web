import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layouts/LayoutIndex.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/HomePage.vue')
      },
      {
        path: 'my-works',
        meta: {
          title: '项目经历'
        },
        redirect: '/my-works/list',
        component: () => import('@/views/my-works/WorkIndex.vue'),
        children: [
          {
            path: 'list',
            meta: {
              title: '项目经历列表'
            },
            component: () => import('@/views/my-works/WorkList.vue')
          },
          {
            path: 'detail/:id',
            meta: {
              title: '项目经历详情'
            },
            component: () => import('@/views/my-works/WorkDetail.vue')
          }
        ]
      },
      {
        path: 'my-blog',
        meta: {
          title: '我的博客'
        },
        redirect: '/my-blog/list',
        component: () => import('@/views/my-blog/BlogIndex.vue'),
        children: [
          {
            path: 'list',
            meta: {
              title: '我的博客列表'
            },
            component: () => import('@/views/my-blog/BlogList.vue')
          },
          {
            path: 'detail/:id',
            meta: {
              title: '我的博客详情'
            },
            component: () => import('@/views/my-blog/BlogDetail.vue')
          }
        ]
      },
      {
        path: 'open-source',
        meta: {
          title: '开源项目'
        },
        component: () => import('@/views/open-source/SourceIndex.vue')
      },
      {
        path: 'about-me',
        meta: {
          title: '关于我'
        },
        component: () => import('@/views/about-me/AboutIndex.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
