import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import AuthPage from './pages/AuthPage'

export const useRoutes = isAuthenticated => {
  console.log('isAuthenticated', isAuthenticated)
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact>
          <MainPage auth={isAuthenticated}/>
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  }
  return (
    <Switch>
      <Route path="/auth" exact>
        <AuthPage />
      </Route>
      <Route path="/" exact>
        <MainPage />
      </Route>
      <Redirect to="/auth" />
    </Switch>
  )
}
