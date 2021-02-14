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

  async findById(req: Request, res: Response) {
    const repository = getRepository(Recipe);
    const { id } = req.params;

    const recipe = await repository.findOne({
      where: { id },
      relations: ["ingredients"],
    });

    return res.json(recipe);
  }

  async delete(req: Request, res: Response) {
    const repository = getRepository(Recipe);
    const { id } = req.params;

    try {
      await repository.delete(id);
    } catch (err) {
      return res.json({
        message: "Ocorreu um erro, por favor tente novamente mais tarde",
      });
    }

    return res.json({ message: "Registro deletado" });
  }

  async update(req: Request, res: Response) {
    const {
      id,
      name,
      description,
      prepare,
      externalLink,
      ingredients,
    } = req.body;
    const repository = getRepository(Recipe);
    const ingredientRepository = getRepository(Ingredient);
    const user = req.userId;

    let existingRecipe = await repository.findOne(id, {
      relations: ["ingredients"],
    });

    existingRecipe = {
      ...existingRecipe,
      name,
      description,
      prepare,
      externalLink,
      ingredients,
      user,
    };

    const newIngredients = ingredients.forEach(async (ing: Ingredient) => {
      const query = { id: ing.id };
      delete ing.id;
      return await ingredientRepository.update(query, ing);
    });

    const recipe = await repository.save({
      ...existingRecipe,
      ingredients: newIngredients,
    });

    return res.json(
      await repository.findOne(recipe.id, { relations: ["ingredients"] })
    );
  }
}

export default new RecipeController();
