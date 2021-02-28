import React from "react"
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import {Home}  from '../pages/Home'
import {Login} from '../pages/Login'

export const Router = () => {

  const LoginRoute = ({...props}) =>{
    if ( localStorage.token !== undefined){
      return <Redirect to="/" />
    }else
    {
      return <Route {...props} />
    }
  }
  
  const Routes = ({...props}) => {
    if(localStorage.token === undefined){
      return <Redirect to="/login" />
    }else{
      return <Route {...props} />
    }
  }

  return (
    <BrowserRouter>
      <Switch>
        <Routes exact path="/">
          <Home />
        </Routes>

        <LoginRoute exact path="/login" component={Login}/>
      </Switch>
    </BrowserRouter>
  )
}