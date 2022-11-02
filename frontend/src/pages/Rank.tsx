import type { Component } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import Ranking from '@c/Ranking'
import axios from 'axios'
import { createEffect, createSignal } from 'solid-js'
import { Result } from '~/models/Result'
import JSConfetti from "js-confetti";
import '~/styles/Rank.scss'

const API_URL = 'https://main-dept-api.deno.dev'
//const API_URL = 'http://localhost:8000'
const confetti = new JSConfetti();
const Rank: Component = () => {
  const [allResult, setAllResult] = createSignal<Result[]>([])
  createEffect(() => {
    axios.get(`${API_URL}/get`).then((res) => {
      setAllResult(res.data)
    })
  })
  const navigate = useNavigate();
  confetti.addConfetti();

  return (
    <div class='wrap'>
     <div class='ranking'>
       <ol>
         <Ranking data={allResult()}/>
       </ol>
     </div>
      <button onClick={() => navigate('/')}>Topへ戻る</button>
    </div>
  )
}

export default Rank
