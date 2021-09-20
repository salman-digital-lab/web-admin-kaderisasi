import React, { useState, useEffect } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import Cookies from "js-cookie"
import Login from "../pages/Login"
import AdminNavigation from "../components/AdminNavigation"
import AdminProvider from "../context/AdminContext"
import NotFound from "../pages/Error/NotFound"
import data from "./data"

/* eslint-disable */
const Router = () => {
  const token = Cookies.get("token")
  let user
  const [allowedList, setAllowedList] = useState([])

  useEffect(() => {
    if (token) {
      user = JSON.parse(Cookies.get("user"))
    }
    if (allowedList.length < 1) {
      filterByGroup(user ? user.group?.shortname : null)
    }
  }, [allowedList, token])

  const LoginRoute = ({ ...props }) => {
    if (token !== undefined ) {
      return <Redirect to="/" />
    }
    return <Route {...props} />
  }

  const Routes = ({ ...props }) => {
    if (token === undefined) {
      return <Redirect to="/login" />
    }
    return <Route {...props} />
  }

  const filterByGroup = (group) => {
    let allowed = ["dashboard"]
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
    } else {
      setAllowedList(data.filter((x) => allowed.includes(x.modul)))
    }
  }

  return (
    <BrowserRouter>
      <Switch>
        <LoginRoute exact path="/login" component={Login} />
        <AdminProvider>
          <AdminNavigation>
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
          </AdminNavigation>
        </AdminProvider>
        <Routes render={() => <NotFound />} />
      </Switch>
    </BrowserRouter>
  )
}
export default Router
