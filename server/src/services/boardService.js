import BoardRepository from "../repositories/boardRepository.js";

export default class BoardService {
    constructor() {
        this.repository = BoardRepository.getInstance();
    }


    getBoard(board) {
        return this.repository.get(board);
    }

    addUser(board, user) {
        if (!this.repository.has(board)) {
            this.repository.set(board, {
                users: [],
                cardPosition: 'right',
            });
        }

        this.repository.get(board).users.push(user);
    }

    removeUser(board, user) {
        if (this.repository.has(board)) {
            const boardData = this.repository.get(board);

            if (boardData.users.length === 1) {
                this.repository.delete(board);
            } else {
                boardData.users = boardData.users.filter(u => u.id !== user.id);
            }
        }
    }

    setDraggingStatus(board, user, status) {
        if (this.repository.has(board)) {
            const userInRepository = this.repository.get(board).users.find(u => u.id === user.id);

            if (user) {
                userInRepository.isDragging = status;
            }
        }
    }

    setCardPosition(board, position) {
        if (this.repository.has(board)) {
            this.repository.get(board).cardPosition = position;
        }
    }

    static getInstance() {
        if (this.instance === undefined) {
            this.instance = new BoardService();
        }

        return this.instance;
    }
}