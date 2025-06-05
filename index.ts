import 'dotenv/config';
import http from 'http';
import app from './src/app';

import { initSocket } from './src/config/socketConfig';


const server = http.createServer(app);

initSocket(server);

server.listen(app.get('port'), () => console.log(`SERVER RUNNING IN PORT http://localhost:${app.get('port')}`))