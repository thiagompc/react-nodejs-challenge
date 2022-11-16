import express from 'express';
import config from 'config';
// import "reflect-metadata";
import { AppDataSource } from './data-source';
import routes from './routes';

AppDataSource.initialize().then(() => {
  const port = config.get('port') as number;
  const host = config.get('host') as string;

  const app = express();

  app.use(express.json());

  app.use(routes);

  return app.listen(process.env.PORT)
})

