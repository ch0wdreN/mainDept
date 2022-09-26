import type { Component } from 'solid-js'
import { useLocation } from '@solidjs/router'
import Admin from '@c/Admin'
import Player from '@c/Player'

const Game: Component = () => {
  const location = useLocation()
  const name = () => {
    try {
      return (location.state as { name: string }).name
    } catch (e) {
      return 'default'
    }
  }
  const isAdmin = name() === 'admin'

  return <>{isAdmin ? <Admin /> : <Player name={name()} />}</>
}

export default Game
