import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/jwt/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/jwt/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/jwt/user/logout',
    method: 'post'
  })
}
