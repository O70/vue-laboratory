import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

export function list() {
  return request({
    url: '/api/admin/user/list',
    method: 'get'
  })
}

export function find() {
  const id = 'hanzo'
  return request({
    url: `/api/admin/user/find/${id}`,
    method: 'get'
  })
}

export function add() {
  const user = { id: 'kk', name: 'hanzo', account: 'Guiwang' }

  return request({
    url: `/api/admin/user/add`,
    method: 'post',
    data: user
  })
}

export function update() {
  const user = { id: 'yy', name: 'hanzo', account: 'Guiwang' }

  return request({
    url: `/api/admin/user/update`,
    method: 'put',
    data: user
  })
}

export function del() {
  const id = 'guiwang'
  return request({
    url: `/api/admin/user/delete/${id}`,
    method: 'delete'
  })
}
