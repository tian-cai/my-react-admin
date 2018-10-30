import React from "react"
import { Route, Switch } from "react-router-dom"
import getComponent from "./../common/components/hoc-async-component.js"
const AsyncWelcome =  getComponent(()=>import("./welcome/welcome.js"))
const AsyncDashboard =  getComponent(()=>import("./dashboard/dashboard.js"))
const AsyncUiTable =  getComponent(()=>import("./ui/table/table.js"))
const AsyncUiForm =  getComponent(()=>import("./ui/form/form.js"))
const AsyncUiEditor = getComponent(()=>import("./ui/editor/editor.js"))

class RouteConfig extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={AsyncWelcome} />
        <Route path="/dashboard" component={AsyncDashboard} />
        <Route path="/ui/editor" component={AsyncUiEditor} />
        <Route path="/ui/table" component={AsyncUiTable} />
        <Route path="/ui/form" component={AsyncUiForm} />
      </Switch>
    )
  }
}

export default RouteConfig