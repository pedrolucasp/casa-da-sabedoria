import { useState } from 'preact/hooks'
import { lazy, LocationProvider, ErrorBoundary, Router, Route } from 'preact-iso'
import { AuthProvider } from "./contexts/AuthContext";

import './app.css'

import Landing from './routes/landing'
import SignUp from './routes/sign_up'
import Login from './routes/login'
import Logout from './routes/logout'
import YourShop from './routes/your_shop'
import Explore from './routes/explore'

import { default as NewShop } from './routes/shops/new'
import { default as ShopPage } from './routes/shops/show'

import { default as NewBook } from './routes/books/new'
import { default as EditBook } from './routes/books/edit'
import { default as BookPage } from './routes/books/show'
import { default as Books } from './routes/books/index'

import { default as NewShelf } from './routes/shelves/new'
import { default as EditShelf } from './routes/shelves/edit'

const NotFound = lazy(() => import('./routes/not_found'))

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
            <ShopPage path="/shops/:id" />

            <NewShelf path="/shelves/new" />
            <EditShelf path="/shelves/:id/edit" />

            <Books path="/books" />
            <NewBook path="/books/new" />
            <BookPage path="/books/:id" />
            <EditBook path="/books/:id/edit" />

            <Explore path="/explore" />

            <NotFound default />
          </Router>
        </AuthProvider>
      </ErrorBoundary>
    </LocationProvider>
  )
}
