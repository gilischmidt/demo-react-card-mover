import express from 'express';
import cors from 'cors';

function loadServer() {
    const app = express();
    const port = process.env.PORT || 5000;

    const server = app.listen(port, function () {
        console.log(`Listening on port ${port}`);
    });

    app.use(cors());

    return [app, server];
}

export {loadServer};
