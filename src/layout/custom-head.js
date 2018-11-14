import React from "react";
import { Layout, Icon, Avatar, Badge, Input, Dropdown, Menu } from 'antd';
const { Header } = Layout;
const Search = Input.Search;

class CustomHead extends React.Component {
  constructor(props) {
    super(props);
    this.toggleCollapsed = this.toggleCollapsed.bind(this)
    this.logout = this.logout.bind(this)
  }

  toggleCollapsed() {
    this.props.toggleCollapsed()
  }
  logout() {
    sessionStorage.clear()
  }
  render() {
    const dropdownMenu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" onClick={this.logout}>退出登陆</a>
        </Menu.Item>
      </Menu>
    )
    const isCollapsed = this.props.isCollapsed
    return (
      <Header className={isCollapsed ? 'header menu-collapsed' : 'header'}>
        <Icon className="trigger" type={isCollapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggleCollapsed} />
        <div className="header-tool">
          <Search placeholder="input search text" onSearch={value => console.log(value)} style={{ width: 200, marginRight: 20 }} />
          <Badge dot>
            <Icon type="bell" theme="outlined" />
          </Badge>
          <Dropdown overlay={dropdownMenu} >
            <Avatar icon="user" />
          </Dropdown>
        </div>
      </Header>
    )
  }
}

export default CustomHead