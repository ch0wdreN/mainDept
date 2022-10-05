import type { Component } from 'solid-js'
import { useLocation } from '@solidjs/router'
import Ranking from '@c/Ranking'
import axios from 'axios'
import { createEffect, createSignal } from 'solid-js'
import { Result } from '~/models/Result'

const API_URL = 'https://main-dept-api.deno.dev'

const Rank: Component = () => {
  const location = useLocation()
  const name = () => {
    try {
      return (location.state as { name: string }).name
    } catch (error) {
      console.error(error)
      return 'default'
    }
  }
  const [allResult, setAllResult] = createSignal<Result[]>([])
  createEffect(() => {
    axios.get(`${API_URL}/get`).then((res) => {
      setAllResult(res.data)
    })
  })
  return (
    <>
      <ol>
        <Ranking data={allResult()} name={name()} />
      </ol>
    </>
  )
}

export default Rank
