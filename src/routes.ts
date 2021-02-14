import { Router } from "express";
import authMiddleware from "./middlewares/authMiddleware";
import UserController from "./controllers/UserController";
import AuthController from "./controllers/AuthController";
import RecipeController from "./controllers/RecipeController";

const routes = Router();

routes.post("/users", UserController.store);

routes.post("/auth", AuthController.authenticate);

routes.post("/recipe/create", authMiddleware, RecipeController.store);
routes.get("/recipe/list", authMiddleware, RecipeController.list);
routes.put("/recipe/update", authMiddleware, RecipeController.update);
routes.delete("/recipe/delete/:id", authMiddleware, RecipeController.delete);

export default routes;
