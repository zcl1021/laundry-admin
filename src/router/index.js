import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '洗衣店后台管理首页', icon: 'dashboard' }
    }]
  },

 

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
export const asyncRoutes =[
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'Example',
    meta: { title: '用户管理', icon: 'el-icon-s-help' ,roles: ['admin','editor']},
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import('@/views/user/list'),
        meta: { title: '用户列表', icon: 'table' ,roles: ['admin','editor']}
      },
      {
        path: 'creat',
        name: 'UserCreate',
        component: () => import('@/views/user/form'),
        meta: { title: '添加用户', icon: 'tree',roles: ['admin'] }
      }
    ]
  },
   // 404 page must be placed at the end !!!
   { path: '*', redirect: '/404', hidden: true }
]


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
