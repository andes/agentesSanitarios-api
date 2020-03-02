import * as express from 'express';
import * as debug from 'debug';
import { initAPI } from './initialize';
// import { Websockets } from './websockets';

// Inicializa express
const app = express();
initAPI(app);

// Inicia el servidor HTTP
const port = 3003;
const server = app.listen(3003, () => debug('andes')('listening on port %s', port));

// Inicializa Websockets
// Websockets.initialize(server);
