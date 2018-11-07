import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

// 渲染侧边栏菜单函数
export function renderMenu(menuArr) {
  let temp
  if (menuArr.length) {
    temp = menuArr.map((ele)=>{
      if (ele.children) {
        return (
          <SubMenu key={ele.text} title={<span><Icon type={ele.icon} /><span>{ele.text}</span></span>}>
            {renderMenu(ele.children)}
          </SubMenu>)
      } else {
        return <Menu.Item key={ele.text}><Link to={ele.link}><Icon type={ele.icon} /><span>{ele.text}</span></Link></Menu.Item>
      }
    })
  }
  return temp
}

export function parseSearch(search,key) {
  search = search.slice(1)
  let arr = search.split('&')
  let obj = {}
  arr.forEach(ele => {
    let temp = ele.split('=')
    obj[temp[0]] = temp[1]
  });
  return obj[key]
}