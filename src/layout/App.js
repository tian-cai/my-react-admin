import React from "react";
import { withRouter, Route } from "react-router-dom";
import { Layout } from 'antd';
import "./layout.css";
import "./../common/style/common.css"
import CustomSlide from "./custom-slide.js";
import CustomHead from "./custom-head.js";
import CustomContent from "./custom-content.js";
import { isLogin } from "./../util/util.js"
import Login from "./login.js"
import FullScreenLoading from "./../common/components/fullloading.js"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.clickMenu = this.clickMenu.bind(this)
    this.clickTab = this.clickTab.bind(this)
    this.closeTab = this.closeTab.bind(this)
    this.toggleCollapsed = this.toggleCollapsed.bind(this)
    this.jumplogin = this.jumplogin.bind(this)
    this.state = {
      panes: JSON.parse(sessionStorage.getItem('tabs')) || [{ title: 'Welcome', key: 'Welcome', link: '/' }],
      activeKey: sessionStorage.getItem('activeKey') || '/',
      isCollapsed: false,
      isLoading: true
    }
  }


  toggleCollapsed() {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
    });
  }

  closeTab(temp, link) {
    this.setState({
      panes: temp,
      activeKey: link
    })
    sessionStorage.setItem('tabs', JSON.stringify(temp))
    sessionStorage.setItem('activeKey', link)
    this.props.history.push(link)
  }

  clickTab(tab) {
    this.setState({
      activeKey: tab
    })
    this.props.history.push(tab)
    sessionStorage.setItem('activeKey', tab)
  }

  clickMenu(flag, item) {
    let temp = this.state.panes
    let activeKey = item.item.props.children.props.to
    if (flag) {
      this.setState({
        activeKey: activeKey
      })
    } else {
      temp.push({
        title: item.key,
        key: item.key,
        link: activeKey
      })
      this.setState({
        panes: temp,
        activeKey: activeKey
      })
    }
    sessionStorage.setItem('tabs', JSON.stringify(temp))
    sessionStorage.setItem('activeKey', activeKey)
  }

  // 未登录跳转至登陆页面
  jumplogin() {
    let { location, history } = this.props
    const flag = isLogin()
    if (!flag && location.pathname !== '/login') {
      history.replace('/login')
      location.pathname = '/login'
    }
  }

  componentDidMount() {
    this.setState({
      isLoading: false
    })
  }
  componentWillMount() {
    this.jumplogin()
  }
  componentWillUpdate() {
    this.jumplogin()
  }

  render() {
    const isCollapsed = this.state.isCollapsed
    const isLoading = this.state.isLoading
    const flag = isLogin()
    return (
      isLoading ? <FullScreenLoading></FullScreenLoading> :
        flag ? <Layout className="layout">
          <CustomSlide customProp={this.state} clickMenu={this.clickMenu}></CustomSlide>
          <Layout className="layout">
            <CustomHead isCollapsed={isCollapsed} toggleCollapsed={this.toggleCollapsed}></CustomHead>
            <CustomContent cusProp={this.state} clickTab={this.clickTab} closeTab={this.closeTab}></CustomContent>
          </Layout>
        </Layout> : <Route path="/login" component={Login} />
    );
  }
}

export default withRouter(App);