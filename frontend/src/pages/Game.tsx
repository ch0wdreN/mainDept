import type { Component } from 'solid-js'
import { useLocation, useNavigate } from '@solidjs/router'
import { Score } from '~/models/Score'
import { createSignal, Show } from 'solid-js'
import axios from 'axios'
import { Result } from '~/models/Result'
import JSConfetti from "js-confetti";
import '~/styles/Game.scss'

//const API_URL = 'https://main-dept-api.deno.dev'
const API_URL = 'http://localhost:8000'
const Game: Component = () => {
  const [score, setScore] = createSignal(0)
  const [isStart, setIsStart] = createSignal(false)
  const location = useLocation()
  const confetti = new JSConfetti();
  const name = () => {
    try {
      return (location.state as { name: string }).name
    } catch (error) {
      console.error(error)
      return 'default'
    }
  }
  const navigate = useNavigate()
  //const endpoint = 'wss://main-dept-api.deno.dev/ws'
  const endpoint = 'ws://localhost:8000/ws'
  const ws = new WebSocket(endpoint)
  const user: Score = {
    type: 'name',
    name: name(),
  }
  ws.onopen = () => {
    console.log('ws connected')
    while (ws.readyState === 0){}
    ws.send(JSON.stringify(user))
  }
  ws.onmessage = (e) => {
    console.log(JSON.parse(e.data))
    const receivedData = JSON.parse(e.data)
    if (receivedData.type === 'result') {
      setScore(receivedData.score)
      confetti.addConfetti();
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
    await postData(data);
    ws.send(JSON.stringify({type: 'update'}));
    navigate('/');
  }

  return (
    <div class='wrap'>
      <div class='container'>
        <p class='name'>{name()}</p>
        <p class='score'>{score()}</p>
      </div>
      <button onClick={() => moveNext({ name: name(), score: score() })} class='toTop'>
            Topへ
      </button>
      </div>
  )
}

export default Game
