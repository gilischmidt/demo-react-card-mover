import BoardService from "../../services/boardService.js";

class BoardController {
    constructor() {
        this.service = BoardService.getInstance();
        this.getBoardStatus = this.getBoardStatus.bind(this);
        this.status = this.status.bind(this);
    }

    async getBoardStatus(req, res) {
        const board = req.params.board;

        if (board) {
            const status = this.service.getBoard(board);

            if (status) {
                return res.json({
                    error: false,
                    data: status
                });
            }
        }

        return res.json({
            error: true,
            code: 404,
        });
    }

    status(req, res){
        return res.json(this.service.repository);
    }
}

export default (new BoardController());