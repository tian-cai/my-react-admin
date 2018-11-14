import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import getComponent from "./../common/components/hoc-async-component.js"
import CustomRoute from "./../common/components/custom-route.js"
const AsyncWelcome = getComponent(() => import("./welcome/welcome.js"))
const AsyncDashboard = getComponent(() => import("./dashboard/dashboard.js"))
const AsyncUiTable = getComponent(() => import("./ui/table/table.js"))
const AsyncUiTableUpdate = getComponent(() => import("./ui/table/table-update.js"))
const AsyncUiEditor = getComponent(() => import("./ui/editor/editor.js"))
const AsyncUiChart = getComponent(() => import("./ui/chart/chart.js"))
const AsyncRoleAdmin = getComponent(() => import("./role/admin.js"))
const AsyncRoleGuest = getComponent(() => import("./role/guest.js"))

class RouteConfig extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Switch>
        <Redirect exact from='/' to='/welcome' />
        <Route path="/welcome" component={AsyncWelcome} />
        <CustomRoute path="/dashboard" component={AsyncDashboard} role="['admin','guest']"></CustomRoute>
        <CustomRoute path="/ui/editor" component={AsyncUiEditor} role="['admin','guest']"></CustomRoute>
        <CustomRoute path="/ui/table" component={AsyncUiTable} role="['admin','guest']"></CustomRoute>
        <CustomRoute path="/ui/table-update" component={AsyncUiTableUpdate} role="['admin','guest']"></CustomRoute>
        <CustomRoute path="/ui/chart" component={AsyncUiChart} role="['admin','guest']"></CustomRoute>
        <CustomRoute path="/role/admin" component={AsyncRoleAdmin} role="['admin']"></CustomRoute>
        <CustomRoute path="/role/guest" component={AsyncRoleGuest} role="['admin','guest']"></CustomRoute>
      </Switch>
    )
  }
}

export default RouteConfig