import type { Component } from 'solid-js'
import { Router, Routes, useRoutes } from '@solidjs/router'
import { lazy } from 'solid-js'

const top = lazy(() => import('@/Top'))
const game = lazy(() => import('@/Game'))

const routes = [
  {
    path: '/',
    component: top,
  },
  {
    path: '/game',
    component: game,
  },
]

const App: Component = () => {
  const Routes = useRoutes(routes)
  return (
    <>
      <h1>キッキングスナイパー</h1>
      <Router>
        <Routes />
      </Router>
    </>
  )
}

export default App
