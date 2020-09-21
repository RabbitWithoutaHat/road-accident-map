import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { AppContainer } from './common/AppContainer'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import NavBar from './common/NavBar'
import Loader from './common/Loader'

function App() {
  const { token, login, logout, userId, userLogin, ready } = useAuth()

  const isAuthenticated = !!token

  const routes = useRoutes(isAuthenticated)
  if (!ready) {
    return <Loader />
  }
  return (
    <AuthContext.Provider value={{ token, login, logout, userId, userLogin, isAuthenticated }}>
      <Router>
        <NavBar />
        <AppContainer auth={isAuthenticated}>{routes}</AppContainer>
      </Router>
    </AuthContext.Provider>
  )
}

export default App
