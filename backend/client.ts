import { encode } from 'utf8';
import { BufReader } from 'io';
import { TextProtoReader } from 'textproto';
import { green, red } from 'color';
import { Score } from './models/Score.ts';
import { Connection } from './models/Connection.ts';

//const endpoint = 'wss://main-dept-server.deno.dev/';
//const ws: WebSocketClient = new StandardWebSocketClient(endpoint);

const onMessage = async (event: MessageEvent) => {
  const receiveData: Connection | Score = JSON.parse(event.data);
  switch (receiveData.type) {
    case 'connection':
      await Deno.stdout.write(encode(green(`${receiveData.message}\n`)));
      break;
    case 'result':
      await Deno.stdout.write(
        encode(green(
          `name: ${receiveData.name}, score: ${receiveData.score}\n`,
        )),
      );
      break;
    case 'name':
      await Deno.stdout.write(
        encode(
          green(
            `name: ${receiveData.name}\n`,
          ),
        ),
      );
      await Deno.stdout.write(encode('score:  '));
      break;
    default:
      await Deno.stdout.write(encode(`received: ${event.data}`));
  }
};

const cli = async (event: MessageEvent): Promise<void> => {
  const tpr = new TextProtoReader(new BufReader(Deno.stdin));
  while (true) {
    const line = await tpr.readLine();
    if (line === 'close') Deno.exit(0);
    else {
      if (line === null) break;
      const receivedData = JSON.parse(event.data);
      const result: Score = {type: 'result', name: receivedData.name, score: parseInt(line)}
      socket.send(JSON.stringify(result))
      await Deno.stdout.write(encode(green(`send: ${JSON.stringify(result)}\n`)))
      }
    }
  }


// ws.on('open', async () => {
//   await Deno.stdout.write(encode('ws connected\n'));
// });
// ws.on('message', async function (event: MessageEvent) {
//   await onMessage(event);
//   try {
//     await cli(event).catch(console.error);
//     if (!ws.isClosed) {
//       await ws.close(1000).catch(console.error)
//     }
//   }catch (error) {
//     await Deno.stdout.write(encode(red(`Could not connect to ws: ${error}`)));
//   }
// });

const socket = new WebSocket('wss://main-dept-server.deno.dev');
socket.onopen = async () => {
  await Deno.stdout.write(encode('ws connected\n'));
}
socket.onmessage = async (e:MessageEvent) => {
  await onMessage(e)
  try {
    await cli(e).catch(console.error);
  } catch (error) {
   await Deno.stdout.write(encode(red(`Could not connect to ws: ${error}`)))
  }
}