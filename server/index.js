import {loadServer} from "./src/loaders/server.js";
import {loadWebsocket} from "./src/loaders/websocket.js";
import {loadReactApp} from "./src/loaders/reactApp.js";
import {loadApi} from "./src/loaders/api.js";

const [app, server] = loadServer();

// do not change this order!
loadApi(app, server);
loadReactApp(app, server);
loadWebsocket(app, server);




