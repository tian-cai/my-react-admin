import React, { Component } from 'react';
import { Route } from "react-router-dom"
import { message } from 'antd';

class CustomRoute extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    let { path, component, role } = this.props
    let operatorRole = sessionStorage.getItem('role')
    let flag = role.indexOf(operatorRole) !== -1
    if (!flag) {
      message.error('您没有权限查看此页面', 2)
      history.length > 1 && history.back()
    }
    return flag ? <Route path={path} component={component} /> : null;
  }
}

export default CustomRoute;
