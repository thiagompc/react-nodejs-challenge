import { Router } from "express";
import { PostController } from "./controllers/PostController";
import { UserController } from "./controllers/UserController";
import { TokenService } from "./services/TokenService";

const tokenService = new TokenService();
const userController = new UserController();
const postController = new PostController();

const routes = Router();

routes.post('/user', userController.register);
routes.post('/session', userController.authenticate);

routes.post('/post', tokenService.validate, postController.create);
routes.delete('/post/:id', tokenService.validate, postController.delete);
routes.get('/post', tokenService.validate, postController.list);
routes.get('/post/:id', tokenService.validate, postController.retrieve);
routes.put('/post/:id', tokenService.validate, postController.update);

export default routes;