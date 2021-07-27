import express from 'express';
import * as path from 'path';

function loadReactApp(app, server) {
    app.use(express.static(path.resolve('./client/build')));

    app.get(/^\/(?!api).*/, (req, res) => {
        res.sendFile(path.resolve('./client/build/index.html'));
    });

    console.log('Loaded React APP.')
}

export {loadReactApp};