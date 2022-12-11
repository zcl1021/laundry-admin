import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/laundry/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/laundry/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/laundry/user/logout',
    method: 'get'
  })
}

// 获取菜单权限数据
export function getMenu() {
  return request({
    url: '/laundry/menu',
    method: 'get'
  })
}
