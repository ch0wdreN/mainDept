import type { Component } from 'solid-js'
import { Router, Routes, Route } from '@solidjs/router'

import { lazy } from 'solid-js'
const topPage = lazy(() => import("@/top"));

const App: Component = () => {
  return (
    <>
      <h1>キッキングスナイパー</h1>
      <Router>
        <Routes>
          <Route path="/" component={topPage} />
        </Routes>
      </Router>
    </>
  )
}

export default App
