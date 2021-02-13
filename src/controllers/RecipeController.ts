import { getRepository } from "typeorm";
import { Request, Response } from "express";
import Recipe from "../models/Recipe";
import Ingredient from "../models/Ingredient";

class RecipeController {
  async list(req: Request, res: Response) {
    const repository = getRepository(Recipe);

    const recipes = await repository.find({
      where: { user: req.userId },
      relations: ["ingredients"],
    });

    return res.json(recipes);
  }

  async store(req: Request, res: Response) {
    const { name, description, prepare, externalLink, ingredients } = req.body;
    const repository = getRepository(Recipe);
    const ingredientRepository = getRepository(Ingredient);
    const user = req.userId;

    await ingredientRepository.save(ingredients);
    const recipe = repository.create({
      name,
      description,
      prepare,
      externalLink,
      ingredients,
      user,
    });

    await repository.save(recipe);
    return res.json(recipe);
  }
}

export default new RecipeController();
