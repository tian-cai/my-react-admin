import React from "react";
import {withRouter} from "react-router-dom";
import { Layout} from 'antd';
import "./layout.css";
import CustomSlide from "./custom-slide.js";
import CustomHead  from "./custom-head.js";
import CustomContent from "./custom-content.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.clickMenu = this.clickMenu.bind(this)
    this.clickTab = this.clickTab.bind(this)
    this.closeTab = this.closeTab.bind(this)
    this.toggleCollapsed = this.toggleCollapsed.bind(this)
    this.state = {
      panes:JSON.parse(sessionStorage.getItem('tabs'))||[{title:'Welcome',key:'Welcome',link:'/'}],
      activeKey:sessionStorage.getItem('activeKey')||'/',
      isCollapsed:false
    }
  }

  toggleCollapsed() {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
    });
  }

  closeTab(temp,link) {
    this.setState({
      panes:temp,
      activeKey:link
    })
    sessionStorage.setItem('tabs',JSON.stringify(temp))
    sessionStorage.setItem('activeKey',link)
    this.props.history.push(link)
  }

  clickTab(tab) {
    this.setState({
      activeKey:tab
    })
    this.props.history.push(tab)
    sessionStorage.setItem('activeKey',tab)
  }

  clickMenu(flag,item) {
    let temp = this.state.panes
    let activeKey = item.item.props.children.props.to
    if (flag) {
      this.setState({
        activeKey:activeKey
      })
    }else {
      temp.push({
        title:item.key,
        key:item.key,
        link:activeKey
      })
      this.setState({
        panes:temp,
        activeKey:activeKey
      })
    }
    sessionStorage.setItem('tabs',JSON.stringify(temp))
    sessionStorage.setItem('activeKey',activeKey)
  }

  render() {
    const isCollapsed = this.state.isCollapsed
    return (
      <Layout className="layout">
        <CustomSlide customProp={this.state} clickMenu={this.clickMenu}></CustomSlide>
        <Layout className="layout">
          <CustomHead isCollapsed={isCollapsed} toggleCollapsed={this.toggleCollapsed}></CustomHead>
          <CustomContent cusProp={this.state} clickTab={this.clickTab} closeTab={this.closeTab}></CustomContent>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(App);