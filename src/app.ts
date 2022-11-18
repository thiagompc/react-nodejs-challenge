import express from 'express';
import config from 'config';
import cors from 'cors';
import { AppDataSource } from './data-source';
import routes from './routes';


const whitelist = ['http://localhost:3000']
const options: cors.CorsOptions = {
  origin: whitelist,
  credentials: true
}

AppDataSource.initialize().then(() => {

  const app = express();

  app.use(cors(options))
  app.use(express.json());
  app.use(routes);

  return app.listen(process.env.PORT)
})

