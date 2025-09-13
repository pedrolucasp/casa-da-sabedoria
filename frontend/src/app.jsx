import { useState } from 'preact/hooks'
import { lazy, LocationProvider, ErrorBoundary, Router, Route } from 'preact-iso'
import { AuthProvider } from "./contexts/AuthContext";

import './app.css'

import Landing from './routes/landing.js'
import SignUp from './routes/sign_up.js'
import Login from './routes/login.js'
import Logout from './routes/logout.js'

const NotFound = lazy(() => import('./routes/not_found.js'))

export const App = () => {
  return (
    <LocationProvider>
      <ErrorBoundary>
        <AuthProvider>
          <Router>
            <Landing path="/" />
            <Login path="/login" />
            <SignUp path="/sign_up" />
            <Logout path="/logout" />

            <NotFound default />
          </Router>
        </AuthProvider>
      </ErrorBoundary>
    </LocationProvider>
  )
}
