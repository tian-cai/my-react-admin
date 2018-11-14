import React, { Component } from 'react'
import { Spin } from 'antd';

// 非全屏loading，可以传入wrapheight属性决定
class GlobalLoading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { size = 'default', tip = '数据加载中', isLoading, wrapheight } = this.props
    return (
      <div className="wrap-loading" style={{ height: wrapheight }}>
        <Spin className="wrap-loading-spin" size={size} spinning={isLoading} tip={tip} />
      </div>
    )
  }
}
export default GlobalLoading