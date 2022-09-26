import type { Component } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { createSignal, JSX } from 'solid-js'

const Top: Component = () => {
  const navigate = useNavigate()
  const [name, setName] = createSignal('default')
  const onInputHandler: JSX.EventHandlerUnion<HTMLInputElement, Event> = (
    e
  ) => {
    setName((e.target as HTMLInputElement).value)
  }
  return (
    <>
      <input
        placeholder='名前を入力してください'
        onInput={onInputHandler}
        type='text'
      />
      <p>User Name: {name()}</p>
      <button onClick={() => navigate('/game', { state: { name: name() } })}>
        次へ
      </button>
    </>
  )
}

export default Top
