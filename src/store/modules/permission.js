
import { getMenu } from '@/api/user'
// import Layout from '@/views/layout/Layout'

import { asyncRoutes, constantRoutes } from '@/router'
import { config } from '@vue/test-utils'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
//匹配权限
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    console.log("if")
    console.log("roles+"+roles)
    console.log(route.meta.roles)
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    console.log("tryeeeeeeeee")
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];
  console.log("没有admin")
  console.log(routes+"*******")
  routes.forEach(route => {
    const tmp = { ...route }
    console.log(tmp)
    if (hasPermission(roles, tmp)) {
      config.log("has=true")
      if (tmp.children) {
     
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  console.log(res+"***********")
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes) // 将过滤后的路由和constantRoutes存起来
  }
}

//筛选
const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      console.log("筛选")
 
      let accessedRoutes=[];
      console.log(roles)
      //路由是否有admin,有直接全部显示
      if (roles.includes('admin')) {
        console.log("有admin")
        accessedRoutes = asyncRoutes || []
      } else {
        console.log("没有admin1")
        //过滤路由
        
        accessedRoutes = filterAsyncRoutes(asyncRoutes,roles)
        //accessedRoutes这个就是当前角色可见的动态路由
        console.log(accessedRoutes)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
