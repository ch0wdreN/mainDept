import type { Component } from 'solid-js'
import { For } from 'solid-js'
import { Result } from '~/models/Result'

const Ranking: Component<{ data: Result[]; name: string }> = (props) => {
  return (
    <>
      <For each={props.data}>
        {(result: Result) => {
          const { name, score } = result;
          if (name === props.name) {
            return (
              <li class='currentUser'>
                {name}さん {score}点
              </li>
            )
          } else {
            return (
              <li>
                {name}さん {score}点
              </li>
            )
          }
        }}
      </For>
    </>
  )
}

export default Ranking
