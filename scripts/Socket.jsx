import * as SocketIO from 'socket.io-client';

export var Socket = SocketIO.connect();

Socket.on("connect", () => {
    console.log(Socket.id)
})