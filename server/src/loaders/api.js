import setRoutes from './../api/routes/routes.js';

function loadApi(app, server) {
    setRoutes(app);
    console.log('Loaded API.')
}

export {loadApi};