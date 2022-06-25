import app from './app';
import http from 'http';
import debug from 'debug';

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log("API rodando na porta", port);

function normalizePort(val: string): string | number | false {
   const port = parseInt(val, 10);

   if (isNaN(port)) {
      return val;
   }

   if (port >= 0) {
      return port;
   }

   return false;
}

function onError(error: any): void {
   if (error.syscall !== 'listen') {
      throw error;
   }

   const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

   switch(error.code) {
      case 'EACESS':
         console.error(bind + ' requires elevated privileges');
         process.exit(1);
      case 'EADDRINUSE':
         console.log(bind + ' is already in use');
         process.exit(1);
      default:
         throw error;
   }
}

function onListening(): void {
   const addr = server.address();
   const bind: string = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
   debug('Listening on ' + bind);
}