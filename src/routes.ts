import { Router } from "express";
import { UserController } from "./controllers/UserController";

const routes = Router();

routes.post('/user', new UserController().register);
routes.post('/session', new UserController().authenticate);

export default routes;