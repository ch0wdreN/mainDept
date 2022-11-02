import type { Component } from 'solid-js'
import { For } from 'solid-js'
import { Result } from '~/models/Result'

const Ranking: Component<{ data: Result[]}> = (props) => {
  return (
    <>
      <For each={props.data}>
        {(result: Result) => {
          const { name, score } = result;
            return (
              <li>
                {name}さん {score}点
              </li>
            )}}
      </For>
    </>
  )
}

export default Ranking
