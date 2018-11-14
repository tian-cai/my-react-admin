import React, { Component } from 'react'
import { Spin } from 'antd';

// 全屏loading
class FullScreenLoading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { isLoading } = this.props
    return (
      <div className="full-screen-loading">
        <Spin className="full-screen-loading-spin" size="large" spinning={isLoading} />
      </div>
    )
  }
}
export default FullScreenLoading