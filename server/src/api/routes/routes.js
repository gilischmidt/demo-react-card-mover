import BoardController from '../controllers/boardController.js';

export default (app) => {
    app.get(`/api/board-status/:board`, BoardController.getBoardStatus);
    app.get(`/api/status`, BoardController.status);
}