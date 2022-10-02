import { WebSocketClient, WebSocketServer } from 'websocket';
import { green, red } from 'color';
import { encode } from 'utf8';
import { Connection } from './models/Connection.ts';

const wss = new WebSocketServer();
const sockets: WebSocketClient[] = [];

const notify = (message: string) => {
  sockets.every((socket) => socket.send(message));
};

const deleteSockets = () => {
  sockets.every(async (socket, index) => {
    if (socket.isClosed) {
      sockets.splice(index, 1);
      await Deno.stdout.write(encode(red('client disconnected\n')));
    }
  });
};

const connection: Connection = {
  type: 'connection',
  message: 'connection successfully',
};

wss.on('connection', async (ws: WebSocketClient) => {
  await Deno.stdout.write(encode(green('client connected\n')));
  ws.send(JSON.stringify(connection));
  deleteSockets();
  sockets.push(ws);
  ws.on('message', (message: string) => {
    notify(message);
  });
  ws.on('close', () => {
    deleteSockets();
  });
});
