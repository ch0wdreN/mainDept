import type { Component } from 'solid-js'

const Player: Component<{name: string}> = (props) => {
  return (
    <>
      <p>{props.name}</p>
      <button>ゲームスタート</button>
    </>
  )
}

export default Player
