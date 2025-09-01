import { useState } from 'preact/hooks'
import { lazy, LocationProvider, ErrorBoundary, Router, Route } from 'preact-iso'
import './app.css'

import Landing from './routes/landing.js'
const NotFound = lazy(() => import('./routes/not_found.js'))

export const App = () => {
  return (
      <LocationProvider>
        <ErrorBoundary>
          <Router>
            <Landing path="/" />
            <NotFound default />
          </Router>
        </ErrorBoundary>
      </LocationProvider>
  )
}
