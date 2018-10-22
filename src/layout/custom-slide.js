import React from "react";
import { Layout, Menu} from 'antd';
import logo from "./../assets/img/admin.svg"
import menu from "./../assets/menu.js"
import {renderMenu } from "./../util/util.js"
const { Sider } = Layout;

class CustomSlide extends React.Component {

  constructor(props) {
    super(props);
    this.clickMenu = this.clickMenu.bind(this)
  }

  clickMenu(menu) {
    let temp = this.props.customProp.panes
    let flag = false
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].key===menu.key) {
        flag = true
        break;
      }
    }
    this.props.clickMenu(flag,menu)
  }

  render() {
    const tempMenu = renderMenu(menu)
    const {isCollapsed }= this.props.customProp
    return (
      <Sider className="sider" theme="light" trigger={null} collapsible collapsed={isCollapsed}>
        <div className="header-logo">
          <img src={logo} className="logo"></img>
          <span>My Admin</span>
        </div>
        <Menu className="menu" mode="inline" onClick={this.clickMenu}>
          {tempMenu}
        </Menu>
      </Sider>
    )
  }
}
export default CustomSlide