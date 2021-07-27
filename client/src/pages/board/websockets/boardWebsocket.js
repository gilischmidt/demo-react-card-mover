import socketIOClient from "socket.io-client";
import {store} from "../../../redux/store";
import {cardSlice} from "../../../redux/slices/cardSlice";
import {userSlice} from "../../../redux/slices/userSlice";

const actions = {
    USER_CONNECTED: 'USERS:CONNECTED',
    USER_DISCONNECTED: 'USERS:DISCONNECTED',
    DRAG_STARTED: 'CARD:DRAG_STARTED',
    DRAG_STOPPED: 'CARD:DRAG_STOPPED',
    CARD_MOVED: 'CARD:MOVED'
}

let socket = null;
let onErrorCallback = null;


function setListeners() {
    socket.on(actions.USER_CONNECTED, function (data) {
        store.dispatch(userSlice.actions.add(data));
    });

    socket.on(actions.USER_DISCONNECTED, function (data) {
        store.dispatch(userSlice.actions.remove(data));
    });

    socket.on(actions.DRAG_STARTED, function (data) {
        store.dispatch(userSlice.actions.toggleDrag(data));
    });

    socket.on(actions.DRAG_STOPPED, function (data) {
        store.dispatch(userSlice.actions.toggleDrag(data));
    });

    socket.on(actions.CARD_MOVED, function (data) {
        store.dispatch(cardSlice.actions.move(data));
    });
}

function setErrorListeners() {
    socket.on('connect_error', function () {
        onErrorCallback('connect_failed');
    });

    socket.on('error', function () {
        onErrorCallback('connect_failed');
    });

    socket.on('disconnect', function () {
        onErrorCallback('connect_failed');
    });

    socket.on('reconnect', function () {
        onErrorCallback('reconnect');
    });

    socket.on('reconnecting', function () {
        onErrorCallback('reconnecting');
    });

    socket.on('reconnect_failed', function () {
        onErrorCallback('reconnect_failed');
    })
}

const BoardWebsocket = {
    emit: (action, params) => {
        return socket.emit(action, params);
    },

    connect: (board, errorCallback = null) => {
        return new Promise(resolve => {
            onErrorCallback = errorCallback ? errorCallback : () => {
            };

            socket = socketIOClient('/', {
                autoConnect: false,
                reconnectionAttempts: 10,
                timeout: 5000
            });

            setListeners();
            setErrorListeners();

            socket.on('connect', () => {
                socket.off('connect');
                resolve();
            });

            socket.connect();
        });
    },

    disconnect: () => {
        try {
            onErrorCallback = () => {
            };

            if (socket && socket.connected === true) {
                socket.emit('USER:DISCONNECT');
                socket.disconnect();
            }
        } catch (e) {
        }
    }

}


export {actions as boardWebsocketActions};
export default BoardWebsocket;





