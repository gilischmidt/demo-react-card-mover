export default class BoardRepository extends Map {
    static getInstance() {
        if (this.instance === undefined) {
            this.instance = new BoardRepository();
        }

        return this.instance;
    }
}

