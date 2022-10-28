import type { Accessor, Component } from "solid-js";
import { createSignal, JSX } from 'solid-js'
import { Score } from '~/models/Score'
import '~/styles/Console.scss'

interface Scores extends Score {
  score: number
}

const Console: Component = () => {
  const [first, setFirst] = createSignal<number>(0);
  const [second, setSecond] = createSignal<number>(0);
  const [third, setThird] = createSignal<number>(0);
  const [total, setTotal] = createSignal<number>(0);
  const [name, setName] = createSignal<string>('');

  const endpoint = 'wss://main-dept-api.deno.dev/ws'
  const ws = new WebSocket(endpoint)
  let receiveData;
  ws.onopen = () => {
    // const connection = {
    //   type: 'connection',
    //   message: "admin connected!"
    // }
    // while (true) {
    //   if (ws.readyState === WebSocket.OPEN) {
    //     ws.send(JSON.stringify(connection));
    //     break;
    //   }
    // }
    console.log('admin connected');
  }
  ws.onmessage = (message) => {
    receiveData = JSON.parse(message.data)
    console.log(receiveData);
    switch (receiveData.type) {
      case 'connection':
        console.log(receiveData);
        break;
      case 'name':
        setName(receiveData.name)
        alert('名前が入力されました');
        break;
      default:
        console.log('something caught');
    }
  }
  const onInputHandler: JSX.EventHandlerUnion<HTMLInputElement, Event> = (e) => {
    const id = e.target.id;
    switch (id) {
      case 'first':
        setFirst(Number((e.target as HTMLInputElement).value))
        break;
      case 'second':
        setSecond(Number((e.target as HTMLInputElement).value));
        break;
      case 'third':
        setThird(Number((e.target as HTMLInputElement).value));
        break;
      default:
        console.log('something wrong')
    }
  }

  const sendData = (score: number = total()) => {
    const data: Score = {
      type: 'result',
      name: name(),
      score: score
    }
    ws.send(JSON.stringify(data));
  }

  const clear = () => {

  }
  return (
    <>
      <h3>管理者</h3>
      <form>
        <p>ユーザー名: {name()}</p>
        <input placeholder='1回目の得点' type='text' onInput={onInputHandler} id='first' class='inputScore'/>
        <input type='button' value='1回目得点送信' onClick={() => sendData()}/>
        <input placeholder='2回目の得点' type='text' onInput={onInputHandler} id='second' class='inputScore'/>
        <input type='button' value='2回目得点送信' onClick={() => sendData()}/>
        <input placeholder='3回目の得点' type='text' onInput={onInputHandler} id='third' class='inputScore'/>
        <input type='button' value='3回目得点送信' onClick={() => sendData()}/>
      </form>
      <p>total: {setTotal(first() + second() + third())}</p>
      <input type='button' value='クリア' onClick={clear}/>
    </>
  )
}

export default Console
