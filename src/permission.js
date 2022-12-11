import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar 进度条
import 'nprogress/nprogress.css' // progress bar style  进度条样式
import { getToken } from '@/utils/auth' // get token from cookie 从cookie获取令牌
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist //白名单

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      //这里指的是src/store/getters.js的roles
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      console.log(hasRoles+"1111")
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          //获取roles
          const { roles } = await store.dispatch('user/getInfo')//第一步
          console.log("获取roles")
          console.log(roles)
          //获取通过权限验证的路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)//第二步
          console.log("获取路由")
          console.log(accessRoutes+"333333")
         //更新加载路由
          router.options.routes = store.getters.permission_routes//第三步
          router.addRoutes(accessRoutes)
          console.log(store)
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error('Has Error1231313')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
