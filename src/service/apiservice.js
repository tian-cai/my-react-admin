import axios from "axios"
import env from "./../env/env.js"
import { isLogin } from "../util/util.js";

let apiService = {

  // 获取人员信息列表
  getPersonList(value) {
    let params = Object.assign({ _sort: 'id', _order: 'DESC' }, value)
    return axios.get(`${env}/person`, { params })
  },
  // 增加人员信息
  addPerson(data) {
    return axios.post(`${env}/person`, data)
  },
  // 删除人员信息
  deletePerson(id) {
    return axios.delete(`${env}/person/${id}`)
  },
  // 修改人员信息
  putPerson(data) {
    return axios.put(`${env}/person/${data.id}`, data)
  },
  // 查询人员信息
  queryPerson(id) {
    return axios.get(`${env}/person/${id}`)
  },
  // 获取图表数据
  getChartData() {
    return axios.get(`${env}/charts`)
  },

  // 假登陆
  login(data) {
    let info = {}
    if (data.userName !== 'admin' && data.userName !== 'guest') {
      info['message'] = '用户名不存在'
      info['islogin'] = false
      return info
    }
    if (data.userName !== data.password) {
      info['message'] = '密码错误'
      info['islogin'] = false
      return info
    }
    info['message'] = '登陆成功'
    info['islogin'] = true
    info['role'] = data.userName
    return info
  }
}

export default apiService