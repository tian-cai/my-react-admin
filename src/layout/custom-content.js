import React from "react";
import { Layout, Tabs,Icon } from 'antd';
import RouteConfig from "./../page/route.config.js"
const { Content } = Layout;
const TabPane = Tabs.TabPane;

class CustomContent extends React.Component {
  constructor(props) {
    super(props);
    this.clickTab = this.clickTab.bind(this)
    this.closeTab = this.closeTab.bind(this)
  }

  clickTab(tab) {
    this.props.clickTab(tab)
  }
  closeTab(pane,e) {
    e.preventDefault();
    e.stopPropagation()
    let temp = this.props.cusProp.panes
    let closeTabIndex = 0
    temp = temp.filter((ele,index)=>{
       if(ele.key===pane.key) {
        closeTabIndex = index
       }
       return ele.key!==pane.key
    })
    if (!temp.length) {
      temp = [{title:'Welcome',key:'Welcome',link:'/'}]
    }
    closeTabIndex===this.props.cusProp.panes.length-1 ? closeTabIndex = closeTabIndex-1 : closeTabIndex
    if (closeTabIndex<0) {
      closeTabIndex = 0
    }
    this.props.closeTab(temp,temp[closeTabIndex]['link'])
  }

  render() {
    const {isCollapsed,activeKey,panes }= this.props.cusProp
    return (
      <Content className="content">
        <div className={isCollapsed ? 'fixed-title menu-collapsed':'fixed-title'}>
          <Tabs style={{'borderBottom':'none'}} activeKey={activeKey} onTabClick={this.clickTab}>
            {panes.map(pane => 
              <TabPane tab={<span>{pane.title}<Icon className="close"  type="close" theme="outlined" onClick={(e)=>this.closeTab(pane,e)}/></span>} key={pane.link}></TabPane>
            )}
          </Tabs>
        </div>
        <div className="content-main">
          <RouteConfig></RouteConfig>
        </div>
      </Content>
    )
    
  }
}

export default CustomContent