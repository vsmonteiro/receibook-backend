import { Router } from "express";
import authMiddleware from "./middlewares/authMiddleware";
import UserController from "./controllers/UserController";
import AuthController from "./controllers/AuthController";

const routes = Router();

routes.post("/users", UserController.store);

routes.post("/auth", AuthController.authenticate);
//routes.post('/recipe', authMiddleware, RecipeController.store)

export default routes;
