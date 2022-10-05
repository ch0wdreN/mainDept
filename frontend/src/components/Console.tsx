import type { Component } from 'solid-js'
import { createSignal } from 'solid-js'
import { Score } from '~/models/Score'

interface Scores extends Score {
  score: number
}

const Console: Component = () => {
  const endpoint = 'ws:127.0.0.1:8080'
  const ws = new WebSocket(endpoint)
  let receiveData
  ws.onopen = () => {
    ws.send('client connected')
  }
  ws.onmessage = (message) => {
    receiveData = JSON.parse(message.data)
  }
  const [scores, setScores] = createSignal<Scores[]>([])
  return <></>
}

export default Console
