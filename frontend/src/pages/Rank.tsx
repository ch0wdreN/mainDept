import type { Component } from 'solid-js'
import Ranking from '@c/Ranking'
import axios from 'axios'
import { createEffect, createSignal } from 'solid-js'
import { Result } from '~/models/Result'
import JSConfetti from "js-confetti";
import '~/styles/Rank.scss'

//const API_URL = 'https://main-dept-api.deno.dev'
const API_URL = 'http://localhost:8000'
const endpoint = 'ws://localhost:8000'
const confetti = new JSConfetti();
const Rank: Component = () => {
  const [allResult, setAllResult] = createSignal<Result[]>([])
  const [isUpdate, setIsUpdate] = createSignal<boolean>(false);
  createEffect(() => {
    axios.get(`${API_URL}/get`).then((res) => {
      setAllResult(res.data)
    });
    setIsUpdate(false);
  }, [isUpdate()])
  confetti.addConfetti();
  const socket = new WebSocket(endpoint);
  socket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    if (data.type === 'update') setIsUpdate(true);
    confetti.addConfetti();
  }

  return (
    <div class='wrap'>
     <div class='ranking'>
       <ol class='items'>
         <Ranking data={allResult()}/>
       </ol>
     </div>
    </div>
  )
}

export default Rank
