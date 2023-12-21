/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';

process.on('uncaughtException', error => {
  console.error(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    server = app.listen(config.port, () => {
      console.log('Server listening on port ' + config.port);
    });

    await mongoose.connect(config.database_url as string);
    console.log(`🛢   Database is connected successfully`);
  } catch (err) {
    console.log('failed to connect to database', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        // errorlogger.error(error);
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

// process.on('SIGTERM', () => {
//   logger.info('SIGTERM is received');
//   if (server) {
//     server.close();
//   }
// });
