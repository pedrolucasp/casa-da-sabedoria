import { useState } from 'preact/hooks'
import { lazy, LocationProvider, ErrorBoundary, Router, Route } from 'preact-iso'
import { AuthProvider } from "./contexts/AuthContext";

import './app.css'

import Landing from './routes/landing.js'
import SignUp from './routes/sign_up.js'
import Login from './routes/login.js'
import Logout from './routes/logout.js'
import YourShop from './routes/your_shop.js'

import { default as NewShop } from './routes/shops/new.js'
import { default as NewShelf } from './routes/shelves/new.js'
import { default as NewBook } from './routes/books/new.js'

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
            <YourShop path="/your_shop" />
            <NewShop path="/shops/new" />
            <NewShelf path="/shelves/new" />
            <NewBook path="/books/new" />

            <NotFound default />
          </Router>
        </AuthProvider>
      </ErrorBoundary>
    </LocationProvider>
  )
}
