import axios from "axios"
import env from "./../env/env.js"

let apiService = {

  // 获取人员信息列表
  getPersonList(value) {
    let params = Object.assign({_sort:'id',_order:'DESC'},value)
    return axios.get(`${env}/person`,{params})
  },
  // 增加人员信息
  addPerson(data) {
    return axios.post(`${env}/person`,data)
  },
  // 删除人员信息
  deletePerson(id) {
    return axios.delete(`${env}/person/${id}`)
  },
  // 修改人员信息
  putPerson(data) {
    return axios.put(`${env}/person/${data.id}`,data)
  },
  // 查询人员信息
  queryPerson(id) {
    return axios.get(`${env}/person/${id}`)
  }
}

export default apiService