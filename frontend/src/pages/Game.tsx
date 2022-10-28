import type { Component } from 'solid-js'
import { useLocation, useNavigate } from '@solidjs/router'
import { Score } from '~/models/Score'
import { createSignal, Show } from 'solid-js'
import axios from 'axios'
import { Result } from '~/models/Result'

const API_URL = 'https://main-dept-api.deno.dev'

const Game: Component = () => {
  const [score, setScore] = createSignal(0)
  const [isStart, setIsStart] = createSignal(false)
  const location = useLocation()
  const name = () => {
    try {
      return (location.state as { name: string }).name
    } catch (error) {
      console.error(error)
      return 'default'
    }
  }
  const navigate = useNavigate()
  const endpoint = 'wss://main-dept-api.deno.dev/ws'
  const ws = new WebSocket(endpoint)
  const user: Score = {
    type: 'name',
    name: name(),
  }
  ws.onopen = () => {
    console.log('ws connected')
    ws.send(JSON.stringify(user))
  }
  ws.onmessage = (e) => {
    console.log(JSON.parse(e.data))
    const receivedData = JSON.parse(e.data)
    if (receivedData.type === 'result') {
      setScore(receivedData.score)
    }
  }

  const postData = async (data: Result) => {
    await axios
      .post(`${API_URL}/send`, {
        name: data.name,
        score: data.score,
      })
      .then((res) => {
        console.log(res.data)
      })
  }

  const moveNext = async (data: Result) => {
    await postData(data)
    navigate('/rank', { state: { name: name() } })
  }

  return (
    <>
      <p>{name()}</p>
      <p>{score()}</p>
      <Show
        when={isStart()}
        fallback={
          <button onClick={() => moveNext({ name: name(), score: score() })}>
            次へ
          </button>
        }
        keyed
      >
        <button onClick={() => setIsStart(true)}>ゲームスタート</button>
      </Show>
    </>
  )
}

export default Game
