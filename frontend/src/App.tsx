import type { Component } from 'solid-js'
import { Router, Routes, useRoutes } from '@solidjs/router'
import { lazy } from 'solid-js'

const top = lazy(() => import('@/Top'))
const game = lazy(() => import('@/Game'))
const admin = lazy(() => import('@/Admin'))
const rank = lazy(() => import('@/Rank'))

const routes = [
  {
    path: '/',
    component: top,
  },
  {
    path: '/game',
    component: game,
  },
  {
    path: '/admin',
    component: admin,
  },
  {
    path: '/rank',
    component: rank,
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
