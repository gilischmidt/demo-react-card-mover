import BoardSocket from "../websocket/boardSocket.js";
import {Server} from "socket.io";


function loadWebsocket(app, server) {
    const socket = new Server(server, {
        cors: true,
        allowEIO3: true
    });

    const boardWebsocket = new BoardSocket(socket);

    console.log('Loaded Websockets.')
}

export {loadWebsocket};
