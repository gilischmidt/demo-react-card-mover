import BoardService from "../services/boardService.js";

export default class BoardSocket {
    constructor(websocket) {
        this.service = BoardService.getInstance();
        this.websocket = websocket;

        this.setup();
    }

    setup() {
        const self = this;

        this.websocket.on("connection", function (socket) {
            socket.on("USERS:CONNECTED", async function ({board, user}) {
                socket.userSession = {
                    user: user,
                    board: board,
                };

                self.service.addUser(board, user);
                socket.join(board);
                socket.broadcast.to(board).emit('USERS:CONNECTED', user);
            });

            socket.on("disconnect", () => {
                const board = socket.userSession.board;
                const user = socket.userSession.user;

                self.service.removeUser(board, user);
                socket.broadcast.to(board).emit('USERS:DISCONNECTED', user);
            });

            socket.on("CARD:DRAG_STARTED", function () {
                const board = socket.userSession.board;
                const user = socket.userSession.user;

                self.service.setDraggingStatus(board, user, true);
                self.websocket.to(board).emit('CARD:DRAG_STARTED', user);
            });

            socket.on("CARD:DRAG_STOPPED", function () {
                const board = socket.userSession.board;
                const user = socket.userSession.user;

                self.service.setDraggingStatus(board, user, false);
                self.websocket.to(board).emit('CARD:DRAG_STOPPED', user);
            });

            socket.on("CARD:MOVED", function (data) {
                const board = socket.userSession.board;

                self.service.setCardPosition(board, data);
                self.websocket.to(board).emit('CARD:MOVED', data);
            });
        });
    }
}
