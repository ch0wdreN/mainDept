import type { Component } from 'solid-js'
import { For, createEffect, createSignal } from 'solid-js'
import axios from 'axios'
import { Result } from '~/models/Result'

const API_URL = 'https://main-dept-api.deno.dev'

const DataTable: Component = () => {
  const [scores, setScores] = createSignal<Result[]>([])
  createEffect(() => {
    axios.get(`${API_URL}/get`).then((res) => {
      console.log(res.data)
      setScores(res.data)
    })
  }, [])
  return (
    <>
      <table>
        <thead>
          <tr>
            <td>name</td>
            <td>score</td>
          </tr>
        </thead>
        <For each={scores()}>
          {(user: Result) => {
            const { name, score } = user
            return (
              <tbody>
                <tr>
                  <td>{name}</td>
                  <td>{score}</td>
                </tr>
              </tbody>
            )
          }}
        </For>
      </table>
    </>
  )
}

export default DataTable
