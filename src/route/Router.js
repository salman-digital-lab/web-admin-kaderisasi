import React, { useEffect, useState } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import Cookies from "js-cookie"
import Login from "../pages/Login"
import NavigationAdmin from "../components/NavigationAdmin"
import AdminProvider from "../context/AdminContext"
import NotFound from "../pages/Error/NotFound"
import data from "./data"

/* eslint-disable */
const Router = (props) => {
  const token = Cookies.get("token")
  let user
  if (token) {
    user = JSON.parse(Cookies.get("user"))
  }
  const [allowedList, setAllowedList] = useState(null)
  const LoginRoute = ({ ...props }) => {
    if (Cookies.get("token") !== undefined) {
      return <Redirect to="/" />
    }
    return <Route {...props} />
  }

  const Routes = ({ ...props }) => {
    if (
      Cookies.get("token") === undefined ||
      Cookies.get("user") === undefined
    ) {
      Cookies.remove("token")
      Cookies.remove("user")
      return <Redirect to="/login" />
    }
    return <Route {...props} />
  }

  const filterByGroup = (group) => {
    let allowed = ["dashboard", "*"]
    if (group === "ADM") {
      setAllowedList(data)
    } else if (group === "KON") {
      allowed.push("student-care")
      setAllowedList(data.filter((x) => allowed.includes(x.modul)))
    } else if (group === "KAP") {
      allowed.push("activity")
      setAllowedList(data.filter((x) => allowed.includes(x.modul)))
    } else if (group === "MAN") {
      setAllowedList(data)
    }
  }
  useEffect(() => {
    if (allowedList === null) {
      filterByGroup(user?.group?.shortname)
    }
  }, [allowedList])

  return (
    <BrowserRouter>
      <Switch>
        <LoginRoute exact path="/login" component={Login} />
        <AdminProvider>
          <NavigationAdmin>
            {allowedList?.map((x) => {
              const RouteInner = x.component
              return (
                <Routes
                  exact
                  key={x.url}
                  path={x.url}
                  render={() => <RouteInner />}
                />
              )
            })}
          </NavigationAdmin>
        </AdminProvider>
        <Route render={() => <NotFound />} />
      </Switch>
    </BrowserRouter>
  )
}
export default Router
